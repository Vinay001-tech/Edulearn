import React from 'react'


export default function Profile(){
return (
<div className="card max-w-2xl">
<div className="flex gap-6">
<div className="w-28 h-28 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 text-white flex items-center justify-center text-2xl font-bold">T</div>
<div className="flex-1">
<div className="text-lg font-bold">Teacher Name</div>
<div className="text-sm text-slate-500">teacher@school.edu</div>
<div className="mt-4 grid grid-cols-2 gap-3">
<input className="p-2 rounded-lg border" placeholder="Display name" />
<input className="p-2 rounded-lg border" placeholder="Phone" />
<textarea className="p-2 rounded-lg border col-span-2" placeholder="Bio (public)"></textarea>
</div>


<div className="mt-4 flex gap-2">
<button className="px-4 py-2 rounded-lg bg-blue-500 text-white">Save</button>
<button className="px-4 py-2 rounded-lg bg-slate-100">Disconnect</button>
</div>
</div>
</div>
</div>
)
}