import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { getInstalled, uninstallApp } from "./Utils/lsFunctions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faStar, faDatabase } from "@fortawesome/free-solid-svg-icons";
import useApplications from "./Hooks/useApplications";
import Loader from "./installedAppLoader";

export default function InstalledApps() {
  const [apps, setApps] = useState([]);
  const [sort, setSort] = useState("size"); 
  const nav = useNavigate();
  const [toast, setToast] = useState(null);
  const { loading } = useApplications();

  useEffect(() => {
    setApps(getInstalled());
  }, []);

  const sorted = useMemo(() => {
    const list = [...apps];
    if (sort === "downloads") list.sort((a, b) => b.downloads - a.downloads);
    else list.sort((a, b) => b.size - a.size);
    return list;
  }, [apps, sort]);

  const handleUninstall = (id, title) => {
    uninstallApp(id);
    setApps(getInstalled());
    setToast({ text: `${title} uninstalled` });
    setTimeout(() => setToast(null), 2000);
  };

   if (loading) {
    return (
      <main className="container-default py-10">
        <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Your Installed Apps</h1>
        <p className="text-slate-500">
          Explore All Trending Apps on the Market developed by us
        </p>
      </div>

      <Loader />
      </main>
    );
  }

  return (
    <main className="container-default py-10">

       {toast && (
        <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 w-auto max-w-xs">
          <div className="toast">
            <div className="alert alert-error shadow-lg">
              <div className="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm">{toast.text}</span>
              </div>
            </div>
         </div>
        </div>
      )}

      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Your Installed Apps</h1>
        <p className="text-slate-500">
          Explore All Trending Apps on the Market developed by us
        </p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
        <div className="text-slate-700">
          <span className="font-semibold">{sorted.length}</span> Apps Found
        </div>
        <div className="flex items-center gap-2 ">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="select select-bordered select-sm border-zinc-950 bg-white "
          >
            <option value="size">Sort By Size</option>
            <option value="downloads">Sort By Downloads</option>
          </select>
        </div>
      </div>


      {sorted.length === 0 ? (
        <div className="text-center text-slate-500 py-16">
          No apps installed yet.
        </div>
      ) : (
        <div className="space-y-3">
          {sorted.map((app) => (
            <div
              key={app.id}
              className="flex items-center justify-between bg-white rounded-xl shadow-sm border border-slate-200 p-3 hover:shadow-md transition"
            >

              <div
                className="flex items-center gap-3 cursor-pointer"
                onClick={() => nav(`/apps/${app.id}`)}
              >
                <img
                  src={app.image}
                  alt={app.title}
                  className="h-12 w-12 rounded-md object-cover bg-slate-100"
                  onError={(e) => (e.currentTarget.src = "https://placehold.co/64")}
                />
                <div>
                  <h3 className="font-semibold text-slate-800 text-sm sm:text-base">
                    {app.title}
                  </h3>
                  <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-500 mt-1">
                    <span>
                      <FontAwesomeIcon icon={faDownload} className="text-green-500 mr-1" />
                      {Intl.NumberFormat("en", { notation: "compact" }).format(app.downloads)}
                    </span>
                    <span>
                      <FontAwesomeIcon icon={faStar} className="text-yellow-400 mr-1" />
                      {app.ratingAvg}
                    </span>
                    <span>
                      <FontAwesomeIcon icon={faDatabase} className="text-indigo-400 mr-1" />
                      {app.size} MB
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleUninstall(app.id, app.title)}
                className="mt-5 btn btn-sm border-none bg-[#ff0000] text-white hover:bg-[#ff8000]"
              >
                Uninstall
              </button>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
