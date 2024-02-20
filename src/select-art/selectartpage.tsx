import { Grid, Typography } from "@mui/material";
import axios from "axios";
import React, { useContext } from "react";
import { ImageList } from "../shared-component/imageList";
import { getImageUrlFromScryFall } from "../helper/listOfImagesHelper";
import { CardImage } from "../models/cardImage";
import { Searchbar } from "../shared-component/searchbar";
import { SaveImgDto } from "../dto/saveImgDto";
import { useContextAppMode } from "../context/useContextAppMode";

const scryFallUrlCards = "https://api.scryfall.com/cards/search?q=%21";

export function SelectArtPage() {

    const { appMode } = useContext(useContextAppMode());

    const [listOfCards, setListOfCards] = React.useState<SaveImgDto[]>([])
    const [value, setValue] = React.useState<string | null>(null)
    const [inputValue, setInputValue] = React.useState("");
    
    const [listOfImages, setListOfImages] = React.useState<CardImage[]>([])
    
    /**
     * put into an array all the differents images (art) of a card
     * if card is double faced, then the backside is also put into the array
     * 
     * @param scryfallResponse data retrieved from a scryfall API when searching for a card
     */
    const populateListOfImages = (scryfallResponse: any) => {

        let listI: CardImage[] = [];

        listI = getImageUrlFromScryFall(scryfallResponse);

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
        if (value) {
            getListOfPrints()
        } else {
            setListOfImages([])
        }
    }, [value])

    //TO DO
    //method update list of cards
    //method reset list of cards
    const updateListOfCards = (card: SaveImgDto) => {

        setListOfCards(listOfCards => [...listOfCards, card])

        console.log(listOfCards)
    }
    
    return (
        
            <Grid  marginTop={1}>

                <Searchbar value={value} setValue={setValue}
                           inputValue={inputValue} setInputValue={setInputValue}
                />

                {!appMode && <Grid>
                    <Typography>nombre de carte dans la liste: {listOfCards.length}</Typography>
                    </Grid>
                    }
               
                {  listOfImages.length > 0 &&

                    <ImageList imagesList={listOfImages} imageName={inputValue} addCardToList={updateListOfCards}/>                
                }
            
            </Grid>
        
    )
}