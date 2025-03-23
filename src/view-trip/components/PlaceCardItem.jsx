import React, { useState, useEffect } from 'react'
import { GenerateImageUrl } from '../../service/sharedFunctions'
import { Button } from '@/components/ui/button';
import { FaMapLocationDot } from "react-icons/fa6";

function PlaceCardItem({place}) {
  const [placeUrl, setPlaceUrl] = useState('')
  const placeName = place?.placeName

  useEffect(() => {
    placeName&&GetImageUrl()
  }, [placeName])

  const GetImageUrl = () => {
    GenerateImageUrl(placeName, setPlaceUrl)
  }
  return (
    <a rel="noopener noreferrer" key={place?.placeImageUrl} href={'https://www.google.com/maps/search/?api=1&query=' + place.placeName} target='_blank'>
      <div className='border rounded-xl p-3 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer'>
        <img src={placeUrl} alt='place' className='rounded-xl w-[130px] h-[130px]' />
        <div>
          <h2 className='font-bold text-lg'>{placeName}</h2>
          <p className='text-sm text-gray-400'>{place.placeDetails}</p>
          <h2 className='mt-2'>🕒 {place.travelTime}</h2>
          <Button size='sm'>
            <FaMapLocationDot /> 
          </Button>
        </div>
      </div>
    </a>
  )
}

export default PlaceCardItem
