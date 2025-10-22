import { Link } from "react-router";
import error404 from "../assets/error-404.png";

export default function NotFound() {
  return (
    <div className="container-default py-20 text-center">
      <img
        src={error404}
        alt="404"
        className="mx-auto mb-6 rounded-xl"
      />
      <h2 className="text-2xl font-bold mb-2">Oops, page not found!</h2>
      <p className="text-slate-600 mb-6">The page you are looking for is not available.</p>
      <Link to="/" className="btn bg-[#632EE3] text-white">Go Back!</Link>
    </div>
  );
}
