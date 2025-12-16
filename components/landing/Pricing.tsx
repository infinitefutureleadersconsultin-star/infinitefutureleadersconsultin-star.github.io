export function Pricing() {
  const currentFollowers = process.env.CURRENT_FOLLOWERS || '17,000';
  const baseRate = '$500'; // Updated dynamically based on follower count

  const features = [
    'Honest, authentic review of your brand or product',
    'Posted to 17K+ engaged followers',
    'Full creative control & script approval',
    'Up to 3 videos (Good Faith Policy)',
    'Real-time analytics tracking',
  ];

  const addOns = [
    { name: 'Usage Rights', price: '$500', description: 'Reuse the video in your marketing' },
    { name: 'Rush Delivery', price: '$200', description: '7-day turnaround instead of 14' },
    {
      name: 'Script Approval',
      price: '$150',
      description: 'Review and approve before filming',
    },
  ];

  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            One package. No hidden fees. Pricing locked when you book.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Main Pricing Card */}
          <div className="bg-gradient-to-br from-primary-50 to-white border-2 border-primary-200 rounded-3xl p-8 md:p-12 shadow-xl mb-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Left: Price */}
              <div>
                <div className="inline-block bg-primary-600 text-white px-4 py-2 rounded-xl text-sm font-bold mb-4">
                  Current Rate at {currentFollowers} followers
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-6xl font-black text-gray-900">{baseRate}</span>
                    <span className="text-2xl text-gray-600">base</span>
                  </div>
                  <p className="text-gray-600 mt-2">
                    + optional add-ons • Pricing locked at booking
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-gray-200">
                  <p className="text-sm font-bold text-gray-900 mb-2">Payment Structure:</p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-primary-600 rounded-full"></span>
                      $50 discovery call (non-refundable)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-primary-600 rounded-full"></span>
                      50% deposit to start production
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-primary-600 rounded-full"></span>
                      50% final payment when video is posted
                    </li>
                  </ul>
                </div>
              </div>

              {/* Right: Features */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  What's Included:
                </h3>

                <ul className="space-y-4">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <span className="text-gray-700 leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#how-it-works"
                  className="inline-block mt-6 text-primary-600 font-bold hover:text-primary-700 transition-colors"
                >
                  See how it works →
                </a>
              </div>
            </div>
          </div>

          {/* Add-ons */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Optional Add-ons
            </h3>

            <div className="grid md:grid-cols-3 gap-6">
              {addOns.map((addOn, index) => (
                <div
                  key={index}
                  className="bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-primary-300 transition-colors"
                >
                  <div className="flex items-baseline justify-between mb-3">
                    <h4 className="font-bold text-gray-900">{addOn.name}</h4>
                    <span className="text-2xl font-black text-primary-600">
                      {addOn.price}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{addOn.description}</p>
                </div>
              ))}
            </div>

            <p className="text-center text-gray-600 mt-8 text-sm">
              Select your add-ons during intake • Mix and match as needed
            </p>
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <a
              href="/auth/signup"
              className="inline-block px-8 py-4 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition-colors shadow-lg hover:shadow-xl text-lg"
            >
              Submit Your Brand
            </a>
            <p className="text-sm text-gray-600 mt-4">
              $50 discovery call • Non-refundable
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
