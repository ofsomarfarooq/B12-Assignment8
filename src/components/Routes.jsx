import { createBrowserRouter } from "react-router";
import Home from "./Home.jsx";
import AllApplications from "./AllApplications.jsx";
import InstalledApps from "./InstalledApps.jsx";
import AppDetailsPage from "./AppDetailsPage.jsx";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";

function Layout({ children }) {
  return (
    <>
      <Navbar />
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
]);

export default router;
