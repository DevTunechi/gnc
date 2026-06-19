"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { z } from "zod";


const schema = z.object({

name:z.string().min(3),

dob:z.string().min(3),

address:z.string().min(5),

phone:z.string().min(10),

email:z.string().email(),

reason:z.string().min(10),

});


export default function Register(){


const params = useSearchParams();

const course =
params.get("course") || "";


const [step,setStep]=useState(1);

const [form,setForm]=useState({

name:"",
dob:"",
address:"",
phone:"",
email:"",
reason:""

});


function update(e:any){

setForm({

...form,

[e.target.name]:e.target.value

})

}



function next(){

if(step < 3)

setStep(step+1);

}



function back(){

setStep(step-1);

}



async function submit(){


const result=schema.safeParse(form);


if(!result.success){

alert("Please complete all fields correctly");

return;

}


await fetch("/api/enroll",{

method:"POST",

body:JSON.stringify({

...form,

course

})

});


alert("Application submitted successfully");


}



return (

<main className="px-5 py-12 max-w-xl mx-auto">


<h1 className="text-3xl font-bold text-blue-950">

Enroll for {course}

</h1>


<p className="mt-4 text-gray-600">

Step {step} of 3

</p>



{step===1 && (

<>

<input
name="name"
placeholder="Full Name"
onChange={update}
className="input"
/>


<input
name="dob"
placeholder="Date of Birth"
onChange={update}
className="input"
/>


</>

)}



{step===2 && (

<>

<input
name="address"
placeholder="Address"
onChange={update}
className="input"
/>


<input
name="phone"
placeholder="Phone"
onChange={update}
className="input"
/>


<input
name="email"
placeholder="Email"
onChange={update}
className="input"
/>


</>

)}



{step===3 && (

<textarea
name="reason"
placeholder="Why do you want to study this course?"
onChange={update}
className="input h-32"
/>

)}




<div className="mt-6 flex gap-3">


{step>1 &&

<button
onClick={back}
className="border px-5 py-2 rounded"
>

Back

</button>

}



{step<3 &&

<button
onClick={next}
className="bg-blue-950 text-white px-5 py-2 rounded"
>

Next

</button>

}



{step===3 &&

<button
onClick={submit}
className="bg-red-600 text-white px-5 py-2 rounded"
>

Submit

</button>

}


</div>


</main>

)

}
