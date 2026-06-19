import { Suspense } from "react";
import RegisterForm from "./RegisterForm";


export default function Register(){

return (

<Suspense fallback={<p className="p-5">Loading...</p>}>

<RegisterForm />

</Suspense>

)

}
