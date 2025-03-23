import React from 'react'
import PlaceCardItem from './PlaceCardItem'

function PlacesToVisit({trip}) {
  return (
    <div>
      <h2 className='font-bold text-xl mt-5 mb-2'>Places To Visit</h2>

      <div>
        {trip.tripData?.itinerary?.map((item, index) => (
          <div >
            <h2 className='font-medium text-lg mt-2'>Day {item.day}</h2>
            <div className='grid grid-cols-2 gap-5'>
              {item?.places?.map((place, index) => (
                <div key={place?.placeImageUrl} className='my-3'>
                  <h2 className='font-medium text-sm text-orange-600 mb-3'>{place.duration}</h2>
                  <PlaceCardItem place={place} /> 
                </div>
              ))}
            </div>
          </div> 
        ))}
      </div>
    </div>
  )
}

export default PlacesToVisit
