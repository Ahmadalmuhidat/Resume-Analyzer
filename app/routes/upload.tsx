import Navbar from "~/components/navbar";
import type { Route } from "./+types/upload";
import { useState, type FormEvent, useEffect } from "react";
import { useNavigate } from "react-router";
import FileUploader from "~/components/fileUploader";
import { usePuterStore } from "~/lib/puter";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Upload Resume - Resumind" },
    { name: "description", content: "Upload your resume to get AI-powered feedback" },
  ];
}

export default function Upload() {
  const { auth, isLoading } = usePuterStore();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusText, setStatusText] = useState("");
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (!isLoading && !auth.isAuthenticated) {
      navigate("/auth?next=/upload");
    }
  }, [auth.isAuthenticated, isLoading]);

  if (isLoading || !auth.isAuthenticated) return null;

  const handleFileSelect = (file: File | null) => {
    setFile(file);
  }

  const handlesubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!file) {
      alert("Please upload a resume file.");
      return;
    }

    const form = e.currentTarget.closest("form");
    if (!form) return;

    const formData = new FormData(form);

    const companyName = formData.get("company-name") as string;
    const jobTitle = formData.get("job-title") as string;
    const jobDescription = formData.get("job-description") as string;

    setIsProcessing(true);
    setStatusText("Uploading your resume...");
  };

  return (
    <main className="bg-[#f8f9fc] relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[url('/images/bg-main.svg')] bg-cover opacity-50 pointer-events-none" />

      <Navbar />

      <section className="main-section relative z-10">
        <div className="page-heading py-20 animate-in fade-in slide-in-from-top-4 duration-700">
          <h1 className="mb-4">Smart feedback for your dream job</h1>
          {isProcessing ? (
            <div className="flex flex-col items-center gap-6 mt-8">
              <h2 className="animate-pulse">{statusText}</h2>
              <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-xl border border-gray-100 flex flex-col items-center">
                <img src="/images/resume-scan.gif" className="w-full rounded-2xl mb-4" alt="Analyzing..." />
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 animate-[loading_2s_ease-in-out_infinite]" />
                </div>
              </div>
            </div>
          ) : (
            <h2 className="max-w-2xl mx-auto">Drop your resume for an ATS score and improvement tips to stand out from the crowd.</h2>
          )}

          {!isProcessing && (
            <div className="w-full max-w-2xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 mt-12 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
              <form id="upload-form" onSubmit={handlesubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                  <div className="form-div">
                    <label htmlFor="company-name">Company Name</label>
                    <input type="text" id="company-name" name="company-name" placeholder="e.g. Google" required />
                  </div>

                  <div className="form-div">
                    <label htmlFor="job-title">Job Title</label>
                    <input type="text" id="job-title" name="job-title" placeholder="e.g. Software Engineer" required />
                  </div>
                </div>

                <div className="form-div">
                  <label htmlFor="job-description">Job Description</label>
                  <textarea rows={6} id="job-description" name="job-description" placeholder="Paste the job requirements here..." required />
                </div>

                <div className="form-div">
                  <label htmlFor="uploader">Your Resume (PDF)</label>
                  <FileUploader onSelectFile={handleFileSelect} />
                </div>

                <button type="submit" className="primary-button mt-4 h-14 text-lg">
                  Analyze My Resume
                </button>
              </form>
            </div>
          )}
        </div>
      </section>

      <style>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </main>
  );
}
