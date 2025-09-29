export const S = {
get(k, fallback){ try { const v = JSON.parse(localStorage.getItem(k)); return v ?? fallback; } catch(e){ return fallback; } },
set(k,v){ localStorage.setItem(k, JSON.stringify(v)); }
}