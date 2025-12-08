export function SocialProof() {
  const testimonials = [
    {
      quote:
        "Issiah's review was genuine and helped us get real users who actually cared about our product. Worth every penny.",
      author: 'Sarah Chen',
      role: 'Founder @ TaskFlow',
      appCategory: 'Productivity',
    },
    {
      quote:
        "As a developer himself, Issiah understood our app immediately. His review highlighted features we didn't even think to mention.",
      author: 'Marcus Rodriguez',
      role: 'CTO @ DevSync',
      appCategory: 'Developer Tools',
    },
    {
      quote:
        "We got 2,000+ installs in the first week after his review. His audience is incredibly engaged and trusts his recommendations.",
      author: 'Emily Watson',
      role: 'Product Lead @ HealthTrack',
      appCategory: 'Health & Fitness',
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">
            What Founders Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real results from real founders who've worked with me.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
            >
              {/* Quote Icon */}
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-6">
                <svg
                  className="w-6 h-6 text-primary-600"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>

              {/* Quote */}
              <p className="text-gray-700 leading-relaxed mb-6 italic">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="border-t border-gray-200 pt-4">
                <p className="font-bold text-gray-900">{testimonial.author}</p>
                <p className="text-sm text-gray-600">{testimonial.role}</p>
                <p className="text-xs text-primary-600 font-medium mt-1">
                  {testimonial.appCategory}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
