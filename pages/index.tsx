import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { FC, useEffect } from "react";
import Button from "../components/Button";
import Header from "../components/Header";
import QuizCard from "../components/QuizCard";
import { SetType } from "../types";
import supabase from "../util/supabase";
import { prisma, PrismaClient } from "@prisma/client";
import prismaClient from "../util/prismaclient";
import GrayBackground from "../components/GrayBackground";
import Link from "next/link";
import { useRouter } from "next/dist/client/router";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

interface HomeProps {
  sets?: SetType[];
}

const Home: NextPage<HomeProps> = ({ sets }) => {
  const route = useRouter();
  console.log(route.query);

  useEffect(() => {
    if (route.query.action == "delete") {
      toast.success("👍 Deleted Successfully");
    }

    return () => {};
  });

  return (
    <div>
      <Head>
        <title>Studify</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ToastContainer />
      <GrayBackground />
      <Header />

      <div className="px-9 mb-6">
        <h1 className="text-xl mb-4 font-medium">Latest Quizzes</h1>
        <QuizCardGrid>
          {sets!.map((set) => {
            return (
              <QuizCard
                key={set.id}
                title={set.title}
                amount={set.card!.length}
                description={set.description}
                id={set.id}
              />
            );
          })}
        </QuizCardGrid>
      </div>
      <div className="px-9 w-full flex flex-col space-y-4">
        <h1 className="mx-auto text-xl font-medium text-green">Interested?</h1>
        <Link href="/set/create">
          <a className="bg-primary-400 text-xs flex justify-center items-center sm:text-base shadow-lg text-white w-full sm:w-1/3 mx-auto px-4 py-2 rounded-xl hover:bg-primary-500">
            Create Your Own
          </a>
        </Link>
      </div>
      <footer className="my-12" />
    </div>
  );
};

const QuizCardGrid: FC = ({ children }) => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {children}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const sets = await prismaClient.set.findMany({
    select: {
      card: true,
      description: true,
      id: true,
      title: true,
      creatorId: true,
    },
    take: 6,
    orderBy: { created_at: "desc" },
  });

  return { props: { sets } };
};

export default Home;
