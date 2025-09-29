import React from "react";
import { FaUserGraduate, FaLock, FaBookOpen, FaChartLine, FaComments, FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";

const guidelines= [
  {
    icon: <FaUserGraduate className="text-blue-600 text-5xl mx-auto mb-4" />,
    title: "Create an Account",
    desc: "Sign up with your email to start learning and exploring programs.",
  },
  {
    icon: <FaLock className="text-green-600 text-5xl mx-auto mb-4" />,
    title: "Login Securely",
    desc: "Use your registered email and password to access your dashboard.",
  },
  {
    icon: <FaBookOpen className="text-purple-600 text-5xl mx-auto mb-4" />,
    title: "Explore Programs",
    desc: "Choose from PCM, PCB, Commerce, Arts, and more exciting fields.",
  },
  {
    icon: <FaChartLine className="text-yellow-500 text-5xl mx-auto mb-4" />,
    title: "Track Progress",
    desc: "Monitor your achievements and stay motivated while learning.",
  },
  {
    icon: <FaComments className="text-pink-500 text-5xl mx-auto mb-4" />,
    title: "Ask Doubts",
    desc: "Get instant answers from our AI-powered assistant anytime.",
  },
  {
    icon: <FaUsers className="text-red-500 text-5xl mx-auto mb-4" />,
    title: "Be Respectful",
    desc: "Follow community rules, support peers, and avoid spamming.",
  },
];

const Guidelines= () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 py-12 px-6">
      <h1 className="text-5xl font-extrabold text-center text-blue-700 mb-10">
        📘 User Guidelines
      </h1>

      <p className="text-center text-lg text-gray-700 max-w-3xl mx-auto mb-12">
        Follow these simple steps to enjoy your learning journey with EduLearn.  
        Let’s make learning fun, safe, and productive together! 🚀
      </p>

      {/* Guidelines Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {guidelines.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-xl p-6 text-center hover:shadow-2xl transition"
          >
            {item.icon}
            <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
            <p className="text-gray-600">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Back Button */}
      <div className="mt-12 text-center">
        <Link to="/">
          <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-md hover:bg-blue-700 hover:shadow-lg transition">
            ⬅ Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Guidelines;
