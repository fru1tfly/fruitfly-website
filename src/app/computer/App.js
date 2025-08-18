import '../styles/computer.css';
import Icon from 'components/computer/icon';
import SoundButton from 'components/computer/SoundButton';
import { SoundContext } from 'stores/SoundContext';

import logo from 'assets/logo.png';
import music from 'assets/icons/music-icon.png';
import contact from 'assets/icons/contact-icon.png';
import epk from 'assets/icons/epk-icon.png';
import shows from 'assets/icons/shows-icon.png';
import socials from 'assets/icons/socials-icon.png';
import photos from 'assets/icons/photos-icon.png';

import Music from './Music';
import Shows from './Shows';
import Socials from './Socials';
import Photos from './Photos';
import Contact from './Contact';

import { useState } from 'react';
import ComputerBox from 'components/computer/ComputerBox';

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
          <img src={logo} className="main-logo" alt="Fruitfly"/>
        </div>
        <ComputerBox>
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
        </ComputerBox>
        <p className="credits">Site by Kyle Thompson | Photo by Murphy Gerrasch</p>
      </div>
    </div>
  );
}

export default App;
