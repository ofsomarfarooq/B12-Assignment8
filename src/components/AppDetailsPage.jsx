import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router";
import {BarChart,Bar,XAxis,YAxis,Tooltip,ResponsiveContainer,CartesianGrid}  from "recharts";
import useApplications from "./Hooks/useApplications";
import { installApp, isInstalled,uninstallApp } from "./Utils/lsFunctions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faStar, faThumbsUp } from "@fortawesome/free-solid-svg-icons";

import appError from "../assets/App-error.png";

export default function AppDetailsPage() {
  const { id } = useParams();
  const nav = useNavigate();
  const { apps, loading } = useApplications();
  const [installed, setInstalled] = useState(false);
  const [toast, setToast] = useState(null);

  const app = useMemo(() => apps.find((a) => String(a.id) === String(id)), [apps, id]);

  useEffect(() => {
    if (app) setInstalled(isInstalled(app.id));
  }, [app]);

  if (loading) {
    return (
      <div className="container-default py-16 text-center text-slate-500">
        Loading details…
      </div>
    );
  }

  if (!app) {
    return (
      <div className="container-default py-20 text-center">
        <img
            src={appError}
            alt="App Not Found"
            className="mx-auto mb-6 rounded-xl"
        />
        <h2 className="text-2xl font-bold mb-2">Opps!! App Not Found</h2>
        <p className="text-slate-600 mb-6">
          The App you are requesting is not found on our system. Please try another app.
        </p>
        <button onClick={() => nav("/apps")} className="btn bg-[#632EE3] text-white">
          Go Back!
        </button>
      </div>
    );
  }

  const handleInstall = () => {
    if (installed) return;
    installApp(app);
    setInstalled(true);
    setToast({ text: `${app.title} installed` });
    setTimeout(() => setToast(null), 2000);
  };

   const handleUninstall = () => {
      if (!installed) return;
      uninstallApp(app.id);
      setInstalled(false);
      setToast({ text: `${app.title} uninstalled` });
      setTimeout(() => setToast(null), 2000);
   };

  return (
    <main className="container-default py-10">

      {toast && (
          <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 w-auto max-w-xs">
            <div className="toast">
              <div className={`alert ${installed ? "alert-success" : "alert-error"} shadow-lg`}>
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


      <section className="grid md:grid-cols-3 gap-8 items-start">
        <div className="md:col-span-1">
          <img
            src={app.image || placeholder}
            alt={app.title}
            className="w-full h-auto object-contain rounded-xl bg-white shadow-sm"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = placeholder;
            }}
          />
        </div>

        <div className="md:col-span-2">
          <h1 className="text-2xl md:text-3xl font-bold">{app.title}</h1>

          <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
            <div className="p-3 ">
              <FontAwesomeIcon icon={faDownload} className="text-green-400 text-4xl" />
              <div className="text-slate-500">Downloads</div>
              <div className="font-bold text-lg">
                {Intl.NumberFormat("en", { notation: "compact" }).format(app.downloads)}
              </div>
            </div>

            <div className="p-3">
              <FontAwesomeIcon icon={faStar} className="text-yellow-400 text-4xl" />
              <div className="text-slate-500">Average Ratings</div>
              <div className="font-bold text-lg">{app.ratingAvg}</div>
            </div>

            <div className="p-3">
              <FontAwesomeIcon icon={faThumbsUp} className="text-purple-400 text-4xl" />
              <div className="text-slate-500">Total Reviews</div>
              <div className="font-bold text-lg">
                {Intl.NumberFormat().format(app.reviews || Math.floor(app.downloads / 200))}
              </div>
            </div>
          </div>

            {!installed ? (
              <button
                onClick={handleInstall}
                className="mt-5 btn border-none bg-[#2BD576] text-white hover:bg-[#97d52b]"
              >
                Install Now ({app.size} MB)
              </button>
            ) : (
              <button
                onClick={handleUninstall}
                className="mt-5 btn border-none bg-[#ff0000] text-white hover:bg-[#ff8000]"
              >
                Uninstall
              </button>
            )}
        </div>
      </section>


      {Array.isArray(app.ratings) && app.ratings.length > 0 && (() => {

        const data = [...app.ratings].sort(
          (a, b) => parseInt(b.name) - parseInt(a.name)
        );

        const step = 3000;
        const max = Math.max(12000, ...data.map((d) => d.count));
        const ticks = Array.from({ length: Math.floor(max / step) + 1 }, (_, i) => i * step);

        return (
          <section className="mt-10">
            <h3 className="text-xl font-semibold mb-3">Ratings</h3>
            <div className="h-64 w-full rounded-xl bg-white shadow-sm p-3">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={data}
                  layout="vertical"
                  margin={{ top: 4, right: 16, bottom: 0, left: 16 }}
                >
                  <CartesianGrid horizontal vertical={false} stroke="#e5e7eb" />
                  <XAxis
                    type="number"
                    ticks={ticks}
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: "#64748b", fontSize: 12 }}
                  />
                  <YAxis
                    type="category"
                    dataKey="name"
                    width={40}
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: "#64748b", fontSize: 12 }}
                  />
                  <Tooltip
                    cursor={{ fill: "rgba(0,0,0,0.04)" }}
                    formatter={(v) => [v, "Reviews"]}
                    contentStyle={{ borderRadius: 12, border: "1px solid #e5e7eb" }}
                  />
                  <Bar dataKey="count" barSize={20}  fill="#ff8a00" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>
        );
      })()}


      <section className="mt-10">
        <h3 className="text-xl font-semibold mb-3">Description</h3>
        <div className="rounded-xl bg-white shadow-sm p-4 text-slate-700 leading-relaxed">
          {app.description}
        </div>
      </section>
    </main>
  );
}
