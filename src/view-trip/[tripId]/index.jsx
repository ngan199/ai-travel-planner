import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { db } from '@/service/firebaseConfig'
import {Hotels, PlacesToVisit, Footer, InforSection} from '../components'
import { fetchImages } from '@/service/sharedFunctions';

function Viewtrip() {
  const {tripId} = useParams()
  const [trip, setTrip] = useState([])
  const [imageUrls, setImageUrls] = useState({});

  useEffect(() => {
    tripId  && GetTripData()
  }, [tripId])

  const GetTripData = async () => {
    const docRef = doc(db, 'AiTrips', tripId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const tripData = docSnap.data();
      setTrip(tripData);
      fetchAllImages(tripData);
    } else {
      toast('No trip found');
    }
  };

  
  const fetchAllImages = async (tripData) => {
    const locations = [tripData?.userSelection?.location?.label];
    const hotels = tripData?.tripData?.hotelOptions?.map(h => h.hotelName) || [];
    const places = tripData?.tripData?.itinerary?.flatMap(i => i.places.map(p => p.placeName)) || [];
    
    const allNames = [...locations, ...hotels, ...places].filter(Boolean);
    const images = await fetchImages(allNames);
    setImageUrls(images);
  };
   
  return (
    <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
      <InforSection trip={trip} imageUrl={imageUrls[trip?.userSelection?.location?.label]} />
      <Hotels trip={trip} imageUrls={imageUrls} />
      <PlacesToVisit trip={trip} imageUrls={imageUrls} />
      <Footer />
    </div>
  )
} 

export default Viewtrip
