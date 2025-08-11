import on from 'assets/soundon.png';
import off from 'assets/soundoff.png';
import onSfx from 'assets/sfx/soundon.mp3';

import { useAudio } from 'hooks/Audio';

const SoundButton = ({soundOn, setSoundOn}) => {
    const playOnSfx = useAudio(onSfx);

    const enable = () => {
        setSoundOn(true);
        playOnSfx();
    };

    const disable = () => {
        setSoundOn(false);
    };

    return (
        <>
        {soundOn && 
            <img src={on} alt="Sound On" className="sound-btn" onClick={disable}/>
        }
        {!soundOn && 
            <img src={off} alt="Sound Off" className="sound-btn" onClick={enable}/>
        }
        </>
    );
}

export default SoundButton;