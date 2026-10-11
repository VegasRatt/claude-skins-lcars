import type { Skin } from '../skin'

// CmdNOC LCARS: the Command NOC Portal's own palette, carried into the transcript.
// Every value is a token the portal already paints with: the LCARS orange ladder
// #eb8125 / #d8741d / #f6923b, true-grey text #f5f5f5 / #cfcfcf / #a3a3a3, the deep steel
// surfaces #1b2027 / #151920, and status text at full strength (#22c55e, #facc15, #ff5c5c,
// #38bdf8).
//
// One accent: orange paints the rail, the prompt marker, the spinner and every WRITE.
// Look-ups (Read, Glob, Grep) stay quiet grey, shells are amber, anything that leaves
// the box (web, MCP) is the portal's blue. Kinds are told apart by LUMINANCE first, not
// hue alone, so the skin reads under colour-vision deficiency. The light palette is derived.
const skin: Skin = {
  name: 'lcars',
  label: 'LCARS',
  palette: {
    read: '#cfcfcf',
    write: '#eb8125',
    run: '#facc15',
    search: '#cfcfcf',
    web: '#38bdf8',
    mcp: '#38bdf8',
    other: '#a3a3a3',
    user: '#eb8125',
    fg: '#f5f5f5',
    muted: '#a3a3a3',
    surface: '#1b2027',
    zebra: '#151920',
    ok: '#22c55e',
    err: '#ff5c5c',
    warn: '#facc15',
  },
  spinner: ['Engaging', 'Scanning', 'Computing', 'Hailing', 'Plotting', 'Energizing', 'Calibrating', 'Analyzing'],
  done: ['Engaged', 'Aye', 'Confirmed', 'Acknowledged', 'Made it so'],
}

export default skin
