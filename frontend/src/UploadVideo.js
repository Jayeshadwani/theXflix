import React,{useContext, useState} from "react";
import { Grid,TextField,Button,Box,Typography } from "@mui/material"
import {styled} from "@mui/material/styles"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import Select from '@mui/material/Select';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import {useSnackbar} from "notistack"
import mockurl from "./endpoint";
import { useNavigate } from "react-router-dom";
import AppContext from "./AppContext";
import "./UploadVideo.css"



export default function UploadVideo() {
    const props = useContext(AppContext)
    const open = props.open
    const setOpen = props.setOpen
    const backdropOpen = props.backdropOpen
    const setBackdropOpen = props.setBackdropOpen 

    
    const navigate = useNavigate();
    const {enqueueSnackbar} = useSnackbar()
    
    const genre =  ["Education", "Sports", "Movies", "Comedy", "Lifestyle" ]
    const contentRating = ["Any age group","7+", "12+", "16+", "18+"]
    const [value, setValue] = useState(new Date());

    const handleClose = () => {
        setOpen(false);
        setBackdropOpen(!backdropOpen)
    }

    const [videoLink,setVideoLink] = useState("")

    const handleVideoLinkChange = (e) => {
        setVideoLink(e.target.value)
    }

    const [thumbnailLink,setThumbnailLink] = useState("")

    const handleThumbnailLinkChange = (e) => {
        setThumbnailLink(e.target.value)
    }

    const [title,setTitle] = useState("")

    const handleTitleChange = (e) => {
        setTitle(e.target.value)
    }

    const [gen,setGen] = useState("")

    const handleGenChange = (e) => {
        setGen(e.target.value)
    }

    const [age,setAge] = useState("")
    
    const handleAgeChange = (e) => {
        setAge(e.target.value)
    }

    const checkVideoFormat = (videoLink) => {
        const requiredVideoLinkFormat = "youtube.com/embed/"
        const inputVideoLink = videoLink.slice(0,18)

        if(requiredVideoLinkFormat === inputVideoLink) return true

        return false;
    }
    
    const handleSubmit = async (videoLink,thumbnailLink,title,gen,age,value) => 
    {
    console.log(videoLink,thumbnailLink,title,gen,age,value)
        if(!videoLink)
        {
            enqueueSnackbar("Video Link is required",{variant:"error"})
            return
        }
        if(!thumbnailLink){
            enqueueSnackbar("Thumb Nail Link is required",{variant:"error"})
            return
        }
        if(!title){
            enqueueSnackbar("Title is required",{variant:"error"})
            return
        }
        if(!gen){
            enqueueSnackbar("Genre is required",{variant:"error"})
            return
        }
        if(!age){
            enqueueSnackbar("Age is required",{variant:"error"})
            return
        }
        if(!value){
            enqueueSnackbar("Date is required",{variant:"error"})
            return
        }

        if(checkVideoFormat(videoLink)){
            try{
                const date = new Date(value).toLocaleDateString()
                const url = `${mockurl}/v1/videos`
                await fetch(url, {
                    method : "POST",
                    body : {
                    "videoLink": videoLink,
                    "title": title,
                    "genre": gen,
                    "contentRating": age,
                    "releaseDate": date,
                    "previewImage": thumbnailLink
                }})
                enqueueSnackbar("Video Successfully uploaded",{variant:"success"})
                setOpen(!open)
                setBackdropOpen(!backdropOpen)
                navigate("/")
    
            }catch(e){
                enqueueSnackbar("Enter the video Link in specified format",{variant:"error"})
            }
        }
        else{
            enqueueSnackbar("Please enter correct video format.",{variant:"error"})
            return
        }  
    }

    const extractAndSetDate = (date) => {
        // Thu, 08 Feb 2021, Time
       const arr = date.split([" "])
       const formattedDate = arr.slice(1,4).join(" ").toString()
       setValue(formattedDate)
    }

    
    const sxProps = {
        marginTop : 2,
        borderTop:"2px solid #818181",
        borderRight:"1px solid #818181",
        borderLeft:"1px solid #818181",
        borderRadius:1,
        '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
                border : "0px"
            },
        },
        '& .MuiSvgIcon-root' : {
            color : '#818181'
        },
        '& .MuiInputBase-input' : {
            border: 0
        },
        '&:hover fieldset' : {
            border:0
        }
    } 
    const inputSxProps = { color : "primary.contrastText" }

    const InputSxProps = {
        '&:hover fieldset' : {
            border : '0px',
        },
        '&:focus-within fieldset, &:focus-visible fieldset' : {
            border : '0px',
        }
    }

    

   
  return (
    <>  
        <Dialog open={open} fullWidth scroll="paper" >
            <Box sx={{backgroundColor:"#383838",color:"primary.contrastText"}}>
                <DialogTitle>
                    <Grid container sx={{display:"flex"}}>
                        <Grid item xs={10}>
                            <Typography sx={{color:"primary.contrastText",marginLeft:1}} variant="h5" >Upload Video</Typography>
                        </Grid>
                        <Grid item >
                            <Box sx={{marginLeft:3}}>
                                <Button variant="string" size="string" sx={{display:"flex",paddingRight:0,justifySelf:"end"}} onClick={handleClose} endIcon={<CloseOutlinedIcon/>} />
                            </Box>
                        </Grid>
                    </Grid>
                </DialogTitle>
                    <DialogContent >
                            <TextField
                                id="VideoLink"
                                required
                                sx={{borderTop:"2px solid #818181",borderRight:"1px solid #818181",borderLeft:"1px solid #818181",borderRadius:1}}
                                autoFocus
                                onChange={(e) => handleVideoLinkChange(e)}
                                placeholder="Video Link"
                                inputProps={{
                                    sx:{
                                        color:"primary.contrastText"
                                    }
                                }}
                                InputProps={{
                                    sx:{
                                        '&:hover fieldset' : {
                                            border : '0px',
                                            borderRadius : '0px'
                                        },
                                        '&:focus-within fieldset, &:focus-visible fieldset' : {
                                            border : '0px'
                                        }
                                    }
                                }}    
                                fullWidth
                                variant="outlined"
                            />
                            <FormHelperText sx={{marginLeft:2,color:"#818181"}}>This link will be used to derive the video</FormHelperText>
                            <TextField
                                required
                                autoFocus
                                id="thumbnailImageLink"
                                placeholder="Thumbnail Image Link"
                                sx={{...sxProps}}
                                inputProps={{sx:{...inputSxProps}}}
                                InputProps={{sx:{...InputSxProps}}}
                                onChange={(e) => handleThumbnailLinkChange(e)}
                                fullWidth
                                variant="outlined"
                            />
                            <FormHelperText sx={{marginLeft:2,color:"#818181"}}>This link will be used to preview the thumbnail image</FormHelperText>

                            <TextField
                                required
                                autoFocus
                                placeholder="Title"
                                id="title"
                                sx={{...sxProps}}
                                inputProps={{sx:{...inputSxProps}}}
                                InputProps={{sx:{...InputSxProps}}}
                                onChange={(e) => handleTitleChange(e)}
                                fullWidth
                                variant="outlined"
                            />
                            <FormHelperText sx={{marginLeft:2,color:"#818181"}}>The title will be the representative text for video</FormHelperText>
                            
                            <TextField
                                required
                                autoFocus
                                select
                                placeholder="Genre"
                                sx={{...sxProps}}
                                inputProps={{sx:{...inputSxProps},placeholder:"Genre"}}
                                InputProps={{sx:{...InputSxProps}}}
                                id="genre"
                                fullWidth
                                variant="outlined"
                                value={gen}
                                onChange={handleGenChange}
                                >
                                    {genre.map((genre) => <MenuItem key={genre} value={genre}>{genre}</MenuItem>)}
                            </TextField>
                            <FormHelperText sx={{marginLeft:2,color:"#818181"}}>Genre will help in categorizing your videos</FormHelperText>
                            <TextField
                                required
                                autoFocus
                                select
                                sx={{...sxProps}}
                                inputProps={{sx:{...inputSxProps},placeholder:"Genre"}}
                                InputProps={{sx:{...InputSxProps}}}
                                id="age"
                                fullWidth
                                variant="outlined"
                                value={age}
                                onChange={handleAgeChange}
                                >                                    
                                {contentRating.map((content) => <MenuItem key={content} value={content}>{content}</MenuItem>)}
                            </TextField>
                            <FormHelperText sx={{marginLeft:2,color:"#818181"}}>This will be used to filter videos on age group suitability</FormHelperText>
                            
                            <LocalizationProvider dateAdapter={AdapterDayjs} >
                                <DatePicker    
                                    required
                                    autoFocus
                                    disableFuture
                                    inputProps={{sx:{...inputSxProps}}}
                                    InputProps={{sx:{...InputSxProps}}}
                                    sx={{...sxProps}}
                                    openTo="day"
                                    value={value}
                                    views={['day', 'month', 'year']}
                                    onChange={(newValue) => {
                                        return(
                                            newValue ? extractAndSetDate(newValue.toString()) : null
                                        )
                                        
                                    }}
                                    renderInput={(params) => 
                                    <TextField 
                                        sx={{...sxProps}}    
                                        inputProps={{sx:{...inputSxProps}}}
                                        InputProps={{sx:{...InputSxProps}}}  
                                        {...params} 
                                        fullWidth
                                    />}
                                />
                            </LocalizationProvider>
                            <FormHelperText sx={{marginLeft:2,color:"#818181"}}>This will be used to sort videos</FormHelperText>
                    </DialogContent>
                <DialogActions className="d-flex justify-content-start mx-3">
                    <Button variant="contained" color="error" onClick={() => handleSubmit(videoLink,thumbnailLink,title,gen,age,value)}>Upload Video</Button>
                    <Button sx={{color:"primary.contrastText"}} onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Box>
        </Dialog> 
    </>
    
  )
}
