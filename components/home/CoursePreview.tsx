import Link from "next/link";
import { courses } from "@/lib/courses";


export default function CoursePreview(){

return (

<section className="px-5 py-14 max-w-6xl mx-auto">


<div className="text-center mb-10">

<h2 className="text-3xl font-bold text-blue-950">
Explore Our Courses
</h2>

<p className="mt-3 text-gray-600">
Practical technology training designed for digital careers.
</p>

</div>



<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">


{courses.slice(0,6).map((course)=>(


<Link
key={course.title}
href={`/register?course=${encodeURIComponent(course.title)}`}
className="rounded-xl overflow-hidden border shadow-sm hover:shadow-lg transition"
>


<div className="h-44 overflow-hidden">

<img

src={course.image}

alt={course.title}

className="w-full h-full object-cover"

/>

</div>


<div className="p-5">


<h3 className="font-bold text-lg text-blue-950">

{course.title}

</h3>


<p className="mt-2 text-sm text-gray-600">

{course.description}

</p>


</div>


</Link>


))}


</div>


<Link
href="/courses"
className="block text-center mt-10 text-red-600 font-semibold"
>

View All Courses →

</Link>


</section>

)

}
