import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import React, { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import GrayBackground from "../../components/GrayBackground";
import Header from "../../components/Header";
import QuizCard from "../../components/QuizCard";
import { SetType } from "../../types";
import prismaClient from "../../util/prismaclient";
import IconButton from "../../components/IconButton";
import { MdDelete, MdEdit } from "react-icons/md";
import { useAuthContext } from "../../context/Auth";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";

interface LibraryProps {
  userSets?: SetType[];
  creatorId?: string;
}

const Library: NextPage<LibraryProps> = ({ userSets, creatorId }) => {
  const { user } = useAuthContext();
  const [isCreator, setIsCreator] = useState(false);
  useEffect(() => {
    setIsCreator(user?.id == creatorId);
    return () => {};
  }, []);
  return (
    <div>
      <Head>
        <title>Studify</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GrayBackground />
      <Header />

      <div className="px-9 flex flex-col">
        <h1 className="text-xl font-medium mb-4">Your library</h1>
        <div className="flex w-full ">
          <Swiper
            slidesPerView={1}
            breakpoints={{
              805: {
                slidesPerView: 2,
              },
            }}
            spaceBetween={20}
            className="flex w-full"
          >
            {userSets?.map((set) => {
              return (
                <SwiperSlide className="pb-16" key={set.id}>
                  <QuizCard
                    title={set.title}
                    amount={set.card?.length}
                    description={set.description}
                    footer={
                      isCreator ? (
                        <div className="flex  space-x-2">
                          <Link href={`/set/edit/${set.id}`} passHref>
                            <IconButton
                              Icon={MdEdit}
                              className="self-center hover:bg-accent-400"
                            />
                          </Link>
                          <IconButton
                            Icon={MdDelete}
                            className="self-center hover:bg-accent-400"
                          />
                        </div>
                      ) : (
                        <></>
                      )
                    }
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const creatorId = query.id as string;
  const userSets = await prismaClient.set.findMany({
    where: {
      creatorId: {
        equals: creatorId,
      },
    },
    select: {
      title: true,
      id: true,
      description: true,
      creatorId: true,
      card: true,
    },
  });
  return { props: { userSets, creatorId } };
};

export default Library;