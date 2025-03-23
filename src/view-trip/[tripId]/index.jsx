import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { db } from '@/service/firebaseConfig'
import {Hotels, PlacesToVisit, Footer, InforSection} from '../components'

function Viewtrip() {
  const {tripId} = useParams()
  const [trip, setTrip] = useState([])

  useEffect(() => {
    tripId  && GetTripData()
  }, [tripId])

  const GetTripData = async() => {
    const docRef = doc(db, 'AiTrips', tripId)
    const docSnap = await getDoc(docRef)
    if(docSnap.exists()){
      setTrip(docSnap.data())
    }else{
      toast('No trip found')
    }
  }
   
  return (
    <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
      <InforSection trip={trip} />
      <Hotels trip={trip} />
      <PlacesToVisit trip={trip} />
      <Footer trip={trip} /> 
    </div>
  )
} 

export default Viewtrip
