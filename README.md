# World-map-React
The project combines the power of React JS, Mapbox GL, and Geoapify to create an engaging and informative map application. Whether users are searching for places, exploring random locations, or automatically flying to searched coordinates, the "World Map" project offers a seamless and immersive experience that makes interacting with the map both enjoyable and informative.

# How to use
The primary feature of the application is the ability to search for places worldwide. Users can enter the name of a specific location, such as a city or landmark, and the application will utilize Geoapify, a geocoding and location-based service, to convert the entered text into geographical coordinates. These coordinates are then used to pinpoint and display the location on the map.

#step 1 

clone the repository => https://github.com/Suryajith32/World-map-React.git

go to the project directory and install the dependencies using npm

#Add the environment variables

generate your api key by signing up  => https://www.mapbox.com/  ,  https://www.geoapify.com/

go to .env file , add your api keys  => VITE_GEOAPIFY_API_KEY = "replace with your geoapify api key"
                                        VITE_MAPBOX_ACCESS_TOKEN = "replace with your mapbox api key"

start the server using  => npm run dev
