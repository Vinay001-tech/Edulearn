import React, {useEffect, useState} from 'react'
import Sidebar from './component/Sidebar'
import Header from './component/Header'
import Modal from './component/Modal'
import Dashboard from './component/Dashboard'
import Analytics from './component/Analytics'

import Courses from './component/Courses'
import Students from './component/Students'
import Profile from './component/Profile'
import { S } from './utils/Storage'
import CreateCourse from './component/CreateCourse'
import QuizCreator from './component/QuizCreator'
import {
  teachers as seedTeachers,
  students as seedStudents,
  announcements as seedAnnouncements,
  courses as seedCourses,
  events as seedEvents,
  uploads as seedUploads   // <-- make sure this is present
} from './data/seed';

export default function App(){


// helper: return existing value if non-empty else seed and persist
function loadOrSeed(key, seedData) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      localStorage.setItem(key, JSON.stringify(seedData));
      return seedData;
    }
    const parsed = JSON.parse(raw);
    // if parsed is an array and empty, treat as missing and seed
    if (Array.isArray(parsed) && parsed.length === 0) {
      localStorage.setItem(key, JSON.stringify(seedData));
      return seedData;
    }
    // otherwise return parsed value (could be object or array with data)
    return parsed;
  } catch (e) {
    console.warn('loadOrSeed parse error', e);
    localStorage.setItem(key, JSON.stringify(seedData));
    return seedData;
  }
}

// load or seed
const [teachers, setTeachers] = useState(()=> S.get('edu_teachers', loadOrSeed('edu_teachers', seedTeachers)));
const [students, setStudents] = useState(()=> S.get('edu_students', loadOrSeed('edu_students', seedStudents)));
const [announcements, setAnnouncements] = useState(()=> S.get('edu_announcements', loadOrSeed('edu_announcements', seedAnnouncements)));
const [courses, setCourses] = useState(()=> S.get('edu_courses', loadOrSeed('edu_courses', seedCourses)));
const [events, setEvents] = useState(()=> S.get('edu_events', loadOrSeed('edu_events', seedEvents)));
const [uploads, setUploads] = useState(()=> S.get('edu_uploads', loadOrSeed('edu_uploads', seedUploads)));
const [quizzes, setQuizzes] = useState(()=> S.get('edu_quizzes', []));


useEffect(()=> S.set('edu_teachers', teachers), [teachers]);
useEffect(()=> S.set('edu_students', students), [students]);
useEffect(()=> S.set('edu_announcements', announcements), [announcements]);
useEffect(()=> S.set('edu_courses', courses), [courses]);
useEffect(()=> S.set('edu_events', events), [events]);
useEffect(()=> S.set('edu_uploads', uploads), [uploads]);
useEffect(()=> S.set('edu_quizzes', quizzes), [quizzes]);

const [active, setActive] = useState('dashboard');
const [search, setSearch] = useState('');
const [modal, setModal] = useState(null);


// generic helpers
// helper persistence (use your existing S or import)
const save = (key, v) => {
  try { localStorage.setItem(key, JSON.stringify(v)); } catch(e){ console.warn('save failed', e); }
};

// ANNOUNCEMENT
const addAnnouncement = (t, b) => {
  if (!t) return;
  const ann = { id: 'a' + Date.now(), title: t, body: b, time: new Date().toISOString() };
  setAnnouncements(prev => {
    const next = [ann, ...prev];
    save('edu_announcements', next);
    return next;
  });
};

// COURSE
const addCourse = (c) => {
  const course = { ...c, id: 'c' + Date.now(), uploads: [] };
  setCourses(prev => {
    const next = [course, ...prev];
    save('edu_courses', next);
    return next;
  });
};

// upload to a specific course (file = File object)
// stores small files (<2MB) as dataURL (persisted), larger files as objectURL (ephemeral)
const setCourseUpload = async (cId, file) => {
  if (!cId || !file) return;
  const idStr = String(cId);
  let url = null;
  let persisted = false;

  if (file.size < 2_000_000) {
    // persistable — store as dataURL
    url = await new Promise((res, rej) => {
      const r = new FileReader();
      r.onload = () => res(r.result);
      r.onerror = rej;
      r.readAsDataURL(file);
    });
    persisted = true;
  } else {
    // large — keep objectURL (will not survive reload)
    url = URL.createObjectURL(file);
    persisted = false;
  }

  const up = { id: 'up' + Date.now(), name: file.name, type: file.type, size: file.size, url, persisted };

  setCourses(prev => {
    const next = prev.map(c => String(c.id) === idStr ? { ...c, uploads: [...(c.uploads || []), up] } : c);
    save('edu_courses', next);
    return next;
  });
};

const saveQuiz = (q) => {
  if (!q || !q.title) return;
  const quiz = { ...q, id: 'q' + Date.now(), time: Date.now() };
  setQuizzes(prev => {
    const next = [quiz, ...prev];
    S.set('edu_quizzes', next);
    return next;
  });
};

const addGlobalUpload = async (file) => {
  if (!file) return;
  let url = null;
  let persisted = false;

  if (file.size < 2_000_000) {
    url = await new Promise((res, rej) => {
      const r = new FileReader();
      r.onload = () => res(r.result);
      r.onerror = rej;
      r.readAsDataURL(file);
    });
    persisted = true;
  } else {
    url = URL.createObjectURL(file);
    persisted = false;
  }

  const u = { id: 'u' + Date.now(), name: file.name, type: file.type, size: file.size, url, persisted };

  setUploads(prev => {
    const next = [u, ...prev];
    save('edu_uploads', next);
    return next;
  });
};


useEffect(()=>{
// observe modal placeholders by id and replace with component when setModal called
if(!modal) return;
// if modal content has the create-course-placeholder id, replace content with CreateCourse component
if(typeof modal.content === 'object' && modal.content.props == null && modal.content){
// nothing
}
// simple heuristic: check title
if(modal.title === 'Create Course'){
setModal({ title:'Create Course', content: <CreateCourse onSave={(c)=>{ addCourse(c); setModal(null); }} /> });
}
if(modal.title === 'Create Quiz'){
setModal({ title:'Create Quiz', content: <QuizCreator onSave={(q)=>{ saveQuiz(q); setModal(null); }} /> });
}
}, [modal]);



return (
<div className="min-h-screen">
<div className="max-w-7xl mx-auto px-4 py-6">
<div className="flex gap-6">
<Sidebar active={active} setActive={setActive} />
<main className="flex-1">
<Header search={search} setSearch={setSearch} totalStudents={students.length} />


{active==='dashboard' && <Dashboard students={students} announcements={announcements} uploads={uploads} events={events} setModal={setModal} addCourse={addCourse} saveQuiz={saveQuiz} />}
{active==='analytics' && <Analytics students={students} courses={courses} teachers={teachers} />}
{active==='courses' && <Courses courses={courses} setCourses={setCourses} setModal={setModal} />}
{active==='students' && <Students students={students} setStudents={setStudents} setModal={setModal} search={search} />}
{active==='profile' && <Profile />}
</main>
</div>
</div>


<Modal modal={modal} setModal={setModal} />
</div>
)
}