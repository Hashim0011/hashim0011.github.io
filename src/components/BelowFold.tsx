import { Services } from "./Services";
import { Portfolio } from "./Portfolio";
import { Resume } from "./Resume";
import { Skills } from "./Skills";
import { Contact } from "./Contact";

/**
 * Everything past the first screen, in one lazily-loaded chunk.
 *
 * Rendering the whole page in a single pass was one ~1.9s task on a mid-range
 * phone: parse the bundle, then build every section, every project card and
 * every hand-drawn SVG before the browser could paint anything. Splitting here
 * cuts that in two — the hero parses and paints on its own, and this half
 * arrives behind the loading curtain, which is what the curtain is for.
 *
 * One chunk rather than five: five dynamic imports means five round trips, and
 * on a phone the latency costs more than the parse it saves. The footer stays
 * eager because it belongs outside <main> and is small enough not to matter.
 */
export default function BelowFold() {
  return (
    <>
      <Services />
      <Portfolio />
      <Resume />
      <Skills />
      <Contact />
    </>
  );
}
