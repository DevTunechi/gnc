const reasons = [

"Practical hands-on technology training",

"Industry relevant digital skills",

"Experienced instructors",

"Certificate-backed programs",

"Career-focused learning approach"

];


export default function WhyChoose(){

return (

<section className="bg-gray-50 px-5 py-14">


<div className="max-w-6xl mx-auto">


<h2 className="text-3xl font-bold text-blue-950 text-center">

Why Choose Global Net Computer Training Institute?

</h2>



<div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">


{reasons.map((item)=>(

<div
key={item}
className="bg-white p-5 rounded-xl shadow-sm text-center"
>

<div className="text-red-600 text-2xl">
✓
</div>


<p className="mt-3 text-sm text-gray-700">

{item}

</p>


</div>


))}


</div>


</div>


</section>

)

}
