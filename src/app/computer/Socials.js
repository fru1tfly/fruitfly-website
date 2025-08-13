import clickSfx from 'assets/sfx/click.mp3';

import instagram from 'assets/socials/instagram.png';
import tiktok from 'assets/socials/tiktok.png';
import youtube from 'assets/socials/youtube.png';
import twitch from 'assets/socials/twitch.png';
import facebook from 'assets/socials/facebook.png';
import bluesky from 'assets/socials/bluesky.png';

import online from 'assets/online.png';

import { MouseTracker } from 'components/MouseTracker';
import { SoundContext } from 'stores/SoundContext';
import { useAudio } from 'hooks/useAudio';
import { useRef, useState, useContext } from 'react';

const PLATFORMS = [
    {
        title: 'Instagram',
        img: instagram,
        link: 'https://instagram.com/fruitfly_music'
    },
    {
        title: 'TikTok',
        img: tiktok,
        link: 'https://tiktok.com/@fruitfly_music'
    },
    {
        title: 'YouTube',
        img: youtube,
        link: 'https://youtube.com/@fruitfly_music'
    },
    {
        title: 'Twitch',
        img: twitch,
        link: 'https://twitch.tv/fruitfly_music'
    },
    {
        title: 'Facebook',
        img: facebook,
        link: 'https://facebook.com/fruitflymusic'
    },
    {
        title: 'Bluesky',
        img: bluesky,
        link: 'https://bsky.app/profile/fruitflymusic.bsky.social'
    }
];

const Socials = () => {
    const mainPage = useRef(null);
    const [hoverTarget, setHoverTarget] = useState(null);
    const soundOn = useContext(SoundContext);
    const playClickSfx = useAudio(clickSfx);

    const navigate = (link) => {
        if(soundOn) {
            playClickSfx();
        }
        window.open(link, '_blank');
    }

    const platformButtons = PLATFORMS.map(platform => (
        <div className="platform-button">
            <div className="platform-link vertical-flex-center" onClick={() => navigate(platform.link)} onMouseEnter={() => setHoverTarget(platform.title)} onMouseLeave={() => setHoverTarget(null)}>
                <img src={platform.img} alt={platform.title} className="platform-button-icon"/>
                <div className="platform-button-caption">{platform.title}</div>
            </div>
        </div>
    ));

    return (
        <div ref={mainPage} className="vertical-flex-center window-contents">
            <img className="online-img" src={online} alt="Fruitfly Online" />
            {hoverTarget && <MouseTracker mainPage={mainPage.current}>{hoverTarget}</MouseTracker>}
            <div className="platform-buttons">
                {platformButtons}
            </div>
            
        </div>
    );
};

export default Socials;