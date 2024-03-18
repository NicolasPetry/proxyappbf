import { Button, Card, CardActions, CardContent} from "@mui/material";
import axios from "axios";
import { SaveImgDto } from "../dto/saveImgDto";
import { CardImage } from "../models/cardImage";
import React from "react";

const baseUrl = process.env.REACT_APP_BACK_API_URL;
const getPdfUrl = baseUrl +"/getPdf"

interface ImageCardProps {
    images: CardImage,
    imageName: string,
    imageFormat: string,
    updateList: (card: SaveImgDto) => void
}

export function ImageCard({images, imageName, imageFormat, updateList}: ImageCardProps) {

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

    function populateImgDto(cardInfo: CardImage): SaveImgDto {

        let imagePath = showBackSide? cardInfo.faceDOWN!.normal: cardInfo.faceUP.normal;

        let imageId = showBackSide? cardInfo.faceDOWN!.illustration_id : cardInfo.faceUP.illustration_id

        const saveImgDto: SaveImgDto = {
            imageScryFallUrl: imagePath, illustration_id: imageId
        }

        return saveImgDto;
    }

    function addCardToList(imageSelected: CardImage) {

        const saveImgDto = populateImgDto(imageSelected);
        updateList(saveImgDto)

    }

    return (

        <Card sx={{ maxWidth: 600 }}>
            <CardContent >
                {!showBackSide && <img src={frontSide} alt="a print of the front side"></img>}
                {showBackSide && <img src={backSide} alt="a print of the back side"></img>}
            </CardContent>
            <CardActions>
               
               <Button onClick={ () => addCardToList(images)}>Add card to list</Button>
                {images.faceDOWN && <Button onClick={ () => changeSide()}> select other side</Button>}
            </CardActions>
        </Card>
    )
}