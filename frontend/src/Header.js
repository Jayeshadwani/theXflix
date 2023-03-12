import React,{useContext, useState} from "react";
import { Grid,TextField,InputAdornment,Button,Box,Typography } from "@mui/material"
import AppContext from "./AppContext"
import {Link} from "react-router-dom"
import UploadIcon from '@mui/icons-material/Upload';



export default function Header(props){
    const search = props.search
    const propsFromAppContext = useContext(AppContext)
    const handleClickOpen = propsFromAppContext.handleClickOpen

    return(
        <Box component="nav" sx={{backgroundColor:"primary.main"}}>
            <Grid container sx={{padding:2}}>
                <Grid item xs={search ? 3 : 12}>
                    <Link to="/">
                        <img src="https://www.linkpicture.com/q/Logo-1_6.png" alt="logo" type="image" width="80" height="40" />
                    </Link>
                </Grid>
                <Grid item xs={search ? 6 : 0} sx={{border:1,borderColor:"primary.light",padding:0}}>
                        {search ? props.children : null }
                </Grid>
                <Grid item xs={search ? 3 : 0}>
                    {search ? 
                        <>
                            <Box display="flex" justifyContent="flex-end">
                                <Button 
                                    className="text-capitalize px-3"
                                    variant="contained"
                                    color="info"
                                    onClick={handleClickOpen}
                                    startIcon={<UploadIcon/>}
                                    >
                                        Upload
                                </Button>    
                            </Box>
                        </> : null
                    }
                </Grid>
            </Grid>
        </Box> 
    )

}