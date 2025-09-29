import React from 'react'
import Plot from 'react-plotly.js'
export default function Analytics({students, courses, teachers}){
const presentCount = students.filter(s=>s.present).length;
const absentCount = students.length - presentCount;
const buckets = [0,0,0,0];
students.forEach(s=>{ if(s.progress<40) buckets[0]++; else if(s.progress<60) buckets[1]++; else if(s.progress<80) buckets[2]++; else buckets[3]++; });


// sample time series for attendance
const last7 = Array.from({length:7}).map((_,i)=> Math.round(students.length * (0.5 + 0.3*Math.sin(i/2) + Math.random()*0.05)));


// course enrollments
const courseNames = courses.map(c=> c.title);
const courseCounts = courses.map(c=> c.students);


return (
<div>
<div className="grid grid-cols-12 gap-6">
<div className="col-span-8">
<div className="grid grid-cols-2 gap-6">
<div className="card">
<div className="text-xs text-slate-400">Attendance Today</div>
<div className="text-xl font-bold">{presentCount} Present</div>
<Plot data={[{ values:[presentCount, absentCount], labels:['Present','Absent'], type:'pie', hole:0.4 }]} layout={{margin:{t:10,b:10,l:10,r:10}, paper_bgcolor:'transparent'}} useResizeHandler style={{width:'100%', height:260}} config={{displayModeBar:false}} />
</div>


<div className="card">
<div className="text-xs text-slate-400">Progress Distribution</div>
<Plot data={[{ x:['<40','40-59','60-79','80+'], y:buckets, type:'bar', text:buckets.map(String), textposition:'auto' }]} layout={{margin:{t:30,b:30,l:30,r:10}, paper_bgcolor:'transparent'}} useResizeHandler style={{width:'100%', height:260}} config={{displayModeBar:false}} />
</div>
</div>


<div className="mt-6 card">
<div className="text-xs text-slate-400">Attendance — Last 7 Days</div>
<Plot data={[{ x:['6d','5d','4d','3d','2d','y','t'], y:last7, type:'scatter', mode:'lines+markers', fill:'tozeroy' }]} layout={{margin:{t:30,b:40}, paper_bgcolor:'transparent'}} useResizeHandler style={{width:'100%', height:320}} config={{displayModeBar:false}} />
</div>


<div className="mt-6 grid grid-cols-2 gap-6">
<div className="card">
<div className="text-xs text-slate-400">Top Teachers</div>
<div className="mt-3 space-y-2">{teachers.slice(0,6).map(t=> <div key={t.id} className="p-2 rounded bg-slate-50">{t.name} • {t.subject}</div>)}</div>
</div>


<div className="card">
<div className="text-xs text-slate-400">Course Enrollments</div>
<Plot data={[{ x: courseNames, y: courseCounts, type:'bar', text: courseCounts.map(String), textposition:'auto' }]} layout={{margin:{t:30,b:60}, paper_bgcolor:'transparent'}} useResizeHandler style={{width:'100%', height:240}} config={{displayModeBar:false}} />
</div>
</div>
</div>


<aside className="col-span-4 space-y-4">
<div className="card">
<div className="text-xs text-slate-400">Quick Numbers</div>
<div className="mt-3 grid grid-cols-2 gap-2 text-sm text-slate-600"><div>No. Students<br/><strong className="text-slate-800">{students.length}</strong></div><div>Present<br/><strong className="text-slate-800">{presentCount}</strong></div><div>Absent<br/><strong className="text-slate-800">{absentCount}</strong></div><div>Teachers<br/><strong className="text-slate-800">{teachers.length}</strong></div></div>
</div>
</aside>
</div>
</div>
)
}