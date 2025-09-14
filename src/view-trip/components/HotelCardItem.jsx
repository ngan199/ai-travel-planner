import React from 'react'

function HotelCardItem({hotel, imageUrl}) {
  return (
    <div className='hover:scale-105 transition-all cursor-pointer'>
      <img src={imageUrl} className='rounded-lg w-[130px] h-[130px]' />
      <div className='my-2 flex flex-col gap-2'>
        <h2 className='font-medium'>{hotel?.hotelName}</h2>
        <h2 className='text-xs text-gray-500'>📍 {hotel?.hotelAddress}</h2>
        <h2 className='text-sm'>💰 {hotel?.price}</h2>
        <h2 className='text-sm'>⭐ {hotel?.rating}</h2>
      </div>
    </div>
  )
}

export default HotelCardItem
