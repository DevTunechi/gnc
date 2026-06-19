export default function PageHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <section className="bg-blue-950 text-white py-16 px-5 text-center">
      <h1 className="text-4xl font-bold">
        {title}
      </h1>

      <p className="mt-4 max-w-2xl mx-auto text-gray-200">
        {description}
      </p>
    </section>
  );
}
