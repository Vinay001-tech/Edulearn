export const teachers = Array.from({length:30}).map((_,i)=>({ id: 1000+i, name:`Teacher ${i+1}`, email:`teacher${i+1}@school.edu`, subject: ['Math','English','Science','History','Computer'][i%5]}));


export const students = [
{id:1, name:'Aman Kumar', email:'aman@example.com', present:true, progress:72},
{id:2, name:'Priya Kaur', email:'priya@example.com', present:false, progress:56},
{id:3, name:'Ravi Singh', email:'ravi@example.com', present:true, progress:41},
{id:4, name:'Sana Ali', email:'sana@example.com', present:true, progress:88},
{id:5, name:'Rahul Sharma', email:'rahul@example.com', present:false, progress:65},
...Array.from({length:25}).map((_,i)=>({ id:6+i, name:`Student ${6+i}`, email:`s${6+i}@school.edu`, present: Math.random()>.4, progress: Math.floor(30+Math.random()*70) }))
];


export const announcements = [
{id:'a1', title:'Welcome Back', body:'Welcome to the new academic year. Attendance will be recorded daily.', time: new Date().toISOString()},
{id:'a2', title:'Exam Schedule', body:'Midterm exams start on Oct 15. Prepare accordingly.', time: new Date().toISOString()},
{id:'a3', title:'Holiday Notice', body:'School will be closed on Oct 2 for a public holiday.', time: new Date().toISOString()}
];


export const courses = [
{ id:'c1', title:'Intro to Programming', code:'CS101', students:18, lessons:12, uploads:[] },
{ id:'c2', title:'Mathematics - Grade 8', code:'MATH8', students:22, lessons:16, uploads:[] },
{ id:'c3', title:'Science Lab', code:'SCI101', students:15, lessons:10, uploads:[] }
];


export const events = [ { id:'e1', title:'Math - Grade 8', date: new Date().toISOString().slice(0,10), time:'10:00' } ];


// Dummy uploads (external resources) — visible on Dashboard uploads area
export const uploads = [
{ id:'u1', name:'Syllabus.pdf', type:'application/pdf', size: 120_000, url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', persisted: true },
{ id:'u2', name:'Intro Video.mp4', type:'video/mp4', size: 800_000, url: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4', persisted: true }
];