
const testimonials = [

{
name:"Student Success Story",
text:"GNC helped me gain practical skills and confidence in technology."
},

{
name:"Career Growth",
text:"The training approach focuses on real-world applications."
},

{
name:"Professional Learning",
text:"A great environment for developing digital skills."
}

];


export default function Testimonials(){


return (

<section className="px-5 py-14 bg-gray-50">


<h2 className="text-3xl font-bold text-blue-950 text-center">

What Our Students Say

</h2>



<div className="mt-10 grid gap-6 md:grid-cols-3 max-w-6xl mx-auto">


{testimonials.map((item)=>(


<div
key={item.name}
className="bg-white rounded-xl p-6 shadow-sm"
>


<p className="text-gray-600">

"{item.text}"

</p>


<h3 className="mt-4 font-semibold text-blue-950">

{item.name}

</h3>


</div>


))}


</div>


</section>

)

}
