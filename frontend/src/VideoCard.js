import React from 'react'
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import "./VideoCard.css"


export default function VideoCard(props) {
    const video = props.video
    const navigate = useNavigate()
    
    const handleClick = () => {
        navigate(`/videos/${video._id}`)
    }

    return (
        <>
            <CardMedia
                className="card-img-top "
                id="videoCard" 
                component="img"
                image={video.previewImage}
                aria-label="videoPreviewImage"
                onClick={handleClick}            
            />  
            <CardContent className="m-0 p-0 mt-1" >
                <Typography variant='h6' sx={{lineHeight:1,color:"primary.contrastText"}} >{video.title}</Typography>
                <Typography sx={{color:"primary.light"}} variant="body1" >{video.releaseDate}</Typography>
            </CardContent>
        </>
    )
}
