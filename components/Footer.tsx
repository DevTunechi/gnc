export default function Footer() {
  return (
    <footer className="bg-blue-950 text-white px-5 py-10">
      <div className="max-w-6xl mx-auto">

        <h2 className="font-bold text-xl">
          Global Net Computer Training Institute
        </h2>

        <p className="mt-3 text-gray-300 text-sm">
          Empowering the next generation of digital professionals
          through practical technology education.
        </p>

        <div className="mt-6 text-sm text-gray-300">

          <p>
            Phone: +234 805 6316 946
          </p>

          <p className="mt-2">
            Email: info@gnctraininginstitute.com
          </p>

          <p className="mt-2">
            Address:
            <br />
            Iyana School Bus Stop,
            <br />
            42 Great Challenge Rd, IBA,
            <br />
            Lagos 300001, Lagos, Nigeria
          </p>

          <p className="mt-4">
            © {new Date().getFullYear()} Global Net Computer Training Institute.
            All rights reserved.
          </p>

        </div>

      </div>
    </footer>
  );
}
