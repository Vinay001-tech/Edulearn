import React, { useEffect, useRef, useState } from "react";
import Plot from "react-plotly.js";
import {
  Camera,
  Edit2,
  Star,
  Flame,
  Award,
  Timer as TimerIcon,
  MessageCircle,
  BookOpen,
  Laptop,
  Users,
  BarChart2,
} from "lucide-react";

/* ---------- Small reusable Progress Ring ---------- */
function ProgressRing({ size = 80, stroke = 8, progress = 0, label = "" }) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-1">
      <svg width={size} height={size} className="block">
        <defs>
          <linearGradient id="g1" x1="0" x2="1">
            <stop offset="0%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>

        <g transform={`translate(${size / 2}, ${size / 2})`}>
          <circle
            r={radius}
            fill="transparent"
            stroke="#e6e6e6"
            strokeWidth={stroke}
            strokeLinecap="round"
          />
          <circle
            r={radius}
            fill="transparent"
            stroke="url(#g1)"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={offset}
            transform="rotate(-90)"
          />
        </g>
      </svg>
      <div className="text-sm font-semibold">{progress}%</div>
      {label && <div className="text-xs text-gray-500">{label}</div>}
    </div>
  );
}

/* ---------- App ---------- */
export default function App() {
  // initial student state (persisted)
  const [student, setStudent] = useState(() => {
    try {
      const raw = localStorage.getItem("nabha_student_v4");
      if (raw) return JSON.parse(raw);
    } catch (err) {
      console.error(err);
    }
    return {
      name: "Aman",
      class: "10th",
      language: "english",
      totalPoints: 1250,
      streak: 7,
      achievements: 3,
      avatarDataUrl: null,
      // progress (moved to profile charts)
      academicProgress: {
        Mathematics: 85,
        Science: 78,
        English: 90,
        "Social Studies": 70,
      },
      digitalProgress: {
        "Computer Basics": 90,
        "Internet Safety": 75,
        "Email Skills": 85,
        "Digital Payments": 65,
      },
      // gamification
      level: 3,
      xp: 350,
      xpPerLevel: 500,
      nextBadge: "Silver Learner",
      // completed materials set (ids)
      completedMaterials: [],
      // Study materials for Academics & Digital (IDs unique)
      studyMaterials: {
        Academics: {
          Mathematics: [
            { id: "m-math-1", title: "Algebra — Basics", type: "Video", duration: "12:30" },
            { id: "m-math-2", title: "Geometry — Angles", type: "PDF", duration: "8 pages" },
          ],
          Science: [
            { id: "m-sci-1", title: "Cell Structure", type: "Video", duration: "10:00" },
            { id: "m-sci-2", title: "Forces & Motion", type: "PDF", duration: "6 pages" },
          ],
          English: [
            { id: "m-eng-1", title: "Grammar Practice", type: "Quiz", duration: "10 Qs" },
            { id: "m-eng-2", title: "Reading Comprehension", type: "PDF", duration: "5 pages" },
          ],
          "Social Studies": [
            { id: "m-soc-1", title: "Indian Polity Overview", type: "Video", duration: "15:00" },
          ],
        },
        Digital: {
          "Computer Basics": [
            { id: "d-cb-1", title: "Parts of Computer", type: "Video", duration: "7:00" },
            { id: "d-cb-2", title: "Using Keyboard & Mouse", type: "PDF", duration: "4 pages" },
          ],
          "Internet Safety": [
            { id: "d-is-1", title: "Safe Passwords", type: "Video", duration: "5:00" },
            { id: "d-is-2", title: "Avoid Scams", type: "Quiz", duration: "8 Qs" },
          ],
          "Email Skills": [
            { id: "d-email-1", title: "Create & Send Email", type: "Video", duration: "6:30" },
          ],
          "Digital Payments": [
            { id: "d-pay-1", title: "UPI Basics", type: "Video", duration: "9:00" },
          ],
        },
      },
    };
  });

  // persist student -> localStorage
  useEffect(() => {
    try {
      localStorage.setItem("nabha_student_v4", JSON.stringify(student));
    } catch (err) {
      console.error(err);
    }
  }, [student]);

  // timer logic
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  useEffect(() => {
    let id;
    if (isRunning) id = setInterval(() => setTimer((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, [isRunning]);

  // AI assistant placeholder
  const [aiInput, setAiInput] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const askAI = () => {
    if (!aiInput.trim()) return;
    setAiResponse("Thinking... 🤔");
    setTimeout(() => {
      setAiResponse(`AI Answer: "${aiInput}" — Try breaking the topic into small tasks and practice daily.`);
    }, 900);
    setAiInput("");
  };

  // UI control
  const [activeTab, setActiveTab] = useState("profile"); // single middle tab bar
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editForm, setEditForm] = useState({
    name: student.name,
    class: student.class,
    language: student.language,
  });

  // keep edit form synced
  useEffect(() => {
    setEditForm({ name: student.name, class: student.class, language: student.language });
  }, [isEditingProfile, student.name, student.class, student.language]);

  // avatar upload
  const fileRef = useRef(null);
  const handleAvatarInput = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => {
      setStudent((s) => ({ ...s, avatarDataUrl: reader.result }));
    };
    reader.readAsDataURL(f);
  };

  const saveProfile = () => {
    setStudent((s) => ({
      ...s,
      name: editForm.name || s.name,
      class: editForm.class || s.class,
      language: editForm.language || s.language,
    }));
    setIsEditingProfile(false);
  };

  // derived progress
  const overallAcademicAvg =
    Object.values(student.academicProgress).reduce((a, b) => a + b, 0) /
    Object.values(student.academicProgress).length;
  const overallDigitalAvg =
    Object.values(student.digitalProgress).reduce((a, b) => a + b, 0) /
    Object.values(student.digitalProgress).length;
  const overallProgress = Math.round((overallAcademicAvg + overallDigitalAvg) / 2);

  // gamification helpers
  const earnXP = (amount) => {
    setStudent((s) => {
      const newXpTotal = s.xp + amount;
      if (newXpTotal >= s.xpPerLevel) {
        const leftover = newXpTotal - s.xpPerLevel;
        return {
          ...s,
          level: s.level + 1,
          xp: leftover,
          totalPoints: s.totalPoints + amount,
          achievements: s.achievements + 1,
        };
      }
      return { ...s, xp: newXpTotal, totalPoints: s.totalPoints + amount };
    });
  };

  const completeQuiz = (correct = 3) => {
    const xpAward = correct * 20;
    earnXP(xpAward);
  };

  // study material completion
  const isCompleted = (id) => student.completedMaterials.includes(id);
  const markComplete = (id, xpAward = 40, pointsAward = 10) => {
    if (isCompleted(id)) return;
    setStudent((s) => ({ ...s, completedMaterials: [...s.completedMaterials, id], totalPoints: s.totalPoints + pointsAward }));
    // award XP separately
    earnXP(xpAward);
  };

  // helpers
  const formatTime = (seconds) => {
    const mm = Math.floor(seconds / 60);
    const ss = seconds % 60;
    return `${mm}:${String(ss).padStart(2, "0")}`;
  };

  // study material selection state for detail panel
  const [selectedMaterial, setSelectedMaterial] = useState(null);

  // texts
  const text = {
    english: {
      profile: "Student Profile",
      academics: "Academics",
      digital: "Digital Skills",
      ai: "AI Helper",
      progress: "Progress",
      community: "Community",
      editProfile: "Edit Profile",
      uploadPhoto: "Upload Photo",
      save: "Save",
      cancel: "Cancel",
      timer: "Study Timer",
      streak: "Study Streak",
    },
    hindi: {
      profile: "छात्र प्रोफ़ाइल",
      academics: "शैक्षणिक",
      digital: "डिजीटल स्किल",
      ai: "एआई सहायक",
      progress: "प्रगति",
      community: "समुदाय",
      editProfile: "प्रोफ़ाइल संपादित करें",
      uploadPhoto: "फ़ोटो अपलोड करें",
      save: "सहेजें",
      cancel: "रद्द करें",
      timer: "अध्ययन टाइमर",
      streak: "अध्ययन श्रृंखला",
    },
    punjabi: {
      profile: "ਵਿਦਿਆਰਥੀ ਪ੍ਰੋਫ਼ਾਈਲ",
      academics: "ਅਕਾਦਮਿਕ",
      digital: "ਡਿਜੀਟਲ ਸਕਿਲ",
      ai: "ਏਆਈ ਸਹਾਇਕ",
      progress: "ਤਰੱਕੀ",
      community: "ਕਮਿਊਨਿਟੀ",
      editProfile: "ਪ੍ਰੋਫਾਈਲ ਸੋਧੋ",
      uploadPhoto: "ਫੋਟੋ ਅਪਲੋਡ ਕਰੋ",
      save: "ਸੰਭਾਲੋ",
      cancel: "ਰੱਦ",
      timer: "ਅਧਿਐਨ ਟਾਈਮਰ",
      streak: "ਅਧਿਐਨ ਸਿਲਸਿਲਾ",
    },
  };
  const t = text[student.language] || text.english;

  /* ---------- UI ---------- */
  return (
    <div className="min-h-screen bg-gray-50">
      {/* header (minimal) */}
      <header className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xl font-bold">Student Dashboard</div>
              <div className="text-sm text-gray-500">Nabha Rural Learning Hub</div>
            </div>
            <div className="text-sm text-gray-500">Welcome, {student.name}</div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        {/* PROFILE HEADER (with avatar, totals, overall progress & charts) */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white rounded-2xl p-6 shadow-lg">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-center gap-4">
              <div
                className="relative cursor-pointer"
                onClick={() => fileRef.current?.click()}
                style={{ width: 96, height: 96 }}
              >
                <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center overflow-hidden ring-2 ring-white/30">
                  {student.avatarDataUrl ? (
                    <img src={student.avatarDataUrl} alt="avatar" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-2xl font-bold">{student.name?.[0] || "S"}</div>
                  )}
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    fileRef.current?.click();
                  }}
                  className="absolute bottom-0 right-0 bg-white text-indigo-700 rounded-full p-2 shadow-md -translate-y-1 translate-x-1"
                  title="Upload photo"
                >
                  <Camera size={16} />
                </button>
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarInput} />
              </div>

              <div>
                <div className="text-2xl font-bold">{student.name}</div>
                <div className="text-sm opacity-90">
                  Class: {student.class} • Language: {student.language.toUpperCase()}
                </div>
                <div className="mt-3 flex items-center gap-3">
                  <button
                    onClick={() => setIsEditingProfile(true)}
                    className="px-3 py-1 bg-white/20 backdrop-blur rounded-md flex items-center gap-2 text-sm hover:bg-white/30"
                  >
                    <Edit2 size={14} /> {t.editProfile}
                  </button>
                </div>
              </div>
            </div>

            {/* right side summary cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full md:w-auto">
              <div className="bg-white/90 rounded-xl p-4 text-gray-800 shadow flex flex-col">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium"><Star size={16} /> Points</div>
                  <div className="text-lg font-bold">{student.totalPoints}</div>
                </div>
                <div className="text-xs text-gray-500 mt-1">Total points</div>
              </div>

              <div className="bg-white/90 rounded-xl p-4 text-gray-800 shadow flex flex-col">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium"><Flame size={16} /> Days</div>
                  <div className="text-lg font-bold">{student.streak}</div>
                </div>
                <div className="text-xs text-gray-500 mt-1">Study streak</div>
              </div>

              <div className="bg-white/90 rounded-xl p-4 text-gray-800 shadow flex flex-col">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium"><Award size={16} /> Achievements</div>
                  <div className="text-lg font-bold">{student.achievements}</div>
                </div>
                <div className="text-xs text-gray-500 mt-1">Badges earned</div>
              </div>

              <div className="bg-white/90 rounded-xl p-4 text-gray-800 shadow flex items-center justify-center">
                <ProgressRing size={64} stroke={8} progress={overallProgress} label="Overall" />
              </div>
            </div>
          </div>
        </div>

        {/* middle tab bar only */}
        <div className="bg-white rounded-2xl p-3 shadow">
          <div className="flex items-center gap-2 overflow-x-auto">
            {[
              { id: "profile", label: t.profile, icon: <BookOpen /> },
              { id: "academics", label: t.academics, icon: <BookOpen /> },
              { id: "digital", label: t.digital, icon: <Laptop /> },
              { id: "ai", label: t.ai, icon: <MessageCircle /> },
              { id: "progress", label: t.progress, icon: <BarChart2 /> },
              { id: "community", label: t.community, icon: <Users /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setSelectedMaterial(null);
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm ${
                  activeTab === tab.id ? "bg-indigo-600 text-white" : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ---------- CONTENT ---------- */}
        <section>
          {/* PROFILE: now contains both charts (Academic bar + Digital pie) */}
          {activeTab === "profile" && (
            <div className="grid md:grid-cols-3 gap-6">
              {/* left: details + timer + streak */}
              <div className="bg-white rounded-2xl p-6 shadow">
                <h3 className="font-semibold mb-3">{t.profile}</h3>
                <div className="space-y-2">
                  <div><b>{t.profile}:</b> {student.name}</div>
                  <div><b>Class:</b> {student.class}</div>
                  <div><b>Language:</b> {student.language}</div>
                </div>

                <div className="mt-6">
                  <h4 className="font-medium mb-2"><TimerIcon className="inline mr-2" /> {t.timer}</h4>
                  <div className="text-2xl font-bold">{formatTime(timer)}</div>
                  <div className="mt-3 flex items-center gap-2">
                    <button onClick={() => setIsRunning(true)} className="px-3 py-1 bg-green-600 text-white rounded">▶ Start</button>
                    <button onClick={() => setIsRunning(false)} className="px-3 py-1 bg-yellow-500 text-white rounded">⏸ Pause</button>
                    <button onClick={() => { setIsRunning(false); setTimer(0); }} className="px-3 py-1 bg-red-500 text-white rounded">🔁 Reset</button>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="font-medium mb-2">🔥 {t.streak}</h4>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold">{student.streak} days</div>
                    <div className="flex gap-2">
                      <button onClick={() => setStudent(s => ({ ...s, streak: s.streak + 1 }))} className="px-3 py-1 bg-orange-500 text-white rounded">+1</button>
                      <button onClick={() => setStudent(s => ({ ...s, streak: Math.max(1, s.streak - 1) }))} className="px-3 py-1 bg-gray-200 rounded">-</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* middle: Academic & Digital charts */}
              <div className="md:col-span-2 space-y-4">
                <div className="bg-white rounded-2xl p-4 shadow">
                  <h4 className="font-semibold mb-2">Academic Progress (Analytics)</h4>
                  <Plot
                    data={[
                      {
                        type: "bar",
                        x: Object.keys(student.academicProgress),
                        y: Object.values(student.academicProgress),
                        marker: { color: "rgb(79,70,229)" },
                      },
                    ]}
                    layout={{
                      margin: { t: 40, l: 40, r: 20, b: 60 },
                      yaxis: { range: [0, 100], title: "Progress (%)" },
                      xaxis: { title: "Subjects" },
                      height: 300,
                    }}
                    config={{ responsive: true }}
                  />
                </div>

                <div className="bg-white rounded-2xl p-4 shadow">
                  <h4 className="font-semibold mb-2">Digital Skills (Analytics)</h4>
                  <Plot
                    data={[
                      {
                        type: "pie",
                        labels: Object.keys(student.digitalProgress),
                        values: Object.values(student.digitalProgress),
                        textinfo: "label+percent",
                        marker: { colors: ["#6366f1", "#a855f7", "#3b82f6", "#06b6d4"] },
                      },
                    ]}
                    layout={{ margin: { t: 40, l: 20, r: 20, b: 20 }, height: 300 }}
                    config={{ responsive: true }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* ACADEMICS: study materials (no progress here) */}
          {activeTab === "academics" && (
            <div className="bg-white rounded-2xl p-6 shadow">
              <h3 className="font-semibold mb-4">Academics — Study Material</h3>

              <div className="grid md:grid-cols-4 gap-4">
                <div className="md:col-span-2">
                  {Object.entries(student.studyMaterials.Academics).map(([subject, materials]) => (
                    <div key={subject} className="mb-4">
                      <div className="font-medium mb-2">{subject}</div>
                      <div className="grid gap-3">
                        {materials.map((m) => (
                          <div key={m.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                            <div>
                              <div className="font-medium">{m.title}</div>
                              <div className="text-xs text-gray-500">{m.type} • {m.duration}</div>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => setSelectedMaterial(m)}
                                className="px-3 py-1 bg-blue-600 text-white rounded"
                              >
                                Start
                              </button>
                              <button
                                onClick={() => markComplete(m.id)}
                                className={`px-3 py-1 rounded ${isCompleted(m.id) ? "bg-green-400 text-white" : "bg-gray-200"}`}
                              >
                                {isCompleted(m.id) ? "Completed" : "Mark Complete"}
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* right detail panel */}
                <div className="bg-gray-50 p-4 rounded">
                  <div className="font-semibold mb-2">Material Details</div>
                  {selectedMaterial ? (
                    <div>
                      <div className="font-medium">{selectedMaterial.title}</div>
                      <div className="text-sm text-gray-600">{selectedMaterial.type} • {selectedMaterial.duration}</div>
                      <div className="mt-3">
                        <button onClick={() => markComplete(selectedMaterial.id)} className={`px-3 py-1 rounded ${isCompleted(selectedMaterial.id) ? "bg-green-400 text-white" : "bg-indigo-600 text-white"}`}>
                          {isCompleted(selectedMaterial.id) ? "Already Completed" : "Mark Complete & Earn XP"}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-sm text-gray-600">Select a study material to see details</div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* DIGITAL: study materials (no progress here) */}
          {activeTab === "digital" && (
            <div className="bg-white rounded-2xl p-6 shadow">
              <h3 className="font-semibold mb-4">Digital Skills — Study Material</h3>

              <div className="grid md:grid-cols-4 gap-4">
                <div className="md:col-span-2">
                  {Object.entries(student.studyMaterials.Digital).map(([module, materials]) => (
                    <div key={module} className="mb-4">
                      <div className="font-medium mb-2">{module}</div>
                      <div className="grid gap-3">
                        {materials.map((m) => (
                          <div key={m.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                            <div>
                              <div className="font-medium">{m.title}</div>
                              <div className="text-xs text-gray-500">{m.type} • {m.duration}</div>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => setSelectedMaterial(m)}
                                className="px-3 py-1 bg-blue-600 text-white rounded"
                              >
                                Start
                              </button>
                              <button
                                onClick={() => markComplete(m.id)}
                                className={`px-3 py-1 rounded ${isCompleted(m.id) ? "bg-green-400 text-white" : "bg-gray-200"}`}
                              >
                                {isCompleted(m.id) ? "Completed" : "Mark Complete"}
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* right detail panel */}
                <div className="bg-gray-50 p-4 rounded">
                  <div className="font-semibold mb-2">Material Details</div>
                  {selectedMaterial ? (
                    <div>
                      <div className="font-medium">{selectedMaterial.title}</div>
                      <div className="text-sm text-gray-600">{selectedMaterial.type} • {selectedMaterial.duration}</div>
                      <div className="mt-3">
                        <button onClick={() => markComplete(selectedMaterial.id)} className={`px-3 py-1 rounded ${isCompleted(selectedMaterial.id) ? "bg-green-400 text-white" : "bg-indigo-600 text-white"}`}>
                          {isCompleted(selectedMaterial.id) ? "Already Completed" : "Mark Complete & Earn XP"}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-sm text-gray-600">Select a study material to see details</div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* AI Helper */}
          {activeTab === "ai" && (
            <div className="bg-white rounded-2xl p-6 shadow">
              <h3 className="font-semibold mb-4">AI Helper</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <input value={aiInput} onChange={(e) => setAiInput(e.target.value)} placeholder="Ask your doubt..." className="w-full border p-3 rounded" />
                  <div className="mt-3">
                    <button onClick={askAI} className="px-4 py-2 bg-indigo-600 text-white rounded">Ask AI</button>
                  </div>
                  {aiResponse && <div className="mt-3 p-3 bg-gray-50 border rounded">{aiResponse}</div>}
                </div>

                <div>
                  <h4 className="font-medium mb-2">Tips</h4>
                  <ul className="list-disc ml-5 text-sm text-gray-600 space-y-1">
                    <li>Ask specific questions.</li>
                    <li>Share steps you've tried.</li>
                    <li>AI can help plan study sessions.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Progress tab: gamified learning */}
          {activeTab === "progress" && (
            <div className="bg-white rounded-2xl p-6 shadow">
              <h3 className="font-semibold mb-4">Progress Dashboard & Gamified Learning</h3>

              <Plot
                data={[
                  {
                    type: "scatter",
                    mode: "lines+markers",
                    x: ["Academic", "Digital", "Overall"],
                    y: [Math.round(overallAcademicAvg), Math.round(overallDigitalAvg), overallProgress],
                    marker: { color: "rgb(147,51,234)", size: 8 },
                    line: { color: "rgb(99,102,241)", width: 3 },
                  },
                ]}
                layout={{ title: "Progress Analytics", yaxis: { range: [0, 100], title: "Progress (%)" }, height: 320 }}
                config={{ responsive: true }}
              />

              <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-gray-500">Gamified Learning</div>
                    <div className="text-lg font-bold">Level {student.level}</div>
                    <div className="text-sm text-gray-600">XP: {student.xp}/{student.xpPerLevel}</div>
                    <div className="w-64 bg-white rounded-full h-3 mt-2 overflow-hidden">
                      <div style={{ width: `${(student.xp / student.xpPerLevel) * 100}%` }} className="h-3 bg-gradient-to-r from-indigo-500 to-cyan-400" />
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-sm text-gray-500">Next Badge</div>
                    <div className="font-medium">{student.nextBadge}</div>
                    <div className="mt-3 flex flex-col items-end gap-2">
                      <button onClick={() => earnXP(50)} className="px-3 py-1 bg-green-600 text-white rounded">Earn 50 XP</button>
                      <button onClick={() => completeQuiz(4)} className="px-3 py-1 bg-yellow-500 text-white rounded">Complete Quick Quiz</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Community */}
          {activeTab === "community" && (
            <div className="bg-white rounded-2xl p-6 shadow">
              <h3 className="font-semibold mb-4">Community</h3>
              <p className="text-gray-600">Join discussions, share notes, and collaborate with classmates. Coming soon.</p>
            </div>
          )}
        </section>
      </main>

      {/* EDIT PROFILE MODAL */}
      {isEditingProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-lg">
            <h3 className="font-semibold mb-4">{t.editProfile}</h3>

            <div className="space-y-3">
              <label className="block text-sm">Name</label>
              <input value={editForm.name} onChange={(e) => setEditForm((f) => ({ ...f, name: e.target.value }))} className="w-full border p-2 rounded" />

              <label className="block text-sm">Class</label>
              <input value={editForm.class} onChange={(e) => setEditForm((f) => ({ ...f, class: e.target.value }))} className="w-full border p-2 rounded" />

              <label className="block text-sm">Language</label>
              <select value={editForm.language} onChange={(e) => setEditForm((f) => ({ ...f, language: e.target.value }))} className="w-full border p-2 rounded">
                <option value="english">English</option>
                <option value="hindi">हिन्दी</option>
                <option value="punjabi">ਪੰਜਾਬੀ</option>
              </select>

              <label className="block text-sm">Upload Photo</label>
              <div className="flex items-center gap-3">
                <button onClick={() => fileRef.current?.click()} className="px-3 py-1 bg-gray-100 rounded border">{t.uploadPhoto}</button>
                <div className="text-sm text-gray-500">{student.avatarDataUrl ? "Photo selected" : "No photo"}</div>
              </div>

              <div className="mt-4 flex justify-end gap-2">
                <button onClick={() => setIsEditingProfile(false)} className="px-4 py-2 rounded bg-gray-100">{t.cancel}</button>
                <button onClick={saveProfile} className="px-4 py-2 rounded bg-indigo-600 text-white">{t.save}</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* footer */}
      <footer className="max-w-6xl mx-auto px-4 py-6 text-center text-sm text-gray-500">
        Made with ❤️ for Nabha Students — React + Tailwind + Plotly.js
      </footer>
    </div>
  );
}







// // src/App.jsx
// 


