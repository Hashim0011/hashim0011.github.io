import { useState, type FormEvent } from "react";
import { m } from "framer-motion";
import { Check, Linkedin, Mail, MapPin, Phone, Send } from "lucide-react";
import { useI18n } from "../i18n/LocaleProvider";
import type { Dict } from "../i18n/types";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";
import { Magnetic } from "./ui/Magnetic";

const channelsFor = (t: Dict) => [
  { Icon: Mail, label: t.ui.emailLabel, value: t.profile.email, href: `mailto:${t.profile.email}` },
  { Icon: Phone, label: t.ui.phoneLabel, value: t.profile.phone, href: `tel:${t.profile.phoneHref}` },
  { Icon: Linkedin, label: t.ui.linkedinLabel, value: "in/hashim-almasaabi", href: t.profile.linkedin },
  { Icon: MapPin, label: t.ui.basedIn, value: t.profile.location, href: null },
];

type Fields = { name: string; email: string; subject: string; message: string };

const empty: Fields = { name: "", email: "", subject: "", message: "" };

export function Contact() {
  const { t } = useI18n();
  const c = t.ui.contact;
  const s = t.ui.sections.contact;
  const channels = channelsFor(t);
  const [fields, setFields] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Partial<Fields>>({});
  const [sent, setSent] = useState(false);

  const update = (key: keyof Fields) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFields((prev) => ({ ...prev, [key]: event.target.value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = () => {
    const next: Partial<Fields> = {};
    if (!fields.name.trim()) next.name = c.errName;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) next.email = c.errEmail;
    if (fields.message.trim().length < 10) next.message = c.errMessage;
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  // No backend behind this site, so the form hands a composed draft to the
  // visitor's own mail client — swap in an endpoint later without touching the UI.
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!validate()) return;

    const subject = fields.subject.trim() || `${c.fallbackSubject} ${fields.name}`;
    const body = `${fields.message}\n\n${fields.name}\n${fields.email}`;
    window.location.href = `mailto:${t.profile.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;

    setSent(true);
    setFields(empty);
    window.setTimeout(() => setSent(false), 6000);
  };

  return (
    <section id="contact" className="relative scroll-mt-24 overflow-hidden py-24 lg:py-32">
      <div className="pointer-events-none absolute end-[-10%] bottom-0 -z-10 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgb(var(--brand-rgb)/0.13)_0%,transparent_70%)]" />

      <div className="shell">
        <SectionHeading
          eyebrow={s.eyebrow}
          title={s.title}
          highlight={s.highlight}
          align="center"
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal direction="right" className="h-full">
            <div className="flex h-full flex-col gap-4">
              <div className="panel p-7">
                <h3 className="text-[19px] font-semibold">{c.availableTitle}</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-mist-500">
                  {c.availableCopy}
                </p>
              </div>

              <div className="panel flex-1 divide-y divide-rule p-2">
                {channels.map(({ Icon, label, value, href }) => {
                  const inner = (
                    <span className="flex items-center gap-4 px-5 py-4">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-ink-850 text-brand-500 transition-colors duration-300 group-hover:bg-brand-500 group-hover:text-on-brand">
                        <Icon size={16} />
                      </span>
                      <span className="min-w-0">
                        <span className="block font-display text-[10px] tracking-[0.18em] text-mist-600 uppercase">
                          {label}
                        </span>
                        <span className="block truncate text-[14px] text-mist-300">{value}</span>
                      </span>
                    </span>
                  );

                  return href ? (
                    <a
                      key={label}
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel="noreferrer noopener"
                      className="group block"
                    >
                      {inner}
                    </a>
                  ) : (
                    <div key={label} className="group block">
                      {inner}
                    </div>
                  );
                })}

              </div>
            </div>
          </Reveal>

          <Reveal direction="left" delay={0.1}>
            <form onSubmit={handleSubmit} noValidate className="panel p-7 sm:p-9">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  label={c.name}
                  value={fields.name}
                  onChange={update("name")}
                  error={errors.name}
                  placeholder={c.namePlaceholder}
                />
                <Field
                  label={c.email}
                  type="email"
                  value={fields.email}
                  onChange={update("email")}
                  error={errors.email}
                  placeholder={c.emailPlaceholder}
                />
              </div>

              <div className="mt-5">
                <Field
                  label={c.subject}
                  value={fields.subject}
                  onChange={update("subject")}
                  placeholder={c.subjectPlaceholder}
                />
              </div>

              <div className="mt-5">
                <label className="font-display text-[11px] font-medium tracking-[0.16em] text-mist-600 uppercase">
                  {c.message}
                </label>
                <textarea
                  rows={5}
                  value={fields.message}
                  onChange={update("message")}
                  placeholder={c.messagePlaceholder}
                  className={`mt-2.5 w-full resize-none rounded-md border bg-ink-950/60 px-4 py-3.5 text-[14px] text-mist-100 transition-colors duration-300 outline-none placeholder:text-mist-600/70 ${
                    errors.message
                      ? "border-brand-500"
                      : "border-rule-strong focus:border-brand-500/70"
                  }`}
                />
                {errors.message && (
                  <p className="mt-2 text-[12px] text-brand-500">{errors.message}</p>
                )}
              </div>

              <Magnetic strength={0.2} className="mt-7 inline-block">
                <button
                  type="submit"
                  className="group relative inline-flex items-center gap-3 overflow-hidden rounded-md bg-brand-500 px-8 py-4 font-display text-[12px] font-semibold tracking-[0.16em] text-on-brand uppercase"
                >
                  <span className="absolute inset-0 -translate-x-full bg-ink-950 rtl:translate-x-full transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0" />
                  <span className="relative z-10">{sent ? c.sent : c.send}</span>
                  <span className="relative z-10">
                    {sent ? <Check size={15} /> : <Send size={15} />}
                  </span>
                </button>
              </Magnetic>

              {sent && (
                <m.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 text-[13px] text-brand-500"
                >
                  {c.sentNote}
                </m.p>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  error,
  type = "text",
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="font-display text-[11px] font-medium tracking-[0.16em] text-mist-600 uppercase">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`mt-2.5 w-full rounded-md border bg-ink-950/60 px-4 py-3.5 text-[14px] text-mist-100 transition-colors duration-300 outline-none placeholder:text-mist-600/70 ${
          error ? "border-brand-500" : "border-rule-strong focus:border-brand-500/70"
        }`}
      />
      {error && <p className="mt-2 text-[12px] text-brand-500">{error}</p>}
    </div>
  );
}
