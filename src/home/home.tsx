import { Autocomplete, Grid, TextField } from "@mui/material";
import axios from "axios";
import React from "react";
import { ImageList } from "./imageList";
import { getImageUrlFromScryFall } from "../helper/listOfImagesHelper";
import { CardImage } from "../models/cardImage";

const scryFallUrl = "https://api.scryfall.com/cards/autocomplete?q="; 
const scryFallUrlCards = "https://api.scryfall.com/cards/search?q=%21";

export function HomePage() {

    const [value, setValue] = React.useState<string | null>(null)
    const [inputValue, setInputValue] = React.useState("");
    const [options, setOptions] = React.useState<readonly string[]>([]);
    
    const [listOfImages, setListOfImages] = React.useState<CardImage[]>([])
    
    /**
     * return the options (list of cards) matching the input value
     * the scryfall url being called is: https://api.scryfall.com/cards/autocomplete?q= 
     */
    function getScryOptions() {

            axios.get<any>(scryFallUrl + inputValue).then(function (response) {
                if (response.data.data.length > 0) {
                    setOptions(response.data.data)
                }
        })
            
    }

    /**
     * from a unique cards put into an array all the differents images (art) for said cards
     * if card is double faced, then the backside is also put into the array
     * 
     * @param scryfallResponse data retrieved from a scryfall API when searching for a card
     */
    const populateListOfImages = (scryfallResponse: any) => {

        let listI: CardImage[] = [];

        //check whether the card has one or two faces
        //we check only the first object in array
        //because the cards are all either DFC or SFC
        let backSide = scryfallResponse.data[0].card_faces ? true: false;

        listI = getImageUrlFromScryFall(scryfallResponse, backSide);

        setListOfImages(listI);
    }

    /**
     * for a card, get all the images (art) from scryfall API
     */
    const getListOfPrints = () => {

        const fullUrl = `${scryFallUrlCards}"${value}"&unique=prints`;

        axios.get<any>(fullUrl)
        .then( response =>
            populateListOfImages(response.data)
        )
    }

    React.useEffect(() => {
        

        if (inputValue === '') {
            setOptions(value? [value] : []);
            return undefined;
        } else {
            getScryOptions();
        }

    }, [inputValue])

    React.useEffect(() => {
        if (value) {
            getListOfPrints()
        } else {
            setListOfImages([])
        }
    }, [value])

    
    return (
        
            <Grid  >

                {/* search bar */}
                <Autocomplete
                value={value}
                onChange={(event: any, newValue: string | null) => {
                    setValue(newValue);
                }}

                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                    if (event !== null) {
                        setInputValue(newInputValue)
                      } 
                    
                }}

                filterOptions={(x) => x}
                options={options}
                
                renderInput={(params) => <TextField {...params} label="search for a card" />}
                />
                {/* search bar */}

                {/* image cards */}
               
                {  listOfImages.length > 0 &&

                    <ImageList imagesList={listOfImages} imageName={inputValue}/>                
                }
            
                 {/* image cards */}
            </Grid>
        
    )
}