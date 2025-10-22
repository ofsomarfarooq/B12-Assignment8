import { useEffect, useState } from "react";

export default function useApplications() {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    async function run() {
      try {
        const res = await fetch("/apps.json");
        const data = await res.json();
        if (alive) setApps(Array.isArray(data) ? data : []);
      } catch {
        if (alive) setApps([]);
      } finally {
        if (alive) setLoading(false);
      }
    }
    run();
    return () => { alive = false; };
  }, []);

  return { apps, loading };
}
