import React, { useState } from "react";
import { Link } from "react-router-dom";

// MediatorPage.jsx
// Single-file React component (TailwindCSS assumed to be available in the project)
// - playful, child-friendly mediator page
// - two large choices: Login as Teacher, Login as Student
// - decorative student photos in the background
// - accessible, responsive, and easy to customize

export default function MediatorPage() {
  const [mode, setMode] = useState(null); // 'teacher' | 'student' | null
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [teacher,setTeacher]=useState(false);
  function openLogin(type) {
    setMode(type);
    setEmail("");
    setPassword("");
  }

  function closeModal() {
    setMode(null);
  }

  function submitLogin(e) {
    e.preventDefault();
    // Replace with real auth handling (Firebase, API call, emailjs, etc.)
    alert(`Logging in as ${mode === "teacher" ? "Teacher" : "Student"}: ${email}`);
    closeModal();
  }
  function manage(){
    setTeacher(true)
    openLogin("teacher")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Background student photos (decorative) */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-10 -top-10 w-72 h-72 rounded-3xl overflow-hidden opacity-40 transform rotate-6 filter blur-sm">
          <img
            alt="students-1"
            src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=60"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="absolute right-6 top-10 w-80 h-80 rounded-3xl overflow-hidden opacity-35 transform rotate-12 filter blur-sm">
          <img
            alt="students-2"
            src="https://images.unsplash.com/photo-1533670801985-70a0b2637d35?auto=format&fit=crop&w=900&q=60"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="absolute left-1/2 bottom-6 -translate-x-1/2 w-96 h-64 rounded-3xl overflow-hidden opacity-30 transform rotate-3 filter blur-sm">
          <img
            alt="students-3"
            src="https://images.unsplash.com/photo-1589571894960-20bbe2828a45?auto=format&fit=crop&w=1000&q=60"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <header className="py-10 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-800 drop-shadow-sm">
          Welcome to Learning Corner
        </h1>
        <p className="mt-2 text-indigo-600 max-w-xl mx-auto">
          Choose how you'd like to enter — simple and safe for kids. 🎒✨
        </p>
      </header>

      <main className="flex justify-center px-6">
        <div className="w-full max-w-4xl bg-white/80 rounded-2xl shadow-xl backdrop-blur-sm p-8 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Teacher Card */}
          <div className="flex flex-col items-center text-center p-6 rounded-xl border-2 border-dashed border-indigo-100 hover:scale-105 transition-transform bg-gradient-to-br from-white to-indigo-50">
            <div className="w-28 h-28 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-3xl font-bold shadow-inner">
              T
            </div>
            <h2 className="mt-4 text-xl font-semibold text-indigo-800">Login as Teacher</h2>
            <p className="mt-2 text-sm text-indigo-600">Manage classes, create assignments, and support students.</p>
            <button
              onClick={manage }
              className="mt-6 px-6 py-2 rounded-full bg-indigo-600 text-white font-medium hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-200"
              aria-label="Login as Teacher"
            >
              Teacher Login
            </button>
          </div>

          {/* Student Card */}
          <div className="flex flex-col items-center text-center p-6 rounded-xl border-2 border-dashed border-pink-100 hover:scale-105 transition-transform bg-gradient-to-br from-white to-pink-50">
            <div className="w-28 h-28 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 text-3xl font-bold shadow-inner">
              S
            </div>
            <h2 className="mt-4 text-xl font-semibold text-pink-800">Login as Student</h2>
            <p className="mt-2 text-sm text-pink-600">Access learning materials, take quizzes, and have fun learning!</p>
            <button
              onClick={() => openLogin("student")}
              className="mt-6 px-6 py-2 rounded-full bg-pink-600 text-white font-medium hover:bg-pink-700 focus:outline-none focus:ring-4 focus:ring-pink-200"
              aria-label="Login as Student"
            >
              Student Login
            </button>
          </div>

          {/* Extra friendly tip area (spans both columns) */}
          <div className="md:col-span-2 mt-4 text-center">
            <p className="text-sm text-gray-600">Tip: For younger children, use simple emails like <span className="font-medium">name@school.com</span> or a class code. Keep passwords easy to remember (then update later).</p>
          </div>
        </div>
      </main>

      {/* Modal for login */}
      {mode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/40" onClick={closeModal} aria-hidden="true" />

          <form
            onSubmit={submitLogin}
            className="relative max-w-md w-full bg-white rounded-2xl p-6 shadow-2xl z-10"
            role="dialog"
            aria-modal="true"
            aria-labelledby="login-title"
          >
            <h3 id="login-title" className="text-2xl font-bold text-gray-800">
              {mode === "teacher" ? "Teacher Login" : "Student Login"}
            </h3>
            <p className="text-sm text-gray-500 mt-1">Enter your credentials to continue</p>

            <label className="block mt-4 text-sm">
              <span className="text-gray-700">Email</span>
              <input
                type="email"
                required
                className="mt-1 block w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-200"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={mode === "teacher" ? "teacher@school.com" : "name@student.com"}
                aria-label="email"
              />
            </label>

            <label className="block mt-3 text-sm">
              <span className="text-gray-700">Password</span>
              <input
                type="password"
                required
                className="mt-1 block w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-200"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                aria-label="password"
              />
            </label>

            <div className="mt-6 flex items-center justify-between">
              <Link to={teacher ? "/Teacher" : "/Student"} className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700">
                Continue
              </Link>

              <button type="button" onClick={closeModal} className="text-sm text-gray-500 hover:underline">
                Cancel
              </button>
            </div>

            {/* small decorative footer */}
            <div className="mt-4 text-xs text-gray-400">This demo does not store credentials — replace alert(...) with your auth flow.</div>
          </form>
        </div>
      )}

      <footer className="py-8 text-center text-xs text-gray-500">
        Built with care for kids — adjust images and text to suit your school or brand.
      </footer>
    </div>
  );
}
