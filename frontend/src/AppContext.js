import { createContext, useState } from "react";


const AppContext = createContext()



const AppState = (props) => {
    const [backdropOpen,setBackdropOpen] = useState(false)
    const [videos,setVideos] = useState([])
    const [open, setOpen] = useState(false);
    const [genreType,setGenreType] = useState(["All"])
    const sortBy = ["ReleaseDate","ViewCount"]

    const [contentRatingType,setContentRatingType] = useState(["Any age group"]) 

    const handleContentRatingType = (event) => {
        setContentRatingType(event.target.value)
    }

    const contentRating = ["Any age group", "7+", "12+", "16+", "18+"]
    
    const handleGenre = (event) => {
        const val = event.target.value
        if(genreType.includes(val)){
            setGenreType(genreType.filter(genre => genre !== val))
        }
        else{
            setGenreType([...genreType,val])
        }
    }

    const genre =  [ "All","Education", "Sports", "Movies", "Comedy", "Lifestyle" ]
    const [sortingBy,setSortingBy] = useState("ReleaseDate")

    const handleSortingBy = (event) => {
        setSortingBy(event.target.value)
    }


    const handleClickOpen = () => {
        setOpen(true);
        setBackdropOpen(true)
    }

    return(
        <AppContext.Provider value={{videos,setVideos,open,setOpen,handleClickOpen,genreType,setGenreType,sortBy,contentRatingType,setContentRatingType,handleContentRatingType,contentRating,handleGenre,genre,sortingBy,setSortingBy,handleSortingBy,backdropOpen,setBackdropOpen}}>
            {props.children}
        </AppContext.Provider>
    )
}

export {AppState}

export default AppContext