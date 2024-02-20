import React from "react"
import { Searchbar } from "../shared-component/searchbar"
import { CardImage } from "../models/cardImage"
import { ImageList } from "../shared-component/imageList"
import { Grid } from "@mui/material"

export function SelectCardsPage() {

    const [value, setValue] = React.useState<string | null>(null)
    const [inputValue, setInputValue] = React.useState("");
    const [listOfImages, setListOfImages] = React.useState<CardImage[]>([])
    
    return (
        <Grid  >

<Searchbar value={value} setValue={setValue}
                           inputValue={inputValue} setInputValue={setInputValue}
                />
              
            </Grid>
    )
}