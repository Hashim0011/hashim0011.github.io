import { m } from "framer-motion";
import { useI18n } from "../i18n/LocaleProvider";

/** WhatsApp's own glyph — lucide dropped brand marks, so it is drawn inline. */
function WhatsAppGlyph({ size = 27 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884a9.82 9.82 0 0 1 6.99 2.898 9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.82 11.82 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.88 11.88 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

/**
 * Fixed chat launcher. Sits below the mobile menu and project modal in the
 * stack, so anything that takes over the screen still covers it.
 */
export function WhatsAppButton() {
  const { t } = useI18n();
  const href = `https://wa.me/${t.profile.whatsapp}?text=${encodeURIComponent(
    t.profile.whatsappMessage,
  )}`;

  return (
    <m.a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={t.ui.whatsapp.label}
      className="group fixed end-5 bottom-5 z-[180] flex items-center gap-3 sm:end-7 sm:bottom-7"
      initial={{ opacity: 0, scale: 0.5, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1.9, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.93 }}
    >
      <span className="pointer-events-none hidden translate-x-3 rounded-md rtl:-translate-x-3 bg-ink-800 px-3.5 py-2 text-[12px] font-medium whitespace-nowrap text-mist-200 opacity-0 shadow-lg transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0 group-hover:opacity-100 lg:block">
        {t.ui.whatsapp.hint}
      </span>

      <span className="relative grid h-14 w-14 place-items-center rounded-full bg-[#25d366] text-white shadow-[0_10px_30px_-6px_rgba(37,211,102,0.55)]">
        {/* idle halo, so the button reads as live rather than decorative */}
        <span
          className="absolute inset-0 rounded-full bg-[#25d366]"
          style={{ animation: "pulse-ring 2.6s ease-out infinite" }}
        />
        <span className="relative">
          <WhatsAppGlyph />
        </span>
      </span>
    </m.a>
  );
}
