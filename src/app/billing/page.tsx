'use client';

import React, { useEffect, useState } from 'react';
import Layout from '@/components/layout';
import { useSession } from '@/lib/auth/client';
import { useRouter } from 'next/navigation';

interface Payment {
  id: string;
  amount: number;
  currency: string;
  status: string;
  creditsPurchased: number;
  createdAt: string;
}

interface CreditUsage {
  id: string;
  amount: number;
  description: string;
  createdAt: string;
}

interface BillingData {
  credits: number;
  paymentHistory: Payment[];
  usageHistory: CreditUsage[];
}

export default function BillingPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [billingData, setBillingData] = useState<BillingData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!session) {
      router.push('/signin');
      return;
    }

    fetchBillingData();
  }, [session, router]);

  const fetchBillingData = async () => {
    try {
      const response = await fetch('/api/billing');
      if (!response.ok) {
        throw new Error('Failed to fetch billing data');
      }
      const data = await response.json();
      setBillingData(data);
    } catch (error) {
      console.error('Error fetching billing data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-slate-600 dark:text-slate-400">Loading...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="py-16 bg-slate-50 dark:bg-slate-950 transition-colors duration-300 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">Billing & Credits</h1>
            <p className="text-slate-600 dark:text-slate-400">
              Manage your credits and view payment history
            </p>
          </div>

          {/* Credit Balance Card */}
          <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-[2rem] p-10 mb-12 text-white shadow-2xl">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <p className="text-red-100 text-lg mb-2">Available Credits</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-6xl font-bold">{billingData?.credits || 0}</span>
                  <span className="text-xl text-red-200">credits</span>
                </div>
              </div>
              <a
                href="/pricing"
                className="px-8 py-4 bg-white text-red-600 rounded-2xl font-bold text-lg hover:bg-red-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-center"
              >
                Purchase More Credits
              </a>
            </div>
            <p className="text-red-200 mt-6 text-sm">
              Each photo generation uses 1 credit. Credits never expire.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
              <div className="text-slate-600 dark:text-slate-400 text-sm mb-2">Total Purchased</div>
              <div className="text-3xl font-bold text-slate-900 dark:text-white">
                {billingData?.paymentHistory.reduce((sum, p) => sum + p.creditsPurchased, 0) || 0}
                <span className="text-lg text-slate-500 dark:text-slate-400 ml-1">credits</span>
              </div>
            </div>
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
              <div className="text-slate-600 dark:text-slate-400 text-sm mb-2">Total Used</div>
              <div className="text-3xl font-bold text-slate-900 dark:text-white">
                {billingData?.usageHistory.reduce((sum, u) => sum + u.amount, 0) || 0}
                <span className="text-lg text-slate-500 dark:text-slate-400 ml-1">credits</span>
              </div>
            </div>
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
              <div className="text-slate-600 dark:text-slate-400 text-sm mb-2">Total Spent</div>
              <div className="text-3xl font-bold text-slate-900 dark:text-white">
                ${((billingData?.paymentHistory.reduce((sum, p) => sum + p.amount, 0) || 0) / 100).toFixed(2)}
              </div>
            </div>
          </div>

          {/* Payment History */}
          <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 shadow-sm border border-slate-200 dark:border-slate-800 mb-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Payment History</h2>
            {billingData?.paymentHistory && billingData.paymentHistory.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800">
                      <th className="text-left py-4 px-4 text-slate-600 dark:text-slate-400 font-semibold text-sm">Date</th>
                      <th className="text-left py-4 px-4 text-slate-600 dark:text-slate-400 font-semibold text-sm">Amount</th>
                      <th className="text-left py-4 px-4 text-slate-600 dark:text-slate-400 font-semibold text-sm">Credits</th>
                      <th className="text-left py-4 px-4 text-slate-600 dark:text-slate-400 font-semibold text-sm">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {billingData.paymentHistory.map((payment) => (
                      <tr key={payment.id} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                        <td className="py-4 px-4 text-slate-900 dark:text-white">
                          {new Date(payment.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </td>
                        <td className="py-4 px-4 text-slate-900 dark:text-white font-semibold">
                          ${(payment.amount / 100).toFixed(2)}
                        </td>
                        <td className="py-4 px-4 text-slate-600 dark:text-slate-400">
                          +{payment.creditsPurchased} credits
                        </td>
                        <td className="py-4 px-4">
                          <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm font-semibold">
                            {payment.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">💳</div>
                <p className="text-slate-600 dark:text-slate-400 text-lg">No payment history yet</p>
                <a href="/pricing" className="inline-block mt-4 text-red-600 dark:text-red-400 font-semibold hover:underline">
                  Purchase credits to get started
                </a>
              </div>
            )}
          </div>

          {/* Usage History */}
          <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 shadow-sm border border-slate-200 dark:border-slate-800">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Credit Usage History</h2>
            {billingData?.usageHistory && billingData.usageHistory.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800">
                      <th className="text-left py-4 px-4 text-slate-600 dark:text-slate-400 font-semibold text-sm">Date</th>
                      <th className="text-left py-4 px-4 text-slate-600 dark:text-slate-400 font-semibold text-sm">Description</th>
                      <th className="text-left py-4 px-4 text-slate-600 dark:text-slate-400 font-semibold text-sm">Credits Used</th>
                    </tr>
                  </thead>
                  <tbody>
                    {billingData.usageHistory.map((usage) => (
                      <tr key={usage.id} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                        <td className="py-4 px-4 text-slate-900 dark:text-white">
                          {new Date(usage.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </td>
                        <td className="py-4 px-4 text-slate-700 dark:text-slate-300">
                          {usage.description}
                        </td>
                        <td className="py-4 px-4 text-red-600 dark:text-red-400 font-semibold">
                          -{usage.amount} credits
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📊</div>
                <p className="text-slate-600 dark:text-slate-400 text-lg">No usage history yet</p>
                <p className="text-slate-500 dark:text-slate-500 mt-2">Start generating photos to see your usage here</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}
