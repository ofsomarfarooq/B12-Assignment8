import { useEffect, useState } from "react";
export default function useApplications() {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
     const minLoadingMs = 500; 
    const start = Date.now();
    async function run() {
      try {
        const res = await fetch("/apps.json");
        const data = await res.json();
        if (alive) setApps(Array.isArray(data) ? data : []);
      } catch {
        if (alive) setApps([]);
      } finally {

        if (alive) {
          const elapsed = Date.now() - start;
          const remain = Math.max(0, minLoadingMs - elapsed);
          if (remain > 0) await new Promise((r) => setTimeout(r, remain));
          setLoading(false);
        }
      }
    }
    run();
    return () => { alive = false; };
  }, []);

  return { apps, loading };
}