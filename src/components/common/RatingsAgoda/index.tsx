"use clinet";
import React, { useState } from "react";
import { ImageComponent } from "../index";

interface StarRatingProps {
  initialTotalStars?: number;
  trustpilot?: any;
}

const RatingAgoda: React.FC<StarRatingProps> = ({
  initialTotalStars = 5,
  trustpilot,
}) => {
  const [rating, setRating] = useState<number | null>(null);
  const [hover, setHover] = useState<number | null>(null);
  const [totalStars, setTotalStars] = useState<number>(initialTotalStars);

  return (
    <>
      {[...Array(totalStars)].map((_, index) => {
        const currentRating = index + 1;

        return (
          <label
            key={index}
            className="w-10 h-10 flex justify-center items-center "
            style={{
              background: trustpilot
                ? // @ts-ignore

                  currentRating <= (hover || rating)
                  ? "#219653"
                  : "#DCDCE6"
                : // @ts-ignore

                currentRating <= (hover || rating)
                ? "#ff8622"
                : "#DCDCE6",
            }}
            // onMouseEnter={() => setHover(currentRating)}
            // onMouseLeave={() => setHover(null)}
          >
            <input
              type="radio"
              name="rating"
              value={currentRating}
              // onChange={() => setRating(currentRating)}
            />
            <span>
              <ImageComponent
                src="/assets/images/app/Shape.svg"
                fill
                figClassName="w-[28px] h-[26.5px] "
                className="object-contain"
                alt=""
              />
            </span>
          </label>
        );
      })}
    </>
  );
};

export default RatingAgoda;
