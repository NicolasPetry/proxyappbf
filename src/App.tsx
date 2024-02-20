
import { Grid } from '@mui/material';
import './App.css';
import { MainContext } from './context/mainContext';
import { Menu } from './menu/menu';
import { SelectArtPage } from './select-art/selectartpage';

function App() {
  return (
    <MainContext>
      <Grid className='Main-Container'>
      <Menu/>
        <SelectArtPage/>
      </Grid>
        
    </MainContext>
    
  )
}

export default App;
