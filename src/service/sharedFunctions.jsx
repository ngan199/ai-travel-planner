import axios from 'axios';
export const GetImageUrl = (name, accessToken, setUrl) => {
  axios.get(`https://api.unsplash.com/search/photos?query=${name}&client_id=${accessToken}`
  ).then((res) => {
    const imageUrls = res.data.results?.map((item) => item?.urls.full)
    setUrl(imageUrls?.[0])
  }).catch(function (error) {
    console.log(error.toJSON())
  })
}