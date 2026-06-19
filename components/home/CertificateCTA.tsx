import Link from "next/link";


export default function CertificateCTA(){

return (

<section className="px-5 py-14">


<div className="
max-w-5xl
mx-auto
rounded-2xl
bg-blue-950
text-white
p-8
sm:p-12
text-center
">


<h2 className="text-3xl font-bold">

Verify Your GNC Certificate

</h2>


<p className="mt-4 text-gray-200">

Confirm certificates issued by Global Net Computer Training Institute
using student name or certificate number.

</p>



<Link

href="/verify"

className="
inline-block
mt-6
bg-red-600
px-7
py-3
rounded-xl
font-semibold
"

>

Verify Certificate

</Link>



</div>


</section>

)

}
