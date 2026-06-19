import PageHeader from "@/components/PageHeader";

export default function About(){

return (

<>

<PageHeader
title="About Global Net Computer Training Institute"
description="We provide practical technology education designed to prepare students for digital careers."
/>


<section className="px-5 py-12 max-w-5xl mx-auto">

<h2 className="text-2xl font-bold text-blue-950">
Our Mission
</h2>


<p className="mt-4 text-gray-600">
Our mission is to provide accessible, practical and career-focused
technology training that empowers individuals with skills needed
in the digital economy.
</p>


<h2 className="mt-10 text-2xl font-bold text-blue-950">
Why Choose GNC?
</h2>


<ul className="mt-4 space-y-3 text-gray-600">

<li>✓ Practical hands-on learning</li>
<li>✓ Industry-focused training</li>
<li>✓ Experienced instructors</li>
<li>✓ Certificate-backed programs</li>

</ul>


</section>


</>

)

}
