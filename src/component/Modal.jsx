import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'


export default function Modal({modal, setModal}){
return (
<AnimatePresence>
{modal && (
<motion.div className="fixed inset-0 z-50 grid place-items-center" key="modal" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
<div className="absolute inset-0 bg-white/60 backdrop-blur-sm" onClick={()=>setModal(null)} />
<motion.div initial={{scale:0.96,y:10}} animate={{scale:1,y:0}} exit={{scale:0.98,y:-6}} className="bg-white rounded-2xl p-6 shadow-2xl w-[min(92%,900px)] z-50">
<div className="flex items-start justify-between gap-4">
<div><h3 className="text-lg font-bold">{modal.title}</h3></div>
<div><button className="text-slate-400" onClick={()=>setModal(null)}>X</button></div>
</div>
<div className="mt-4">{modal.content}</div>
</motion.div>
</motion.div>
)}
</AnimatePresence>
)
}