import { Button, Grid, Typography } from "@mui/material";
import axios from "axios";
import React from "react";
import { ImageList } from "../shared-component/imageList";
import { getImageUrlFromScryFall } from "../helper/listOfImagesHelper";
import { CardImage } from "../models/cardImage";
import { Searchbar } from "../shared-component/searchbar";
import { SaveImgDto } from "../dto/saveImgDto";

const scryFallUrlCards = "https://api.scryfall.com/cards/search?q=%21";

const baseUrl = process.env.REACT_APP_BACK_API_URL;

const getPdfSeriesUrl = baseUrl +"/getPdf"
const getPdfUrl = baseUrl + "/getPdfList"
const saveImageUrl = baseUrl + "/createImage"


export function SelectArtPage() {

    // const { appMode } = useContext(useContextAppMode());

    const appMode = false;

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
    
    function updateListOfCards(card: SaveImgDto) {

        setListOfCards(listOfCards => [...listOfCards, card])

        axios.post(
            saveImageUrl, 
            card,
            {
           
                headers: {
                'Access-Control-Allow-Origin': '*' ,
                'Content-Type': 'application/json',

              }
            }
            )


    }

    function resetListOfCards() {

        setListOfCards([])
    }

    function pdfListOfCard() {

        if (listOfCards.length > 0) {

            axios.post(
                getPdfUrl, 
                listOfCards,
                {
                    responseType: 'arraybuffer',
                    headers: {
                    'Access-Control-Allow-Origin': '*' ,
                    'Content-Type': 'application/json',
    
                  }
                }
                ).then(
                response => {
    
                  
                    const url = window.URL.createObjectURL(new Blob([response.data]))
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `list.pdf`;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    window.URL.revokeObjectURL(url);
    
        
                }
            ).catch(error => {
                console.error(error)
            })
        }
    }

    function generatePdfSeriesOf9() {

        let imageTitle: string;
        imageTitle = "hello"

        // if (!images.faceDOWN) {
        //     imageTitle = imageName
        // } 
        // else if (showBackSide) {
        //     let imageTitles = imageName.split('/');
        //     imageTitle = imageTitles[2]
        // }
        // else {
        //     let imageTitles = imageName.split('/');
        //     imageTitle = imageTitles[0]
        // }

        

        const saveImgDto = listOfCards[0]

        axios.post(
            getPdfSeriesUrl, 
            saveImgDto,
            {
                responseType: 'arraybuffer',
                headers: {
                'Access-Control-Allow-Origin': '*' ,
                'Content-Type': 'application/json',

              }
            }
            ).then(
            response => {

              
                const url = window.URL.createObjectURL(new Blob([response.data]))
                const a = document.createElement('a');
                a.href = url;
                a.download = `${imageTitle}.pdf`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);

    
            }
        ).catch(error => {
            console.error(error)
        })
    }
    
    return (
        
            <Grid  marginTop={1}>

                <Searchbar value={value} setValue={setValue}
                           inputValue={inputValue} setInputValue={setInputValue}
                />

                 <Grid>
                    <Typography>nombre de carte dans la liste: {listOfCards.length}</Typography>
                    <Button onClick={ ()=> resetListOfCards()}>Reset list</Button>
                    { listOfCards.length > 0 && <Button onClick={ ()=> pdfListOfCard()}>Create Pdf</Button>}
                    { listOfCards.length === 1 && <Button onClick={ ()=> generatePdfSeriesOf9()}>Series of 9</Button>}
                    </Grid>
                    
               
                {  listOfImages.length > 0 &&

                    <ImageList imagesList={listOfImages} imageName={inputValue} addCardToList={updateListOfCards}/>                
                }
            
            </Grid>
        
    )
}