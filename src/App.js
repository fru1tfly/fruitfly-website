import './App.css';
import Icon from './icon';
import SoundButton from './SoundButton';

import { SoundContext } from './SoundContext';

import logo from './assets/logo.png';
import music from './assets/icons/music-icon.png';
import contact from './assets/icons/contact-icon.png';
import epk from './assets/icons/epk-icon.png';
import shows from './assets/icons/shows-icon.png';
import socials from './assets/icons/socials-icon.png';
import photos from './assets/icons/photos-icon.png';
import { useState } from 'react';

import Music from './Music';
import Shows from './Shows';
import Socials from './Socials';
import Photos from './Photos';
import Contact from './Contact';

function App() {
  
  const [soundOn, setSoundOn] = useState(true);
  

  return (
    <div>
                  {/* <img src={logo} className="main-logo"/> */}

      <div className="computer-border">
        <div className="computer-border-row">
          <div className="computer-corner-top flipped"></div>
          <div className="computer-top"></div>
          <div className="computer-corner-top"></div>
        </div>
        <div className="computer-border-row middle-gap">
          <div className="computer-side flipped"></div>
          <div className="computer-side"></div>
        </div>
        <div className="computer-border-row">
          <div className="computer-corner-bottom flipped"></div>
          <div className="computer-bottom"></div>
          <div className="computer-corner-bottom"></div>
          <div className="computer-logo"></div>
          <div className="computer-floppy-bar">
            <div className="computer-floppy-band"></div>
            <div className="computer-floppy-drive"></div>
          </div>
        </div>
        <div className="links-bar">
        </div>
        <div className="page-content">
          <div className="scanlines">
            <div className="vignette">
              <div className="home-page-content">
                <SoundContext.Provider value={soundOn}>
                  <SoundButton soundOn={soundOn} setSoundOn={setSoundOn} />
                  <div className="icons">
                    <Icon imgSrc={music} caption="Music">
                      <Music />
                    </Icon>
                    <Icon imgSrc={shows} caption="Shows">
                      <Shows />
                    </Icon>
                    <Icon imgSrc={socials} caption="Socials">
                      <Socials />
                    </Icon>
                    <Icon imgSrc={photos} caption="Photos & Videos">
                      <Photos />
                    </Icon>
                    <Icon imgSrc={contact} caption="Contact">
                      <Contact />
                    </Icon>
                    <Icon imgSrc={epk} caption="EPK">
                    </Icon>
                  </div>
                </SoundContext.Provider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
