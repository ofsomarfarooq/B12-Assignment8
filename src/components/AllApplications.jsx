import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import useApplications from "./Hooks/useApplications";
import { compact } from "./Utils/number";

export default function AllApplications(){
  const { apps, loading } = useApplications();
  const [q, setQ] = useState("");
  const nav = useNavigate();

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return apps;
    return apps.filter(a => a.title.toLowerCase().includes(term));
  }, [q, apps]);

  return (
    <main className="container-default py-12">
      {/* Title */}
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-black">Our All Applications</h1>
        <p className="text-slate-500">Explore all apps on the market developed by us.</p>
      </div>

      {/* Count + Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6">
        <div className="text-slate-600">
          <span className="font-semibold">{filtered.length}</span> Apps Found
        </div>
        <input
          value={q}
          onChange={e=>setQ(e.target.value)}
          placeholder="search Apps"
          className="w-full sm:w-80 rounded-xl border border-slate-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#7b3aed]"
        />
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center text-slate-500 py-10">Loading…</div>
      )}

      {/* Empty state */}
      {!loading && filtered.length === 0 && (
        <div className="text-center text-slate-500 py-10">No App Found</div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {filtered.map(app => (
          <button
            key={app.id}
            onClick={() => nav(`/apps/${app.id}`)}
            className="text-left border rounded-xl bg-white shadow-sm hover:shadow-md transition p-4"
          >
            <img src={app.image} alt={app.title}
                 className="h-32 w-full object-contain mb-3" />
            <h3 className="font-semibold text-slate-800 mb-1">{app.title}</h3>
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
