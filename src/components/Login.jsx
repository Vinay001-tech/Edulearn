// import React, { useState } from "react";
// import { motion } from "framer-motion";

// export default function Login() {
//   const [formData, setFormData] = useState({ email: "", password: "" });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     alert(`Welcome ${formData.email}`);
//   };

//   return (
//     <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
//       <motion.div
//         initial={{ opacity: 0, scale: 0.8, y: 50 }}
//         animate={{ opacity: 1, scale: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//         className="bg-white/20 backdrop-blur-xl p-8 rounded-2xl shadow-2xl w-[350px] max-w-md"
//       >
//         <h2 className="text-3xl font-bold text-white text-center mb-6">Login</h2>
//         <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//             className="px-4 py-2 rounded-xl bg-white/30 text-white placeholder-gray-200 outline-none focus:ring-2 focus:ring-yellow-300"
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//             className="px-4 py-2 rounded-xl bg-white/30 text-white placeholder-gray-200 outline-none focus:ring-2 focus:ring-yellow-300"
//           />
//           <button
//             type="submit"
//             className="bg-yellow-400 hover:bg-yellow-500 transition-all py-2 rounded-xl font-semibold text-gray-800"
//           >
//             Sign In
//           </button>
//         </form>
//         <p className="text-gray-200 text-sm mt-4 text-center">
//           Don’t have an account?{" "}
//           <a href="#" className="text-yellow-300 hover:underline">
//             Sign Up
//           </a>
//         </p>
//       </motion.div>
//     </div>
//   );
// }

import { Link } from "react-router-dom";
import React, { useState } from "react";
// import { Link } from "react-router-dom"; // for navigation

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Welcome ${formData.email}`);
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
      <div className="bg-white/20 backdrop-blur-xl p-8 rounded-2xl shadow-2xl w-[350px] max-w-md">
        <h2 className="text-3xl font-bold text-white text-center mb-6">Login</h2>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="px-4 py-2 rounded-xl bg-white/30 text-white placeholder-gray-200 outline-none focus:ring-2 focus:ring-yellow-300"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="px-4 py-2 rounded-xl bg-white/30 text-white placeholder-gray-200 outline-none focus:ring-2 focus:ring-yellow-300"
          />
          <button
            type="submit"
            className="bg-yellow-400 hover:bg-yellow-500 transition-all py-2 rounded-xl font-semibold text-gray-800"
          >
            Sign In
          </button>
        </form>

        <p className="text-gray-200 text-sm mt-4 text-center">
          Don’t have an account?{" "}
          <Link to="/Signup" className="text-yellow-300 hover:underline">
            Sign Up
          </Link>
        </p>

        {/* Back to Home button */}
        {/* <div className="mt-6 text-center">
          <a href="/Home.jsx"><button>Back to home</button></a>
        </div> */}
       

{/* Back to Home button */}
<div className="mt-6 text-center">
  <Link to="/">
    <button className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700">
      Back to Home
    </button>
  </Link>
</div>
      </div>
    </div>
  );
}
