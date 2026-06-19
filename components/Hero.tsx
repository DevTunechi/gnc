import Link from "next/link";

export default function Hero(){

return(

<section
className="relative min-h-[85vh] flex items-center px-5 bg-cover bg-center"
style={{
backgroundImage:
"url(https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1600&q=80)"
}}
>


<div className="absolute inset-0 bg-blue-950/75"></div>


<div className="relative z-10 max-w-3xl text-white">


<p className="text-white text-lg sm:text-xl uppercase tracking-widest font-semibold">

Global Net Computer Training Institute

</p>


<h1 className="
mt-5
text-4xl
sm:text-6xl
font-bold
leading-tight
">

Empowering The Next Generation Of Digital Professionals

</h1>


<p className="mt-6 text-gray-200">

Gain practical technology skills through professional training
designed for real-world careers.

</p>



<div className="mt-8 flex flex-col sm:flex-row gap-4">


<Link
href="/courses"
className="
bg-red-600
px-7
py-3
rounded-xl
font-semibold
text-center
"
>

Start Learning

</Link>



<Link
href="/verify"
className="
border border-white
px-7
py-3
rounded-xl
text-center
"
>

Verify Certificate

</Link>


</div>


</div>


</section>

)

}
