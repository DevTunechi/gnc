const testimonials = [
  {
    name: "Emeka Okafor",
    text: "GNC helped me gain practical skills and confidence in technology."
  },
  {
    name: "Aisha Bello",
    text: "The training approach focuses on real-world applications."
  },
  {
    name: "Tunde Akin",
    text: "A great environment for developing digital skills."
  },
  {
    name: "Fatima Yusuf",
    text: "Very practical lessons and supportive tutors."
  },
  {
    name: "Ibrahim Musa",
    text: "I landed my first tech job after this training."
  },
  {
    name: "Chinedu Nwankwo",
    text: "Hands-on learning made everything easy to understand."
  }
];

function avatar(name: string) {
  return `https://api.dicebear.com/7.x/personas/svg?seed=${encodeURIComponent(name)}`;
}

export default function Testimonials() {
  return (
    <section className="px-5 py-14 bg-gray-50">
      <h2 className="text-3xl font-bold text-blue-950 text-center">
        What Our Students Say
      </h2>

      <div className="mt-10 grid gap-6 md:grid-cols-3 max-w-6xl mx-auto">
        {testimonials.map((item) => (
          <div
            key={item.name}
            className="bg-white rounded-xl p-6 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-4">
              <img
                src={avatar(item.name)}
                alt={item.name}
                className="w-12 h-12 rounded-full"
              />
              <h3 className="font-semibold text-blue-950">
                {item.name}
              </h3>
            </div>

            <p className="text-gray-600">
              "{item.text}"
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
