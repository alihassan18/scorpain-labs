"use clinet";
import React, { useState } from "react";
import { ImageComponent } from "../index";

interface StarRatingProps {
  initialTotalStars?: number;
  trustpilot?: any;
  disableClick?: boolean;
}

const RatingTripadvisor: React.FC<StarRatingProps> = ({
  initialTotalStars = 5,
  trustpilot,
  disableClick = false,
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
            className="w-8 h-8 rounded-full border-[3px] border-[#3A8E1B] flex justify-center items-center "
          >
            <input
              type="radio"
              name="rating"
              value={currentRating}
              onChange={
                !disableClick ? () => setRating(currentRating) : () => null
              }
            />

            {
              // @ts-ignore

              currentRating <= (hover || rating) ? (
                <img
                  src="/assets/images/circles.png"
                  onMouseEnter={
                    !disableClick ? () => setHover(currentRating) : () => null
                  }
                  onMouseLeave={
                    !disableClick ? () => setHover(null) : () => null
                  }
                />
              ) : (
                <div
                  className=" h-4 rounded-full bg-[#3A8E1B]"
                  style={{
                    width:
                      // @ts-ignore
                      currentRating <= (hover || rating) ? "" : "16px",
                  }}
                  onMouseEnter={
                    !disableClick ? () => setHover(currentRating) : () => null
                  }
                  onMouseLeave={
                    !disableClick ? () => setHover(null) : () => null
                  }
                ></div>
              )
            }
          </label>
        );
      })}
    </>
  );
};

export default RatingTripadvisor;
