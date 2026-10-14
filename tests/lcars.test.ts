import { expect, test } from 'claude-code/testing'

import { DEFAULT_PREFS } from '../hooks/command'
import { resolveSkin } from '../hooks/custom'
import { toLight } from '../hooks/light'
import { SKINS } from '../hooks/themes'
import lcars from '../hooks/themes/lcars'
import lcarsClassic from '../hooks/themes/lcars-classic'

// The fork's one promise: LCARS is a built-in skin, it is the default, and every colour in
// it is a real six-digit hex the portal paints with.

const HEX = /^#[0-9a-f]{6}$/

// Relative luminance (WCAG), so kinds are told apart by brightness, not hue alone.
const luminance = (hex: string): number => {
  const channel = (at: number) => {
    const value = parseInt(hex.slice(at, at + 2), 16) / 255

    return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4
  }

  return 0.2126 * channel(1) + 0.7152 * channel(3) + 0.0722 * channel(5)
}

const contrast = (a: string, b: string): number => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x) as [number, number]

  return (hi + 0.05) / (lo + 0.05)
}

test('lcars is the default skin and the first in the list', async () => {
  expect(DEFAULT_PREFS.skin).toBe('lcars')
  expect(SKINS[0]?.name).toBe('lcars')
  expect(resolveSkin('lcars', {})?.label).toBe('LCARS')
  expect(resolveSkin(DEFAULT_PREFS.skin, {})).toBe(lcars)
})

test('every lcars slot is a six-digit hex', async () => {
  for (const [slot, value] of Object.entries(lcars.palette)) {
    expect(HEX.test(value), `${slot} = ${value}`).toBe(true)
  }
  expect(Object.keys(lcars.palette).length).toBe(15)
})

test('the common kinds read apart by luminance, and text reads on a dark ground', async () => {
  const { read, write, run, fg, muted, zebra, surface } = lcars.palette

  // Read (quiet grey), write (orange) and run (amber) each sit a clear step apart.
  expect(contrast(read, write) > 1.4).toBe(true)
  expect(contrast(write, run) > 1.4).toBe(true)
  // Body and secondary text clear WCAG AA against the darker band colour.
  expect(contrast(fg, zebra) >= 4.5).toBe(true)
  expect(contrast(muted, surface) >= 4.5).toBe(true)
  // One accent: the rail colour is the write colour.
  expect(lcars.palette.user).toBe(write)
})

test('the derived light palette keeps body text dark on white', async () => {
  const light = toLight(lcars.palette)

  expect(contrast(light.fg, light.surface) >= 7).toBe(true)
  expect(contrast(light.user, light.surface) >= 4.5).toBe(true)
  expect(HEX.test(light.write)).toBe(true)
})

test('the spinner and footer words fit the designer limits', async () => {
  for (const word of [...lcars.spinner, ...lcars.done]) {
    expect(word.length <= 24, word).toBe(true)
  }
  expect(lcars.spinner.length <= 12 && lcars.done.length <= 12).toBe(true)
})

test('lcars-classic is the second skin, every slot a hex, tan text readable on its bands', async () => {
  expect(SKINS[1]?.name).toBe('lcars-classic')
  expect(resolveSkin('lcars-classic', {})).toBe(lcarsClassic)
  for (const [slot, value] of Object.entries(lcarsClassic.palette)) {
    expect(HEX.test(value), `${slot} = ${value}`).toBe(true)
  }
  const { fg, muted, surface, zebra, read, write, run, user } = lcarsClassic.palette

  expect(contrast(fg, surface) >= 4.5).toBe(true)
  expect(contrast(muted, zebra) >= 4.5).toBe(true)
  expect(contrast(read, write) > 1.2).toBe(true)
  expect(contrast(write, run) > 1.2).toBe(true)
  expect(user).toBe(write)
  for (const word of [...lcarsClassic.spinner, ...lcarsClassic.done]) {
    expect(word.length <= 24, word).toBe(true)
  }
})
