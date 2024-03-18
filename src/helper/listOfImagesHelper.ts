import { CardImage } from "../models/cardImage";
import { ImageFormat } from "../models/imageFormat";

/**
 * retrieve the images url for a card 
 * 
 * @param scryfallResponse data from scryfall API
 * @returns 
 */
function getImageUrlFromScryFall(scryfallResponse: any): CardImage[] {

    let imageList: CardImage[] = [];

    for (let i = 0; i < scryfallResponse.total_cards; i++) {

        if (scryfallResponse.data[i].card_faces) {

            let imageFormatsFront: ImageFormat = {
                art_crop: scryfallResponse.data[i].card_faces[0].image_uris.art_crop,
                border_crop: scryfallResponse.data[i].card_faces[0].image_uris.border_crop,
                normal: scryfallResponse.data[i].card_faces[0].image_uris.normal,
                small: scryfallResponse.data[i].card_faces[0].image_uris.small,
                illustration_id: scryfallResponse.data[i].card_faces[0].illustration_id
                
            }

            let imageFormatsBack: ImageFormat = {
                art_crop: scryfallResponse.data[i].card_faces[1].image_uris.art_crop,
                border_crop: scryfallResponse.data[i].card_faces[1].image_uris.border_crop,
                normal: scryfallResponse.data[i].card_faces[1].image_uris.normal,
                small: scryfallResponse.data[i].card_faces[1].image_uris.small,
                illustration_id: scryfallResponse.data[i].card_faces[1].illustration_id
                
            }

            let image:CardImage = {faceUP: imageFormatsFront , faceDOWN: imageFormatsBack}
            imageList.push(image)
        } else {
            let imageFormatsFront: ImageFormat = {
                art_crop: scryfallResponse.data[i].image_uris.art_crop,
                border_crop: scryfallResponse.data[i].image_uris.border_crop,
                normal: scryfallResponse.data[i].image_uris.normal,
                small: scryfallResponse.data[i].image_uris.small,
                illustration_id: scryfallResponse.data[i].illustration_id
                
            }
            let image:CardImage = {faceUP: imageFormatsFront}
            imageList.push(image)

        }

    }
  
    return imageList;
}

export {getImageUrlFromScryFall}