import { useState } from "react";
import { useI18n } from "../../i18n/LocaleProvider";

/**
 * The portrait is a cut-out, not a framed photograph, so it gets the opposite
 * treatment from a boxed image: it stands on an arch rather than sitting in a
 * plate, and his head crosses above the arch line — the one move a cut-out can
 * make and a framed photo cannot.
 *
 * The arch is not decoration. He is photographed in a white thobe, which on the
 * light theme would dissolve straight into a near-white page; the brand green
 * behind him carries 5.4:1 against it and holds the silhouette in both themes.
 *
 * Drop-in: if the image ever fails, the name plate stands in.
 */
export function Portrait() {
  const { t } = useI18n();
  const { profile } = t;
  const [hasPhoto, setHasPhoto] = useState(true);

  return (
    <div className="relative mx-auto w-full max-w-[300px] sm:max-w-[340px] lg:me-4 lg:ms-auto lg:max-w-[390px]">
      {/* The padding is the plinth: it leaves a band of arch below him so he
          recedes into the shape instead of being sliced off by its edge. */}
      <div className="relative pb-[8%]">
        {/* The arch he stands on. */}
        <div className="absolute inset-x-0 top-[11%] bottom-0 overflow-hidden rounded-t-[190px] rounded-b-[18px] bg-gradient-to-b from-brand-500 to-brand-600 shadow-[0_30px_55px_-26px_rgb(var(--brand-rgb)/0.6)]">
          {/* The site's lattice, carried onto the arch so it belongs to the page. */}
          <div className="absolute inset-0 opacity-[0.13] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:46px_46px]" />
          {/* Light from the top left, so the arch reads as a surface. */}
          <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_25%_0%,rgb(255_255_255/0.2),transparent_62%)]" />
          <div className="absolute inset-0 rounded-t-[190px] rounded-b-[18px] ring-1 ring-inset ring-white/12" />
        </div>

        {hasPhoto ? (
            <img
            src="/portrait-560.webp"
            srcSet="/portrait-360.webp 360w, /portrait-560.webp 560w, /portrait-840.webp 840w"
            sizes="(min-width: 1024px) 390px, (min-width: 640px) 340px, 76vw"
            width={1312}
            height={1199}
            alt={`${profile.name}, ${profile.headline}`}
            onError={() => setHasPhoto(false)}
            className="relative block w-full [filter:brightness(var(--portrait-brightness))_drop-shadow(0_18px_26px_rgba(0,0,0,0.3))]"
            loading="eager"
            fetchPriority="high"
            decoding="async"
        />
        ) : (
          <div className="relative pt-[11%]">
            <NamePlate name={profile.name} headline={profile.headline} />
          </div>
        )}

        {/* He walks down into shadow rather than being cut off by an edge. The
            base of this is fully opaque, which is what hides the bottom edge of
            the photo and the seam where it meets the plinth. */}
        {hasPhoto && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[40%] rounded-b-[18px] bg-[linear-gradient(to_top,#04241a_0%,#04241a_24%,rgb(4_36_26/0.62)_58%,transparent_100%)]" />
        )}
      </div>
    </div>
  );
}

function NamePlate({ name, headline }: { name: string; headline: string }) {
  return (
    <div className="panel relative grid aspect-[4/4.2] w-full place-items-center overflow-hidden rounded-t-[180px] rounded-b-[18px]">
      <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(var(--color-ink-500)_1px,transparent_1px),linear-gradient(90deg,var(--color-ink-500)_1px,transparent_1px)] [background-size:34px_34px]" />
      <div className="absolute h-64 w-64 rounded-full bg-[radial-gradient(circle,rgb(var(--brand-rgb)/0.3)_0%,transparent_70%)]" />

      <div className="relative px-6 text-center">
        <span className="block font-display text-[26px] leading-[1.15] font-bold tracking-tight text-mist-100">
          {name}
        </span>
        <span className="mt-3 block font-mono text-[11px] tracking-[0.3em] text-mist-500 uppercase">
          {headline}
        </span>
      </div>
    </div>
  );
}
