import { usePuterStore } from "~/lib/puter";
import type { Route } from "./+types/auth";
import { useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Resumind | Auth" },
    { name: "description", content: "Login into your account" },
  ];
}

export default function Auth() {
  const { isLoading, auth } = usePuterStore();
  const location = useLocation();
  const next = location.search.split("next=")[1];
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate(next);
    }

  }, [auth.isAuthenticated]);

  return (
    <main className="bg-[#f8f9fc] relative min-h-screen flex items-center justify-center overflow-hidden px-4">
      {/* Decorative background element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[url('/images/bg-main.svg')] bg-cover opacity-30 pointer-events-none" />

      <div className="w-full max-w-lg relative z-10 animate-in fade-in zoom-in-95 duration-700">
        <div className="gradient-border">
          <section className="flex flex-col gap-10 bg-white rounded-2xl p-8 md:p-12 shadow-2xl border border-gray-100/50">
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="size-14 bg-black rounded-2xl flex items-center justify-center shadow-lg transform -rotate-6">
                <span className="text-white font-bold text-2xl">R</span>
              </div>
              <div>
                <h1 className="text-4xl mb-2 tracking-tight">Welcome back</h1>
                <p className="text-brand-600 font-medium">Please sign in to continue to Resumind</p>
              </div>
            </div>

            <div className="flex flex-col gap-6 items-center">
              {isLoading ? (
                <button className="auth-button flex items-center justify-center gap-3 disabled:opacity-70" disabled>
                  <div className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Signing you in ...</span>
                </button>
              ) : (
                <>
                  {auth.isAuthenticated ? (
                    <button
                      className="auth-button transition-all hover:shadow-indigo-200"
                      onClick={auth.signOut}
                    >
                      Sign Out
                    </button>
                  ) : (
                    <button
                      className="auth-button transition-all hover:shadow-indigo-200 group"
                      onClick={auth.signIn}
                    >
                      <span className="flex items-center justify-center gap-2">
                        Get Started
                        <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </span>
                    </button>
                  )}
                </>
              )}

              <p className="text-center text-sm text-brand-500">
                By signing in, you agree to our <span className="underline cursor-pointer hover:text-brand-700 transition-colors">Terms of Service</span>
              </p>
            </div>
          </section>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => navigate("/")}
            className="text-brand-600 hover:text-brand-800 font-medium text-sm transition-colors flex items-center justify-center gap-2 mx-auto"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to home
          </button>
        </div>
      </div>
    </main>
  );
}