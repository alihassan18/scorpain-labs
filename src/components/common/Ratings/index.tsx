import React, { useState, useEffect } from "react";

interface StarRatingProps {
  initialTotalStars?: number;
  rating?: string; // Rating received from props
}

const StarRating: React.FC<StarRatingProps> = ({
  initialTotalStars = 5,
  rating: receivedRating = '0',
}) => {
  const [rating, setRating] = useState<string | null>(null);
  const [hover, setHover] = useState<number | null>(null);
  const [totalStars, setTotalStars] = useState<number>(initialTotalStars);

  // Update rating when receivedRating changes
  useEffect(() => {
    setRating(receivedRating);
  }, [receivedRating]);

  return (
    <>
      {[...Array(totalStars)].map((_, index) => {
        const currentRating:string = index + "1";

        return (
          <label key={index}>
            <input
              type="radio"
              name="rating"
              className=""
              value={currentRating}
              // onChange={() => setRating(currentRating)}
              checked={currentRating === rating} // Check if current star is rated
            />
            <span
              className="star "
              style={{
                color:
                  // @ts-ignore
                  currentRating <= (hover || rating) ? "#DFB300" : "#CCE4F5",
              }}
              // onMouseEnter={() => setHover(currentRating)} // Highlight stars on hover
              // onMouseLeave={() => setHover(null)}
            >
              {/* &#9733; */}
              <i className="icon-fillstar text-base cursor-default"></i>
            </span>
          </label>
        );
      })}
    </>
  );
};

export default StarRating;
