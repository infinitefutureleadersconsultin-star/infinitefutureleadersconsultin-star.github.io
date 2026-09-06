import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reporting",
  description:
    "Aggregate reporting the district receives at the close of an AI Build Lab cohort. No individual student data is collected or stored.",
  openGraph: {
    title: "Reporting — The Esther and Mays Group LLC",
    description:
      "Aggregate reporting the district receives at the close of an AI Build Lab cohort. No individual student data is collected or stored.",
  },
};

export default function ReportingPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-20">

      {/* 1. Heading */}
      <section aria-labelledby="reporting-heading" className="mb-16">
        <h1
          id="reporting-heading"
          className="text-3xl font-semibold text-[#1a1a1a] leading-tight mb-6"
        >
          Reporting
        </h1>
        <p className="text-[#1a1a1a] max-w-2xl mb-4">
          All reporting is aggregate. No report contains individual student
          data.
        </p>
        <p className="text-[#1a1a1a] max-w-2xl">
          The reason is straightforward: the company does not collect or store
          student names, identifiers, dates of birth, or contact details at any
          point during a cohort. There is nothing at the individual level to
          report. Where a school needs a record of an individual student&apos;s
          progress — for a portfolio, a credential, or an internal file — that
          is prepared and delivered as a separate document directly to the
          school.
        </p>
      </section>

      {/* 2. Measures */}
      <section aria-labelledby="measures-heading" className="mb-16">
        <h2
          id="measures-heading"
          className="text-xl font-semibold text-[#1a1a1a] mb-4"
        >
          Measures
        </h2>
        <p className="text-[#1a1a1a] max-w-2xl mb-4">
          The company reports against measures the district names. A default
          starting set is offered at the beginning of each engagement; the
          district may cut any item, add items, or replace the set entirely.
          Reporting is designed to fit what the district already tracks, not to
          impose a new framework.
        </p>
      </section>

      {/* 3. Report format table */}
      <section aria-labelledby="format-heading" className="mb-16">
        <h2
          id="format-heading"
          className="text-xl font-semibold text-[#1a1a1a] mb-6"
        >
          Default measure set
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-[#1a1a1a]">
            <caption className="text-left text-base text-[#1a1a1a] mb-4 caption-top">
              Report format. Values populate during a live cohort.
            </caption>
            <thead>
              <tr className="border-b-2 border-[#d4d4d4]">
                <th
                  scope="col"
                  className="text-left py-3 pr-8 font-semibold text-base"
                >
                  Measure
                </th>
                <th
                  scope="col"
                  className="text-left py-3 font-semibold text-base w-32"
                >
                  Value
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[#d4d4d4]">
                <td className="py-4 pr-8 text-base">
                  Attendance and completion across the cohort
                </td>
                <td className="py-4 text-base text-[#6b7280]">&mdash;</td>
              </tr>
              <tr className="border-b border-[#d4d4d4]">
                <td className="py-4 pr-8 text-base">
                  Number of students finishing a working, demonstrable
                  application
                </td>
                <td className="py-4 text-base text-[#6b7280]">&mdash;</td>
              </tr>
              <tr className="border-b border-[#d4d4d4]">
                <td className="py-4 pr-8 text-base">
                  Career exploration exposure
                </td>
                <td className="py-4 text-base text-[#6b7280]">&mdash;</td>
              </tr>
              <tr className="border-b border-[#d4d4d4]">
                <td className="py-4 pr-8 text-base">
                  Credential- or portfolio-relevant outcomes
                </td>
                <td className="py-4 text-base text-[#6b7280]">&mdash;</td>
              </tr>
              <tr className="border-b border-[#d4d4d4]">
                <td className="py-4 pr-8 text-base">
                  Partner teacher familiarity and comfort with AI tools
                </td>
                <td className="py-4 text-base text-[#6b7280]">&mdash;</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

    </div>
  );
}
