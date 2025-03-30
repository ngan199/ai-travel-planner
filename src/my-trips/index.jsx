import { db } from '@/service/firebaseConfig'
import { collection, getDocs, query, where, } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import UserTripCarditem from './components/UserTripCarditem';

function MyTrips() {
  const navigate = useNavigate()
  const [userTrips, setUserTrips] = useState([])

  useEffect(() => {
    GetUserTrips()
  }, [])

  const GetUserTrips = async() => {
    const user = JSON.parse(localStorage.getItem('user'))

    if(!user){
      navigate('/')
      return
    }

    setUserTrips([])
    const q = query(collection(db, "AiTrips"), where('userEmail', "==", user?.email))
    const querySnapshot = await getDocs(q)

    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data())
      setUserTrips((prev) => [...prev, doc.data()])
    })
  }
  
  return (
    <div className='flex flex-col items-center sm:px:10 md:px-12 lg:px-56 xl:px-10 px-5 mt-10'>
      <h2 className='font-bold text-3xl'>My Trips</h2>
      <div className='grid grid-cols-2 mt-10 md:grid-cols-3 gap-5'>
        {userTrips.length > 0 ?
          userTrips.map((trip, index) => (
            <Link to={`/view-trip/${trip?.id}`}>
              <UserTripCarditem trip={trip} />
            </Link>
          ))
        : 'No trip found'
        }
      </div>
    </div>
  )
}

export default MyTrips
