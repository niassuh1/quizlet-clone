import type { NextPage } from "next";
import Head from "next/head";
import { FC } from "react";
import Header from "../components/Header";
import QuizCard from "../components/QuizCard";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Studilet</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className=" bg-accent-300 w-full h-[280px] absolute z-[-1]" />
      <Header />

      <div className="px-9">
        <h1 className="text-xl mb-4">Latest Quizzes</h1>
        <QuizCardGrid>
          <QuizCard
            title="Quiz Title"
            amount="2"
            creatorName="Hussain"
            description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam consectetur repellendus velit dicta asperiores odit?"
          />
          <QuizCard
            title="Quiz Title"
            amount="12"
            creatorName="Hussain"
            description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam consectetur repellendus velit dicta asperiores odit?"
          />
          <QuizCard
            title="Quiz Title"
            amount="36"
            creatorName="Hussain"
            description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam consectetur repellendus velit dicta asperiores odit?"
          />
          <QuizCard
            title="Quiz Title"
            amount="36"
            creatorName="Hussain"
            description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam consectetur repellendus velit dicta asperiores odit?"
          />
          <QuizCard
            title="Quiz Title"
            amount="36"
            creatorName="Hussain"
            description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam consectetur repellendus velit dicta asperiores odit?"
          />
          <QuizCard
            title="Quiz Title"
            amount="36"
            creatorName="Hussain"
            description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam consectetur repellendus velit dicta asperiores odit?"
          />
        </QuizCardGrid>
      </div>
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

export default Home;
