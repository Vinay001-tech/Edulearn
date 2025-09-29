import React, {useState} from 'react'


export default function QuizCreator({onSave}){
const [title, setTitle] = useState('');
const [rows, setRows] = useState([]);
const addRow = ()=> setRows(r=> [...r, {q:'', opts:['','','',''], correct:0, id:Math.random()}]);
const update = (id, patch)=> setRows(r=> r.map(x=> x.id===id? {...x,...patch}:x));
const save = ()=>{ if(!rows.length) return alert('Add questions'); onSave({title, questions: rows}); };


return (
<div>
<input placeholder="Quiz title" className="w-full p-2 rounded-lg border" value={title} onChange={e=>setTitle(e.target.value)} />
<div className="mt-3 space-y-2">
{rows.map((row, idx)=> (
<div key={row.id} className="p-2 border rounded-lg">
<input placeholder={`Question ${idx+1}`} className="w-full p-2 rounded border" value={row.q} onChange={e=>update(row.id,{q:e.target.value})} />
<div className="grid grid-cols-2 gap-2 mt-2">
{row.opts.map((o,i)=> (
<input key={i} value={o} className="p-2 rounded border" onChange={e=> update(row.id, { opts: row.opts.map((vv,ii)=> ii===i? e.target.value: vv) }) } placeholder={`Option ${i+1}`} />
))}
</div>
<div className="mt-2 flex gap-2 items-center">
<select value={row.correct} onChange={e=> update(row.id, { correct: Number(e.target.value) })} className="p-2 rounded border">
<option value={0}>Correct: 1</option>
<option value={1}>Correct: 2</option>
<option value={2}>Correct: 3</option>
<option value={3}>Correct: 4</option>
</select>
<button className="px-2 py-1 rounded bg-red-50" onClick={()=> setRows(r=> r.filter(x=> x.id!==row.id))}>Remove</button>
</div>
</div>
))}
</div>
<div className="mt-3 flex gap-2 justify-end">
<button className="px-3 py-2 rounded bg-slate-100" onClick={addRow}>+ Question</button>
<button className="px-3 py-2 rounded bg-blue-500 text-white" onClick={save}>Save Quiz</button>
</div>
</div>
)
}