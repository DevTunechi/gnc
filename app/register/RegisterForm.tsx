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


export default function RegisterForm(){

const params = useSearchParams();

const course = params.get("course") || "";


const [step,setStep]=useState(1);
const [message,setMessage]=useState("");

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
});

}


async function submit(){

const result=schema.safeParse(form);


if(!result.success){

alert("Please complete all fields correctly");
return;

}


setMessage("Sending application...");


try{


const response = await fetch("/api/enroll",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

...form,
course

})

});


const data = await response.json();


if(data.success){

setMessage("Application submitted successfully");

setForm({
name:"",
dob:"",
address:"",
phone:"",
email:"",
reason:""
});


}else{

setMessage(data.error || "Failed to send application");

}


}catch(error){

setMessage("Something went wrong");

}


}



return (

<div className="px-5 py-12 max-w-xl mx-auto">


<h1 className="text-3xl font-bold text-blue-950">

Enroll for {course}

</h1>


<p className="mt-3 text-gray-600">

Step {step} of 3

</p>


{step===1 && <>

<input name="name" placeholder="Full Name" onChange={update} className="input"/>

<input name="dob" placeholder="Date of Birth" onChange={update} className="input"/>

</>}


{step===2 && <>

<input name="address" placeholder="Address" onChange={update} className="input"/>

<input name="phone" placeholder="Phone" onChange={update} className="input"/>

<input name="email" placeholder="Email" onChange={update} className="input"/>

</>}


{step===3 &&

<textarea
name="reason"
placeholder="Why do you want to study this course?"
onChange={update}
className="input h-32"
/>

}


<div className="mt-5 flex gap-3">


{step > 1 &&
<button
onClick={()=>setStep(step-1)}
className="border px-5 py-2 rounded"
>
Back
</button>
}


{step < 3 ?

<button
onClick={()=>setStep(step+1)}
className="bg-blue-950 text-white px-5 py-2 rounded"
>
Next
</button>

:

<button
onClick={submit}
className="bg-red-600 text-white px-5 py-2 rounded"
>
Submit
</button>

}


</div>


<p className="mt-5">
{message}
</p>


</div>

)

}
