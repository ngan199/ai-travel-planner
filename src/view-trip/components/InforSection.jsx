import { Button } from '@/components/ui/button';
import React from 'react'
import { IoIosSend } from "react-icons/io";

function InforSection({ trip, imageUrl }) {
  const place = trip?.userSelection?.location?.label;

  return (
    <div>
      <img src={imageUrl} className='h-[300px] w-full object-cover rounded-xl' alt={place} />
      <div className='flex justify-between items-center'>
        <div className='my-5 flex flex-col gap-2'>
          <h2 className='font-bold text-2xl'>{place}</h2>
          <div className='flex gap-5'>
            <h2 className='p-1 px-3 bg-gray-300 rounded-full text-gray-500 text-xs md:text-md'>🗓️ {trip?.userSelection?.noOfDays} Days</h2>
            <h2 className='p-1 px-3 bg-gray-300 rounded-full text-gray-500 text-xs md:text-md'>💰 {trip?.userSelection?.budget} Budget</h2>
            <h2 className='p-1 px-3 bg-gray-300 rounded-full text-gray-500 text-xs md:text-md'>🥂 No. Of Traveler: {trip?.userSelection?.traveler}</h2>
          </div>
        </div>
        <Button><IoIosSend /></Button>
      </div>
    </div>
  );
}

export default InforSection
