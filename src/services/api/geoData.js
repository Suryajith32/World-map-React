import axios from "axios";

export const get_geocoding_data = (lat,lng) => {
   return axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&format=json&apiKey=${import.meta.env.VITE_GEOAPIFY_API_KEY}`)
   .then((response) => response?.data?.results) 
}

export const search_place = (keyword) => {
return axios.get(`https://api.geoapify.com/v1/geocode/search?text=${keyword}&format=json&apiKey=${import.meta.env.VITE_GEOAPIFY_API_KEY}`)
.then((response)=>response?.data)
}

