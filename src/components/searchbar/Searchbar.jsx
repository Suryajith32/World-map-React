import * as React from 'react';
import { styled, } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { search_place } from '../../services/api/geoData';
import useDebounce from '../../hooks/useDebounce/useDebounce';
import { useQuery } from 'react-query';
import { Box } from '@mui/material';
import SuggestionModal from './suggestionModal/SuggestionModal';
import { useSelector } from 'react-redux';



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
        width: '100%',
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

export default function Searchbar({ setOpen, map, setLng, setLat }) {
    const latlongData = useSelector((state) => state.cordData.value.selectedSuggetionCordinate)
    const [inputText, setInputText] = React.useState('');
    const debouncedValue = useDebounce(inputText, 500)
    console.log(latlongData,'latlongData fron selector')

    // FUNCTION TO HANDLE INPUT CHANGE //

    const handleInputChange = (event) => {
        setInputText(event.target.value);
    };

    // FETCHING SEARCHED LOCATION //

    const { data: searchResult } = useQuery(["searchUserValues", debouncedValue], () =>
        search_place(debouncedValue)
    )
    console.log(searchResult, 'searchresults')

    return (
        <Box sx={{ mt: { md: 0, xs: 10, width: '100%' } }}>
            <Search>
                <SearchIconWrapper>
                </SearchIconWrapper>
                <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                    value={inputText} onChange={handleInputChange}
                />
            </Search>

            {/* SEARCH SUGGESTION DISPLAY MODAL */}
            {searchResult ? <SuggestionModal searchResult={searchResult} map={map} /> : ''}
        </Box>
    );
}
