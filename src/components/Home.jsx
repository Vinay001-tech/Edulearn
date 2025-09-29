import React, {  } from "react";
import img1 from '../assets/hero-students[1].jpg'
import img2 from '../assets/maths.jpg'
import img3 from '../assets/bio.jpg'
import img4 from '../assets/commerce.jpg'
import img5 from '../assets/computer.jpg'
import img6 from '../assets/agro.jpg'
import img7 from '../assets/arts.png'
import img8 from '../assets/activity.jpg'

import { Link } from "react-router-dom";


const programs = [
  { title: "PCM (Science)", desc: "Physics, Chemistry & Math program", img: img2},
  { title: "PCB (Medical)", desc: "Biology with Physics & Chemistry", img: img3 },
  { title: "Commerce", desc: "Accountancy, Business & Economics", img: img4 },
  { title: "Digital Literacy Module", desc: "Basic computer skill,Internet safety", img:img5},
  { title: "Agriculture Study", desc: "Student also need to know about agriculture", img:img6},
  { title: "Study of Arts", desc: "Exploring the important arts subject", img:img7},
  {title : "Extra Carricular Activities", desc: "Sports and other activities", img:img8}
];

const Homepage = () => {
  // const [currentIndex, setCurrentIndex] = useState(0);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentIndex((prev) => (prev + 1) % images.length);
  //   }, 3000);
  //   return () => clearInterval(interval);
  // }, []);

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 bg-blue-600 text-white shadow-md">
       
        <h1 className="text-2xl font-bold">EduLearn</h1>
        <ul className="flex gap-6 text-lg">
          <li className="hover:text-yellow-300 cursor-pointer">Home</li>
          
          <li>
  <Link to="/contact" className="hover:text-yellow-300 cursor-pointer">
    Contact
  </Link>
</li>  
          
          <li>
  <Link to="/Guidlines" className="hover:text-yellow-300 cursor-pointer">
    Guidlines
  </Link>
</li>
     <li>
  <Link to="/courses" className="hover:text-yellow-300 cursor-pointer">
    Courses
  </Link>
</li>     
<li>
  <Link to = "/signup" className="hover:text-yellow-300 cursor-pointer">
  Signup
  </Link>
</li>
          
        <li>
  <Link to="/mediator" className="hover:text-yellow-300 cursor-pointer">
    Login
  </Link>
</li>
        </ul>
      </nav>

         <div className="relative w-full h-[450px] overflow-hidden mt-2">
  {/* Background Image */}
  <img
    src={img1}
    alt="slide"
    className="w-full h-full object-cover transition-all duration-700"
  />

  {/* Fade Overlay */}
  <div className="absolute inset-0 bg-black/60"></div>

  {/* Text + Button */}
  <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
    <h1 className="text-3xl md:text-6xl font-bold mb-4">
      Welcome to Our Learning Platform
    </h1>
    <p className="mb-6 text-lg md:text-xl">
      Start your journey with fun and engaging lessons.
    </p>

    {/* <Link to="/Signup">
    <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg text-lg font-semibold shadow-lg"
          >
            Get Start
          </button> */}
          {/* <Link/> */}
          <div className="mt-6 text-center">
            <Link to="/Signup">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700">
                Get Started
              </button>
            </Link>
          </div>

  </div>
</div>


            {/* Tagline + Features Section */}
     
      <section className="text-center py-16 px-6 bg-white">
        <h2 className="text-4xl font-bold mb-6 text-gray-800">
          Learn Together, Grow Together
        </h2>
        <p className="max-w-3xl mx-auto text-gray-600 text-lg mb-10">
          Join a vibrant community powered by AI-enhanced learning tools.
          Get personalized study recommendations, instant doubt resolution,
          and collaborative learning experiences tailored to your needs.
        </p>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
          <div className="bg-gray-100 p-6 rounded-2xl shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-blue-600 mb-2">
              AI-powered Tutoring
            </h3>
            <p className="text-gray-700">
              Personalized guidance to boost your learning efficiency.
            </p>
          </div>
          <div className="bg-gray-100 p-6 rounded-2xl shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-blue-600 mb-2">
              Smart Doubt Resolution
            </h3>
            <p className="text-gray-700">
              Instant solutions to all your study queries.
            </p>
          </div>
          <div className="bg-gray-100 p-6 rounded-2xl shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-blue-600 mb-2">
              Adaptive Pathways
            </h3>
            <p className="text-gray-700">
              Learn at your own pace with tailored programs.
            </p>
          </div>
          <div className="bg-gray-100 p-6 rounded-2xl shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-blue-600 mb-2">
              24/7 AI Companion
            </h3>
            <p className="text-gray-700">
              Your study partner available anytime, anywhere.
            </p>
          </div>
        </div>
      </section>


      {/* Explore Programs */}
      <section className="px-8 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">
          Explore Our Programs
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.map((program, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition p-4 text-center"
            >
              <img
                src={program.img}
                alt={program.title}
                className="w-full h-40 object-cover rounded-xl mb-4"
              />
              <h3 className="text-xl font-semibold">{program.title}</h3>
              <p className="text-gray-600 mt-2">{program.desc}</p>
              <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700">
                Learn More
              </button>
            </div>
          ))}
        </div>
      </section>



  
      {/* About Our Website */}
      <section className="px-8 py-12 bg-gray-100 rounded-t-3xl">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-4">About Our Website</h2>
            <p className="text-gray-700 mb-4">
              EduLearn is a modern digital learning platform designed to help students and educators connect seamlessly. 
              We offer interactive courses, quizzes, progress tracking, and community discussions to make learning engaging and effective.
            </p>
            <p className="text-gray-700">
              Join thousands of learners across the globe and explore programs tailored to your interests in Science, Commerce, Arts, and more.
            </p>
          </div>
          <div className="md:w-1/2">
            <img
              src="https://images.pexels.com/photos/4145197/pexels-photo-4145197.jpeg"
              alt="students learning"
              className="rounded-2xl shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-600 text-white py-6 text-center mt-10">
        <p>© {new Date().getFullYear()} EduLearn. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Homepage;
