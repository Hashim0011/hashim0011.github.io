/**
 * Framer's feature set, split into its own chunk.
 *
 * `motion.div` drags the whole animation, gesture and layout engine into the
 * first bundle the browser has to parse. `m.div` plus a lazily loaded feature
 * bundle moves roughly a quarter of that JS off the critical path: the hero
 * parses and paints without it, and the features arrive behind the loading
 * curtain.
 *
 * `domMax` rather than `domAnimation` because the nav underline and the resume
 * tabs use `layoutId`, which lives in the layout-animation half.
 */
export { domMax as default } from "framer-motion";
