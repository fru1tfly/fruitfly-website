import foundationroom from './assets/shows/foundationroom.jpg';
import fpr from './assets/shows/fpr.jpg';
import happydog from './assets/shows/happydog.JPG';
import brothers from './assets/shows/brothers.jpg';
import okcool from './assets/shows/okcool.jpg';

import directions from './assets/directions.png';

import { useContext } from 'react';
import { SoundContext } from "./SoundContext";
import clickSfx from './assets/sfx/click.mp3';
import { useAudio } from './Audio';

import Window from './Window';

const SHOWS = [
    {
        title: 'Grog Shop',
        otherActs: ['OK Cool', 'TunnelVision'],
        date: '8/20',
        doors: '7PM',
        showTime: '8PM',
        flyer: okcool,
        address: '2785 Euclid Heights Blvd, Cleveland Heights, OH',
        ticketLink: 'https://grogshop.gs/tm-event/ok-cool-tunnel-vision-fruitfly/'
    }
];

const Shows = () => {

    const soundOn = useContext(SoundContext);
    const playClickSfx = useAudio(clickSfx);

    const actList = (otherActs) => {
        const prefix = 'w/';
        if(otherActs.length === 1) {
            return `${prefix}${otherActs[0]}`;
        }
        if(otherActs.length === 2) {
            return `${prefix}${otherActs[0]} & ${otherActs[1]}`;
        }
    };

    const playClick = () => {
        if(soundOn) {
            playClickSfx();
        }
    }

    const showDetails = SHOWS.map(show => {

        const showFlyer = (
            <img src={show.flyer} className="show-flyer" alt={show.title} />
        );

        return (
            <div className="show-card">
                <Window wrapperClass="show-flyer-container" wrapperContent={showFlyer} caption={show.title} isChild={true}>
                    <img src={show.flyer} className="show-flyer-fullsize" alt={show.title}/>
                </Window>
                <div className="show-details">
                    <div className="show-title">
                        <span>{show.title}</span>
                        <span className="show-date">{show.date}</span>
                    </div>
                    <div className="show-title show-date"></div>
                    {show.otherActs && 
                        <div className="show-subtitle">{actList(show.otherActs)}</div>
                    }
                    {show.venue && show.setTime &&
                        <div className="show-subtitle">{show.venue} | Fruitfly at {show.setTime}</div>
                    }
                    <div className="show-details-gap"></div>
                    <div className="show-details-info">
                        {show.doors && <span>Doors: {show.doors}</span>}
                        {show.showTime && <span>Music: {show.showTime}</span>}
                        {show.price && 
                            <div>{show.price}</div>
                        }
                        {!show.doors && !show.showTime && !show.price &&
                            <span>Details TBA</span>
                        }
                    </div>
                        <div className="show-ticket-link">
                            {show.address && show.address !== "House" &&
                                <a href={`https://maps.google.com/?q=${show.address}`} onClick={playClick} target="_blank" rel="noreferrer">
                                    <img src={directions} alt="Directions" />
                                </a>
                            }
                            {show.ticketLink && 
                                <a href={show.ticketLink} target="_blank" onClick={playClick} rel="noreferrer">Tickets</a>
                            }
                            {show.address && show.address === "House" &&
                                <span>Contact For Address</span>
                            }
                            {show.ageRestriction &&
                                <span>({show.ageRestriction})</span>
                            }
                        </div>
                </div>
            </div>
        );
    });

    return (
        <div className="show-cards">
            {SHOWS.length > 0 &&
                <>
                    {showDetails}
                </>
            }
            {SHOWS.length === 0 &&
                <div className="no-shows-msg">There are no upcoming shows.</div>
            }
        </div>
    );
};

export default Shows;