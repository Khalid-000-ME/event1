"use client";

import { useState } from "react";
import Image from "next/image";

// PLEASE REPLACE THIS URL WITH YOUR DEPLOYED GOOGLE APPS SCRIPT WEB APP URL
const GOOGLE_SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;

const departments = [
  "CSE A",
  "CSE B",
  "ECE",
  "EEE",
  "IT",
  "MECH",
  "AI/DS",
];

const years = ["I", "II", "III", "IV"];

export default function Home() {
  const [formData, setFormData] = useState({
    "Reg. No.": "",
    "Student Name": "",
    "Email": "",
    "Department": "",
    "Year": "",
    "Phone": "",
    "Expectations": "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateEmail = (email: string) => {
    return email.endsWith("@licet.ac.in");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateEmail(formData.Email)) {
      setError("Please use your college email (@licet.ac.in)");
      return;
    }

    if (GOOGLE_SCRIPT_URL === "REPLACE_WITH_YOUR_WEB_APP_URL") {
      setError("Please deploy the Google Apps Script and update the URL in page.tsx");
      return;
    }

    setLoading(true);

    try {
      const formDataParams = new URLSearchParams();
      formDataParams.append("Reg. No.", formData["Reg. No."]);
      formDataParams.append("Student Name", formData["Student Name"]);
      formDataParams.append("Email", formData["Email"]);
      formDataParams.append("Department", formData["Department"]);
      formDataParams.append("Year", formData["Year"]);
      formDataParams.append("Phone", formData["Phone"]);
      formDataParams.append("Expectations", formData["Expectations"]);

      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        body: formDataParams,
      });

      const data = await response.json();

      if (data.result === "error") {
        if (data.error.includes("Duplicate Registration")) {
          setError("You are already registered");
        } else {
          setError(data.error);
        }
      } else {
        setSubmitted(true);
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-950 px-4 text-white">
        <div className="max-w-md w-full bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-2xl shadow-xl text-center">
          <div className="mb-4 flex justify-center">
            <div className="h-16 w-16 bg-green-500 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <h2 className="text-3xl font-bold mb-2">Registration Successful!</h2>
          <p className="text-blue-200">Thank you for registering. See you at the event!</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 px-6 py-2 bg-white text-blue-900 font-semibold rounded-full hover:bg-blue-50 transition-colors"
          >
            Register Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-950 text-white selection:bg-blue-500 selection:text-white font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Header - Logos */}
        <header className="flex flex-wrap items-center justify-center gap-6 mb-12">
          <div className="relative h-20 w-48 bg-white rounded-2xl p-2 shadow-lg backdrop-blur-sm transition-transform hover:scale-105">
            <Image src="/IEEE.png" alt="IEEE Logo" fill className="object-contain p-2" />
          </div>
          <div className="relative h-20 w-40 bg-white rounded-2xl p-2 shadow-lg backdrop-blur-sm transition-transform hover:scale-105">
            <Image src="/LICET_logo_fixed.png" alt="LICET Logo" fill className="object-contain p-2 scale-150" />
          </div>
          <div className="relative h-20 w-40 bg-white rounded-2xl p-2 shadow-lg backdrop-blur-sm transition-transform hover:scale-105">
            <Image src="/FABLAB_LOGO.png" alt="FABLAB Logo" fill className="object-contain p-2 scale-90" />
          </div>
          <div className="relative h-20 w-48 bg-white rounded-2xl p-2 shadow-lg backdrop-blur-sm transition-transform hover:scale-105">
            <Image src="/IEEE_Photonics.png" alt="IEEE Photonics Logo" fill className="object-contain p-2" />
          </div>
        </header>

        {/* Main Title Section - Moved to top */}
        <div className="mb-12 text-center lg:text-left">
          <div className="inline-block px-3 py-1 bg-blue-500/20 rounded-full border border-blue-400/30 text-blue-300 text-xs font-semibold tracking-wider uppercase mb-2">
            IEEE Event Series
          </div>
          <h1 className="text-4xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-4">
            Outlearning <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Everyone</span>
          </h1>
          <div className="text-2xl font-light text-blue-100 mb-6">
            How AI Becomes Your Unfair Advantage
          </div>
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-blue-200">
            <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-lg border border-white/5">
              <span>🗓️</span> <span className="font-semibold">Feb 24th</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-lg border border-white/5">
              <span>⏰</span> <span className="font-semibold">10:00 AM</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">

          {/* Left Column - Form */}
          <div className="space-y-8 order-2 lg:order-1">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl">
              <h2 className="text-xl font-semibold mb-6 text-blue-100">Student Registration</h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-blue-200 ml-1">Reg. No.</label>
                    <input
                      required
                      type="text"
                      name="Reg. No."
                      value={formData["Reg. No."]}
                      onChange={handleChange}
                      placeholder="e.g. 311123107001"
                      className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent placeholder-white/20 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-blue-200 ml-1">Student Name</label>
                    <input
                      required
                      type="text"
                      name="Student Name"
                      value={formData["Student Name"]}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent placeholder-white/20 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-blue-200 ml-1">College Email</label>
                  <input
                    required
                    type="email"
                    name="Email"
                    value={formData.Email}
                    onChange={handleChange}
                    placeholder="Enter Email"
                    className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent placeholder-white/20 transition-all"
                  />
                  {formData.Email && !validateEmail(formData.Email) && (
                    <p className="text-xs text-amber-300 ml-1">Must be a @licet.ac.in email</p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-blue-200 ml-1">Department</label>
                    <select
                      required
                      name="Department"
                      value={formData.Department}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent text-white appearance-none cursor-pointer"
                      style={{ backgroundImage: 'linear-gradient(45deg, transparent 50%, white 50%), linear-gradient(135deg, white 50%, transparent 50%)', backgroundPosition: 'calc(100% - 20px) calc(1em + 2px), calc(100% - 15px) calc(1em + 2px)', backgroundSize: '5px 5px, 5px 5px', backgroundRepeat: 'no-repeat' }}
                    >
                      <option value="" className="text-black">Select Dept</option>
                      {departments.map((dept) => (
                        <option key={dept} value={dept} className="text-black">
                          {dept}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-blue-200 ml-1">Year</label>
                    <select
                      required
                      name="Year"
                      value={formData.Year}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent text-white appearance-none cursor-pointer"
                      style={{ backgroundImage: 'linear-gradient(45deg, transparent 50%, white 50%), linear-gradient(135deg, white 50%, transparent 50%)', backgroundPosition: 'calc(100% - 20px) calc(1em + 2px), calc(100% - 15px) calc(1em + 2px)', backgroundSize: '5px 5px, 5px 5px', backgroundRepeat: 'no-repeat' }}
                    >
                      <option value="" className="text-black">Select Year</option>
                      {years.map((year) => (
                        <option key={year} value={year} className="text-black">
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-blue-200 ml-1">Phone Number (Optional)</label>
                  <input
                    type="tel"
                    name="Phone"
                    value={formData.Phone}
                    onChange={handleChange}
                    placeholder="Enter Phone Number"
                    className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent placeholder-white/20 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-blue-200 ml-1">Expectations from the event</label>
                  <textarea
                    required
                    name="Expectations"
                    value={formData.Expectations}
                    onChange={handleChange}
                    rows={3}
                    placeholder="I want to learn about..."
                    className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent placeholder-white/20 transition-all resize-none"
                  />
                </div>

                {error && (
                  <div className="p-3 rounded-lg bg-red-500/20 border border-red-500/50 text-red-100 text-sm">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 px-6 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 transform hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Registering...
                    </span>
                  ) : (
                    "Confirm Registration"
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Right Column - Event & Speaker Info */}
          <div className="space-y-8 order-1 lg:order-2">

            {/* Glass Card for Speaker */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                  <div className="relative h-28 w-28 shrink-0">
                    <div className="absolute inset-0 bg-blue-500 rounded-full opacity-20 blur-lg"></div>
                    <Image
                      src="/Gabriel.png"
                      alt="Gabriel Antony Xaviour"
                      fill
                      className="rounded-full object-cover border-2 border-white/30 shadow-2xl"
                    />
                  </div>
                  <div className="text-center sm:text-left space-y-1">
                    <h3 className="text-xl font-bold text-white">Gabriel Antony Xaviour</h3>
                    <p className="text-blue-300 text-sm font-medium leading-relaxed">
                      Head of Web3 + Improving productivity by building AI automation pipelines @ <span className="text-white">Rax Tech</span>
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-white/10 space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 h-2 w-2 rounded-full bg-blue-400 shrink-0"></div>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      Founding 2 other startups in Dubai and Chennai.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 h-2 w-2 rounded-full bg-blue-400 shrink-0"></div>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      Previously worked at <a href="https://www.rpslabs.io" target="_blank" className="text-blue-300 hover:underline">rpslabs.io</a>, <a href="https://www.marlin.org" target="_blank" className="text-blue-300 hover:underline">marlin.org</a>, <a href="https://juxtamode.com" target="_blank" className="text-blue-300 hover:underline">juxtamode.com</a> for software/web3 development roles.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 h-2 w-2 rounded-full bg-yellow-400 shrink-0 animate-pulse"></div>
                    <p className="text-sm font-semibold text-yellow-100 leading-relaxed">
                      70x Hackathon Wins 🏆
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:hidden mt-8 text-center text-blue-300 text-sm">
              <p>Event organized by IEEE Student Branch</p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
