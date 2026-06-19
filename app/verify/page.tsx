import PageHeader from "@/components/PageHeader";
import Footer from "@/components/Footer";


export default function Verify(){

return(
<>

<PageHeader
title="Verify Certificate"
description="Search and verify certificates issued by Global Net Computer Training Institute."
/>


<section className="px-5 py-12 max-w-xl mx-auto">

<input
className="w-full border p-3 rounded-lg"
placeholder="Enter student name or certificate number"
/>


<button
className="mt-5 bg-blue-950 text-white px-6 py-3 rounded-lg"
>
Verify Certificate
</button>


</section>


<Footer/>

</>
)

}
