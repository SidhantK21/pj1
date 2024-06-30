import React, { useState } from "react";
import { Label } from "@radix-ui/react-label";
import { Input } from "./signUpform";
import { cn } from "../utils/cn";
import { Link, useNavigate } from "react-router-dom";
import { SignIInp} from "@proje1/blogwe-common";
import { BACKEND_URL } from "../config";
import  axios  from "axios";

export function SigninFormDemo() {
  const navigate=useNavigate();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  const [signInDet,setDet]=useState<SignIInp>({
    email:"",
    password:""
  })

  async function sendSignIReq(){
    try{
      const response=await axios.post(`${BACKEND_URL}/api/v1/user/signIn`,signInDet);
      const jwt=response.data.jwt;
      localStorage.setItem("token",jwt);
      console.log("SignIn success");

      // after this request succeds navigate to the dashboad 
      navigate("/blogs");

    }
    catch(e)
    {
      console.log(e);
      alert("SignIn failed !")
    }
  }
  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome Back
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Great to see you here again!
      </p>

      <form className="my-8" onSubmit={handleSubmit}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" placeholder="projectmayhem@fc.com" type="email" onChange={(e)=>{
            setDet({...signInDet,
              email:e.target.value
              })
          }}  />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input id="password" placeholder="••••••••" type="password" onChange={(e)=>{
            setDet({...signInDet,
            password:e.target.value
            })
          }} />
        </LabelInputContainer>

        <button
          onClick={sendSignIReq}

          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Sign In &rarr;
          <BottomGradient />
        </button>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
        <p className="text-center text-sm text-neutral-600 dark:text-neutral-300">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
