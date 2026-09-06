import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy, safety, and compliance",
  description:
    "How the company handles AI access, student data, safety, and district compliance reviews.",
  openGraph: {
    title: "Privacy, safety, and compliance",
    description:
      "How the company handles AI access, student data, safety, and district compliance reviews.",
  },
};

export default function ApproachPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-semibold">Privacy, safety, and compliance</h1>
      <p className="mt-4 max-w-2xl">
        This page explains how the company handles AI access, student data,
        personnel safety, and district review. The goal is a complete answer
        to what a district needs to know before it says yes.
      </p>

      <section className="mt-16">
        <h2 className="text-2xl font-semibold">How AI is handled</h2>
        <ul className="mt-6 max-w-2xl space-y-6 list-none p-0">
          <li>
            <p>
              No student creates an account with any AI company. Access runs
              through a single API credential held by the company. There is no
              student sign-up, no student credential, and no eligibility question
              a student has to answer.
            </p>
          </li>
          <li>
            <p>
              Students work on company laptops, not district machines. The company
              brings the equipment and takes it back at program close.
            </p>
          </li>
          <li>
            <p>
              Usage is controlled and visible on the company side. Because the
              company holds the credential, it controls what the tool does and
              what it costs. That cost is the company's, not a district line item.
            </p>
          </li>
          <li>
            <p>
              When the program ends, the footprint leaves the building. Hardware
              out, no residual accounts, nothing for district staff to
              decommission.
            </p>
          </li>
        </ul>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-semibold">Data and privacy</h2>
        <ul className="mt-6 max-w-2xl space-y-6 list-none p-0">
          <li>
            <p>
              The company does not store, transmit, or display student names,
              student identifiers, dates of birth, or contact details in any
              application or reporting system.
            </p>
          </li>
          <li>
            <p>No student accounts or student logins exist.</p>
          </li>
          <li>
            <p>
              Reporting is aggregate only — cohort counts, percentages, and
              status. Never a record per student.
            </p>
          </li>
          <li>
            <p>
              Individual student progress, where a school needs it, is delivered
              as a document to the school. It does not live in a hosted system.
            </p>
          </li>
        </ul>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-semibold">Safety</h2>
        <ul className="mt-6 max-w-2xl space-y-6 list-none p-0">
          <li>
            <p>All personnel who work directly with students are background-checked.</p>
          </li>
          <li>
            <p>
              Students are supervised throughout every session. No student is
              left alone with a company staff member.
            </p>
          </li>
          <li>
            <p>
              Company equipment is in company custody at all times. It arrives
              with the instructor and leaves with the instructor.
            </p>
          </li>
          <li>
            <p>
              If a student installs the application onto a personal device at
              program close, parent consent is required before the install
              proceeds.
            </p>
          </li>
          <li>
            <p>
              The company has an incident reporting procedure. Any safety incident
              during a session is reported to the school the same day.
            </p>
          </li>
        </ul>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-semibold">Accessibility</h2>
        <p className="mt-4 max-w-2xl">
          The company builds web content to WCAG 2.1 Level AA. Accessibility
          conformance information is available on request.
        </p>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-semibold">District review</h2>
        <p className="mt-4 max-w-2xl">
          The company will complete whatever technology, privacy, or security
          review a district requires. That review is welcome early rather than
          late — it is easier to address questions before a contract is signed
          than after a start date is set.
        </p>
      </section>
    </div>
  );
}
