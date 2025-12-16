import { Card } from '../ui/Card';

export function WhatMakesDifferent() {
  const features = [
    {
      icon: '👨‍💻',
      title: 'I\'m a Developer & Founder',
      description: 'I understand what makes products succeed. No surface-level reviews—I actually use and analyze what you're building like a founder would.',
    },
    {
      icon: '💬',
      title: 'Honest Reviews',
      description: 'My audience trusts me because I give real opinions, not paid fluff. Authentic reviews that actually convert.',
    },
    {
      icon: '🎯',
      title: 'Engaged Audience',
      description: '17K+ followers who actively buy, download, and support brands I recommend. These aren\'t passive viewers—they take action.',
    },
  ];

  return (
    <section id="features" className="py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">
            What Makes This Different
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Not your typical influencer marketing. I'm a tech founder who knows what works, whether it's apps or consumer brands.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Card key={index} hover className="text-center">
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
