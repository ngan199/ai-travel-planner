import React from 'react'
import PlaceCardItem from './PlaceCardItem'

function PlacesToVisit({trip}) {
  return (
    <div>
      <h2 className='font-bold text-lg'>Places To Visit</h2>

      <div>
        {trip.tripData?.itinerary?.map((item, index) => (
          <div >
            <h2 className='font-medium text-lg'>{item.day}</h2>
            <div className='grid grid-cols-2 gap-5'>
              {item?.places?.map((place, index) => (
                <div key={place?.placeImageUrl} className='my-3'>
                  <h2 className='font-medium text-sm text-orange-600'>{place.duration}</h2>
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
