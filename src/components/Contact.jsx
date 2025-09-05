import React from 'react'
import { openingHours, socials } from '../../constants'
import { useGSAP } from '@gsap/react'
import { SplitText } from 'gsap/all'
import gsap from 'gsap'
import { useMediaQuery } from 'react-responsive'

const Contact = () => {
    const isMobile = useMediaQuery({ maxWidth: 767 })

    useGSAP(() => {
        const titleSplit = SplitText.create('#contact h2', { type: 'words' });

        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: '#contact',
                start: 'top center',
            },
            ease: 'power1.inOut'
        });

        timeline.from(titleSplit.words, { opacity: 0, yPercent: 100, stagger: 0.02 })
                .from('#contact h3, #contact p', { opacity: 0, yPercent: 100, stagger: 0.02 });

        // Animate leaves
        gsap.to('#f-right-leaf', {
            rotation: 5,
            y: isMobile ? '+=8' : '+=20',
            x: isMobile ? '+=2' : '+=5',
            duration: isMobile ? 1.5 : 2,
            yoyo: true,
            repeat: -1,
            ease: 'sine.inOut'
        });

        gsap.to('#f-left-leaf', {
            rotation: -5,
            y: isMobile ? '+=8' : '+=20',
            x: isMobile ? '-=2' : '-=5',
            duration: isMobile ? 1.8 : 2.5,
            yoyo: true,
            repeat: -1,
            ease: 'sine.inOut'
        });
    });

    // Mobile-only leaf adjustments
    const rightLeafStyle = isMobile ? {
        position: 'absolute',
        top: '20px',
        right: '10px',
        width: '50px',
        height: 'auto',
        zIndex: 0
    } : {}

    const leftLeafStyle = isMobile ? {
        position: 'absolute',
        bottom: '160px', // above disclaimer
        left: '10px',
        width: '50px',
        height: 'auto',
        zIndex: 0
    } : {}

    const contentStyle = {
        position: 'relative',
        zIndex: 1,
        padding: isMobile ? '100px 20px 180px' : '40px 60px', // extra bottom space for mobile leaves
    }

    return (
        <footer id="contact" style={{ position: 'relative' }}>
            <img src="/images/footer-right-leaf.png" alt="leaf-right" id="f-right-leaf" style={rightLeafStyle}/>
            <img src="/images/footer-left-leaf.png" alt="leaf-left" id="f-left-leaf" style={leftLeafStyle}/>

            <div className='content' style={contentStyle}>
                <h2 style={{ marginTop: isMobile ? '70px' : '0' }}>Where to find us</h2>
                
                <div>
                    <h3>Visit our Bar</h3>
                    <p>Model Town, Delhi, India</p>
                </div>

                <div>
                    <h3>Contact</h3>
                    <p>+91 8860271737</p>
                    <p>kohlipranav24@gmail.com</p>
                </div>

                <div>
                    <h3>Open Every Day</h3>
                    {openingHours.map((time) => (
                        <p key={time.day}>
                            {time.day} : {time.time}
                        </p>
                    ))}
                </div>

                <div>
                    <h3>Socials</h3>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
                        {socials.map((social) => (
                            <a
                                key={social.name}
                                href={social.url}
                                target='_blank'
                                rel='noopener noreferrer'
                                aria-label={social.name}
                            >
                                <img src={social.icon} alt={social.name} style={{ width: '25px', height: '25px' }}/>
                            </a>
                        ))}
                    </div>
                </div>

                <p>coded by Pranav Kohli @2025</p>

                <p style={{ fontSize: '11px', color: '#888', marginTop: '10px' }}>
                    Disclaimer: This website just for portfolio purposes. The bar is purely imaginary — I don’t actually serve cocktails nor drink, but I do serve lines of code.
                </p>
            </div>
        </footer>
    )
}

export default Contact
