import { type Metadata } from "next";
import Link from "next/link";
import SignUpForm from "./form";
import { GoogleSignInButton } from "../components/google-sign-in-button";

export const metadata: Metadata = {
  title: "Sign Up - Pets Santa",
};

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      {/* Header with Logo */}
      <header className="py-6 px-4">
        <Link
          href="/"
          className="flex items-center gap-2 w-fit mx-auto group"
        >
          <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white text-xl shadow-lg group-hover:scale-110 transition-transform">
            🐾
          </div>
          <span className="festive-font text-2xl font-bold text-red-600 tracking-tight">Pets Santa</span>
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden">
            {/* Top Decoration */}
            <div className="h-2 bg-gradient-to-r from-red-500 via-red-600 to-red-700"></div>

            <div className="p-10">
              {/* Icon */}
              <div className="w-20 h-20 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl shadow-inner">
                🎄
              </div>

              {/* Title */}
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white text-center mb-2">
                Join Pets Santa
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-center mb-8">
                Create your account and start making magical holiday portraits
              </p>

              {/* Form */}
              <SignUpForm />

              {/* Divider */}
              <div className="flex items-center gap-3 my-6">
                <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700"></div>
                <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">OR</span>
                <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700"></div>
              </div>

              {/* Google Sign In */}
              <GoogleSignInButton />

              {/* Divider */}
              <div className="flex items-center gap-3 my-6">
                <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700"></div>
                <span className="text-xs text-slate-400 dark:text-slate-500 font-medium uppercase tracking-wider">Already have an account?</span>
                <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700"></div>
              </div>

              {/* Sign In Link */}
              <Link
                href="/signin"
                className="w-full py-4 rounded-full border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold flex items-center justify-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-red-200 dark:hover:border-red-800 transition-all shadow-sm group"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Sign In Instead
              </Link>
            </div>
          </div>

          {/* Back to Home */}
          <div className="text-center mt-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 font-medium transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
          </div>
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="py-6 px-4 text-center text-slate-400 dark:text-slate-500 text-sm">
        © {new Date().getFullYear()} Pets Santa. All rights reserved.
      </footer>
    </div>
  );
}
