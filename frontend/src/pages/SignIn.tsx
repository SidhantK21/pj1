import { SigninFormDemo } from "../components/formSignIn";
import { ParticlesDemo } from "../ui/Quote";

export const SignIn=()=>{
    return(
        <>
        <div className="overflow-hidden flex justify-between">
            <div className="mt-4 ml-5 w-1/3">
                <SigninFormDemo />
            </div>
            <div className="w-2/3">
                <ParticlesDemo />
            </div>
        </div>
        </>
    );
}