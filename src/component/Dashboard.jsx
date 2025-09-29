// import React from 'react'
// import AnnouncementList from './common/AnnouncementList'


// export default function Dashboard({students, announcements, uploads, events, setModal}){
// const presentCount = students.filter(s=>s.present).length;
// const absentCount = students.length - presentCount;
// const avgProgress = students.length? Math.round(students.reduce((a,b)=>a+b.progress,0)/students.length):0;


// return (
// <div>
// <div className="grid grid-cols-12 gap-6">
// <div className="col-span-8">
// <div className="grid grid-cols-2 gap-6">
// <div className="card border-l-4" style={{borderColor:'var(--blue)'}}>
// <div className="text-xs text-slate-400">Average Progress</div>
// <div className="text-2xl font-bold">{avgProgress}%</div>
// </div>
// <div className="card border-l-4" style={{borderColor:'var(--green)'}}>
// <div className="text-xs text-slate-400">Attendance Today</div>
// <div className="text-2xl font-bold">{presentCount}/{students.length}</div>
// </div>
// </div>


// <div className="mt-6 grid grid-cols-1 gap-4">
// <div className="card">
// <h3 className="font-bold">Recent Announcements</h3>
// <div className="mt-3"><AnnouncementList items={announcements.slice(0,5)} /></div>
// </div>


// <div className="card">
// <h3 className="font-bold">Uploads</h3>
// <div className="mt-3 space-y-2">
// {uploads.length? uploads.slice(0,6).map(u=> (
// <div key={u.id} className="flex justify-between items-center">
// <div>
// <div className="font-medium">{u.name}</div>
// <div className="text-xs text-slate-400">{u.type} • {Math.round(u.size/1024)} KB</div>
// </div>
// <div className="flex gap-2">
// {u.type.includes('pdf') ? <a className="px-2 py-1 rounded bg-slate-100" href={u.url} target="_blank">Open PDF</a> : null}
// {u.type.startsWith('video') ? <button className="px-2 py-1 rounded bg-slate-100" onClick={()=> setModal({title:u.name, content:<video controls src={u.url} className="max-h-64"/>})}>Preview</button> : null}
// </div>
// </div>
// )) : <div className="text-sm text-slate-400">No uploads yet</div>}
// </div>
// </div>
// </div>
// </div>


// <aside className="col-span-4 space-y-4">
// <div className="card">
// <div className="text-xs text-slate-400">Today Overview</div>
// <div className="text-lg font-bold">{students.length} Students</div>
// <div className="mt-3 text-sm text-slate-500">Upcoming: {events.length}</div>
// </div>


// <div className="card">
// <div className="text-xs text-slate-400">Quick Actions</div>
// <div className="mt-4 flex gap-2">
// <button className="flex-1 px-3 py-2 rounded-lg bg-blue-500 text-white" onClick={()=> setModal({title:'Create Course', content:'(create course UI)'})}>Course</button>
// <button className="flex-1 px-3 py-2 rounded-lg bg-green-500 text-white" onClick={()=> setModal({title:'Create Quiz', content:'(create quiz UI)'})}>Quiz</button>
// </div>
// </div>
// </aside>
// </div>
// </div>
// )
// }


import React from 'react'
import AnnouncementList from './common/AnnouncementList'


export default function Dashboard({students, announcements, uploads, events, setModal, addCourse, saveQuiz}){
const presentCount = students.filter(s=>s.present).length;
const absentCount = students.length - presentCount;
const avgProgress = students.length? Math.round(students.reduce((a,b)=>a+b.progress,0)/students.length):0;


return (
<div>
<div className="grid grid-cols-12 gap-6">
<div className="col-span-8 ">
<div className="grid grid-cols-2 gap-6 ">
<div className="card border-l-4 " style={{borderColor:'var(--blue)'}}>
<div className="text-xs text-white bg-green-500">Average Progress</div>
<div className="text-2xl font-bold ">{avgProgress}%</div>
</div>
<div className="card border-l-4" style={{borderColor:'var(--green)'}}>
<div className="text-xs text-white bg-blue-500">Attendance Today</div>
<div className="text-2xl font-bold">{presentCount}/{students.length}</div>
</div>
</div>


<div className="mt-6 grid grid-cols-1 gap-4">
<div className="card">
<h3 className="font-bold">Recent Announcements</h3>
<div className="mt-3"><AnnouncementList items={announcements.slice(0,5)} /></div>
</div>


<div className="card">
<h3 className="font-bold">Uploads</h3>
<div className="mt-3 space-y-2">
{uploads.length? uploads.slice(0,6).map(u=> (
<div key={u.id} className="flex justify-between items-center">
<div>
<div className="font-medium">{u.name}</div>
<div className="text-xs text-slate-400">{u.type} • {Math.round(u.size/1024)} KB</div>
</div>
<div className="flex gap-2">
{u.type.includes('pdf') ? <a className="px-2 py-1 rounded bg-slate-100" href={u.url} target="_blank" rel="noreferrer">Open PDF</a> : null}
{u.type.startsWith('video') ? <button className="px-2 py-1 rounded bg-slate-100" onClick={()=> setModal({title:u.name, content:<video controls src={u.url} className="max-h-64"/>})}>Preview</button> : null}
</div>
</div>
)) : <div className="text-sm text-slate-400">No uploads yet</div>}
</div>
</div>
</div>
</div>


<aside className="col-span-4 space-y-4">
<div className="card">
<div className="text-xs text-slate-400">Today Overview</div>
<div className="text-lg font-bold">{students.length} Students</div>
<div className="mt-3 text-sm text-slate-500">Upcoming: {events.length}</div>
</div>


<div className="card">
<div className="text-xs text-slate-400">Quick Actions</div>
<div className="mt-4">
<div className="flex gap-2">
<button className="flex-1 px-3 py-2 rounded-lg bg-blue-500 text-white" onClick={()=> setModal({title:'Create Course', content: <div><h4 className="font-semibold mb-2">Create Course</h4><div id="create-course-placeholder" /></div> })}>Course</button>
<button className="flex-1 px-3 py-2 rounded-lg bg-green-500 text-white" onClick={()=> setModal({title:'Create Quiz', content:<div><h4 className="font-semibold mb-2">Create Quiz</h4><div id="create-quiz-placeholder" /></div>})}>Quiz</button>
</div>
<div className="mt-3 text-xs text-slate-500">Note: Click button to open form modal.</div>
</div>
</div>
</aside>
</div>
</div>
)
}