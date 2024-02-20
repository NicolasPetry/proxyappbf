import { Autocomplete, TextField } from "@mui/material";
import axios from "axios";
import React from "react";

const scryFallUrl = "https://api.scryfall.com/cards/autocomplete?q="; 

interface SearchbarProps {
    value: string | null,
    setValue: React.Dispatch<React.SetStateAction<string | null>>,
    inputValue: string,
    setInputValue: React.Dispatch<React.SetStateAction<string>>,
}
export function Searchbar({value, setValue, inputValue, setInputValue}: SearchbarProps) {

    // const [inputValue, setInputValue] = React.useState("");
    const [options, setOptions] = React.useState<readonly string[]>([]);

    React.useEffect(() => {
        
        if (inputValue === '') {
            setOptions(value? [value] : []);
            return undefined;
        } else {
            getScryOptions();
        }

    }, [inputValue])

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

    return (

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
    )
}