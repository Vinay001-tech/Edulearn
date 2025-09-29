import React, {useState} from 'react'


export default function eCreateCourse({onSave}){
const [title, setTitle] = useState('');
const [code, setCode] = useState('');
const [lessons, setLessons] = useState(8);
const [students, setStudents] = useState(0);


return (
<div>
<input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Course title" className="w-full p-2 rounded-lg border" />
<div className="mt-2 grid grid-cols-2 gap-2">
<input value={code} onChange={e=>setCode(e.target.value)} placeholder="Code (eg CS101)" className="p-2 rounded-lg border" />
<input value={lessons} onChange={e=>setLessons(Number(e.target.value))} placeholder="Lessons" type="number" className="p-2 rounded-lg border" />
</div>
<div className="mt-3 flex justify-end gap-2">
<button className="px-3 py-2 rounded-lg bg-blue-500 text-white" onClick={()=> onSave({title, code, lessons})}>Create</button>
</div>
</div>
)
}