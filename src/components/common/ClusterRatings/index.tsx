import React, { useState, useEffect } from "react";

interface StarRatingProps {
  initialTotalStars?: number;
  rating?: number; // Rating received from props
}

const ClusterRating: React.FC<StarRatingProps> = ({
  initialTotalStars = 5,
  rating: receivedRating = 4,
}) => {
  const [rating, setRating] = useState<number | null>(null);
  const [hover, setHover] = useState<number | null>(null);
  const [totalStars, setTotalStars] = useState<number>(initialTotalStars);

  // Update rating when receivedRating changes
  useEffect(() => {
    setRating(receivedRating);
  }, [receivedRating]);

  return (
    <>
      {[...Array(totalStars)].map((_, index) => {
        const currentRating = index + 1;

        return (
          // @ts-ignore

          <label key={index}>
            <input
              type="radio"
              name="rating"
              value={currentRating}
              onChange={() => setRating(currentRating)}
              // @ts-ignore
              checked={rating} // Check if current star is rated
            />
            <span
              className="star"
              style={{
                color:
                  // @ts-ignore
                  currentRating <= rating ? "#FBBC04" : "#CCE4F5",
              }}
              // onMouseEnter={() => setHover(currentRating)}
              // onMouseLeave={() => setHover(null)}
            >
              {/* &#9733; */}
              <i className="icon-fillstar text-base"></i>
            </span>
          </label>
        );
      })}
    </>
  );
};

export default ClusterRating;
