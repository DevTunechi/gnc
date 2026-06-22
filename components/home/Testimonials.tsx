const testimonials = [
  {
    name: "Adebayo Samuel",
    role: "Software Development Student",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    text: "GNC helped me gain practical skills and confidence in technology. I was able to build real projects after training."
  },
  {
    name: "Fatima Bello",
    role: "Data Analysis Student",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    text: "The training approach focuses on real-world applications. I now understand how to use data in real business decisions."
  },
  {
    name: "Chinedu Okafor",
    role: "Web Development Student",
    image: "https://randomuser.me/api/portraits/men/54.jpg",
    text: "A great environment for developing digital skills. The instructors explain everything in a very practical way."
  },
  {
    name: "Aisha Mohammed",
    role: "UI/UX Design Student",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    text: "Before GNC, I had no direction in tech. Now I can confidently design user-friendly interfaces."
  },
  {
    name: "Ibrahim Yusuf",
    role: "IT Support Student",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
    text: "The hands-on training made all the difference. I can now handle real IT support tasks."
  },
  {
    name: "Ngozi Eze",
    role: "Digital Skills Student",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    text: "Very practical learning experience. I recommend GNC to anyone serious about tech skills."
  }
];

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
                src={item.image}
                alt={item.name}
                className="w-12 h-12 rounded-full object-cover"
              />

              <div>

                <h3 className="font-semibold text-blue-950">
                  {item.name}
                </h3>

                <p className="text-xs text-gray-500">
                  {item.role}
                </p>

              </div>

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
