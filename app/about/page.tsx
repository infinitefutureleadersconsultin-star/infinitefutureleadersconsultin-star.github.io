import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Issiah McLean — background in enterprise AI governance, corporate risk, and U.S. Army service. Founder of The Esther and Mays Group LLC.",
  openGraph: {
    title: "About — The Esther and Mays Group LLC",
    description:
      "Issiah McLean — background in enterprise AI governance, corporate risk, and U.S. Army service. Founder of The Esther and Mays Group LLC.",
  },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-20">

      {/* Heading */}
      <section aria-labelledby="about-heading" className="mb-16">
        <h1
          id="about-heading"
          className="text-3xl font-semibold text-[#1a1a1a] leading-tight mb-6"
        >
          Issiah McLean
        </h1>
        <p className="text-[#1a1a1a] max-w-2xl">
          Founder of The Esther and Mays Group LLC. The company builds custom
          software, operations systems, and youth technology education programs.
        </p>
      </section>

      {/* Bank of America */}
      <section aria-labelledby="boa-heading" className="mb-12">
        <h2
          id="boa-heading"
          className="text-xl font-semibold text-[#1a1a1a] mb-3"
        >
          Bank of America
        </h2>
        <p className="text-[#1a1a1a] max-w-2xl">
          Enterprise quality assurance at Bank of America, working on AI
          governance across more than forty lines of business. The work
          involved assessing how artificial intelligence was being deployed
          inside a large regulated organization — whether it was being used
          responsibly and whether appropriate controls were in place.
        </p>
      </section>

      {/* Wells Fargo */}
      <section aria-labelledby="wf-heading" className="mb-12">
        <h2
          id="wf-heading"
          className="text-xl font-semibold text-[#1a1a1a] mb-3"
        >
          Wells Fargo
        </h2>
        <p className="text-[#1a1a1a] max-w-2xl">
          Business Execution Analyst at Wells Fargo, in the Corporate Risk
          Development Program.
        </p>
      </section>

      {/* Army */}
      <section aria-labelledby="army-heading" className="mb-12">
        <h2
          id="army-heading"
          className="text-xl font-semibold text-[#1a1a1a] mb-3"
        >
          U.S. Army Reserve
        </h2>
        <p className="text-[#1a1a1a] max-w-2xl">
          Veteran. Transportation Coordinator (88N), April 2019 to January
          2023.
        </p>
      </section>

      {/* Education */}
      <section aria-labelledby="education-heading" className="mb-12">
        <h2
          id="education-heading"
          className="text-xl font-semibold text-[#1a1a1a] mb-3"
        >
          Education
        </h2>
        <p className="text-[#1a1a1a] max-w-2xl">
          B.S. in Criminal Justice, Fayetteville State University.
        </p>
      </section>

      {/* Current work */}
      <section aria-labelledby="current-heading" className="mb-12">
        <h2
          id="current-heading"
          className="text-xl font-semibold text-[#1a1a1a] mb-3"
        >
          Current work
        </h2>
        <p className="text-[#1a1a1a] max-w-2xl mb-4">
          The company is currently building a behavioral health electronic
          health record system for a clinical outreach organization.
        </p>
        <p className="text-[#1a1a1a] max-w-2xl">
          The company builds custom software and operations systems. Its
          current work spans healthcare software and youth technology
          education.
        </p>
      </section>

    </div>
  );
}
