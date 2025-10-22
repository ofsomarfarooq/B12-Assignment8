import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import useApplications from "./Hooks/useApplications";


const compact = (n) => Intl.NumberFormat("en", { notation: "compact" }).format(n);

export default function AllApplications() {
  const { apps, loading } = useApplications();


  const [input, setInput] = useState("");

  const [query, setQuery] = useState("");

  const [searching, setSearching] = useState(false);

  const nav = useNavigate();


  useEffect(() => {
    setSearching(true);
    const t = setTimeout(() => {
      setQuery(input.trim().toLowerCase());
      setSearching(false);
    }, 300);
    return () => clearTimeout(t);
  }, [input]);


  const filtered = useMemo(() => {
    if (!query) return apps;
    return apps.filter((a) => a.title?.toLowerCase().includes(query));
  }, [apps, query]);


  if (loading) {
    return (
      <main className="container-default py-16 text-center text-slate-500">
        Loading apps…
      </main>
    );
  }

  return (
    <main className="container-default py-12">

      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-black">Our All Applications</h1>
        <p className="text-slate-500">Explore all apps on the market developed by us.</p>
      </div>


      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-4">
        <div className="text-slate-700  font-semibold">
          <span> ({filtered.length})</span> Apps Found
        </div>

        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="search Apps"
          className="w-full sm:w-80 rounded-xl border border-slate-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#7b3aed] text-gray-400"
        />
      </div>


      {searching && (
        <div className="flex items-center gap-2 text-slate-500 mb-4">
          <span className="loading loading-spinner loading-sm" />
          <span>Searching…</span>
        </div>
      )}


      {!searching && filtered.length === 0 && (
        <div className="text-center text-slate-500 py-16">No App Found</div>
      )}


      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {filtered.map((app) => (
          <button
            key={app.id}
            onClick={() => nav(`/apps/${app.id}`)}
            className="text-left border rounded-xl bg-white shadow-sm hover:shadow-md transition p-4"
          >
            <img
              src={app.image}
              alt={app.title}
              className="h-32 w-full object-contain mb-3"
              onError={(e) => (e.currentTarget.src = "https://placehold.co/480x320?text=App")}
            />
            <h3 className="font-semibold text-slate-800 mb-1 line-clamp-2">{app.title}</h3>
            <div className="flex items-center justify-between text-sm text-slate-600">
              <span>📥 {compact(app.downloads)}</span>
              <span>⭐ {app.ratingAvg}</span>
            </div>
          </button>
        ))}
      </div>
    </main>
  );
}
