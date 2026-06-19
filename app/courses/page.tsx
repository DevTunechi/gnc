import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { courses } from "@/lib/courses";


export default function Courses(){

return (

<>

<PageHeader
title="Our Courses"
description="Choose a program and begin your technology journey."
/>


<section className="px-5 py-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">


{courses.map((course)=>(


<Link
key={course.title}
href={`/register?course=${encodeURIComponent(course.title)}`}
className="overflow-hidden rounded-xl border bg-white shadow-sm hover:shadow-lg transition"
>


<div className="relative h-48">

<img
src={course.image}
alt={course.title}
className="w-full h-full object-cover"
/>
</div>


<div className="p-5">


<h2 className="font-bold text-xl text-blue-950">

{course.title}

</h2>


<p className="mt-3 text-gray-600">

{course.description}

</p>


<p className="mt-4 text-red-600 font-semibold">

Enroll for this course →

</p>


</div>


</Link>


))}


</section>

</>

)

}
