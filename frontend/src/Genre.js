import { Box, Button, ButtonGroup, MenuItem, Select } from '@mui/material'
import React, { useContext } from 'react'
import AppContext from './AppContext'
import "./Genre.css"


export default function Genre() {
    const props = useContext(AppContext)
    const genre = props.genre
    const contentRating = props.contentRating
    const genreType = props.genreType
    const contentRatingType = props.contentRatingType
    const sortingBy = props.sortingBy
    const sortBy = props.sortBy
    const handleGenre = props.handleGenre
    const handleSortingBy = props.handleSortingBy
    const handleContentRatingType = props.handleContentRatingType
    

  return (
    <Box sx={{backgroundColor:"primary.main",color:"primary.contrastText"}}>
      <Box className="d-flex justify-content-center align-items-center">
            <ButtonGroup
                value={genreType} 
                onChange={handleGenre}
                aria-label="genre panel"
                size="small"
                className='d-flex justify-content-center mt-1'
            >
            {genre.map((gen) => { 
                return(
                    genreType.includes(gen) === true ? 
                    <Button variant="string" onClick={handleGenre} sx={{backgroundColor:"primary.contrastText",color:"primary.main"}} key={gen} className="text-capitalize rounded-5 px-2 ms-2 fs-6" id="genreButton" value={gen} aria-label={gen}>
                        {gen}
                    </Button>
                    : 
                    <Button variant="string" onClick={handleGenre} key={gen} className="text-capitalize rounded-5 px-2 ms-2 fs-6" value={gen} aria-label={gen}>
                        {gen}
                    </Button>
                )
            })}
            </ButtonGroup> 
            <Select
                    value={sortingBy}
                    onChange={handleSortingBy}
                    aria-label="sortBy"
                    className='ms-4 mt-1 rounded-5 border border-0 genreButton'
                    size='small'
                    sx={{backgroundColor:"primary.contrastText",color:"primary.main"}}
                >
                    {sortBy.map((filter)=>{
                        return(
                            <MenuItem  value={filter} key={filter}>{filter}</MenuItem>
                        )
                    })}
            </Select>   
        </Box>
        <ButtonGroup
            value={contentRatingType}
            aria-label="genre panel"
            size="small"
            className='d-flex justify-content-center py-3'
        >
        {contentRating.map((rating) => {
            return(
                contentRatingType === rating ?
                    <Button sx={{backgroundColor:"#ffffff",color:"primary.main"}} variant="string" key={rating} value={rating}  onClick={handleContentRatingType} id="genreButton" className="text-capitalize border-0 rounded-5 px-2 ms-5 fs-6" >
                        {rating}
                    </Button>
                :
                <Button variant="string" sx={{color:"primary.contrastText"}} key={rating} value={rating}  onClick={handleContentRatingType} className="text-capitalize border-0 rounded-5 px-2 ms-5 fs-6" >
                    {rating}
                </Button>  
            )
        })}
        </ButtonGroup>
    </Box>
  )
}
