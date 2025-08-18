import directions from 'assets/directions.png';

import { useContext } from 'react';
import { SoundContext } from "stores/SoundContext";
import clickSfx from 'assets/sfx/click.mp3';
import { useAudio } from 'hooks/useAudio';

import Window from 'components/computer/Window';
import { useGet } from 'hooks/useGet';
import { formatDate, formatTime } from 'utils/dates';

const Shows = () => {

    const { result } = useGet('/shows/upcoming');
    const shows = result?.shows;

    const soundOn = useContext(SoundContext);
    const playClickSfx = useAudio(clickSfx);

    const playClick = () => {
        if(soundOn) {
            playClickSfx();
        }
    }

    const showDetails = shows?.map(show => {

        const showFlyer = (
            <img src={show.imgUrl} className="show-flyer" alt={show.title} />
        );

        return (
            <div className="show-card">
                <Window wrapperClass="show-flyer-container" wrapperContent={showFlyer} caption={show.title} isChild={true}>
                    <img src={show.imgUrl} className="show-flyer-fullsize" alt={show.title}/>
                </Window>
                <div className="show-details">
                    <div className="show-title">
                        <span>{show.showName ? show.showName : show.venueName} {show.city !== 'Cleveland' && <>({show.city})</>}</span>
                        <span className="show-date">{formatDate(show.date)}</span>
                    </div>
                    <div className="show-title show-date"></div>
                    {show.showName && <div className="show-subtitle">{show.venueName}</div>}
                    {show.otherActs && 
                        <div className="show-subtitle">{`w/${show.otherActs.join(', ')}`}</div>
                    }
                    {show.venueName && show.setTime &&
                        <div className="show-subtitle">{show.venueName} | Fruitfly at {show.setTime}</div>
                    }
                    <div className="show-details-gap"></div>
                    <div className="show-details-info">
                        {show.doorsTime && <span>Doors: {formatTime(show.doorsTime)}</span>}
                        {show.showTime && <span>Music: {formatTime(show.showTime)}</span>}
                        {show.price && 
                            <div>{show.price}</div>
                        }
                        {!show.doorsTime && !show.showTime && !show.price &&
                            <span>Details TBA</span>
                        }
                    </div>
                        <div className="show-ticket-link">
                            {show.address && show.address !== "House" &&
                                <a href={`https://maps.google.com/?q=${show.address}`} onClick={playClick} target="_blank" rel="noreferrer">
                                    <img src={directions} alt="Directions" />
                                </a>
                            }
                            {show.ticketUrl && 
                                <a href={show.ticketUrl} target="_blank" onClick={playClick} rel="noreferrer">Tickets</a>
                            }
                            {show.address && show.address === "House" &&
                                <span>Contact For Address</span>
                            }
                            {show.ageRestriction && show.ageRestriction !== 'All Ages' &&
                                <span>({show.ageRestriction})</span>
                            }
                        </div>
                </div>
            </div>
        );
    });

    return (
        <div className="show-cards">
            {shows?.length > 0 &&
                <>
                    {showDetails}
                </>
            }
            {shows?.length === 0 &&
                <div className="no-shows-msg">There are no upcoming shows.</div>
            }
        </div>
    );
};

export default Shows;