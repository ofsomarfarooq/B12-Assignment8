export default function Stats() {
  return (
    <section className="mt-0 w-full bg-gradient-to-r from-[#7b3aed] to-[#632EE3]">
      <div className="container-default py-12">
        <h2 className="text-white text-2xl md:text-3xl font-bold text-center mb-8">
          Trusted By Millions, Built For You
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center text-white">
          <div>
            <div className="text-4xl font-extrabold">29.6M</div>
            <div className="opacity-90">Total Downloads</div>
            <div className="text-sm opacity-80 mt-1">21% More Than Last Month</div>
          </div>
          <div>
            <div className="text-4xl font-extrabold">906K</div>
            <div className="opacity-90">Total Reviews</div>
            <div className="text-sm opacity-80 mt-1">46% More Than Last Month</div>
          </div>
          <div>
            <div className="text-4xl font-extrabold">132+</div>
            <div className="opacity-90">Active Apps</div>
            <div className="text-sm opacity-80 mt-1">31 More Will Launch</div>
          </div>
        </div>
      </div>
    </section>
  );
}

