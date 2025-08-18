import iwflt from 'assets/album art/iwflt.jpg';
import wtwin from 'assets/album art/wtwin.jpg';
import bl from 'assets/album art/bl.jpg';
import pnpp from 'assets/album art/pnpp.jpg';
import rof from 'assets/album art/rof.jpg';
import tw from 'assets/album art/tw.jpg';

import spotify from 'assets/streaming/spotify.png';
import bandcamp from 'assets/streaming/bandcamp.png';
import amazon from 'assets/streaming/amazon.png';
import tidal from 'assets/streaming/tidal.png';
import apple from 'assets/streaming/apple music.png';
import youtube from 'assets/streaming/youtube.png';

import fruitunes from 'assets/fruitunes.png';
import clickSfx from 'assets/sfx/click.mp3';

import { useState, useContext, useRef } from 'react';

import { MouseTracker } from 'components/computer/MouseTracker';
import { SoundContext } from 'stores/SoundContext';
import { useAudio } from 'hooks/useAudio';

const SERVICES = [
    {
        title: 'Bandcamp',
        img: bandcamp,
        link: 'https://fruitflymusic.bandcamp.com/'
    },
    {
        title: 'Spotify',
        img: spotify,
        link: 'https://open.spotify.com/artist/4ZS1bnKFg2fs61F5Zce0yd?si=njbeYrwORyijWdwYMlQjMA'
    },
    {
        title: 'Apple Music',
        img: apple,
        link: 'https://music.apple.com/us/artist/fruitfly/1534642399'
    },
    {
        title: 'YouTube Music',
        img: youtube,
        link: 'https://music.youtube.com/channel/UCJT3QV--aTGobjlnqLUn2Gg'
    },
    {
        title: 'Tidal',
        img: tidal,
        link: 'https://tidal.com/browse/artist/21623723'
    },
    {
        title: 'Amazon Music',
        img: amazon,
        link: 'https://music.amazon.com/artists/B08KTBN714/fruitfly'
    }
];

const ALBUMS = [
    {
        title: 'It Was Fine Last Time',
        year: 2025,
        img: iwflt,
        type: 'EP'
    },
    {
        title: 'When the Weather is Nice',
        year: 2024,
        img: wtwin,
        type: 'Album'
    },
    {
        title: 'Bottom Line',
        year: 2022,
        img: bl,
        type: 'Single'
    },
    {
        title: 'Pile! No Pile! Pile!',
        year: 2022,
        img: pnpp,
        type: 'Single'
    },
    {
        title: 'Running On Fumes',
        year: 2021,
        img: rof,
        type: 'Album'
    },
    {
        title: 'Tapeworm (Demo)',
        year: 2020,
        img: tw,
        type: 'Single'
    }
];

const Music = () => {

    const [hoverTarget, setHoverTarget] = useState(null);
    const soundOn = useContext(SoundContext);
    const playClickSfx = useAudio(clickSfx);
    const mainPage = useRef(null);

    const navigate = (link) => {
        if(soundOn) {
            playClickSfx();
        }
        window.open(link, '_blank');
    }

    const serviceButtons = SERVICES.map(service => (
        <div className="music-button vertical-flex-center">
            <div className="music-link" onClick={() => navigate(service.link)} onMouseEnter={() => setHoverTarget(service.title)} onMouseLeave={() => setHoverTarget(null)}>
                <img src={service.img} alt={service.title} className="music-button-icon"/>
            </div>
        </div>
    ));

    const albumButtons = ALBUMS.map(album => (
        <div className="album-card">
            <img src={album.img} alt={album.title} className="album-cover"/>
            <div className="album-title">{album.title}</div>
            <div className="album-year">{album.year} | {album.type}</div>
        </div>
    ));

    return (
        <div className="vertical-flex-center window-contents" ref={mainPage}>
            {hoverTarget && <MouseTracker mainPage={mainPage.current}>{hoverTarget}</MouseTracker>}
            <div className="music-logo">
                <img src={fruitunes} alt="FruitTunes" />
            </div>
            <div className="music-buttons">
                {serviceButtons}
            </div>
            <div className="music-header">
                {albumButtons}
            </div>
        </div>
    );
}

export default Music;