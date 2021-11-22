import { NextPage } from "next";
import Image from "next/image";

const SignIn: NextPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex flex-col w-[200px] absolute top-0 self-start">
        <div className="w-full bg-accent-400 h-[50px]" />
        <div className="w-2/3 bg-accent-400 h-[50px]" />
        <div className="w-1/3 bg-accent-400 h-[50px]" />
      </div>
      <div className="flex w-1/2 justify-center mb-3">
        <Image
          width={80}
          height={80}
          alt="logo"
          src="/images/logo.svg"
          layout="fixed"
        />
      </div>
      <h1 className="text-xl font-semibold text-accent-500">Studilet</h1>
    </div>
  );
};

export default SignIn;
