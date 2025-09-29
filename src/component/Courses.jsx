import React, {useRef, useState} from 'react'
import CourseCard from './common/CourseCard'


export default function Courses({courses, setCourses, setModal}){
const [selected, setSelected] = useState(null);
const fileRef = useRef();


const openCourse = (c)=> setSelected(c);
const deleteCourse = (id)=> setCourses(prev=> prev.filter(x=> x.id!==id));


// upload handlers for course (video/pdf) - will store objectURL and metadata
const uploadToCourse = async (courseId, file)=>{
if(!file) return;
const url = URL.createObjectURL(file);
setCourses(prev=> prev.map(c=> c.id===courseId? {...c, uploads:[...(c.uploads||[]), { id:'up'+Date.now(), name:file.name, type:file.type, size:file.size, url }]}: c));
}


const onFile = (e)=> uploadToCourse(selected.id, e.target.files[0]);


return (
<div>
<div className="mt-6 grid grid-cols-3 gap-6">
{courses.map(c=> <CourseCard key={c.id} c={c} onOpen={openCourse} onDelete={deleteCourse} />)}
</div>


{selected ? (
<div className="mt-6 card">
<div className="flex justify-between items-center"><div><div className="font-bold">{selected.title}</div><div className="text-xs text-slate-400">{selected.code}</div></div><div><button onClick={()=> setSelected(null)} className="px-3 py-1 rounded bg-slate-100">Close</button></div></div>


<div className="mt-4">
<div className="text-sm text-slate-500">Uploads</div>
<div className="mt-2 space-y-2">
{(selected.uploads||[]).map(u=> (
<div key={u.id} className="flex justify-between items-center p-2 bg-slate-50 rounded">
<div><div className="font-medium">{u.name}</div><div className="text-xs text-slate-400">{u.type} • {Math.round(u.size/1024)} KB</div></div>
<div className="flex gap-2"><a className="px-2 py-1 rounded bg-slate-100" href={u.url} target="_blank">Open</a>{u.type.startsWith('video') ? <button className="px-2 py-1 rounded bg-slate-100" onClick={()=> setModal({title:u.name, content:<video controls src={u.url} className="max-h-64"/>})}>Preview</button>: null}</div>
</div>
))}
</div>


<div className="mt-4 flex gap-2 items-center">
<input ref={fileRef} type="file" className="hidden" onChange={onFile} />
<button onClick={()=> fileRef.current?.click()} className="px-3 py-2 rounded bg-blue-500 text-white">Upload video/pdf</button>
<button className="px-3 py-2 rounded bg-slate-100" onClick={()=> setCourses(prev=> prev.map(c=> c.id===selected.id? {...c, uploads:[]} : c))}>Clear uploads</button>
</div>
</div>
</div>
): null}
</div>
)
}