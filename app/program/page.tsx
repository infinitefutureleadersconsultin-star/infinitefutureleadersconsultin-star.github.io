import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Build Lab",
  description:
    "Students build real, working iOS applications from nothing — design, build, debug, demonstrate. Youth technology education in Charlotte, North Carolina.",
  openGraph: {
    title: "AI Build Lab",
    description:
      "Students build real, working iOS applications from nothing — design, build, debug, demonstrate. Youth technology education in Charlotte, North Carolina.",
  },
};

export default function ProgramPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-20">

      {/* Page heading */}
      <section aria-labelledby="program-heading" className="mb-16">
        <h1
          id="program-heading"
          className="text-3xl font-semibold text-[#1a1a1a] leading-tight mb-4"
        >
          AI Build Lab
        </h1>
        <p className="text-[#1a1a1a] max-w-2xl">
          A structured program in which students build a real, working iOS
          application from nothing — design, build, debug, demonstrate.
        </p>
      </section>

      {/* What students build */}
      <section aria-labelledby="what-students-build-heading" className="mb-16">
        <h2
          id="what-students-build-heading"
          className="text-xl font-semibold text-[#1a1a1a] mb-6"
        >
          What students build
        </h2>
        <div className="space-y-4 text-[#1a1a1a] max-w-2xl">
          <p>
            Each student builds a real iOS application — not a tutorial project,
            not a sandbox exercise. Something with a clear job: a fitness
            tracker, a memo tool, an app with a specific purpose that can be
            explained in one sentence.
          </p>
          <p>
            Projects are deliberately small and finishable. The goal is a
            working application demonstrated on hardware at the end of the
            program, not an ambitious idea that runs out of time.
          </p>
        </div>
      </section>

      {/* The tooling */}
      <section aria-labelledby="tooling-heading" className="mb-16">
        <h2
          id="tooling-heading"
          className="text-xl font-semibold text-[#1a1a1a] mb-6"
        >
          The tooling
        </h2>
        <p className="text-[#1a1a1a] max-w-2xl">
          Students use Xcode on company-provided Mac laptops. AI development
          tools are part of the workflow — used the way working engineers use
          them, as an aid to be directed and evaluated, not a source to copy
          from.
        </p>
      </section>

      {/* What students own */}
      <section aria-labelledby="ownership-heading" className="mb-16">
        <h2
          id="ownership-heading"
          className="text-xl font-semibold text-[#1a1a1a] mb-6"
        >
          What students own
        </h2>
        <div className="space-y-4 text-[#1a1a1a] max-w-2xl">
          <p>
            Each student creates their own free Apple account and owns their
            source code outright. The project belongs to them when the program
            ends.
          </p>
          <p>
            A practical note on device installation: Apple&apos;s free
            provisioning installs a build to a personal device for seven days at
            a time. Students rebuild and reinstall on demand. What they keep
            permanently is the project itself — the source code they wrote and
            own.
          </p>
        </div>
      </section>

      {/* Tracks */}
      <section aria-labelledby="tracks-heading" className="mb-16">
        <h2
          id="tracks-heading"
          className="text-xl font-semibold text-[#1a1a1a] mb-8"
        >
          Program tracks
        </h2>

        {/* Track B */}
        <article
          aria-labelledby="track-b-heading"
          className="border border-[#2b5797] rounded p-8 mb-8"
        >
          <div className="mb-3">
            <span className="text-xs font-semibold uppercase tracking-wide text-[#2b5797] border border-[#2b5797] rounded px-2 py-0.5">
              Recommended starting point
            </span>
          </div>
          <h3
            id="track-b-heading"
            className="text-lg font-semibold text-[#1a1a1a] mb-4"
          >
            Track B — After-school build cohort
          </h3>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-[#1a1a1a] mb-6">
            <div>
              <dt className="font-semibold text-sm uppercase tracking-wide text-[#1a1a1a] opacity-60 mb-0.5">
                Duration
              </dt>
              <dd>4 weeks</dd>
            </div>
            <div>
              <dt className="font-semibold text-sm uppercase tracking-wide text-[#1a1a1a] opacity-60 mb-0.5">
                Students
              </dt>
              <dd>30 students, juniors and seniors selected by the school counselor</dd>
            </div>
            <div>
              <dt className="font-semibold text-sm uppercase tracking-wide text-[#1a1a1a] opacity-60 mb-0.5">
                Sessions
              </dt>
              <dd>3 sessions per week, 2 hours each, after school</dd>
            </div>
            <div>
              <dt className="font-semibold text-sm uppercase tracking-wide text-[#1a1a1a] opacity-60 mb-0.5">
                Delivery
              </dt>
              <dd>Company instructors</dd>
            </div>
          </dl>
          <div className="space-y-3 text-[#1a1a1a]">
            <p>
              Track B runs entirely outside the master schedule. No displaced
              instructional time, no pacing risk, no teacher reassignment.
            </p>
            <p>
              The after-school format speaks directly to credential and portfolio
              outcomes at the high school level — students graduate with a
              project they built and own.
            </p>
          </div>
        </article>

        {/* Track A */}
        <article
          aria-labelledby="track-a-heading"
          className="border border-[#d4d4d4] rounded p-8"
        >
          <h3
            id="track-a-heading"
            className="text-lg font-semibold text-[#1a1a1a] mb-4"
          >
            Track A — In-curriculum co-teach
          </h3>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-[#1a1a1a] mb-6">
            <div>
              <dt className="font-semibold text-sm uppercase tracking-wide text-[#1a1a1a] opacity-60 mb-0.5">
                Duration
              </dt>
              <dd>8 weeks</dd>
            </div>
            <div>
              <dt className="font-semibold text-sm uppercase tracking-wide text-[#1a1a1a] opacity-60 mb-0.5">
                Class
              </dt>
              <dd>One existing class — whole class, no self-selection</dd>
            </div>
            <div>
              <dt className="font-semibold text-sm uppercase tracking-wide text-[#1a1a1a] opacity-60 mb-0.5">
                Sessions
              </dt>
              <dd>3 to 4 sessions per week — roughly 28 sessions per school</dd>
            </div>
            <div>
              <dt className="font-semibold text-sm uppercase tracking-wide text-[#1a1a1a] opacity-60 mb-0.5">
                Delivery
              </dt>
              <dd>Company instructors alongside the classroom teacher</dd>
            </div>
          </dl>
          <div className="space-y-3 text-[#1a1a1a]">
            <p>
              Track A is embedded in an existing class rather than run beside it.
              One partner teacher co-teaches with company instructors throughout
              the engagement.
            </p>
            <p>
              The higher session count — approximately 28 sessions per school —
              is why Track A expands more slowly than Track B. It maps to career
              exploration measures within existing curriculum.
            </p>
          </div>
        </article>
      </section>

      {/* What the company provides */}
      <section aria-labelledby="company-provides-heading" className="mb-16">
        <h2
          id="company-provides-heading"
          className="text-xl font-semibold text-[#1a1a1a] mb-6"
        >
          What the company provides
        </h2>
        <ul className="space-y-3 text-[#1a1a1a]">
          <li className="pl-4 border-l-2 border-[#d4d4d4]">
            Company-owned Mac laptops with Xcode installed and configured
          </li>
          <li className="pl-4 border-l-2 border-[#d4d4d4]">
            AI development tool access through a single company-held API
            credential — no student accounts with any AI provider
          </li>
          <li className="pl-4 border-l-2 border-[#d4d4d4]">
            Qualified instructors for every session
          </li>
          <li className="pl-4 border-l-2 border-[#d4d4d4]">
            Curriculum, session structure, and project scaffolding
          </li>
          <li className="pl-4 border-l-2 border-[#d4d4d4]">
            A summary report delivered at close
          </li>
          <li className="pl-4 border-l-2 border-[#d4d4d4]">
            Hardware removal at end of program — no residual accounts, no
            devices left behind
          </li>
        </ul>
      </section>

      {/* What a district provides */}
      <section aria-labelledby="district-provides-heading" className="mb-4">
        <h2
          id="district-provides-heading"
          className="text-xl font-semibold text-[#1a1a1a] mb-6"
        >
          What a district provides
        </h2>
        <ul className="space-y-3 text-[#1a1a1a]">
          <li className="pl-4 border-l-2 border-[#d4d4d4]">
            A room with reliable Wi-Fi for sessions
          </li>
          <li className="pl-4 border-l-2 border-[#d4d4d4]">
            Student selection and scheduling coordination (Track B: school
            counselor selects juniors and seniors; Track A: the existing class
            participates whole)
          </li>
          <li className="pl-4 border-l-2 border-[#d4d4d4]">
            One partner teacher available for co-teach sessions (Track A only)
          </li>
          <li className="pl-4 border-l-2 border-[#d4d4d4]">
            Permission for students to use a personal iPhone or iPod Touch to
            install their project (optional — demonstration can be done on a
            device the company provides)
          </li>
        </ul>
      </section>

    </div>
  );
}
