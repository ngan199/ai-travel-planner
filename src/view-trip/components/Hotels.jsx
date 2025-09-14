import React from 'react'
import HotelCardItem from './HotelCardItem'

function Hotels({ trip, imageUrls }) {
  return (
    <div>
      <h2 className='font-bold text-xl my-5'>Hotel Recommendation</h2>
      <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5'>
        {trip?.tripData?.hotelOptions?.map((hotel) => (
          <a rel='noopener noreferrer' key={hotel.hotelName} href={`https://www.google.com/maps/search/?api=1&query=${hotel.hotelName},${hotel.hotelAddress}`} target='_blank'>
            <HotelCardItem hotel={hotel} imageUrl={imageUrls[hotel.hotelName]} />
          </a>
        ))}
      </div>
    </div>
  );
}

export default Hotels
