import { useState } from 'react';
import Window from './Window';

import video from './assets/icons/video.png';
import photo from './assets/icons/folder.png';
import photoArrow from './assets/photo-arrow.png';
import download from './assets/download-button.png';

const MEDIA = [
    {
        title: 'Media Kit',
        type: 'photo',
        items: [
            {
                title: 'Full Band Photos',
                author: 'Murphy Gerrasch',
                handle: 'bardicroots',
                folder: 'promo',
                hasLowRes: true,
                photos: [
                    'DSC06102.jpg',
                    'DSC06117.jpg',
                    'DSC06169.jpg',
                    'DSC06193.jpg',
                    'DSC06206.jpg',
                    'DSC06241.jpg',
                    'DSC06253.jpg'
                ]
            },
            {
                title: 'Logos',
                author: 'TJ May + Kyle Thompson',
                folder: 'logos',
                hasLowRes: false,
                photos: [
                    'boy-computer.png',
                    'pixel blue.png',
                    'pink-plain.png',
                    'old-handwritten.png',
                    'fruit-by-the-fly.png',
                    'old-rocket.png',
                ]
            },
        ]
    },
    {
        title: 'Music Videos',
        type: 'video',
        items: [
            {
                title: 'One Way Street',
                videoId: '-V3tGYBkCmg' 
            },
            {
                title: 'You\'re Gonna Hurt Them',
                videoId: '61eekDVFnzw' 
            },
            {
                title: 'When the Weather is Nice',
                videoId: 'qjsAG9uKRds' 
            }
        ]
    },
    {
        title: 'Live Photos',
        type: 'photo',
        items: [
            {
                title: '6.14.25 Sausage Fest',
                author: 'Gio Zappala',
                handle: 'stratabird',
                folder: 'sausage',

                hasLowRes: true,
                photos: [
                    'FRUITFLY_6-14-25_024-GR1.jpg',
                    'FRUITFLY_6-14-25_046-GR1.jpg',
                    'FRUITFLY_6-14-25_052-GR2.jpg',
                    'FRUITFLY_6-14-25_190-GR1.jpg',
                    'FRUITFLY_6-14-25_207.jpg',
                    'FRUITFLY_6-14-25_264-GR1.jpg',
                    'FRUITFLY_6-14-25_377.jpg',
                    'FRUITFLY_6-14-25_400-2.jpg',
                    'FRUITFLY_6-14-25_439-GR2.jpg',
                    'FRUITFLY_6-14-25_445-GR2.jpg',
                    'FRUITFLY_6-14-25_505-GR2.jpg',
                    'FRUITFLY_6-14-25_507-GR1.jpg',
                    'FRUITFLY_6-14-25_603-GR1.jpg',
                    'FRUITFLY_6-14-25_620-GR1.jpg',
                    'FRUITFLY_6-14-25_632-GR2.jpg',
                    'FRUITFLY_6-14-25_739-GR2.jpg'
                ]
            },
            {
                title: '5.25.25 Mahall\'s',
                author: 'Murphy Gerrasch',
                handle: 'bardicroots',
                folder: 'mahalls',
                hasLowRes: true,
                photos: [
                    'DSC06722.jpg',
                    'DSC06735.jpg',
                    'DSC06737.jpg',
                    'DSC06741.jpg',
                    'DSC06745.jpg',
                    'DSC06760.jpg',
                    'DSC06775.jpg',
                    'DSC06810.jpg',
                    'DSC06813.jpg',
                    'DSC06814-2.jpg',
                    'DSC06833.jpg',
                    'DSC06845.jpg',
                    'DSC06924.jpg',
                    'DSC07021.jpg'
                ]
            },
            {
                title: '4.13.24 Album Release',
                author: 'Jordaine Dinarog',
                handle: 'edamamegoth',
                folder: 'hob',
                hasLowRes: true,
                photos: [
                    'E-10.jpg',
                    'E-11.jpg',
                    'E-15.jpg',
                    'E-16.jpg',
                    'E-17.jpg',
                    'E-19.jpg',
                    'E-20.jpg',
                    'E-21.jpg',
                    'E-25.jpg'
                ]
            },
        ]
    },
    {
        title: 'Live Videos',
        type: 'video',
        items: [
            {
                title: 'One Way Street',
                videoId: 'knnq9xUBMzo' 
            },
            {
                title: 'LoCle Grown',
                videoId: 'd_PMWjziTYI' 
            },
            {
                title: 'FPR Fest 13',
                videoId: 'A2qiTq3EjX0' 
            }
        ]
    },
];

const PhotoFolder = ({ photoData }) => {

    const [currentPhoto, setCurrentPhoto] = useState(0);
    const [showHighResTooltip, setShowHighResTooltip] = useState(false);

    const increasePhoto = () => {
        setCurrentPhoto(currentPhoto + 1);
        setShowHighResTooltip(false);
    }

    const decreasePhoto = () => {
        setCurrentPhoto(currentPhoto - 1);
        setShowHighResTooltip(false);
    }

    const arrowNav = (e) => {
        if(e.key === "ArrowRight" && currentPhoto < photoData.photos.length - 1) {
            increasePhoto();
        }

        if(e.key === "ArrowLeft" && currentPhoto > 0) {
            decreasePhoto();
        }
    }

    const downloadPhoto = () => {
        if (photoData.hasLowRes) {
            setShowHighResTooltip(!showHighResTooltip);
        } else {

        }
    }

    const imgSrc = `/photos/${photoData.hasLowRes ? 'lowres/' : ''}${photoData.folder}/${photoData.photos[currentPhoto]}`;
    const highResSrc = `/photos/${photoData.folder}/${photoData.photos[currentPhoto]}`

    return (
        <>
            <div className="socials-file-bar">
                <span style={{textAlign: 'left'}}>{photoData?.photos.length} items</span>
                <span style={{textAlign: 'center'}}>{currentPhoto + 1} of {photoData.photos.length}</span>
                {photoData.handle && <a className="photo-link" href={`https://instagram.com/${photoData.handle}`}>📷</a>}
                <span>&nbsp;</span>
            </div>
            <div className="window-contents-with-bar" onKeyDown={arrowNav} tabIndex="0">
                <img src={imgSrc} className="show-flyer-fullsize" alt={photoData.photos[currentPhoto]}/>
                {currentPhoto > 0 &&
                    <img src={photoArrow} className="photo-arrow-icon photo-arrow-icon-left" alt={photoData.photos[currentPhoto]} onClick={decreasePhoto}/>
                }
                {currentPhoto < photoData.photos.length - 1 &&
                    <img src={photoArrow} className="photo-arrow-icon photo-arrow-icon-right" alt={photoData.photos[currentPhoto]} onClick={increasePhoto}/>
                }
                {photoData.hasLowRes &&
                    <div className="download-icon-link">
                        <img src={download} className="download-icon" onClick={downloadPhoto} alt="Download" />
                        {showHighResTooltip && 
                            <div className="high-res-tooltip">
                                <a href={highResSrc} download onClick={() => setShowHighResTooltip(false)}>Full Resolution</a>
                                <a href={imgSrc} download onClick={() => setShowHighResTooltip(false)}>Web Resolution</a>
                            </div>
                        }
                    </div>
                }
                {!photoData.hasLowRes && 
                    <a href={imgSrc} className="download-icon-link" download>
                        <img src={download} className="download-icon" onClick={downloadPhoto} alt="Download" />
                    </a>
                }
            </div>
        </>
    );
};

const Photos = () => {

    const content = MEDIA.map(m => {
        const isVideo = m.type === "video";

        const photoContents = (mediaObj) => (
            <PhotoFolder photoData={mediaObj}></PhotoFolder>
        );

        const videoContents = (mediaObj) => (
            <iframe src={`https://www.youtube.com/embed/${mediaObj.videoId}`}
                title={mediaObj.title}
                frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen;" 
                referrerpolicy="strict-origin-when-cross-origin">
            </iframe>
        );

         const rowItemIcon = (mediaObj) => (
            <>
                <img src={isVideo ? video : photo} alt={mediaObj.title} className="video-icon-img" />
                <span className="video-icon-caption">{mediaObj.title}</span>
            </>
        );

        const rowItem = (mediaObj) => (
            <Window wrapperClass="video-icon vertical-flex-center" wrapperContent={rowItemIcon(mediaObj)} caption={mediaObj.title} isChild={true}>
                {isVideo ? videoContents(mediaObj) : photoContents(mediaObj)}
            </Window>
        );

        const rowContents = m.items.map(mediaObj => (
            <>
                {rowItem(mediaObj)}
            </>
        ));

        return (
            <div className="photos-videos-row">
                <div className="photos-videos-row-title">{m.title}</div>
                <div className="photos-videos-row-icons">
                    {rowContents}
                </div>
            </div>
        );
    });

    return (
        <>
            <div className="socials-file-bar">
                <span style={{textAlign: 'left'}}>3 items</span>
                <span style={{textAlign: 'center'}}>138K in folder</span>
                <span style={{textAlign: 'right'}}>1016K available</span>
            </div>
            <div className="window-contents window-contents-with-bar">
                <div className="photos-videos-container">
                    {content}
                </div>
            </div>
        </>
    );
};

export default Photos;