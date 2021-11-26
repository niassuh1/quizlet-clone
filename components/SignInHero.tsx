import React from "react";
import SetCard from "./SetCard";
import Image from "next/image";

const SignInHero = () => {
  return (
    <div className="hidden lg:flex lg:flex-col w-1/2 h-screen bg-primary-400 relative px-6">
      <div className="fle w-full justify-center">
        <Image
          width={550}
          height={550}
          alt="person studying"
          src="/images/student-studying.svg"
          layout="intrinsic"
        />
      </div>
      <h1 className="flex flex-col text-6xl text-white">
        <span className="font-extralight">Study</span>
        <span className="font-medium">Effectively!</span>
      </h1>
      <div className="absolute w-[70%] h-full">
        <span className="scale-75 absolute w-full left-20 top-0">
          <SetCard
            title="Math Quiz"
            amount="22"
            description="Quick recap for calculus"
          />
        </span>
        <span className="scale-[0.65] absolute w-[calc(100%+2em)] top-16 left-[9.5rem]">
          <SetCard
            title="Physics Chapter 1"
            amount="22"
            description="A fast review for final exam, covering Chapters 1 and 2"
          />
        </span>
      </div>
    </div>
  );
};

export default SignInHero;
