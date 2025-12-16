import Image from 'next/image';

export function Bio() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl overflow-hidden">
                <Image
                  src="/profile.jpg"
                  alt="Issiah - Tech Founder and Creator"
                  width={500}
                  height={500}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>

              {/* Stats Badge */}
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl">
                <div className="text-center">
                  <p className="text-3xl font-black text-primary-600">17K+</p>
                  <p className="text-sm text-gray-600 font-medium">
                    Engaged Followers
                  </p>
                </div>
              </div>
            </div>

            {/* Bio Content */}
            <div>
              <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6">
                Hey, I'm Issiah 👋
              </h2>

              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  I'm a <span className="font-bold text-gray-900">tech founder and creator</span> who
                  reviews products and brands my audience actually wants to know about. Not in the typical "influencer" way.
                </p>

                <p>
                  I actually <span className="font-bold text-gray-900">understand code</span> and product development. I
                  can appreciate good design, clever solutions, and the hard work that goes
                  into building something from scratch—whether it's an app or a physical product.
                </p>

                <p>
                  My audience of <span className="font-bold text-gray-900">17K+ followers</span>{' '}
                  trusts me because I'm honest. If your product is great, I'll tell them. If it needs
                  work, I'll tell you (privately, of course).
                </p>

                <p>
                  I started this because I saw too many great products getting buried while mediocre
                  ones with big marketing budgets thrived. That didn't sit right with me.
                </p>

                <p className="text-lg font-bold text-gray-900 pt-4">
                  Let's get your brand in front of people who'll actually engage with it.
                </p>
              </div>

              {/* Social Links */}
              <div className="mt-8 flex gap-4">
                <a
                  href="https://tiktok.com/@zaydevelops"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
                  </svg>
                  @zaydevelops
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
