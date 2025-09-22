import { db } from '@/service/firebaseConfig'
import { collection, getDocs, query, where, deleteDoc, doc as fsDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import UserTripCarditem from './components/UserTripCarditem';

function MyTrips() {
  const navigate = useNavigate()
  const [userTrips, setUserTrips] = useState([])
  const [loading, setLoading] = useState(true); // NEW: loading flag

  useEffect(() => {
    GetUserTrips()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const GetUserTrips = async() => {
    const user = JSON.parse(localStorage.getItem('user'))

    if(!user){
      navigate('/')
      return
    }

    setLoading(true);            // NEW
    setUserTrips([])

    const q = query(collection(db, "AiTrips"), where('userEmail', "==", user?.email))
    const querySnapshot = await getDocs(q)

    const trips = [];
    querySnapshot.forEach((d) => {
      const data = d.data();
      // Ensure we always have an id (fallback to Firestore doc id)
      trips.push(data?.id ? data : { ...data, id: d.id });
    });

    setUserTrips(trips);
    setLoading(false);           // NEW
  }

  const handleDelete = async (e, tripId) => {
    e.preventDefault(); // prevent <Link> navigation
    e.stopPropagation();

    if (!tripId) return;
    const ok = window.confirm('Delete this trip? This cannot be undone.');
    if (!ok) return;

    // Optimistic UI
    const prev = userTrips;
    setUserTrips(prev.filter(t => t.id !== tripId));
    try {
      await deleteDoc(fsDoc(db, 'AiTrips', tripId));
    } catch (err) {
      console.error('Delete failed:', err);
      setUserTrips(prev); // revert
      alert('Failed to delete trip. Please try again.');
    }
  };

  return (
    <div className='flex flex-col items-center sm:px:10 md:px-12 lg:px-56 xl:px-10 px-5 mt-10'>
      <h2 className='font-bold text-3xl'>My Trips</h2>

      <div className='grid grid-cols-2 mt-10 md:grid-cols-3 gap-5 w-full'>
        {/* Skeletons while loading */}
        {loading && Array.from({ length: 6 }).map((_, i) => (
          <div key={`skeleton-${i}`} className="relative w-full h-40 rounded-xl bg-gray-200/60 dark:bg-gray-700/50 animate-pulse" />
        ))}

        {/* Trip list */}
        {!loading && userTrips.length > 0 && userTrips.map((trip, index) => (
          <Link key={trip?.id ?? index} to={`/view-trip/${trip?.id}`} className="relative group">
            <UserTripCarditem trip={trip} />

            {/* Delete button (top-right) */}
            <button
              onClick={(e) => handleDelete(e, trip?.id)}
              title="Delete trip"
              className="opacity-0 group-hover:opacity-100 transition-opacity
                         bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded-full shadow"
            >
              Delete
            </button>
          </Link>
        ))}

        {/* Empty state (only when not loading) */}
        {!loading && userTrips.length === 0 && (
          <div className="col-span-full text-center text-gray-500">
            No trip found
          </div>
        )}
      </div>
    </div>
  )
}

export default MyTrips
