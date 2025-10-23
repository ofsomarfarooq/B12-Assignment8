import Hero from "./Hero";
import Stats from "./Stats";
import TopApps from "./TopApps";
import Loader from "./Loader";
import useApplications from "./Hooks/useApplications";

export default function Home() {
  const { loading } = useApplications();


  if (loading) {
    return <Loader />;
  }

  return (
    <main>
      <Hero />
      <Stats />
      <TopApps />
    </main>
  );
}
