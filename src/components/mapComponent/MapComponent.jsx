import React from 'react'
import { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { Box } from '@mui/material';
import Sidebar from '../sidebar/Sidebar';
import DataModal from '../data modal/DataModal'
import { useQuery } from 'react-query';
import { get_geocoding_data } from '../../services/api/geoData'
import Searchbar from '../searchbar/Searchbar';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN

const MapComponent = () => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(0);
    const [lat, setLat] = useState(0);
    const [zoom, setZoom] = useState(2);
    const [open, setOpen] = useState(false)

    useEffect(() => {

        // FOR RENDERING THE MAP//
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [lng, lat],
            zoom: zoom
        });

        
        // TO GET THE CURRENT CORDINATES AS CURSOR MOVES //
 
        if (!map.current) return; // wait for map to initialize
        map.current.on('move', () => {
            setLng(map.current.getCenter().lng.toFixed(4));
            setLat(map.current.getCenter().lat.toFixed(4));
            setZoom(map.current.getZoom().toFixed(2));
        });
    }, []);

    // FUNCTION TO GET THE CLICKED CORDINATE AND TO OPEN THE DATA MODAL //

    const handleClickCordinate = async () => {
        setOpen(!open)
        handleClick()
    }

    // REACT QUERY FUNCTION FOR FETCHING THE GEOCODING DATA //

    const { data, isLoading, refetch } = useQuery(['data', lat, lng], () => get_geocoding_data(lat, lng));
    const handleClick = () => {
        refetch()
    }

    return (
        <div>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', position: 'absolute', width: '100%', color: '#FFFFFF', top: 10 }}>
                <Searchbar setOpen={setOpen} map={map} setLng={setLng} setLat={setLat}/>
            </Box>
            <Box onClick={() => handleClickCordinate()} sx={{ width: '100%', height: '100vh' }} ref={mapContainer}>
                <Sidebar lat={lat} lng={lng} />
                <DataModal open={open} handleClickCordinate={handleClickCordinate} isLoading={isLoading} data={data} />
            </Box>
        </div>
    )
}

export default MapComponent