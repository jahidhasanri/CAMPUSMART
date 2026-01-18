const testimonials = [
  {
    name: "Arafat Hossain",
    role: "BUBT Student",
    text: "CampusMart helped me sell my old books within hours. Super smooth experience!"
  },
  {
    name: "Nusrat Jahan",
    role: "NSU Student",
    text: "Very reliable platform. I found a roommate from my own campus easily."
  },
  {
    name: "Rafi Ahmed",
    role: "DU Student",
    text: "Simple UI and trusted users. CampusMart is perfect for students."
  },
  {
    name: "Tasnim Ara",
    role: "AIUB Student",
    text: "Posting ads is super easy and response is fast!"
  },
  {
    name: "Shakib Hasan",
    role: "BRAC Student",
    text: "Loved the student-only feature. Feels safe and authentic."
  },
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* Title */}
        <h2 className="text-4xl font-bold text-center mb-16">
          What Students Say About <span className="text-[#3b5d50]">CampusMart</span>
        </h2>

        {/* TOP ROW → LEFT TO RIGHT */}
        <div className="relative mb-10 overflow-hidden">
          <div className="flex gap-6 animate-marquee hover:[animation-play-state:paused]">
            {[...testimonials, ...testimonials].map((item, i) => (
              <TestimonialCard key={i} {...item} />
            ))}
          </div>
        </div>

        {/* BOTTOM ROW → RIGHT TO LEFT */}
        <div className="relative overflow-hidden">
          <div className="flex gap-6 animate-marquee-reverse hover:[animation-play-state:paused]">
            {[...testimonials, ...testimonials].map((item, i) => (
              <TestimonialCard key={i} {...item} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

const TestimonialCard = ({ name, role, text }) => {
  return (
    <div className="min-w-[320px] max-w-[320px] bg-gray-50 rounded-xl p-6 shadow-sm">
      <p className="text-4xl text-[#3b5d50] mb-2">“</p>
      <p className="text-gray-600 text-sm mb-6">{text}</p>

      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[#3b5d50] text-white flex items-center justify-center font-semibold">
          {name.charAt(0)}
        </div>
        <div>
          <h4 className="text-sm font-semibold">{name}</h4>
          <p className="text-xs text-gray-500">{role}</p>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
