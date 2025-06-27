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

import Music from './Music';
import Shows from './Shows';
import Socials from './Socials';
import Photos from './Photos';
import Contact from './Contact';

import { useState } from 'react';

function App() {
  
  const [soundOn, setSoundOn] = useState(true);
  const params = new URLSearchParams(window.location.search);
  let w = null;

  for(const [key, value] of params) {
    if(key === "w") {
      w = value;
    }
  }

  return (
    <div className="bg-photo">
    <div className="vertical-flex-center container">
      <div>
      <img src={logo} className="main-logo"/>
      </div>
      <div className="computer-border center-x">
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
        <div className="scanlines">
          <div className="vignette">
              <SoundContext.Provider value={soundOn}>
                <SoundButton soundOn={soundOn} setSoundOn={setSoundOn} />
                <div className="icons">
                  <Icon imgSrc={music} caption="Music" open={w === "music"}>
                    <Music />
                  </Icon>
                  <Icon imgSrc={shows} caption="Shows" open={w === "shows"}>
                    <Shows />
                  </Icon>
                  <Icon imgSrc={socials} caption="Socials" open={w === "socials"}>
                    <Socials />
                  </Icon>
                  <Icon imgSrc={photos} caption="Pics & Vids" open={w === "media"}>
                    <Photos />
                  </Icon>
                  <Icon imgSrc={contact} caption="Contact" open={w === "contact"}>
                    <Contact />
                  </Icon>
                  <Icon imgSrc={epk} caption="Media Kit" isLink={true} url="/epk">
                  </Icon>
                </div>
              </SoundContext.Provider>
          </div>
        </div>
      </div>
      <p className="credits">Site by Kyle Thompson | Photo by Murphy Gerrasch</p>
    </div>
    </div>
  );
}

export default App;
