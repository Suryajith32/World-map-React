import { Box, Stack, Typography } from '@mui/material'
import React from 'react'
import { SelectedSuggetionCordinate } from '../../../services/reducers/DataReducer';
import { useDispatch } from 'react-redux';

const SuggestionModal = ({ searchResult, map }) => {
    const dispatch = useDispatch()
    const handleSuggestionClick = (lat, lon) => {
        const selectedCordinatesObj = { lat, lon }
        console.log(lat, lon, 'from handleclick suggestion')
        dispatch(SelectedSuggetionCordinate(selectedCordinatesObj))

        // Fly the map to the desired coordinates

        if (lat && lon) {
            map?.current?.flyTo({
                center: [lon.toFixed(4), lat.toFixed(4)], // Desired coordinates
                zoom: 13, // Desired zoom level
                speed: 1, // Speed of the fly animation
                curve: 1, // How the fly animation behaves
                essential: true, // Indicates the animation is essential
            });
        }
    }

    return (
        <div>
            <Box sx={{ width: '20em', maxHeight: '80vh', bgcolor: '#FFFFFF', position: 'absolute', borderRadius: '5px' }}></Box>
            <Box sx={{ color: 'black', bgcolor: '#FFFFFF', position: 'relative', zIndex: 10, top: { md: 20, xs: 20, sm: 120, zIndex: 0 } }}>
                <Box sx={{ p: 2, cursor: 'ponter' }}>
                    {searchResult?.results && searchResult?.results?.map((item, index) => (
                        <Stack direction='row' spacing={2}>
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'grey' }} ></Box>
                            <Box onClick={() => handleSuggestionClick(item?.lat, item?.lon)} ><Typography sx={{ mt: 1, color: 'grey', cursor: 'ponter' }} key={index}>{item?.address_line2}</Typography></Box>
                        </Stack>
                    ))}
                </Box>
            </Box>
        </div>
    )
}

export default SuggestionModal