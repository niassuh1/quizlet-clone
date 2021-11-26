import { ChangeEventHandler, FC, FormEventHandler } from "react";
import Image from "next/image";
import Button from "./Button";
import { PassowrdField, TextField } from "./TextField";
import Link from "next/link";

interface SingInProps {
  emailOnChange?: ChangeEventHandler;
  passwordOnChange?: ChangeEventHandler;
  onSubmit?: FormEventHandler;
}

const SignInSection: FC<SingInProps> = ({
  emailOnChange,
  passwordOnChange,
  onSubmit,
}) => {
  return (
    <div className="flex flex-col items-center space-y-6 justify-center w-full min-w-min max-w-sm mx-auto px-4">
      <div className="flex flex-col w-[200px] absolute top-0 left-0 self-start">
        <div className="w-full bg-accent-400 h-[50px]" />
        <div className="w-2/3 bg-accent-400 h-[50px]" />
        <div className="w-1/3 bg-accent-400 h-[50px]" />
      </div>
      <div className="flex w-1/2 justify-center">
        <Image
          width={70}
          height={70}
          alt="logo"
          src="/images/logo.svg"
          layout="fixed"
        />
      </div>
      <h1 className="text-lg font-semibold text-accent-500 mb-4">Studify</h1>
      <span className="flex items-center">
        <span className="text-3xl">👋</span>
        <h1 className="font-semibold text-3xl ml-1 "> Welcome</h1>
      </span>
      {/* <Button className="border-2 w-full justify-center border-black flex items-center px-8 py-3 space-x-4 rounded-2xl transition-colors ease-in-out duration-200 hover:bg-accent-300 active:bg-accent-400">
        <Image
          alt="google icon"
          width={20}
          height={20}
          src="/images/google-logo.svg"
        />
        <span className="text-sm">Sign in With Google</span>
      </Button>
      <div className="flex w-full items-center justify-center mb-4">
        <div className="h-[1px] w-1/2 bg-accent-500" />
        <span className="mx-4 uppercase font-medium text-xs">Or</span>
        <div className="h-[1px] w-1/2 bg-accent-500" />
      </div> */}
      <form onSubmit={onSubmit} className="space-y-6 flex flex-col w-full">
        <TextField
          className="text-sm"
          label="Email"
          placeholder="Enter Your Email"
          onChange={emailOnChange}
          type="email"
        />

        <PassowrdField
          label="Password"
          placeholder="Enter Your Password"
          onChange={passwordOnChange}
        />
        <Button
          className="w-full bg-primary-300 hover:bg-primary-400 active:bg-primary-500 p-4 text-white rounded-2xl shadow-md drop-shadow-lg"
          type="submit"
        >
          Sign In
        </Button>
      </form>
      <div className="flex space-x-1">
        <span>Not Registered?</span>
        <Link href="sign-up">
          <a className="text-green font-medium">Sign Up</a>
        </Link>
      </div>
    </div>
  );
};

export default SignInSection;
