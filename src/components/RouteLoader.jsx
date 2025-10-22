import { useNavigation } from "react-router";
import { ClipLoader } from "react-spinners";

export default function RouteLoader() {
  const navigation = useNavigation();            
  const busy = navigation.state !== "idle";
  if (!busy) return null;
  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm grid place-items-center z-[60]">
      <div className="p-6 rounded-2xl bg-white shadow-lg flex flex-col items-center gap-3">
        <ClipLoader />
        <span className="text-slate-700 text-sm">Loading…</span>
      </div>
    </div>
  );
}
