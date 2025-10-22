import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router";
import Swal from "sweetalert2";
import {BarChart,Bar,XAxis,YAxis,Tooltip,ResponsiveContainer,CartesianGrid}  from "recharts";
import useApplications from "./Hooks/useApplications";
import { getInstalled, installApp, isInstalled } from "./Utils/lsFunctions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faStar, faThumbsUp } from "@fortawesome/free-solid-svg-icons";

export default function AppDetailsPage() {
  const { id } = useParams();
  const nav = useNavigate();
  const { apps, loading } = useApplications();
  const [installed, setInstalled] = useState(false);

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
    Swal.fire({
      title: "Installed!",
      text: `${app.title} has been installed successfully.`,
      icon: "success",
      timer: 1400,
      showConfirmButton: false,
    });
  };

  return (
    <main className="container-default py-10">

      <section className="grid md:grid-cols-3 gap-8 items-start">
        <div className="md:col-span-1">
          <img
            src={app.image}
            alt={app.title}
            className="w-full h-auto object-contain rounded-xl bg-white shadow-sm"
            onError={(e) => {
              e.currentTarget.src = "https://placehold.co/600x400?text=App+Image";
            }}
          />
        </div>

        <div className="md:col-span-2">
          <h1 className="text-2xl md:text-3xl font-bold">{app.title}</h1>

          <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
            <div className="p-3">
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

          <button
            disabled={installed}
            onClick={handleInstall}
            className={`mt-5 btn border-none ${
              installed ? "btn-disabled" : "bg-[#2BD576] text-white"
            }`}
          >
            {installed ? "Installed" : `Install Now (${app.size} MB)`}
          </button>
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
