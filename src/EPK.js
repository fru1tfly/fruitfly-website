import './EPK.css';
import { Link } from 'react-router';

const PRESS = [
    {
        title: 'LoCle Grown',
        content: 'Interview & Performance',
        date: 'Mar 2024',
        link: "https://www.loclegrown.com/podcast/episode/7c215485/ep-63-a-fruit-medley-with-fruitfly",
        imgSrc: "https://static.wixstatic.com/media/aeb5cd_cdcdda86112b4afeaa230d5cc23dfd9f~mv2.png/v1/fill/w_173,h_172,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/IMG_8425_PNG.png"
    },
    {
        title: 'The Guiltless Podcast',
        content: 'Interview',
        date: 'Mar 2024',
        link: "https://pod.link/1421832316/episode/697bdd20b6240531863edb2cfe7893c8",
        imgSrc: "https://is1-ssl.mzstatic.com/image/thumb/Podcasts211/v4/02/05/c1/0205c1c0-afb4-011f-5e07-6f59a983f25f/mza_4510468311469572184.jpeg/300x300bb.webp"
    },
    {
        title: 'The Local Lo-Down Mini Series',
        content: 'Interview',
        date: 'Nov 2023',
        link: "https://www.youtube.com/watch?v=N13g0VPGKrQ",
        imgSrc: "https://scontent-ord5-3.xx.fbcdn.net/v/t39.30808-6/274174897_104328542187502_5069594869076115426_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=JMmdkLo_QfQQ7kNvwHyf7IT&_nc_oc=AdnIC_83rdiXJ-HbNFKvuqePGPNQn7ORsgPGrg_JgSrwILXaAsxyQjissSpeKdNj6FDeICPaQMDpquT4GUwbjw00&_nc_zt=23&_nc_ht=scontent-ord5-3.xx&_nc_gid=a8yij2HyFCWPmXHsTlSq4g&oh=00_AfNx43BzhyyaZL8_HJbrifk4xfrZWYF5FIkr796ptEoAcA&oe=68638EBB"
    },
    {
        title: 'American Pancake',
        content: 'Review',
        date: 'May 2021',
        link: "https://www.americanpancake.com/2021/05/fruitfly-and-gravitational-kinetic-pull.html?fbclid=IwAR2Rk1oTIKi157bZg72Og6uWNpyNElZMAee9PM1pwdvpZ4aq4Se3HSyjSg4",
        imgSrc: "https://scontent-ord5-2.xx.fbcdn.net/v/t39.30808-6/277783786_323597026424888_1699208376794425719_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=8iicg9NPT0kQ7kNvwHB4qGw&_nc_oc=AdkUpvcRwPnjNkf4n-L0BFjH5lI0OHcgHIygN5gQT7GgBS051HtknsbRN_Ak24ANy85ysClgKrRVDOwfxFU6AfH6&_nc_zt=23&_nc_ht=scontent-ord5-2.xx&_nc_gid=LF5qpKtWr-VBJjyvCcZ8tg&oh=00_AfOTIHLpMt6XupS69myebj6buHhnPXwQmtvuurQWBgmQyQ&oe=68637B15"
    }
];

const EPK = () => {

    const pressLinks = PRESS.map(p => (
        <a href={p.link} className="press-link-btn">
            <img className="press-link-img" src={p.imgSrc}/>
            <div className="press-link-caption">
                <header className="press-link-header">{p.title}</header>
                <div>{p.content}</div>
                <div className="press-link-date">{p.date}</div>
            </div>
        </a>
    ));

    return (
        <div className="epk-bg">
            <div className="epk-container">
                <img src="/epk/header.png" alt="Fruitfly" className="epk-header"/>
                <div className="epk-media-row photo-caption">From left to right: Jake Conder, Kyle Thompson, TJ May, Stitch O'Donovan, Matt Muenzberg<br/>(photo by Murphy Gerrasch)</div>
                <div className="epk-centered-row">
                    <a href="https://instagram.com/fruitfly_music"><i className="fa-brands fa-instagram"></i></a>
                    <a href="https://tiktok.com/@fruitfly_music"><i className="fa-brands fa-tiktok"></i></a>
                    <a href="https://youtube.com/@fruitfly_music"><i className="fa-brands fa-youtube"></i></a>
                    <a href="https://twitch.tv/fruitfly_music"><i className="fa-brands fa-twitch"></i></a>
                    <a href="https://facebook.com/fruitflymusic"><i className="fa-brands fa-facebook"></i></a>
                    <a href="https://bsky.app/profile/fruitflymusic.bsky.social"><i className="fa-brands fa-bluesky"></i></a>
                </div>
                
                <div className="epk-centered-row epk-shortcuts">
                    <Link className="bottom-link" to="/?w=media">Photos + Videos</Link>
                    <Link className="bottom-link" to="/?w=contact">Contact Form</Link>
                    <a className="bottom-link" href="/epk/stage-plot.png">Stage Plot</a>
                </div>
                <div className="epk-centered-row">
                    <span><b>booking@fruitfly.band</b> for booking inquiries</span>
                </div>
                <div className="epk-media-row">
                    <section className="epk-text">
                        <h2>Bio</h2>
                        <p className="epk-bio">Fruitfly was formed in 2020 in Cleveland, Ohio as a solo project by singer/songwriter Kyle Thompson. From his self-released 2021 album <i>Running on Fumes</i> through to more recent releases as a full band, the message of Fruitfly's music has largely revolved around making sense of the unprecedented times it was written in. Themes of isolation, hopelessness, and biting satire permeate Thompson's heart-on-the-sleeve lyrics. Dipping their toes into math rock, bedroom pop, funk, vaporwave and more, the band's holistic sound lands somewhere around indie/emo. <br/><br/> The band released their second full-length album, <i>When the Weather is Nice</i>, in April of 2024 and toured the Midwest and the East Coast to support its release that summer. They released their follow up live EP <i>It Was Fine Last Time</i> this April in celebration of the 1 year anniversary, and are actively working on new material.</p>
                    </section>
                    <section className="epk-media-row-picture left-rotate">
                        <img src="/epk/live1.jpg" alt="Live at Beachland Ballroom"/>
                        <div className="photo-caption">Live at The Beachland Ballroom 9/27/2024 <br/> (photo by Gio Zappala)</div>
                    </section>
                </div>
                <div className="epk-media-row">
                    <section className="epk-media-row-picture right-rotate">
                        <img src="/epk/live2.jpg" alt="Live at House of Blues Cleveland - Cambridge Room 4/13/2024"/>
                        <div className="photo-caption">Live at House of Blues Cleveland - Cambridge Room 4/13/2024 <br/> (photo by Jordaine Dinarog)</div>
                    </section>
                    <section className="epk-text">
                        <h2>Interviews & Press</h2>
                        <div className="press-link-container">
                            {pressLinks}
                        </div>
                        <h2>Fruitfly is</h2>
                        <ul>
                            <li><b>Kyle Thompson</b> - Guitar, vocals, production/live sampling</li>
                            <li><b>Jake Conder</b> - Drums, vocals, saxophone, ukulele</li>
                            <li><b>TJ May</b> - Bass, vocals, synthesizer</li>
                            <li><b>Stitch O'Donovan</b> - Guitar, vocals, auxiliary percussion</li>
                            <li><b>Matt Muenzberg</b> - Keyboards, auxiliary percussion</li>
                        </ul>
                    </section>
                </div>
                <div className="epk-media-row">
                    <section className="epk-text">
                        <h2>Music</h2>
                        <div className="music-players">
                            <iframe src="https://open.spotify.com/embed/album/7lc9htVjwzjTYWjaeWvbe3?utm_source=generator" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
                            <iframe src="https://open.spotify.com/embed/album/2NHdCL5pCuwzF1giPeAhwW?utm_source=generator" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

export default EPK;