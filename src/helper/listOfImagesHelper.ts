import { CardImage } from "../models/cardImage";
import { ImageFormat } from "../models/imageFormat";

/**
 * retrieve the images url for a card 
 * 
 * @param scryfallResponse data from scryfall API
 * @returns 
 */
function getImageUrlFromScryFall(scryfallResponse: any, isDFC: boolean): CardImage[] {

    let imageList: CardImage[] = [];

    //check whether the card has one or two face
    if (isDFC)
        {
            for (let i = 0; i < scryfallResponse.total_cards; i++) {
               
                let imageFormatsFront: ImageFormat = {
                    art_crop: scryfallResponse.data[i].card_faces[0].image_uris.art_crop,
                    border_crop: scryfallResponse.data[i].card_faces[0].image_uris.border_crop,
                    normal: scryfallResponse.data[i].card_faces[0].image_uris.normal,
                    small: scryfallResponse.data[i].card_faces[0].image_uris.small,
                    
                }

                let imageFormatsBack: ImageFormat = {
                    art_crop: scryfallResponse.data[i].card_faces[1].image_uris.art_crop,
                    border_crop: scryfallResponse.data[i].card_faces[1].image_uris.border_crop,
                    normal: scryfallResponse.data[i].card_faces[1].image_uris.normal,
                    small: scryfallResponse.data[i].card_faces[1].image_uris.small,
                    
                }

                let image:CardImage = {faceUP: imageFormatsFront , faceDOWN: imageFormatsBack}
                imageList.push(image)
            }
        } 
    else
        {
            for (let i = 0; i < scryfallResponse.total_cards; i++) {

                let imageFormatsFront: ImageFormat = {
                    art_crop: scryfallResponse.data[i].image_uris.art_crop,
                    border_crop: scryfallResponse.data[i].image_uris.border_crop,
                    normal: scryfallResponse.data[i].image_uris.normal,
                    small: scryfallResponse.data[i].image_uris.small,
                    
                }

                let image:CardImage = {faceUP: imageFormatsFront}
                imageList.push(image)
            }
        }

    return imageList;
}

export {getImageUrlFromScryFall}