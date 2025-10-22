import heroPhone from "../assets/hero.png";
import play from "../assets/gp.png";
import app from "../assets/as.png";


export default function Hero() {
  return (
    <section className="bg-transparent">
      <div className="container-default pt-14 pb-2 text-center">
        {/* TITLE */}
        <h1 className="font-bold leading-tight tracking-tight
                       text-[34px] md:text-[56px] text-black flex flex-col">
          We Build{" "}
          <span>
          <span className="bg-gradient-to-r from-[#7b3aed] to-[#632EE3] bg-clip-text text-transparent  ">
            Productive
          </span>{" "}
          Apps
          </span>
        </h1>

        {/* SUBTEXT */}
        <p className="mt-3 max-w-2xl mx-auto text-slate-600">
          At <span className="font-semibold">HERO.IO</span>, we craft innovative apps
          designed to make everyday life simpler, smarter, and more exciting.
          Our goal is to turn your ideas into digital experiences that truly make an impact.
        </p>

        {/* STORE BADGES */}
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">
          <a
            href="https://play.google.com/store"
            target="_blank"
            className="btn bg-white text-black  py-4 sm:py-6 text-base sm:text-xl font-semibold flex items-center justify-center gap-2 sm:gap-3 w-full sm:w-auto hover:scale-105 transition-all duration-300"
          >
            <img src={play} alt="" className="w-6 sm:w-8" />
            Google Play
          </a>
          <a
            href="https://www.apple.com/app-store/"
            target="_blank"
            className="btn bg-white text-black py-4 sm:py-6 text-base sm:text-xl font-semibold flex items-center justify-center gap-2 sm:gap-3 w-full sm:w-auto hover:scale-105 transition-all duration-300"
          >
            <img src={app} alt="" className="w-6 sm:w-8" />
            App Store
          </a>
        </div>

        {/* PHONE */}
        <div className="flex justify-center mt-8 sm:mt-10 px-5">
          <img src={heroPhone} alt="" />
        </div>
      </div>
    </section>
  );
}
