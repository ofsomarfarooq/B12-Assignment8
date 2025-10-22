import { createBrowserRouter } from "react-router";
import Home from "./Home.jsx";
import AllApplications from "./AllApplications.jsx";
import InstalledApps from "./InstalledApps.jsx";
import AppDetailsPage from "./AppDetailsPage.jsx";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import RouteLoader from "./RouteLoader";
import NotFound from "./NotFound";

function Layout({ children }) {
  return (
    <>
        <Navbar />
        <RouteLoader />
        {children}
        <Footer />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout><Home /></Layout>,
  },
  { path: "/apps", element: <Layout><AllApplications /></Layout> },
  { path: "/installation", element: <Layout><InstalledApps /></Layout> },
  { path: "/apps/:id", element: <Layout><AppDetailsPage /></Layout> },
  { path: "*", element: <Layout><div className="container-default py-20">404 Not Found</div></Layout> },
  { path: "*", element: <Layout><NotFound /></Layout> },
]);

export default router;
