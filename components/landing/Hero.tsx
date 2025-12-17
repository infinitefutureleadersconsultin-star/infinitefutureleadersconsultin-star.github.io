import Link from 'next/link';
import Image from 'next/image';
import { Button } from '../ui/Button';

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col">
      {/* Header/Navbar */}
      <header className="absolute top-0 left-0 right-0 z-20 py-6 bg-gradient-to-b from-black/50 to-transparent">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <div className="text-xl font-black text-white">
                Infinite Future Leaders
              </div>
              <div className="hidden md:block text-sm text-gray-300">|</div>
              <div className="hidden md:block text-xl font-black text-white">
                Infinity AI Solutions
              </div>
            </div>
            <Link href="/auth/login">
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                Log In
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Split Screen Content */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* LEFT SIDE - Brand Review Service */}
        <div className="relative flex-1 flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden min-h-screen">
          {/* Animated background elements */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 left-10 w-72 h-72 bg-primary-600 rounded-full filter blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-600 rounded-full filter blur-3xl animate-pulse delay-1000" />
          </div>

          <div className="relative z-10 px-8 py-20 max-w-2xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-primary-600/20 border border-primary-600/30 rounded-full px-4 py-2 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500" />
              </span>
              <span className="text-sm font-medium">17K+ Engaged Followers</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight">
              Get Your Brand Seen By{' '}
              <span className="bg-gradient-to-r from-primary-400 to-purple-400 bg-clip-text text-transparent">
                People Who Actually Care
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-lg sm:text-xl text-gray-300 mb-8 leading-relaxed">
              Honest reviews from a <strong>developer</strong> and{' '}
              <strong>tech founder</strong> who gives hot takes to an engaged
              audience of productivity enthusiasts, side hustlers, entrepreneurs, and creators.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link href="/auth/signup">
                <Button size="lg" className="w-full sm:w-auto min-w-[200px]">
                  Submit Your Brand →
                </Button>
              </Link>
              <a href="https://tiktok.com/@zaydevelops" target="_blank" rel="noopener noreferrer">
                <Button
                  variant="secondary"
                  size="lg"
                  className="w-full sm:w-auto min-w-[200px]"
                >
                  See My Content
                </Button>
              </a>
            </div>

            {/* Social Proof */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 text-gray-400">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm">Honest, not paid fluff</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm">Real developer insights</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - Infinity AI Solutions */}
        <div className="relative flex-1 flex items-center justify-center bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white overflow-hidden min-h-screen">
          {/* Background Grid Pattern */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }} />

          {/* Background Image Overlay */}
          <div className="absolute inset-0 opacity-30">
            <div className="w-full h-full bg-cover bg-center" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80)'}} />
          </div>

          <div className="relative z-10 px-8 py-20 max-w-2xl">
            {/* Logo/Badge */}
            <div className="inline-flex items-center gap-2 bg-blue-600/30 border border-blue-400/40 rounded-full px-4 py-2 mb-6">
              <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
              </svg>
              <span className="text-sm font-medium">Professional Tech Solutions</span>
            </div>

            {/* Main Heading */}
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Infinity AI Solutions
              </span>
            </h2>

            <p className="text-2xl font-bold text-blue-200 mb-6">
              Enterprise App Development & Tech Consulting
            </p>

            {/* Credentials */}
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="text-white font-semibold">2 iOS Apps Developed</p>
                  <p className="text-gray-300 text-sm">1 live on the App Store</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="text-white font-semibold">10+ Years Combined Experience</p>
                  <p className="text-gray-300 text-sm">Expert team in full-stack development</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="text-white font-semibold">Full-Service Development</p>
                  <p className="text-gray-300 text-sm">Web Design, UX/UI, App Development, Coding</p>
                </div>
              </div>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="text-2xl mb-2">📱</div>
                <div className="text-sm font-semibold">iOS & Android Apps</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="text-2xl mb-2">🎨</div>
                <div className="text-sm font-semibold">UX/UI Design</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="text-2xl mb-2">💻</div>
                <div className="text-sm font-semibold">Web Development</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="text-2xl mb-2">🤝</div>
                <div className="text-sm font-semibold">Tech Consulting</div>
              </div>
            </div>

            {/* CTA */}
            <a href="mailto:issiahmclean1999@gmail.com">
              <Button
                size="lg"
                className="w-full sm:w-auto min-w-[250px] bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold shadow-xl"
              >
                Reach Out for Your Project →
              </Button>
            </a>

            <p className="text-sm text-gray-300 mt-4">
              📧 issiahmclean1999@gmail.com
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
