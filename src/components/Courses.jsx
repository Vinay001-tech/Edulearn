// import React, { useState } from "react";

// const courseData = {
//   1: ["Math Basics", "English Reading", "Fun Science"],
//   2: ["Math Addition & Subtraction", "English Writing", "Nature Studies"],
//   3: ["Multiplication & Division", "Grammar Basics", "Environmental Science"],
//   4: ["Fractions & Decimals", "Creative Writing", "General Science"],
//   5: ["Geometry", "Literature", "Intro to Science"],
//   6: ["Algebra Basics", "World History", "Life Science"],
//   7: ["Pre-Algebra", "Geography", "Physics Intro"],
//   8: ["Algebra I", "Chemistry Intro", "Biology"],
//   9: ["Algebra II", "World Literature", "Physics"],
//   10: ["Trigonometry", "Biology", "Civics"],
//   11: ["PCM: Physics, Chemistry, Math", "PCB: Physics, Chemistry, Bio", "Commerce", "Arts"],
//   12: ["PCM: Physics, Chemistry, Math", "PCB: Physics, Chemistry, Bio", "Commerce", "Arts"],
// };

// export default function Courses() {
//   const [selectedClass, setSelectedClass] = useState(null);

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <h1 className="text-3xl font-bold text-center mb-6">Courses by Class</h1>

//       {/* Class selector */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
//         {Object.keys(courseData).map((cls) => (
//           <button
//             key={cls}
//             onClick={() => setSelectedClass(cls)}
//             className={`p-4 rounded-xl shadow-md font-semibold transition ${
//               selectedClass === cls
//                 ? "bg-blue-600 text-white"
//                 : "bg-white hover:bg-blue-100"
//             }`}
//           >
//             Class {cls}
//           </button>
//         ))}
//       </div>

//       {/* Courses list */}
//       {selectedClass && (
//         <div className="bg-white rounded-lg shadow-md p-6 max-w-xl mx-auto">
//           <h2 className="text-2xl font-semibold mb-4 text-center">
//             Courses for Class {selectedClass}
//           </h2>
//           <ul className="space-y-2">
//             {courseData[selectedClass].map((course, index) => (
//               <li
//                 key={index}
//                 className="p-3 bg-blue-50 rounded-md hover:bg-blue-100 transition"
//               >
//                 {course}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }




import React, { useState } from "react";
import { FaBookOpen, FaChalkboardTeacher, FaFlask, FaGlobe } from "react-icons/fa";

const courseData = {
  1: ["English","Punjabi","Maths","EVS","Hindi"],
  2: ["Mathematics ", "English ", "Punjabi","EVS ","Hindi","Life skills"],
  3: ["Mathematics ", "English ", "Punjabi","EVS ","Hindi","Life skills"],
  4: ["Mathematics ", "English ", "Punjabi","EVS ","Hindi","Value Education"],
  5: ["Mathematics ", "English ", "Punjabi","EVS","","Health and Physical Education/Welcome Life"],
  6: ["Mathematics ", "English ", "Punjabi","Science ","Social Science","Sanskrit"],
  7: ["Mathematics ", "English ", "Punjabi","Science ","Social Science","Sanskrit"],
  8: ["Mathematics ", "English ", "Punjabi","Science ","Social Science","Sanskrit"],
  9: ["Mathematics ", "English ", "Punjabi","Science ","Social Science","Sanskrit"],
  10:["Mathematics ", "English ", "Punjabi","Science ","Social Science","Sanskrit"],
  11: ["PCM: Physics, Chemistry, Math", "PCB: Physics, Chemistry, Bio", "Commerce", "Arts"],
  12: ["PCM: Physics, Chemistry, Math", "PCB: Physics, Chemistry, Bio", "Commerce", "Arts"],
};

const icons = [FaBookOpen, FaChalkboardTeacher, FaFlask, FaGlobe];

export default function Courses() {
  const [selectedClass, setSelectedClass] = useState(null);
  const [search, setSearch] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 p-8">
      <h1 className="text-4xl font-extrabold text-center mb-6 text-blue-700 drop-shadow-lg">
        📚 Explore Courses by Class
      </h1>

      {/* Search Bar */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search Class..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-3 w-full max-w-md rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Class Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-10">
        {Object.keys(courseData)
          .filter((cls) => cls.includes(search))
          .map((cls) => (
            <button
              key={cls}
              onClick={() => setSelectedClass(cls)}
              className={`p-5 rounded-2xl shadow-md font-bold transition-all duration-300 transform hover:scale-105 ${
                selectedClass === cls
                  ? "bg-blue-600 text-white"
                  : "bg-white hover:bg-blue-100 text-blue-700"
              }`}
            >
              Class {cls}
            </button>
          ))}
      </div>

      {/* Courses List */}
      {selectedClass && (
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto transition-all duration-500">
          <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">
            Courses for Class {selectedClass}
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {courseData[selectedClass].map((course, index) => {
              const Icon = icons[index % icons.length];
              return (
                <li
                  key={index}
                  className="flex items-center p-4 bg-blue-50 rounded-xl shadow hover:bg-blue-100 transition transform hover:scale-105"
                >
                  <Icon className="text-blue-600 text-2xl mr-3" />
                  <span className="font-medium">{course}</span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
