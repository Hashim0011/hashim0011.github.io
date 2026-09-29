/**
 * Query-string overrides for how the page opens.
 *
 * `?static` — hand the page over in its finished state.
 *
 * Design-import tools (html.to.design and the like) open the URL in their own
 * renderer and read the DOM without scrolling it. Everything on this site that
 * animates in on scroll is still at `opacity: 0` at that moment, so a plain
 * import arrives with most of its content invisible. This flag turns those
 * scroll-triggered animations into ordinary ones that play immediately, drops
 * the loading curtain, and settles the typewriter on its first full role.
 *
 * It changes nothing for a real visitor: the flag only exists when the query
 * string asks for it.
 */
export const STATIC_RENDER =
  typeof window !== "undefined" && new URLSearchParams(window.location.search).has("static");

/**
 * Swaps a scroll-triggered animation for an immediate one under `?static`.
 *
 * Returns the props to spread onto a motion element, so each call site keeps
 * its own target and viewport settings rather than having them centralised
 * into something no one can read.
 */
export function inView<T>(target: T, viewport: { once: boolean; amount?: number }) {
  return STATIC_RENDER
    ? ({ animate: target } as const)
    : ({ whileInView: target, viewport } as const);
}

/**
 * `?theme=` and `?lang=` are applied before paint by the inline script in
 * index.html. They are re-exported here so the hooks can tell an override from
 * a real choice: a link that forces a theme must not overwrite what the visitor
 * themselves picked earlier.
 */
const params = typeof window === "undefined" ? null : new URLSearchParams(window.location.search);

export const THEME_FROM_URL = params?.get("theme") ?? null;
export const LOCALE_FROM_URL = params?.get("lang") ?? null;
