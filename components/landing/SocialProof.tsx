export function SocialProof() {
  const testimonials = [
    {
      quote:
        "Issiah's review was genuine and helped us get real customers who actually cared about our product. Worth every penny.",
      author: 'Sarah Chen',
      role: 'Founder @ TaskFlow',
      appCategory: 'Apps & Software',
    },
    {
      quote:
        "His audience is perfect for our brand. We saw immediate traffic and conversions. Issiah knows how to showcase products authentically.",
      author: 'Marcus Rodriguez',
      role: 'Brand Manager @ UrbanFit',
      appCategory: 'Fashion & Apparel',
    },
    {
      quote:
        "We got real engagement and sales in the first week after his review. His followers trust his recommendations and actually take action.",
      author: 'Emily Watson',
      role: 'Business Owner @ GlowUp Beauty',
      appCategory: 'Beauty & Cosmetics',
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">
            What Clients Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real results from real brands who've worked with me.
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
