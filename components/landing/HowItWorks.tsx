export function HowItWorks() {
  const steps = [
    {
      number: '1',
      title: 'Submit Your App',
      description: 'Fill out a quick intake form telling me about your app and your goals.',
    },
    {
      number: '2',
      title: 'Discovery Call',
      description: 'We hop on a 30-minute call to align on strategy and package selection.',
    },
    {
      number: '3',
      title: 'Review & Approve',
      description: 'I create honest content that showcases what makes your app unique.',
    },
    {
      number: '4',
      title: 'Launch & Track',
      description: 'Your review goes live to 17K+ engaged followers. Track the results in real-time.',
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Simple process. Real results.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connector line (hidden on mobile, last item) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary-300 to-primary-200" />
              )}

              <div className="relative">
                {/* Number badge */}
                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl flex items-center justify-center text-4xl font-black text-white shadow-lg mb-6 relative z-10">
                  {step.number}
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
