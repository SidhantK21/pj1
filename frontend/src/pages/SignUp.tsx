import { ParticlesDemo } from "../ui/Quote";
import { SignupFormDemo } from "../components/formSignUp";

export const SignUpPg = () => {
  return (
    <div className="overflow-hidden flex justify-between h-screen">
      <div className="mt-4 ml-5 w-1/3">
        <SignupFormDemo />
      </div>
      <div className="w-2/3">
        <ParticlesDemo />
      </div>
    </div>
  );
};
