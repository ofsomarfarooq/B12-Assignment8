import useApplications from "./Hooks/useApplications";

import { useNavigate } from "react-router";
import { compact } from "./Utils/number";

export default function TopApps(){
  const { apps, loading } = useApplications();
  const nav = useNavigate();
  const list = apps.slice(0, 8);

  if (loading) return (
    <section className="container-default py-16 text-center text-slate-500">
      Loading apps…
    </section>
  );

  return (
    <section className="container-default py-16">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-black">Trending Apps</h2>
      <p className="text-slate-500 text-center mb-10">
        Explore all trending apps on the market developed by us.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {list.map(app => (
          <button
            key={app.id}
            onClick={() => nav(`/apps/${app.id}`)}
            className="text-left border rounded-xl bg-white shadow-sm hover:shadow-md transition p-4"
          >
            <img src={app.image} alt={app.title}
                 className="h-32 w-full object-contain mb-3" />
            <h3 className="font-semibold text-slate-800 mb-1">
              {app.title}
            </h3>
            <div className="flex items-center justify-between text-sm text-slate-600">
              <span>📥 {compact(app.downloads)}</span>
              <span>⭐ {app.ratingAvg}</span>
            </div>
          </button>
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <a href="/apps"
           className="btn bg-gradient-to-r from-[#7b3aed] to-[#632EE3] text-white px-6 py-2 rounded-lg">
          Show All
        </a>
      </div>
    </section>
  );
}
