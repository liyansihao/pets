'use client';

import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout';
import Hero from '@/components/hero';
import Features from '@/components/features';
import FAQ from '@/components/faq';
import AuthModal from '@/components/auth-modal';
import type { Creation } from '@/lib/types';

const SEOSection = () => (
  <section className="py-20 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
    <div className="max-w-4xl mx-auto px-4 text-center">
      <h2 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">AI Christmas Pet Photo Templates</h2>
      <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
        Upload a photo of your pet and let AI turn it into a festive holiday portrait. Dress your pet in Santa, Elf, or Reindeer outfits, add cozy winter scenes, Christmas trees, lights, and gifts—no editing needed. Just upload, generate, and download your Christmas pet photo online.
      </p>
    </div>
  </section>
);

const AboutSection = () => (
  <section className="py-24 bg-red-600 dark:bg-red-700 text-white transition-colors duration-300">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
      <div>
        <h2 className="text-4xl lg:text-5xl font-bold mb-8 festive-font">Made for Pet Lovers, Built for the Holidays</h2>
        <p className="text-red-100 text-xl leading-relaxed mb-10">
          Pets helps you turn everyday pet photos into festive holiday portraits you'll actually want to share. No complicated tools—just upload and generate.
        </p>
        <div className="grid gap-6">
          {["Perfect for holiday cards and gifts", "Great for social posts and family sharing", "Works for dogs, cats, and other pets"].map((item, i) => (
            <div key={i} className="flex items-center gap-4">
              <span className="w-8 h-8 bg-white/20 flex items-center justify-center rounded-full text-white text-sm">✓</span>
              <span className="text-lg font-medium">{item}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="relative">
        <div className="aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white/10">
          <img src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=1000" alt="Dog Portrait" className="w-full h-full object-cover" />
        </div>
        <div className="absolute -bottom-10 -left-10 bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-2xl text-slate-900 dark:text-white border border-slate-50 dark:border-slate-700">
          <div className="text-3xl mb-3">🎁</div>
          <div className="font-bold text-xl">Instant Magic</div>
          <div className="text-sm text-slate-500 dark:text-slate-400">Perfect gift for owners</div>
        </div>
      </div>
    </div>
  </section>
);

const TestimonialSection = () => (
  <section className="py-24 bg-white dark:bg-slate-900 transition-colors duration-300">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-4xl font-bold text-center mb-16 dark:text-white">What Pet Owners Are Saying</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            text: "My cat looks incredible in the elf outfit—instant holiday vibe.",
            author: "Emma",
            role: "Cat Lover",
            avatar: "https://i.pravatar.cc/150?u=emma"
          },
          {
            text: "We made Christmas portraits for our dog and rabbit. Super fun and easy.",
            author: "Lucas",
            role: "Dog Dad",
            avatar: "https://i.pravatar.cc/150?u=lucas"
          },
          {
            text: "Perfect for our pet shop's holiday promo—customers loved it.",
            author: "Nina",
            role: "Shop Owner",
            avatar: "https://i.pravatar.cc/150?u=nina"
          }
        ].map((t, i) => (
          <div key={i} className="bg-slate-50 dark:bg-slate-800 p-10 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-xl dark:hover:shadow-red-900/10 transition-all group">
            <div className="flex gap-1 mb-6">
              {[...Array(5)].map((_, j) => <span key={j} className="text-yellow-400 text-lg">★</span>)}
            </div>
            <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed mb-8 italic">"{t.text}"</p>
            <div className="flex items-center gap-4">
              <img
                src={t.avatar}
                alt={t.author}
                className="w-12 h-12 rounded-2xl object-cover border border-slate-200 dark:border-slate-600 group-hover:scale-110 transition-transform"
              />
              <div>
                <div className="font-bold text-slate-900 dark:text-white leading-tight">{t.author}</div>
                <div className="text-xs text-slate-400 dark:text-slate-500 font-medium uppercase tracking-widest mt-1">{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const CTASection = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <section className="py-32 bg-slate-900 dark:bg-black text-white relative overflow-hidden transition-colors duration-300">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(220,38,38,0.2)_0%,_transparent_70%)]"></div>
      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        <h2 className="text-5xl font-bold mb-6 festive-font">Ready to Make Your Pet's Christmas Portrait?</h2>
        <p className="text-xl text-slate-400 mb-12">Upload a photo and generate your first festive look in seconds.</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <button onClick={scrollToTop} className="w-full sm:w-auto px-12 py-5 bg-red-600 text-white rounded-full font-bold text-xl hover:bg-red-700 transition-all shadow-2xl shadow-red-900/40 transform hover:-translate-y-1">
            Upload & Generate
          </button>
          <button onClick={() => window.location.href = '/pricing'} className="w-full sm:w-auto px-12 py-5 bg-transparent border-2 border-slate-700 dark:border-slate-600 text-white rounded-full font-bold text-xl hover:bg-white hover:text-slate-900 hover:border-white transition-all">
            See Pricing
          </button>
        </div>
        <p className="mt-10 text-slate-500 font-medium tracking-wide">No credit card required to try.</p>
      </div>
    </section>
  );
};

export default function Home() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [creations, setCreations] = useState<Creation[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('pets_santa_creations');
    if (saved) setCreations(JSON.parse(saved));
  }, []);

  const handleNewCreation = (original: string, generated: string, style: string) => {
    const newCreation: Creation = {
      id: Math.random().toString(36).substr(2, 9),
      originalImage: original,
      generatedImage: generated,
      style: style,
      date: new Date().toLocaleDateString()
    };
    const updated = [newCreation, ...creations];
    setCreations(updated);
    localStorage.setItem('pets_santa_creations', JSON.stringify(updated));
  };

  return (
    <Layout>
      <Hero onGenerated={handleNewCreation} />
      <SEOSection />
      <Features />
      <AboutSection />
      <TestimonialSection />
      <FAQ />
      <CTASection />
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </Layout>
  );
}
