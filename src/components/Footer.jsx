export default function Footer(){
  return (
    <footer className="mt-16 border-t border-slate-200 bg-slate-900 text-slate-100">
      <div className="container-default py-10">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 grid place-items-center rounded-lg bg-[#632EE3] text-white font-black">D</div>
          <span className="font-extrabold tracking-tight text-lg">HERO.IO</span>
        </div>
        <p className="text-slate-300 mt-2">We build productive apps. Crafted with ❤️ for learners.</p>
        <p className="text-sm text-slate-400 mt-4">© 2025 — All rights reserved.</p>
      </div>
    </footer>
  );
}
