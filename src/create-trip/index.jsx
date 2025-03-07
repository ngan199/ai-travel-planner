import React from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'

function index() {
  console.log("import.meta.env.VITE_GOOGLE_PLACE_API_KEY}", import.meta.env.VITE_GOOGLE_PLACE_API_KEY)
  return (
    <div className='flex flex-col items-center sm:px:10 md:px-12 lg:px-56 xl:px-10 px-5 mt-10'>
      <h2 className='font-bold text-3xl'>Tell us your travel preferences</h2>
      <p className='mt-3 text-gray-500 text-xl'>Just provide some basic information, 
      and our trip planner will generate a customized itinerary based on your preferences</p>

      <div>
        <div className='mt-20'>
          <h2 className='text-xl my-3 font-medium'>What is your destination of choice?</h2>
          <GooglePlacesAutocomplete 
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
          />
        </div>
      </div>
    </div>
  )
}

export default index
