import * as React from 'react';
import { styled, } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { search_place } from '../../services/api/geoData';
import useDebounce from '../../hooks/useDebounce/useDebounce';
import { useQuery } from 'react-query';
import { Box } from '@mui/material';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#fff',
    '&:hover': {
        backgroundColor: '#fff',
    },
    marginLeft: 0,
    // width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'grey'
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'black',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        // width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
                fontFamily: 'monospace',
                color: 'black'
            },
        },
    },
}));

export default function Searchbar({ setOpen, map,setLng,setLat  }) {
    const [inputText, setInputText] = React.useState('');
    const debouncedValue = useDebounce(inputText, 500)

    // FUNCTION TO HANDLE INPUT CHANGE //

    const handleInputChange = (event) => {
        setInputText(event.target.value);
    };

    // FETCHING SEARCHED LOCATION //

    const { data: searchResult } = useQuery(["searchUserValues", debouncedValue], () =>
        search_place(debouncedValue)
    )
    if (searchResult?.results[0]) {

        // Fly the map to the desired coordinates
        setLng(searchResult?.results[0]?.lon.toFixed(4))
        setLat(searchResult?.results[0]?.lat.toFixed(4))
        map.current.flyTo({
            center: [searchResult?.results[0]?.lon.toFixed(4), searchResult?.results[0]?.lat.toFixed(4)], // Desired coordinates
            zoom: 15, // Desired zoom level
            speed: 5, // Speed of the fly animation
            curve: 1, // How the fly animation behaves
            essential: true, // Indicates the animation is essential
        });
    }

    return (
        <Box sx={{mt:{md:0,xs:10}}}>
        <Search>
            <SearchIconWrapper>
            </SearchIconWrapper>
            <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                value={inputText} onChange={handleInputChange}
            />
        </Search>
        </Box>
    );
}