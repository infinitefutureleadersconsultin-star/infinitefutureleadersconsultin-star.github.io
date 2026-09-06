import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with The Esther and Mays Group LLC. Reach Issiah McLean by phone or email.",
  openGraph: {
    title: "Contact | The Esther and Mays Group LLC",
    description:
      "Get in touch with The Esther and Mays Group LLC. Reach Issiah McLean by phone or email.",
  },
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-semibold mb-10">Contact</h1>

      <div className="space-y-2 text-lg" style={{ color: "#1a1a1a" }}>
        <p className="font-medium">Issiah McLean</p>
        <p>The Esther and Mays Group LLC</p>
        <p>Charlotte, North Carolina</p>
      </div>

      <dl className="mt-8 space-y-4 text-lg" style={{ color: "#1a1a1a" }}>
        <div>
          <dt className="font-medium">Phone</dt>
          <dd className="mt-1">
            <a
              href="tel:+19194958478"
              className="text-accent underline underline-offset-2"
            >
              (919) 495-8478
            </a>
          </dd>
        </div>

        <div>
          <dt className="font-medium">Email</dt>
          <dd className="mt-1">
            <a
              href="mailto:issiahmclean1999@gmail.com"
              className="text-accent underline underline-offset-2"
            >
              issiahmclean1999@gmail.com
            </a>
          </dd>
        </div>
      </dl>
    </div>
  );
}
