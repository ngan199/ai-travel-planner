import React, { useEffect, useState } from "react";
import axios from 'axios';

const accessToken = import.meta.env.VITE_UNSPLASH_API_KEY
function UserTripCarditem({trip} ) {
  const [imageUrl, setImageUrl] = useState("");
  const location = trip?.userSelection?.location?.label;
  const fetchImages = async () => {
  try {
    const res = await axios.get(
      `https://api.unsplash.com/search/photos?query=${location}&client_id=${accessToken}`
    );
    return res?.data?.results?.[0]?.urls?.full || "";
    } catch (err) {
      console.error("Error fetching image:", err);
      return "";
    }
  };

  useEffect(() => {
    const loadImage = async () => {
      const img = await fetchImages();
      setImageUrl(img);
    };
    if (location) loadImage();
  }, [location]);

  return (
    <div>
      <img src={imageUrl} alt="trip" className='obj-cover rounded-xl' style={{width: "100%", height: "220px"}} />
      <div>
        <h2 className='font-bold text-lg' >{location}</h2>
        <h2 className='text-sm text-gray-500'>{trip?.userSelection?.noOfDays} Days trip with {trip?.userSelection?.budget} Budget</h2>
      </div>
    </div>
  )
}

export default UserTripCarditem
