"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {

const [open,setOpen] = useState(false);

return (

<nav className="bg-white border-b">

<div className="flex items-center justify-between px-5 py-3">


<Link href="/" className="flex items-center gap-2">

<Image
src="/images/logo.png"
width={38}
height={38}
style={{height:"auto"}}
className="object-contain"
alt="Global Net Computer Training Institute logo"
/>

<div className="leading-tight">

<p className="font-bold text-sm text-blue-950">
GNC Training Institute
</p>

<p className="text-[10px] text-gray-500">
Global Net Computer Training Institute
</p>

</div>

</Link>



<button
onClick={()=>setOpen(!open)}
className="md:hidden text-xl text-blue-950"
>
☰
</button>



<div className="hidden md:flex items-center gap-5 text-sm">

<Link href="/">
Home
</Link>

<Link href="/about">
About
</Link>

<Link href="/courses">
Courses
</Link>

<Link href="/verify">
Verify
</Link>

<Link href="/contact">
Contact
</Link>


<Link
href="/register"
className="bg-blue-950 text-white px-4 py-2 rounded-lg"
>
Enroll
</Link>

</div>


</div>



{open && (

<div className="md:hidden px-5 pb-4 flex flex-col gap-3 text-sm">

<Link href="/">
Home
</Link>

<Link href="/about">
About
</Link>

<Link href="/courses">
Courses
</Link>

<Link href="/verify">
Verify Certificate
</Link>

<Link href="/contact">
Contact
</Link>


<Link
href="/register"
className="bg-blue-950 text-white p-3 rounded-lg text-center"
>
Enroll Now
</Link>


</div>

)}


</nav>

)

}
