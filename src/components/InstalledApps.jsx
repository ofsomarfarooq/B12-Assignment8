import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { getInstalled, uninstallApp } from "./Utils/lsFunctions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faStar, faDatabase } from "@fortawesome/free-solid-svg-icons";

export default function InstalledApps() {
  const [apps, setApps] = useState([]);
  const [sort, setSort] = useState("size"); 
  const nav = useNavigate();

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
    Swal.fire({
      title: "Uninstalled",
      text: `${title} was removed from your device.`,
      icon: "success",
      timer: 1200,
      showConfirmButton: false,
    });
  };

  return (
    <main className="container-default py-10">

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
                className="btn btn-sm bg-[#2BD576] text-white hover:bg-[#26c36a]"
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
