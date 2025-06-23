import React from 'react';
import filledStar from '../assets/star-filled.svg';
import halfStar from '../assets/star-half.svg';
import emptyStar from '../assets/star-empty.svg';



const Stars = ({ rating }) => {
  const numericalRating = parseFloat(rating) || 0;
  const totalStars = 5;
  const stars = [];

  for (let i = 1; i <= totalStars; i++) {
    if (numericalRating >= i) {
      stars.push(
        <img key={i} src={filledStar} alt="filled star" className="w-4 h-4" />
      );
    } else if (numericalRating >= i - 0.5) {
      
      stars.push(
        <img key={i} src={halfStar} alt="half-filled star" className="w-4 h-4" />
      );
    } else {
      stars.push(
       <img key={i} src={emptyStar} alt="empty star" className="w-4 h-4" />
      );
    }
  }

  return (
    <div className="flex">
      {stars}
    </div>
  );
};

export default Stars;