import React, { FC } from "react";
import { CardType } from "../types";
//SwiperJS Stuff
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { EffectCards } from "swiper";
import StudyCard from "./StudyCard";
SwiperCore.use([EffectCards]);

interface FlashCardType {
  cards?: CardType[];
}

const FlashCards: FC<FlashCardType> = ({ cards }) => {
  return (
    <Swiper
      touchRatio={0.8}
      effect="cards"
      grabCursor={true}
      className="rounded-lg"
    >
      {cards!.map((cardValue) => {
        return (
          <SwiperSlide
            className="flex items-center h-full w-full justify-center rounded-lg shadow-lg"
            key={cardValue.id}
          >
            <StudyCard key={cardValue.id} card={cardValue} />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default FlashCards;
