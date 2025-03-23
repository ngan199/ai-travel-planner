import { Toaster } from '@/components/ui/sonner';
import axios from 'axios';

const accessToken = import.meta.env.VITE_UNSPLASH_API_KEY
export const GenerateImageUrl = (name, setUrl) => {
  axios.get(`https://api.unsplash.com/search/photos?query=${name}&client_id=${accessToken}`
  ).then((res) => {
    const imageUrl = res.data.results?.[0]?.urls?.full
    setUrl(imageUrl)
  }).catch(function (error) {
    Toaster(error)
  })
}
