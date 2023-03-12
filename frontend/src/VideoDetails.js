import React,{useContext, useEffect,useState} from 'react'
import { useParams } from 'react-router-dom'
import {Grid,Box,Typography,Button} from "@mui/material"
import mockurl from "./endpoint"
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { useSnackbar } from 'notistack'
import AppContext from './AppContext'
import VideosGrid from './VideosGrid';
import Header from './Header';


export default function VideoDetails() {
    let {videoId} = useParams()
    
    const {enqueueSnackbar} = useSnackbar()    
    const props = useContext(AppContext)

    const [video,setVideo] = useState({
        contentRating : "",
        genre : "",
        previewImage : "",
        releaseDate : "",
        title : "",
        videoLink: "",
        viewCount : 0,
        votes : {upVotes: 0, downVotes: 0},
        _id : ""
    })
    const videos = props.videos
    const setVideos = props.setVideos 


    const handleUpVote = async () => {
        try
        {
            const patchUrl = `${mockurl}/v1/videos/${videoId}/votes`
            await fetch(patchUrl,{
                method : "PATCH",
                body : JSON.stringify({
                    "vote": "upVote",
                    "change": "increase"
                })
            })
            enqueueSnackbar("Successfully upvoted",{variant:"success"})
            
        }catch(e){
            enqueueSnackbar("Failed to give a upvote.Check backend is running and returns valid JSON.",{variant:"error"})
            return
        }
    }
    const handleDownVote = async (videoId) => {
        try
        {
            const patchUrl = `${mockurl}/v1/videos/${videoId}/votes`
            await fetch(patchUrl,{
                method : "PATCH",
                body:{
                "vote": "downVote",
                "change": "increase"
            }})
            enqueueSnackbar("Successfully down voted",{variant:"success"})
        }catch(e)
        {
            enqueueSnackbar("Failed to give a upvote.Check backend is running and returns valid JSON.",{variant:"error"})    
        }
    }

    const IncreaseViewCount = async (videoId) => {
        try
        {
            const url = `${mockurl}/v1/videos/${videoId}/views`
            await fetch(url,{
                method : "PATCH"
            })
            enqueueSnackbar("Successfully increased a view ",{variant:"success"})
        }catch(e){
            enqueueSnackbar("Failed to increase views ",{variant:"error"})
        }
    }
    

    const fetchVideoById = async () => {
        try{
            const res = await fetch(`${mockurl}/v1/videos/${videoId}`).then(res => res.json())
            console.log(res)
            setVideo(res)
            enqueueSnackbar("Successfully fetched video",{variant:"success"})
            return res
        }catch(err){
            enqueueSnackbar("Failed to fetch video from backend.Check if backend is runnning and returns valid JSON.",{variant:"success"})
            return []
        }
    }
    
    
    useEffect(() => {
        const loadVideo = async () => 
        {
            await fetchVideoById()
            await IncreaseViewCount()
        }
        loadVideo()
    },[videoId]) //pass videoId

  return (
    <div>
        <Header search={false}/>
        <Grid container sx={{backgroundColor:"primary.main"}}>
            <Grid item xs={1}></Grid>
            <Grid item xs={10}>
                <Box
                className="ms-2"
                >
                    <iframe className='my-2' loading="lazy" src={`https://${video.videoLink}`} title={video.title} style={{borderRadius:"10px"}} width="100%" height="430px" />
                    <Grid container>
                        <Grid item xs={6} >
                            <Typography
                                variant="h4"
                                sx={{color:"primary.contrastText"}}
                            >
                                {video.title}
                            </Typography>
                            <Box className="d-flex align-items-center">
                                <Typography
                                    variant="body1"
                                    sx={{color:"primary.light"}}
                                    gutterBottom
                                >
                                    {video.contentRating}
                                </Typography>
                                {/* DotBox */}
                                <Box align="center" sx={{marginX:2,width:5,height:5,borderRadius:5,backgroundColor:"gray"}}></Box>
                                    <Typography
                                        variant="body1"
                                        sx={{color:"primary.light"}}
                                        gutterBottom
                                    >
                                        {video.releaseDate}
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={6}>
                            <Box className="mt-1 d-flex justify-content-end align-items-center">
                                <Button
                                    variant="contained"
                                    size="small"
                                    onClick={handleUpVote} //handleUpVote
                                    className="rounded-5"
                                    startIcon={<ThumbUpIcon/>}
                                    color="info"
                                    
                                >{video.votes.downVotes}</Button>
                                <Button
                                    variant="contained"
                                    size="small"
                                    onClick={handleDownVote} //handleDownVote
                                    className="rounded-5 ms-1"
                                    startIcon={<ThumbDownIcon/>}
                                    color="info"
                                >{video.votes.upVotes}</Button>
                            </Box>
                        </Grid>
                    </Grid>

                </Box>
                < hr/>
            </Grid>
            <Grid item xs={1}></Grid>
        </Grid>  

        <VideosGrid />
        
    </div>

  )
}
