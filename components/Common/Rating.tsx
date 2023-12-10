import React, { useMemo } from 'react';

interface RatingProps {
  rating: number;
  styleOverride?: string;
}

const Rating: React.FC<RatingProps> = (props) => {
  const { rating, styleOverride } = props;

  const ratingArr = useMemo(() => {
    const roundedRating = Math.round(rating);
    return Array(roundedRating).fill(0);
  }, [rating]);

  return (
    <div className={styleOverride}>
      { ratingArr.map((_, idx) => <span key={idx}>⭐</span>) }
    </div>
  );
};

export default Rating;
