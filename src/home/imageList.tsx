import { FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup} from "@mui/material";
import { CardImage } from "../models/cardImage";
import { ImageCard } from "./imageCard";
import React from "react";
import { wrap } from "module";



interface ImageListProps {
    imagesList: CardImage[],
    imageName: string
}
export function ImageList(
    {imagesList, imageName}: ImageListProps
) {

    const [imageFormat, setImageFormat] = React.useState<string>('normal');

    function changeImageFormat(event: React.ChangeEvent<HTMLInputElement>) {

        setImageFormat((event.target as HTMLInputElement).value)
    }
    return (
        
        <>
        <Grid container>
            <Grid item xs={12}>
            <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">Select Image Format</FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={imageFormat}
                    onChange={changeImageFormat}
                >
                    <FormControlLabel value="art_crop" control={<Radio />} label="art_crop" />
                    <FormControlLabel value="border_crop" control={<Radio />} label="border_crop" />
                    <FormControlLabel value="normal" control={<Radio />} label="normal"/>
                    <FormControlLabel value="small" control={<Radio />} label="small"/>
                </RadioGroup>
                </FormControl>
            </Grid>

            <Grid item xs={12} display={"flex"} flexWrap={"wrap"}>
            { 
        
                imagesList.map((images: CardImage, index: number) => 

                <Grid key={index} item >
                    <ImageCard images={images} imageName={imageName} imageFormat={imageFormat}/>
                </Grid>
                
                )
            }
            </Grid>
        </Grid>
         
        
        </>
 
    )
}