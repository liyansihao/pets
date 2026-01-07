'use client';

import React, { useState } from 'react';
import Layout from '@/components/layout';
import { useSession } from '@/lib/auth/client';
import { useRouter } from 'next/navigation';

export default function PricingPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handlePurchase = async () => {
    if (!session) {
      router.push('/signin');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Purchase error:', error);
      alert('Failed to initiate checkout. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <section className="py-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6 festive-font">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Purchase credits to generate festive pet photos. Each generation uses 1 credit.
            </p>
          </div>

          {/* Pricing Card */}
          <div className="max-w-md mx-auto">
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 shadow-2xl border-2 border-red-200 dark:border-red-900 relative overflow-hidden">
              {/* Badge */}
              <div className="absolute top-6 right-6 bg-red-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                MOST POPULAR
              </div>

              {/* Price */}
              <div className="text-center mb-8">
                <div className="flex items-baseline justify-center gap-2 mb-2">
                  <span className="text-6xl font-bold text-slate-900 dark:text-white">$10</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400">One-time payment</p>
              </div>

              {/* Features */}
              <div className="space-y-4 mb-10">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm flex-shrink-0">
                    ✓
                  </div>
                  <span className="text-slate-700 dark:text-slate-300">
                    <strong>200 credits</strong> included
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm flex-shrink-0">
                    ✓
                  </div>
                  <span className="text-slate-700 dark:text-slate-300">
                    Generate <strong>200 pet photos</strong>
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm flex-shrink-0">
                    ✓
                  </div>
                  <span className="text-slate-700 dark:text-slate-300">
                    <strong>No expiration</strong> on credits
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm flex-shrink-0">
                    ✓
                  </div>
                  <span className="text-slate-700 dark:text-slate-300">
                    <strong>All styles</strong> available
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm flex-shrink-0">
                    ✓
                  </div>
                  <span className="text-slate-700 dark:text-slate-300">
                    <strong>High quality</strong> downloads
                  </span>
                </div>
              </div>

              {/* CTA Button */}
              <button
                onClick={handlePurchase}
                disabled={isLoading}
                className="w-full py-5 bg-red-600 text-white rounded-2xl font-bold text-xl hover:bg-red-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-1"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Processing...
                  </span>
                ) : (
                  'Purchase Credits'
                )}
              </button>

              <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-4">
                Secure payment powered by Stripe
              </p>
            </div>
          </div>

          {/* FAQ */}
          <div className="mt-24 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-12">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {[
                {
                  q: "How do credits work?",
                  a: "Each photo generation uses 1 credit. With 200 credits, you can generate 200 unique pet photos in various festive styles."
                },
                {
                  q: "Do credits expire?",
                  a: "No, your credits never expire. Use them whenever you want, at your own pace."
                },
                {
                  q: "What payment methods do you accept?",
                  a: "We accept all major credit cards including Visa, Mastercard, American Express, and Discover."
                },
                {
                  q: "Is my payment secure?",
                  a: "Absolutely. We use Stripe, one of the most secure payment processors in the world. We never store your card details."
                },
                {
                  q: "Can I purchase more credits later?",
                  a: "Yes! You can purchase additional credit packages anytime from the pricing page."
                }
              ].map((faq, i) => (
                <div key={i} className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{faq.q}</h3>
                  <p className="text-slate-600 dark:text-slate-400">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
