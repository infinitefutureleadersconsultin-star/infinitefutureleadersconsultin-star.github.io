import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and conditions",
  description:
    "Terms and conditions for the The Esther and Mays Group LLC website. This site is informational only.",
  openGraph: {
    title: "Terms and conditions | The Esther and Mays Group LLC",
    description:
      "Terms and conditions for the The Esther and Mays Group LLC website. This site is informational only.",
  },
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-semibold mb-2">Terms and conditions</h1>
      <p className="text-base mb-10" style={{ color: "#1a1a1a" }}>
        Effective date: September 5, 2026
      </p>

      <div
        className="space-y-10 text-lg leading-relaxed"
        style={{ color: "#1a1a1a" }}
      >
        <section>
          <h2 className="text-xl font-semibold mb-3">Purpose of this site</h2>
          <p>
            This website is provided for informational purposes only. Nothing on
            this site constitutes a contract, offer, or guarantee of services.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">No warranty</h2>
          <p>
            We try to keep the information on this site accurate and current.
            However, we make no warranties about the accuracy or completeness of
            any content here. Information may change without notice. You should
            not rely solely on this site for decisions about program
            participation or any other matter.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Program engagements</h2>
          <p>
            Any engagement with The Esther and Mays Group LLC — including
            workshops, programs, or consulting services — is governed by a
            separate written agreement between the parties. Nothing on this
            website creates or modifies that agreement.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Intellectual property</h2>
          <p>
            All content on this website — including text, graphics, and
            structure — is owned by The Esther and Mays Group LLC. You may not
            reproduce or distribute it without written permission.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Governing law</h2>
          <p>
            These terms are governed by the laws of the State of North
            Carolina, without regard to its conflict-of-law provisions.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Changes to these terms</h2>
          <p>
            We may update these terms from time to time. When we do, we will
            update the effective date at the top of this page.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Contact us</h2>
          <p>If you have questions about these terms, please reach out:</p>
          <ul className="mt-3 space-y-2 list-none pl-0">
            <li>
              Email:{" "}
              <a
                href="mailto:issiahmclean1999@gmail.com"
                className="text-accent underline underline-offset-2"
              >
                issiahmclean1999@gmail.com
              </a>
            </li>
            <li>
              Phone:{" "}
              <a
                href="tel:+19194958478"
                className="text-accent underline underline-offset-2"
              >
                (919) 495-8478
              </a>
            </li>
          </ul>
        </section>
      </div>
      {/* <!-- TODO: owner to have this reviewed by counsel before relying on it in a district engagement --> */}
    </div>
  );
}
