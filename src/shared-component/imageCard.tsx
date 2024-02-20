import { Button, Card, CardActions, CardContent} from "@mui/material";
import axios from "axios";
import { SaveImgDto } from "../dto/saveImgDto";
import { CardImage } from "../models/cardImage";
import React, { useContext } from "react";
import { useContextAppMode } from "../context/useContextAppMode";

const getPdfUrl = "http://localhost:9000/getPdf"

interface ImageCardProps {
    images: CardImage,
    imageName: string,
    imageFormat: string,
    updateList: (card: SaveImgDto) => void
}

export function ImageCard({images, imageName, imageFormat, updateList}: ImageCardProps) {

    const { appMode } = useContext(useContextAppMode());


    const [showBackSide, setShowBackSide] = React.useState<boolean>(false)

    const [frontSide, setFrontSide] = React.useState<string>("")
    const [backSide, setBackSide] = React.useState<string | undefined>("")

    React.useEffect(() => {

        switch(imageFormat) {
            case "art_crop": {
                setFrontSide(images.faceUP.art_crop);
                setBackSide(images.faceDOWN?.art_crop);
                break
            }
            case "border_crop": {
                setFrontSide(images.faceUP.border_crop);
                setBackSide(images.faceDOWN?.border_crop);
                break
            }
            case "normal": {
                setFrontSide(images.faceUP.normal);
                setBackSide(images.faceDOWN?.normal);
                break
            }
            case "small": {
                setFrontSide(images.faceUP.small);
                setBackSide(images.faceDOWN?.small);
                break
            }
            default: {
                setFrontSide(images.faceUP.normal);
                setBackSide(images.faceDOWN?.normal);
                break
            }
        }

    }, [imageFormat])

    function changeSide() {

        setShowBackSide(showBackSide? false: true)

    }

    function makeImgDto(cardInfo: CardImage): SaveImgDto {

        let imagePath = showBackSide? cardInfo.faceDOWN!.normal: cardInfo.faceUP.normal;
        let imageTitle: string;

        if (!images.faceDOWN) {
            imageTitle = imageName
        } 
        else if (showBackSide) {
            let imageTitles = imageName.split('/');
            imageTitle = imageTitles[2]
        }
        else {
            let imageTitles = imageName.split('/');
            imageTitle = imageTitles[0]
        }

        const saveImgDto: SaveImgDto = {
            imageScryFallUrl: imagePath, fileName: `${imageTitle}.jpg`
        }

        return saveImgDto;
    }

    function addCardToList(imageSelected: CardImage) {

        const saveImgDto = makeImgDto(imageSelected);
        updateList(saveImgDto)

    }

    function generatePdf(imageSelected: CardImage) {

        // let imagePath = showBackSide? imageSelected.faceDOWN!.normal: imageSelected.faceUP.normal;
        let imageTitle: string;

        if (!images.faceDOWN) {
            imageTitle = imageName
        } 
        else if (showBackSide) {
            let imageTitles = imageName.split('/');
            imageTitle = imageTitles[2]
        }
        else {
            let imageTitles = imageName.split('/');
            imageTitle = imageTitles[0]
        }

        

        const saveImgDto = makeImgDto(imageSelected);
        
        axios.post(
            getPdfUrl, 
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

        <Card sx={{ maxWidth: 600 }}>
            <CardContent >
                {!showBackSide && <img src={frontSide} alt="a print of the front side"></img>}
                {showBackSide && <img src={backSide} alt="a print of the back side"></img>}
            </CardContent>
            <CardActions>
                {appMode && <Button onClick={ () => generatePdf(images)}>Select art</Button>}
                {!appMode && <Button onClick={ () => addCardToList(images)}>Add card to list</Button>}
                {images.faceDOWN && <Button onClick={ () => changeSide()}> select other side</Button>}
            </CardActions>
        </Card>
    )
}