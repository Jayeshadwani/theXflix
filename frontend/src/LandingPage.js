import React,{useContext, useEffect} from 'react'
import Header from './Header'
import { TextField,InputAdornment, Backdrop, InputLabel } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import {Select,MenuItem,Typography,Button,Box} from "@mui/material"
import { useState } from 'react'
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import {Grid} from "@mui/material"
import VideoCard from './VideoCard'
import mockurl from './endpoint'
import { useSnackbar } from 'notistack';
import VideosGrid from './VideosGrid';
import AppContext from './AppContext';
import Genre from './Genre';
import UploadVideo from './UploadVideo';
import "./LandingPage.css"

export default function LandingPage() {
    const props = useContext(AppContext)
    const genreType = props.genreType
    const contentRatingType = props.contentRatingType
    const sortingBy = props.sortingBy
    const setVideos = props.setVideos
    const backdropOpen = props.backdropOpen
    

    


    const {enqueueSnackbar} = useSnackbar()
    const [searchText,setSearchText] = useState("")
    const [debounceTimeout,setDebounceTimeout] = useState(0)
    
    const debounceSearch = (e,debounceTimeout) => {        
        if(debounceTimeout){
            clearTimeout(debounceTimeout)
        }

    const newdebounceTimeout = setTimeout(() => {
            fetchVideosBySearchText(e.target.value)
        },1000)
        
        setDebounceTimeout(newdebounceTimeout)
     }

    const fetchVideos = async () => {
        try{
            const res = await fetch(`${mockurl}/v1/videos`).then(response => response.json())
            setVideos(res.videos)
            enqueueSnackbar("Successfully fetched videos ",{variant:"success"})
            return res;
        }catch(err){
            enqueueSnackbar("Failed to fetch videos from backend.Check server is running and returns valid JSON.",{variant:"error"})
            return []
        }  
    }
    
    const fetchVideosBySearchText = async (searchText) => {
        if(!searchText) return
        try{
            setSearchText(searchText)
            const res = await fetch(`${mockurl}/v1/videos?title=${searchText}`).then(resp => resp.json())
            enqueueSnackbar("Successfully fetched videos ",{variant:"success"})
            setVideos(res.videos)
            return res.videos;
        }catch(e){
            enqueueSnackbar("Failed to fetch videos from backend.Check server is running and returns valid JSON.",{variant:"error"})
            return []
        }
    }

    const fetchVideosByFilters = async (genreType,contentRatingType,sortingBy,searchText) => 
    {
        try
        {
            const url = `${mockurl}/v1/videos?title=${searchText}&contentRating=${contentRatingType}&genres=${genreType}&sortBy=${sortingBy}`
            const res = await fetch(url).then(resp => resp.json())
            enqueueSnackbar("Successfully fetched videos ",{variant:"success"})
            setVideos(res.videos)
            return res
        }
        catch(e)
        {
            enqueueSnackbar("Failed to fetch videos from backend.Check server is running and returns valid JSON.",{variant:"error"})
            setVideos([])
        }
    }

    useEffect(() => {
        const onLoad = async () => {
            await fetchVideos()
        }
        onLoad();
    },[])

    useEffect(() => {
        fetchVideosByFilters(genreType,contentRatingType,sortingBy,searchText)
    },[genreType,contentRatingType,sortingBy])
 
  return (
    <div>
        
        <Header search={true}>
            <Box sx={{maxHeight:35,display:"flex",color:"primary.contrastText"}} >
                <TextField
                    placeholder='Search'
                    size="small"
                    id="searchfield"
                    fullWidth
                    onChange={(e) => debounceSearch(e,debounceTimeout)}
                    > 
                </TextField>
                <Button size="small" variant="contained" sx={{backgroundColor:"primary.dark",padding:0}}  >
                    <SearchIcon size="small" />
                </Button>
            </Box>
            
        </Header>
        <Genre />
        <VideosGrid />
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={backdropOpen}
            >
        </Backdrop>
        <UploadVideo />
    </div>
  )
}
