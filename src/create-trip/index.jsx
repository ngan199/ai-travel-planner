import { Input } from '@/components/ui/input'
import { SearchBox } from '@mapbox/search-js-react'
import React, { useState, useEffect } from 'react'
import { AI_PROMPT, SelectBudgetOptions, SelectTravelesList, FormatPlace } from '../constants/options';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { chatSession } from '@/service/AIModal';
import { FcGoogle } from "react-icons/fc";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/service/firebaseConfig';
import { useNavigate } from 'react-router-dom';


function index() {
  const [place, setPlace] = useState()
  const [formData, setFormData] = useState([])
  const [openDialog, setOpenDialog] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

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

  const login = useGoogleLogin({
    onSuccess: (codeResp) => {
      GetUserProfile(codeResp)
    },
    onError: (error) => console.log('error', error)
  })

  const OnGenerateTrip = async() => {
    const user = localStorage.getItem('user')
    if(!user){
      setOpenDialog(true)
      return
    }

    if(formData?.noOfDays > 5 || !formData?.location || !formData?.budget || !formData?.traveler || !formData.noOfDays){
      toast('Please fill all details')
      return
    }
    
    setLoading(true)
    const FINAL_PROMPT = AI_PROMPT
    .replace('{location}', formData?.location?.label)
    .replace('{totalDays}', formData?.noOfDays)
    .replace('{traveler}', formData?.traveler)
    .replace('{budget}', formData?.budget)
    .replace('{totalDays}', formData?.noOfDays)

    const result = await chatSession.sendMessage(FINAL_PROMPT)
    setLoading(false)
    SaveAiTrip(result?.response?.text())
  }

  const SaveAiTrip = async(TripData) => {
    setLoading(true)
    const user = JSON.parse(localStorage.getItem('user'))
    const docId = Date.now().toString()

    await setDoc(doc (db, "AiTrips", docId), {
      userSelection: formData,
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docId
     });
     setLoading(false)
     navigate(`/view-trip/${docId}`)
  }

  const GetUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,{
      headers:{
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept: 'Application/json'
      }
    }).then((res) => {
      setOpenDialog(false)
      localStorage.setItem('user', JSON.stringify(res.data))
      OnGenerateTrip()
    }).catch(function (error) {
      console.log(error.toJSON());
    });
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
          options={{types: ['country', 'region', 'city', 'district', 'place' ]}} 
          value={place}
          onRetrieve={(val) => {
            setPlace(FormatPlace(val).value.description)
            handleInputChange('location', FormatPlace(val))
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
        <Button disable={loading} onClick={OnGenerateTrip}>
          {loading ? <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin' /> : 'Generate trip'}
        </Button> 
      </div>

      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src='/logo.svg' />
              <h2 className='font-bold-text-lg mt-7'>Sign In With Google</h2>
              <p>Sign In to the App with Google authentication securely</p>
              <Button 
                disabled={loading}
                onClick={login} 
                varient='outline' 
                className='w-full mt-5 flex gap-4 items-center'
              >
                <FcGoogle className='h-7 w-7 ' />
                Sign In  With Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default index
