import React, { useEffect, useState,} from "react";
import { useInView } from "react-intersection-observer";

const statsData = [
  { label: "Total Posts", value: 1200 },
  { label: "Total Sales", value: 850 },
  { label: "Total Users", value: 500 },
  { label: "Total Review", value: 150000 },
];

const CounterSection = () => {
  const [counts, setCounts] = useState([0, 0, 0, 0]);
  const { ref, inView } = useInView({
    triggerOnce: true, // scroll kore ekbar view e asle ekbar animate hobe
  });

  useEffect(() => {
    if (inView) {
      statsData.forEach((stat, index) => {
        let start = 0;
        const end = stat.value;
        const duration = 3000; // 2 seconds
        const increment = end / (duration / 50);

        const counter = setInterval(() => {
          start += increment;
          if (start >= end) {
            start = end;
            clearInterval(counter);
          }
          setCounts(prev => {
            const newCounts = [...prev];
            newCounts[index] = Math.floor(start);
            return newCounts;
          });
        }, 50);
      });
    }
  }, [inView]);

  return (
    <section ref={ref} className="py-20 bg-gray-100 text-center">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {statsData.map((stat, index) => (
          <div key={index} className="bg-white p-10 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-blue-600">{counts[index].toLocaleString()}</h2>
            <p className="mt-2 text-gray-600">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CounterSection;