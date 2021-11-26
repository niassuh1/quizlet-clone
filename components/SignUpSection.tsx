import {
  ChangeEventHandler,
  FC,
  FormEventHandler,
  MouseEventHandler,
} from "react";
import Image from "next/image";
import Button from "./Button";
import { PassowrdField, TextField } from "./TextField";
import Link from "next/link";

interface SingUpProps {
  emailOnChange?: ChangeEventHandler;
  passwordOnChange?: ChangeEventHandler;
  confirmPasswordOnChange?: ChangeEventHandler;
  nameOnChange?: ChangeEventHandler;
  onSubmit?: FormEventHandler;
}

const SingUpSection: FC<SingUpProps> = ({
  emailOnChange,
  passwordOnChange,
  onSubmit,
  nameOnChange,
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
      <h1 className="font-semibold text-lg">Create a new account</h1>
      <Button className="border-2 w-full justify-center border-black flex items-center px-8 py-3 space-x-4 rounded-2xl transition-colors ease-in-out duration-200 hover:bg-accent-300 active:bg-accent-400">
        <Image
          alt="google icon"
          width={20}
          height={20}
          src="/images/google-logo.svg"
        />
        <span className="text-sm">Sign up With Google</span>
      </Button>
      <div className="flex w-full items-center justify-center mb-4">
        <div className="h-[1px] w-1/2 bg-accent-500" />
        <span className="mx-4 uppercase font-medium text-xs">Or</span>
        <div className="h-[1px] w-1/2 bg-accent-500" />
      </div>
      <form onSubmit={onSubmit} className="space-y-6 flex flex-col w-full">
        <TextField
          label="Email"
          className="text-sm"
          onChange={emailOnChange}
          placeholder="Enter Your Email"
          type="email"
        />
        <TextField
          onChange={nameOnChange}
          label="Name"
          className="text-sm"
          placeholder="Enter Your Name"
          type="text"
        />

        <PassowrdField
          onChange={passwordOnChange}
          label="Password"
          placeholder="Enter Your Password"
        />
        <PassowrdField
          label="Confirm Passowrd"
          placeholder="Enter Your Password Again"
          showVisibilityButton={false}
        />
        <Button
          type="submit"
          className="w-full bg-primary-300 hover:bg-primary-400 active:bg-primary-500 p-4 text-white rounded-2xl shadow-md drop-shadow-lg"
        >
          Sign Up
        </Button>
      </form>
      <div className="flex space-x-1">
        <span>Already Have An Account?</span>
        <Link href="sign-in">
          <a className="text-green font-medium">Sign in</a>
        </Link>
      </div>
    </div>
  );
};

export default SingUpSection;
