import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import GrayBackground from "../../components/GrayBackground";
import Header from "../../components/Header";
import { SetType } from "../../types";
import prismaClient from "../../util/prismaclient";
import Image from "next/image";

//SwiperJS Stuff
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { EffectCards } from "swiper";
SwiperCore.use([EffectCards]);

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";
import FlashCard from "../../components/FlashCard";
import TabButton from "../../components/TabButton";
import TabMenu from "../../components/TabMenu";

interface SetSlugProps {
  set?: SetType;
}

const SetSlug: NextPage<SetSlugProps> = ({ set }) => {
  return (
    <div>
      <Head>
        <title>Studify</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GrayBackground />
      <Header />
      <div className="px-9">
        <h1 className="text-lg font-medium mb-4">{set?.title}</h1>
        <div className="flex w-full justify-center space-x-4 mb-6">
          <TabButton>
            <Image
              alt="flashcard"
              src="/images/flashcard-icon.svg"
              width={25}
              height={25}
            />
            <span>Flashcards</span>
          </TabButton>

          <TabButton>
            <Image
              alt="Learn"
              src="/images/learning-icon.svg"
              width={25}
              height={25}
            />
            <span>Learn</span>
          </TabButton>
        </div>

        <div className="w-[calc(100%-4rem)] max-w-[600px] mx-auto h-[300px] items-center justify-center shadow-xl">
          <Swiper effect="cards" grabCursor={true} className="rounded-lg">
            {set?.card?.map((cardValue) => {
              return (
                <SwiperSlide
                  className="flex items-center h-full w-full justify-center rounded-lg"
                  key={cardValue.id}
                >
                  <FlashCard key={cardValue.id} card={cardValue} />
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
  const slug = query.slug as string;

  const set = await prismaClient.set.findUnique({
    where: { id: slug },
    select: {
      description: true,
      id: true,
      title: true,
      card: { orderBy: { order: "asc" } },
    },
  });

  return { props: { set } };
};

export default SetSlug;