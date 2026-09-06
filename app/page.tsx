import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  description:
    "Students build real iOS applications using AI development tools. Custom software and youth technology education in Charlotte, North Carolina.",
  openGraph: {
    description:
      "Students build real iOS applications using AI development tools. Custom software and youth technology education in Charlotte, North Carolina.",
  },
};

export default function HomePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-20">

      {/* 1. Statement */}
      <section aria-labelledby="statement-heading" className="mb-20">
        <h1
          id="statement-heading"
          className="text-3xl font-semibold text-[#1a1a1a] leading-tight"
        >
          Students build and ship real software.
        </h1>
        <p className="mt-4 text-[#1a1a1a] max-w-2xl">
          Each student in the AI Build Lab designs, constructs, debugs, and
          demonstrates a working iOS application — not a simulation, not a
          tutorial, not a project that lives only on a screen.
        </p>
      </section>

      {/* 2. What students do */}
      <section aria-labelledby="what-students-do-heading" className="mb-20">
        <h2
          id="what-students-do-heading"
          className="text-xl font-semibold text-[#1a1a1a] mb-6"
        >
          What students do
        </h2>
        <ul className="space-y-4 text-[#1a1a1a]">
          <li className="pl-4 border-l-2 border-[#d4d4d4]">
            <strong>Decide what to build.</strong> Students choose a real
            project with a clear, finishable scope rather than following a
            pre-set assignment.
          </li>
          <li className="pl-4 border-l-2 border-[#d4d4d4]">
            <strong>Direct the AI rather than accept it.</strong> Students learn
            to evaluate, correct, and guide AI output — not copy and paste from
            it.
          </li>
          <li className="pl-4 border-l-2 border-[#d4d4d4]">
            <strong>Structure the application.</strong> Students plan how the
            pieces of their app fit together before any code is written.
          </li>
          <li className="pl-4 border-l-2 border-[#d4d4d4]">
            <strong>Debug under real conditions.</strong> When something breaks,
            students diagnose and fix it the way engineers do — not by starting
            over.
          </li>
          <li className="pl-4 border-l-2 border-[#d4d4d4]">
            <strong>Build onto a real device and demonstrate.</strong> The
            finished application runs on physical hardware and is shown to an
            audience at close.
          </li>
        </ul>
      </section>

      {/* 3. How AI is handled */}
      <section aria-labelledby="ai-handling-heading" className="mb-20">
        <h2
          id="ai-handling-heading"
          className="text-xl font-semibold text-[#1a1a1a] mb-6"
        >
          How AI is handled
        </h2>
        <ul className="space-y-4 text-[#1a1a1a]">
          <li className="pl-4 border-l-2 border-[#d4d4d4]">
            No student creates an account with any AI company. Access runs
            through a single API credential held by the company.
          </li>
          <li className="pl-4 border-l-2 border-[#d4d4d4]">
            Students work on company laptops, not district machines.
          </li>
          <li className="pl-4 border-l-2 border-[#d4d4d4]">
            Usage is controlled and visible on the company side. The company
            holds the credential.
          </li>
          <li className="pl-4 border-l-2 border-[#d4d4d4]">
            When the program ends, the footprint leaves the building. Hardware
            out, no residual accounts.
          </li>
        </ul>
      </section>

      {/* 4. Two ways to run it */}
      <section aria-labelledby="tracks-heading" className="mb-20">
        <h2
          id="tracks-heading"
          className="text-xl font-semibold text-[#1a1a1a] mb-6"
        >
          Two ways to run it
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Track B — recommended */}
          <div className="border border-[#2b5797] rounded p-6">
            <div className="mb-3">
              <span className="text-xs font-semibold uppercase tracking-wide text-[#2b5797] border border-[#2b5797] rounded px-2 py-0.5">
                Recommended starting point
              </span>
            </div>
            <h3 className="text-lg font-semibold text-[#1a1a1a] mb-3">
              Track B — After-school build cohort
            </h3>
            <ul className="space-y-1 text-[#1a1a1a] text-base">
              <li>4 weeks</li>
              <li>30 students</li>
              <li>2 hours per session</li>
              <li>3 sessions per week, after school</li>
            </ul>
          </div>

          {/* Track A */}
          <div className="border border-[#d4d4d4] rounded p-6">
            <h3 className="text-lg font-semibold text-[#1a1a1a] mb-3">
              Track A — In-curriculum co-teach
            </h3>
            <ul className="space-y-1 text-[#1a1a1a] text-base">
              <li>8 weeks</li>
              <li>One existing class</li>
              <li>One partner teacher</li>
              <li>3 to 4 sessions per week</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 5. The pilot */}
      <section aria-labelledby="pilot-heading" className="mb-20">
        <h2
          id="pilot-heading"
          className="text-xl font-semibold text-[#1a1a1a] mb-2"
        >
          The pilot
        </h2>
        <p className="text-[#1a1a1a] mb-8">
          One school, 30 students, four weeks — $4,950.
        </p>
        <ol className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 list-none p-0">
          <li className="border-t-2 border-[#2b5797] pt-4">
            <p className="font-semibold text-[#1a1a1a] mb-1">Preparation</p>
            <p className="text-[#1a1a1a] text-base">
              Student selection, device setup, project scoping, and scheduling
              coordinated before the first session.
            </p>
          </li>
          <li className="border-t-2 border-[#d4d4d4] pt-4">
            <p className="font-semibold text-[#1a1a1a] mb-1">Weeks 1 and 2</p>
            <p className="text-[#1a1a1a] text-base">
              Students choose projects, learn the tooling, and get their first
              working screens onto a device.
            </p>
          </li>
          <li className="border-t-2 border-[#d4d4d4] pt-4">
            <p className="font-semibold text-[#1a1a1a] mb-1">Weeks 3 and 4</p>
            <p className="text-[#1a1a1a] text-base">
              Students complete features, debug, and prepare to demonstrate what
              they built.
            </p>
          </li>
          <li className="border-t-2 border-[#d4d4d4] pt-4">
            <p className="font-semibold text-[#1a1a1a] mb-1">Close</p>
            <p className="text-[#1a1a1a] text-base">
              Students demonstrate their applications. Hardware leaves. The
              company delivers a summary report.
            </p>
          </li>
        </ol>
      </section>

      {/* 6. Closing */}
      <section aria-labelledby="contact-cta-heading" className="mb-4">
        <h2 id="contact-cta-heading" className="sr-only">
          Get in touch
        </h2>
        <p className="text-[#1a1a1a]">
          Ready to bring the program to your school?{" "}
          <Link href="/contact" className="text-accent underline underline-offset-2">
            Get in touch.
          </Link>
        </p>
      </section>

    </div>
  );
}
