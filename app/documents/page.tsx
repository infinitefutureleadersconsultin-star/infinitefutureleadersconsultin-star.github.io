import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Documents",
  description:
    "Documentation available on request from The Esther and Mays Group LLC, including company formation, curriculum, safety, and technology information.",
  openGraph: {
    title: "Documents — The Esther and Mays Group LLC",
    description:
      "Documentation available on request from The Esther and Mays Group LLC, including company formation, curriculum, safety, and technology information.",
  },
};

export default function DocumentsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-20">

      {/* Heading */}
      <section aria-labelledby="documents-heading" className="mb-16">
        <h1
          id="documents-heading"
          className="text-3xl font-semibold text-[#1a1a1a] leading-tight mb-6"
        >
          Documents
        </h1>
        <p className="text-[#1a1a1a] max-w-2xl">
          The following documentation is available on request.
        </p>
      </section>

      {/* Company and vendor */}
      <section aria-labelledby="company-heading" className="mb-12">
        <h2
          id="company-heading"
          className="text-xl font-semibold text-[#1a1a1a] mb-4"
        >
          Company and vendor
        </h2>
        <ul className="space-y-3 text-[#1a1a1a]">
          <li className="pl-4 border-l-2 border-[#d4d4d4]">
            Company formation documents and W-9
          </li>
          <li className="pl-4 border-l-2 border-[#d4d4d4]">
            Certificate of insurance
          </li>
          <li className="pl-4 border-l-2 border-[#d4d4d4]">
            Vendor registration
          </li>
        </ul>
      </section>

      {/* Program and curriculum */}
      <section aria-labelledby="program-heading" className="mb-12">
        <h2
          id="program-heading"
          className="text-xl font-semibold text-[#1a1a1a] mb-4"
        >
          Program and curriculum
        </h2>
        <ul className="space-y-3 text-[#1a1a1a]">
          <li className="pl-4 border-l-2 border-[#d4d4d4]">
            Curriculum outline and four-week schedule
          </li>
          <li className="pl-4 border-l-2 border-[#d4d4d4]">
            Instructor background check documentation
          </li>
          <li className="pl-4 border-l-2 border-[#d4d4d4]">
            Student eligibility criteria
          </li>
          <li className="pl-4 border-l-2 border-[#d4d4d4]">
            Parent and guardian consent forms
          </li>
        </ul>
      </section>

      {/* Safety and supervision */}
      <section aria-labelledby="safety-heading" className="mb-12">
        <h2
          id="safety-heading"
          className="text-xl font-semibold text-[#1a1a1a] mb-4"
        >
          Safety and supervision
        </h2>
        <ul className="space-y-3 text-[#1a1a1a]">
          <li className="pl-4 border-l-2 border-[#d4d4d4]">
            Supervision and equipment custody procedures
          </li>
          <li className="pl-4 border-l-2 border-[#d4d4d4]">
            Incident reporting procedure
          </li>
        </ul>
      </section>

      {/* Technology and accessibility */}
      <section aria-labelledby="technology-heading" className="mb-16">
        <h2
          id="technology-heading"
          className="text-xl font-semibold text-[#1a1a1a] mb-4"
        >
          Technology and accessibility
        </h2>
        <ul className="space-y-3 text-[#1a1a1a]">
          <li className="pl-4 border-l-2 border-[#d4d4d4]">
            Technology architecture and data flow description
          </li>
          <li className="pl-4 border-l-2 border-[#d4d4d4]">
            Accessibility conformance information
          </li>
        </ul>
      </section>

      {/* Contact link */}
      <p className="text-[#1a1a1a]">
        To request any of these documents,{" "}
        <Link
          href="/contact"
          className="text-accent hover:underline underline-offset-2"
        >
          contact the company
        </Link>
        .
      </p>

    </div>
  );
}
