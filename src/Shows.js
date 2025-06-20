import foundationroom from './assets/shows/foundationroom.jpg';
import fpr from './assets/shows/fpr.jpg';
import happydog from './assets/shows/happydog.JPG';
import brothers from './assets/shows/brothers.jpg';
import okcool from './assets/shows/okcool.jpg';

import directions from './assets/directions.png';

import { useRef, useContext } from 'react';
import { SoundContext } from "./SoundContext";
import clickSfx from './assets/sfx/click.mp3';
import { useAudio } from './Audio';

import Window from './Window';

const SHOWS = [
    {
        title: 'Foundation Room @ House of Blues',
        otherActs: ['The Dreaded Laramie'],
        date: '6/28',
        price: 'FREE',
        doors: '8PM',
        showTime: '9PM',
        ticketLink: 'https://www.houseofblues.com/cleveland/EventDetail?tmeventid=0&offerid=159388',
        flyer: foundationroom,
        address: '308 Euclid Ave, Cleveland, OH',
        ageRestriction: '21+'
    },
    {
        title: 'Flowerpot Records Fest 14',
        venue: 'Cafe Ah Roma - Berea',
        date: '7/12',
        price: '$15 (suggested)',
        setTime: '5PM',
        showTime: '2PM - 10PM',
        flyer: fpr,
        address: '38 W Bridge St, Berea, OH'
    },
    {
        title: 'Happy Dog',
        otherActs: ['Sure Machine', 'Yes, Dear'],
        date: '7/19',
        showTime: '9PM',
        flyer: happydog,
        price: '$10',
        ticketLink: 'https://app.opendate.io/e/yes-dear-sure-machine-fruitfly-july-19-2025-605465',
        address: '5801 Detroit Ave, Cleveland, OH'
    },
    {
        title: 'Brothers Lounge',
        otherActs: ['Badvril', 'TBA'],
        date: '7/30',
        flyer: brothers,
        address: '11609 Detroit Ave, Cleveland, OH'
    },
    {
        title: 'Grog Shop',
        otherActs: ['OK Cool', 'TunnelVision'],
        date: '8/20',
        doors: '7PM',
        showTime: '8PM',
        flyer: okcool,
        address: '2785 Euclid Heights Blvd, Cleveland Heights, OH'
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
                        <span>{show.date}</span>
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
                                <a href={`https://maps.google.com/?q=${show.address}`} onClick={playClick} target="_blank">
                                    <img src={directions} alt="Directions" />
                                </a>
                            }
                            {show.ticketLink && 
                                <a href={show.ticketLink} target="_blank" onClick={playClick}>Tickets</a>
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

    const win = useRef(null);

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