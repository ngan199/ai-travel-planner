import { Input } from '@/components/ui/input'
import { SearchBox } from '@mapbox/search-js-react'
import React, { useRef, useState, useEffect } from 'react'
import { AI_PROMPT, SelectBudgetOptions, SelectTravelesList } from '../constants/options';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

function index() {
  const [place, setPlace] = useState()
  const [formData, setFormData] = useState([])

  const handleInputChange = (name, value) => {
    if(name == 'noOfDays' && value > 5){
      console.log('Please enter Trip Days less than 5')
      //return
    }

    setFormData({
      ...formData,
      [name]: value
    })
  }

  useEffect(() => {
    console.log('formData', formData)
  }, [formData])

  const OnGenerateTrip = () => {
    if(formData?.noOfDays > 5 || !formData?.location || !formData?.budget || !formData?.traveler || !formData.noOfDays){
      toast('Please fill all details')
      return
    }
    
    const FINAL_PROMPT = AI_PROMPT
    .replace('{location}', formData?.location?.label)
    .replace('{totalDays}', formData?.noOfDays)
    .replace('{traveler}', formData?.traveler)
    .replace('{budget}', formData?.budget)
    .replace('{totalDays}', formData?.noOfDays)
  }

  return (
    <div className='flex flex-col items-center sm:px:10 md:px-12 lg:px-56 xl:px-10 px-5 mt-10'>
      <h2 className='font-bold text-3xl'>Tell us your travel preferences 🏕️🌴</h2>
      <p className='mt-3 text-gray-500 text-xl'>Just provide some basic information, 
      and our trip planner will generate a customized itinerary based on your preferences</p>

      <div className='mt-12 flex flex-col'>
        <div className='mt-10'>
          <h2 className='text-xl my-3 font-medium'>What is your destination of choice?</h2>
          <SearchBox 
          accessToken={import.meta.env.VITE_MAPBOX_KEY}
          //options={{language: 'en', country: 'US'}} 
          value={place}
          //onChange={(v) => console.log('change', v)}
          onRetrieve={(val) => {
            setPlace(val.features[0].properties.full_address)
            handleInputChange('location', val)
          }}
          />
        </div>
      </div>

      <div className='mt-12 flex flex-col'>
        <h2 className='text-xl my-3 font-medium'>How many days are you planning your trip?</h2>
        <Input onChange={(e) => handleInputChange('noOfDays', Number(e.target.value))} placeholder={'Ex.3'} type='number' />
      </div>

      <div>
        <h2 className='text-xl my-3 font-medium'>What is Your Budget?</h2>
        <div className='grid grid-cols-3 gap-5 mt-5'>
          {SelectBudgetOptions.map((item, index) => (
            <div key={item.id} 
            onClick={() => handleInputChange('budget', item.title)}
            className={`p-4 border cursor-pointer rounded-lg hover:shadow 
            ${formData?.budget==item.title&&'shadow-lg border-black'}`}>
              <h2 className='text-4xl'>{item.icon}</h2>
              <h2 className='font-bold text-lg'>{item.title}</h2>
              <h2 className='text-sm text-gray-500'>{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className='text-xl my-3 font-medium'>What do you plan on traveling with on your next adventure?</h2>
        <div className='grid grid-cols-3 gap-5 mt-5'>
          {SelectTravelesList.map((item, index) => (
            <div key={item.id} 
            onClick={() => handleInputChange('traveler', item.people)}
            className={`p-4 border cursor-pointer rounded-lg hover:shadow
            ${formData?.traveler==item.people&&'shadow-lg border-black'}`}>
              <h2 className='text-4xl'>{item.icon}</h2>
              <h2 className='font-bold text-lg'>{item.title}</h2>
              <h2 className='text-sm text-gray-500'>{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div className='my-10 justify-end flex'>
        <Button onClick={OnGenerateTrip}>Generate trip</Button>
      </div>
    </div>
  )
}

export default index
