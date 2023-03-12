import './App.css';
import {useState} from "react"
import Header from './Header';
import theme from "./Theme"
import VideoDetails from './VideoDetails';
import {ThemeProvider} from "@mui/material/styles"
import Genre from './Genre';
import VideosGrid from './VideosGrid';
import LandingPage from './LandingPage';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import {SnackbarProvider} from "notistack"
import { AppState } from './AppContext';
import UploadVideo from './UploadVideo';


function App() {
  return (
    <BrowserRouter>
      <AppState>
        <ThemeProvider theme={theme}>
          <SnackbarProvider>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/videos/:videoId" element={<VideoDetails  />} />
            </Routes>
          </SnackbarProvider>
        </ThemeProvider>
     </AppState>
    </BrowserRouter>          
  );
}

export default App;
