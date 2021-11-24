import { NextPage } from "next";
import Head from "next/head";
import { ChangeEventHandler, FormEventHandler, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import SingUpSection from "../components/SignUpSection";
import "react-toastify/dist/ReactToastify.css";
import supabase from "../util/supabase";
import prismaClient from "../util/prismaclient";
import axios from "axios";
import { useAuthContext } from "../context/Auth";
import { useRouter } from "next/dist/client/router";

const SignUp: NextPage = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pwd, setPwd] = useState("");
  const { user } = useAuthContext();

  const router = useRouter();

  //If the user is authenticated, then go back
  if (user) router.back();

  const handleEmailChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPwd(e.target.value);
  };
  const handleNameChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setName(e.target.value);
  };

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    if (email == "" || name == "" || pwd == "") {
      toast.info("😪 Some fields are empty");
      return;
    }

    try {
      const user = await supabase.auth.signUp({ email: email, password: pwd });
      const id = user.user?.id;
      if (!user.error) {
        toast("🥳 Account has been created! Check your email");
      } else if (user.error) return;
      await axios.post("api/user/create", { email, name, id });
    } catch {}
  };
  return (
    <div>
      <Head>
        <title>Studify | Sign Up</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ToastContainer position="top-center" />

      <div className="flex min-h-screen">
        <SingUpSection
          emailOnChange={handleEmailChange}
          passwordOnChange={handlePasswordChange}
          nameOnChange={handleNameChange}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default SignUp;
