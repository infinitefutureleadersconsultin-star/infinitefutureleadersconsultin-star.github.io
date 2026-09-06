import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy policy",
  description:
    "Privacy policy for The Esther and Mays Group LLC website. Learn what information this site collects and how to contact us.",
  openGraph: {
    title: "Privacy policy | The Esther and Mays Group LLC",
    description:
      "Privacy policy for The Esther and Mays Group LLC website. Learn what information this site collects and how to contact us.",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-semibold mb-2">Privacy policy</h1>
      <p className="text-base mb-10" style={{ color: "#1a1a1a" }}>
        Effective date: September 5, 2026
      </p>

      <div
        className="space-y-10 text-lg leading-relaxed"
        style={{ color: "#1a1a1a" }}
      >
        <section>
          <h2 className="text-xl font-semibold mb-3">Overview</h2>
          <p>
            This policy explains how The Esther and Mays Group LLC handles
            information when you visit this website. We keep it simple because
            we collect very little.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">
            What this site collects
          </h2>
          <p>
            This site does not use cookies. We do not run analytics software.
            We do not have contact forms or user accounts, so we do not collect
            names, email addresses, or any other personal information through
            this website.
          </p>
          <p className="mt-4">
            Your web browser or hosting infrastructure may generate standard
            server logs — such as your IP address, browser type, and the pages
            you requested. These logs are created automatically by the server,
            not by us. We do not use them to identify or track individual
            visitors.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Student data</h2>
          <p>
            No student data of any kind is collected through this website. This
            site is informational only.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Third-party services</h2>
          <p>
            We do not embed third-party tracking pixels, advertising networks,
            or social media widgets on this site.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Changes to this policy</h2>
          <p>
            If we make material changes to this policy, we will update the
            effective date at the top of this page.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Contact us</h2>
          <p>
            If you have questions about this privacy policy, please reach out:
          </p>
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
