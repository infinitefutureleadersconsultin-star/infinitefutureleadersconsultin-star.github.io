import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The pilot",
  description:
    "How the pilot works: one school, one cohort, four weeks, and what comes next if it succeeds.",
  openGraph: {
    title: "The pilot",
    description:
      "How the pilot works: one school, one cohort, four weeks, and what comes next if it succeeds.",
  },
};

export default function PilotPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-semibold">The pilot</h1>
      <p className="mt-4 max-w-2xl">
        One school. One cohort of 30 students. Four weeks. $4,950. The price
        sits under the $5,000 informal-purchase threshold so it can move through
        direct contact rather than a competitive procurement process.
      </p>

      <section className="mt-16">
        <h2 className="text-2xl font-semibold">Four stages in detail</h2>

        <div className="mt-10">
          <h3 className="text-xl font-semibold">Preparation</h3>
          <p className="mt-3 max-w-2xl">
            Before the first session, the company and school align on everything
            that shapes a fair evaluation. The delivery window is confirmed and
            blocked on both calendars. The cohort of 30 students is selected by
            the school. Parent consent is collected. Any district-level approvals
            are cleared. Success measures are agreed in writing before instruction
            begins — what the school will look at, how it will be measured, and
            what counts as a good result. Nothing is left to interpret after the
            fact.
          </p>
          <p className="mt-3 max-w-2xl">
            Preparation is the stage that makes everything else work. A rushed
            start produces a noisy result. A thorough start produces a result the
            district can act on.
          </p>
        </div>

        <div className="mt-10">
          <h3 className="text-xl font-semibold">Weeks 1 and 2</h3>
          <p className="mt-3 max-w-2xl">
            Students scope a real problem — something they can observe, describe,
            and define. They learn to direct the AI: how to give it useful
            instructions, how to evaluate what it returns, and how to push back
            when the output is wrong. By the end of week two they have stood up
            an interface, working data, and a sign-in flow.
          </p>
        </div>

        <div className="mt-10">
          <h3 className="text-xl font-semibold">Weeks 3 and 4</h3>
          <p className="mt-3 max-w-2xl">
            The work shifts from building to hardening. Students debug under real
            conditions — actual users, actual edge cases, actual failures. Features
            are completed. At the end of week four the application is built onto a
            device.
          </p>
        </div>

        <div className="mt-10">
          <h3 className="text-xl font-semibold">Close</h3>
          <p className="mt-3 max-w-2xl">
            Students demonstrate their work to an audience the district chooses.
            The company delivers a written report measured against the success
            criteria agreed during preparation. The report covers what was built,
            how students performed against those criteria, and what the company
            observed.
          </p>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-semibold">Phase one</h2>
        <p className="mt-4 max-w-2xl">
          Phase one follows only if a pilot succeeds. It brings the program to
          four schools at roughly $9,000 per school.
        </p>
        <p className="mt-4 max-w-2xl">
          Two schools run concurrently — one instructor and one assistant, with
          the same set of 30 laptops traveling between them. The schedule is
          designed so sessions never overlap, which is what makes the shared
          equipment workable. Two schools per month, two months, four schools
          total.
        </p>

        <div className="mt-10 overflow-x-auto">
          <table className="border-collapse text-left text-base w-full max-w-2xl">
            <caption className="text-left text-base mb-3 text-[#1a1a1a]">
              Phase one weekly schedule. Wednesday is the shared day.
            </caption>
            <thead>
              <tr>
                <th scope="col" className="py-2 pr-8 font-semibold border-b border-[#d4d4d4]">Day</th>
                <th scope="col" className="py-2 pr-8 font-semibold border-b border-[#d4d4d4]">School A</th>
                <th scope="col" className="py-2 font-semibold border-b border-[#d4d4d4]">School B</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 pr-8 border-b border-[#d4d4d4]">Monday</td>
                <td className="py-2 pr-8 border-b border-[#d4d4d4]">2:30–4:15</td>
                <td className="py-2 border-b border-[#d4d4d4]">—</td>
              </tr>
              <tr>
                <td className="py-2 pr-8 border-b border-[#d4d4d4]">Tuesday</td>
                <td className="py-2 pr-8 border-b border-[#d4d4d4]">2:30–4:15</td>
                <td className="py-2 border-b border-[#d4d4d4]">—</td>
              </tr>
              <tr>
                <td className="py-2 pr-8 border-b border-[#d4d4d4]">Wednesday</td>
                <td className="py-2 pr-8 border-b border-[#d4d4d4]">2:30–4:15</td>
                <td className="py-2 border-b border-[#d4d4d4]">4:45–6:30</td>
              </tr>
              <tr>
                <td className="py-2 pr-8 border-b border-[#d4d4d4]">Thursday</td>
                <td className="py-2 pr-8 border-b border-[#d4d4d4]">—</td>
                <td className="py-2 border-b border-[#d4d4d4]">4:45–6:30</td>
              </tr>
              <tr>
                <td className="py-2 pr-8">Friday</td>
                <td className="py-2 pr-8">—</td>
                <td className="py-2">4:45–6:30</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-semibold">An honest constraint</h2>
        <p className="mt-4 max-w-2xl">
          The current device set supports one cohort at a time. That is what makes
          two concurrent schools workable and four concurrent schools not. The
          schedule above is built around that reality, not around an optimistic
          assumption about future equipment.
        </p>
      </section>
    </div>
  );
}
