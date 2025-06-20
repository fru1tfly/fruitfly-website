import { useState } from 'react';
import Window from './Window';

import video from './assets/video.png'

const VIDEOS = [
    {
        title: 'OWS_Lyric_Video.avi',
        videoId: '-V3tGYBkCmg' 
    },
    {
        title: 'YGHT.avi',
        videoId: '61eekDVFnzw' 
    },
    {
        title: 'When the Weather is Nice.mpeg',
        videoId: 'qjsAG9uKRds' 
    },
];

const Photos = () => {

    const [currentVideo, setCurrentVideo] = useState(null);

    const videos = VIDEOS.map(vid => {
        const videoIcon = (
            <>
                <img src={video} alt={vid.title} className="video-icon-img" />
                <span className="video-icon-caption">{vid.title}</span>
            </>
        );

        return (
            <Window wrapperClass="video-icon vertical-flex-center" wrapperContent={videoIcon} caption={vid.title} isChild={true}>
                <iframe src={`https://www.youtube.com/embed/${vid.videoId}`}
                    title={vid.title}
                    frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen;" 
                    referrerpolicy="strict-origin-when-cross-origin">
                </iframe>
            </Window>
        );
    });

    return (
        <>
            <div className="socials-file-bar">
                <span style={{textAlign: 'left'}}>3 items</span>
                <span style={{textAlign: 'center'}}>138K in folder</span>
                <span style={{textAlign: 'right'}}>1016K available</span>
            </div>
            <div className="photos-videos-container">
                {videos}
            </div>
        </>
    );
};

export default Photos;