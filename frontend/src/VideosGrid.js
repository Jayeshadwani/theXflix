import { Grid } from '@mui/material'
import React, { useContext } from 'react'
import AppContext from './AppContext'
import VideoCard from './VideoCard'

export default function VideosGrid() {
    const props = useContext(AppContext)
    const videos = props.videos
    console.log(videos)
  return (
    <>
        <Grid container sx={{backgroundColor:"primary.main"}}>
            <Grid item lg={1} md={1} sm={1} xs={1}></Grid>
            <Grid item lg={10} md={10} sm={10} xs={10} >
                    <Grid container spacing={2} className="px-2 m-0">
                        {videos ? 
                            videos.map((vid) => {
                                return(
                                    <Grid key={vid._id} item lg={3} md={4} sm={6} xs={12} className="px-1">
                                        <VideoCard key={vid._id} video={vid} />
                                    </Grid>
                                )
                            }) : null
                        }
                    </Grid>   
            </Grid>
            <Grid item lg={1} md={1} sm={1} xs={1}></Grid>
        </Grid>
    </>
  )
}
