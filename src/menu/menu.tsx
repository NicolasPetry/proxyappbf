import { Card, CardActionArea, Grid, Paper } from "@mui/material";
import { useContext } from "react";
import { useContextAppMode } from "../context/useContextAppMode";

export function Menu() {

    const { appMode, setAppMode } = useContext(useContextAppMode());

    const changeMode = () => {
        console.log(appMode)
       setAppMode(appMode? false: true)
    }

  

    return (
      
     
            <Paper>
                <Grid container>
                    <Grid item xs={8}>
                        {appMode && <Card>Search a card then select one specific art</Card>}
                        {!appMode && <Card>Create a list of cards</Card>}
                    </Grid>
                    <Grid item xs={4}>
                        <Card>
                            <CardActionArea onClick={ ()=> changeMode() }>
                            Change Mode
                            </CardActionArea>
                        </Card>
                        
                    </Grid>
                </Grid>
         
            </Paper>
 
    )
}