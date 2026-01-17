import type { Route } from "./+types/home";
import Navbar from "~/components/navbar";
import { resumes } from "../constants/index";
import ResumeCard from "~/components/resumeCard";
import { usePuterStore } from "~/lib/puter";
import { useNavigate } from "react-router";
import { useEffect } from "react";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Resumind" },
    { name: "description", content: "Smart feedback for your dream job" },
  ];
}

export default function Home() {
  const { auth, isLoading } = usePuterStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !auth.isAuthenticated) {
      navigate("/auth?next=/");
    }
  }, [auth.isAuthenticated, isLoading]);

  if (isLoading || !auth.isAuthenticated) return null;

  return (
    <main className="bg-[#f8f9fc] relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[url('/images/bg-main.svg')] bg-cover opacity-50 pointer-events-none" />

      <Navbar />

      <section className="main-section relative z-10">
        <div className="page-heading py-20 animate-in fade-in slide-in-from-top-4 duration-700">
          <h1 className="mb-4">Track Your Applications & <br />Resume Ratings</h1>
          <h2 className="max-w-2xl mx-auto">Review your submissions and check AI-powered feedback to improve your chances.</h2>
        </div>
      </section>

      {resumes.length > 0 && (
        <div className="resumes-section relative z-10 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
          {resumes.map((resume) => (
            <ResumeCard key={resume.id} resume={resume} />
          ))}
        </div>
      )}
    </main>
  );
}
