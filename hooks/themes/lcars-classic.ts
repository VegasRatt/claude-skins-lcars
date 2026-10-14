import type { Skin } from '../skin'

// LCARS Classic: the screen colours of the TNG-era LCARS standard, as the trekcolors
// reference lists the "2357" series (pale-canary #FFFF99, tanoi #FFCC99, golden-tanoi
// #FFCC66, neon-carrot #FF9933, eggplant #664466, lilac #CC99CC, anakiwa #99CCFF, mariner
// #3366CC, bahama-blue #006699). That set has no green and one blue, so the two status
// colours come from thelcars.com's named sets: martian #99cc33 (ok) and red-alert #ff3300
// (err). The zebra band is eggplant deepened, since the standard has no near-black step.
//
// Text is tan on black, the way the panels read on screen: body text tanoi, secondary text
// lilac. The accent is the orange; shells are gold, look-ups the pale tans, the web is the
// pale blue and MCP tools lilac. The light palette is derived.
const skin: Skin = {
  name: 'lcars-classic',
  label: 'LCARS Classic',
  palette: {
    read: '#ffcc99',
    write: '#ff9933',
    run: '#ffcc66',
    search: '#ffff99',
    web: '#99ccff',
    mcp: '#cc99cc',
    other: '#cc99cc',
    user: '#ff9933',
    fg: '#ffcc99',
    muted: '#cc99cc',
    surface: '#664466',
    zebra: '#291b29',
    ok: '#99cc33',
    err: '#ff3300',
    warn: '#ffcc66',
  },
  spinner: ['Working', 'Accessing', 'Processing', 'Interfacing', 'Transferring', 'Compiling'],
  done: ['Complete', 'Affirmative', 'Acknowledged', 'Standing by'],
}

export default skin
