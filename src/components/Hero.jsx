import React, { useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import { SplitText } from 'gsap/all'
import gsap from 'gsap'
import { useMediaQuery } from 'react-responsive'

const Hero = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 })

  useGSAP(() => {
    const heroSplit = new SplitText('.title', { type: 'chars, words' })
    const paragraphSplit = new SplitText('.subtitle', { type: 'lines' })

    heroSplit.chars.forEach((char) => char.classList.add('text-gradient'))

    gsap.from(heroSplit.chars, {
      yPercent: 100,
      duration: 1.8,
      ease: 'expo.out',
      stagger: 0.05,
    })

    gsap.from(paragraphSplit.lines, {
      opacity: 0,
      yPercent: 100,
      duration: 1.8,
      ease: 'expo.out',
      stagger: 0.06,
      delay: 1,
    })

    gsap.timeline({
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    })
    .to('.right-leaf', { y: 200 }, 0)
    .to('.left-leaf', { y: -200 }, 0)
  }, [])

  // ==== Mint-Teal Streaks Effect (unchanged) ====
  useEffect(() => {
    const hero = document.querySelector('#hero')
    if (!hero) return

    const streaksContainer = document.createElement('div')
    streaksContainer.style.position = 'absolute'
    streaksContainer.style.top = 0
    streaksContainer.style.left = 0
    streaksContainer.style.width = '100%'
    streaksContainer.style.height = '100%'
    streaksContainer.style.pointerEvents = 'none'
    streaksContainer.style.overflow = 'hidden'
    streaksContainer.style.zIndex = 0
    hero.appendChild(streaksContainer)

    for (let i = 0; i < 10; i++) {
      const line = document.createElement('div')
      line.style.position = 'absolute'
      line.style.top = `${Math.random() * 100}%`
      line.style.left = `${Math.random() * 100}%`
      line.style.width = '1px'
      line.style.height = `${50 + Math.random() * 50}px`
      line.style.background = 'rgba(0,255,200,0.07)'
      line.style.borderRadius = '1px'
      streaksContainer.appendChild(line)

      gsap.to(line, {
        y: '+=200',
        duration: 1.5 + Math.random() * 6,
        repeat: -1,
        ease: 'none',
        delay: Math.random() * 3
      })
    }
  }, [])

  // ==== Subtle Water Droplets Effect (updated only) ====
  useEffect(() => {
    const hero = document.querySelector('#hero')
    if (!hero) return

    const dropletsContainer = document.createElement('div')
    dropletsContainer.style.position = 'absolute'
    dropletsContainer.style.top = 0
    dropletsContainer.style.left = 0
    dropletsContainer.style.width = '100%'
    dropletsContainer.style.height = '100%'
    dropletsContainer.style.pointerEvents = 'none'
    dropletsContainer.style.overflow = 'hidden'
    dropletsContainer.style.zIndex = 1 // behind text and leaves
    hero.appendChild(dropletsContainer)

    for (let i = 0; i < 15; i++) { // subtle but visible
      const droplet = document.createElement('div')
      droplet.style.position = 'absolute'
      droplet.style.top = `${Math.random() * 100}%`
      droplet.style.left = `${Math.random() * 100}%`
      droplet.style.width = '2.5px'
      droplet.style.height = '2.5px'
      droplet.style.borderRadius = '50%'
      droplet.style.background = 'rgba(180,220,255,0.25)' // subtle visibility
      dropletsContainer.appendChild(droplet)

      gsap.to(droplet, {
        y: '+=80',
        x: '+=120',
        opacity: 0,
        duration: 3.5 + Math.random() * 3,
        repeat: -1,
        ease: 'linear',
        delay: Math.random() * 2,
        onRepeat: () => {
          droplet.style.top = '5px'
          droplet.style.left = `${Math.random() * 100}%`
          droplet.style.opacity = 0.25
        }
      })
    }
  }, [])

  return (
    <section id="hero" className="noisy" style={{ position: 'relative', overflow: 'hidden' }}>
      <h1 className="title" style={{ position: 'relative', zIndex: 2 }}>MOJITO</h1>
      <img src="/images/hero-left-leaf.png" alt="left-leaf" className="left-leaf" />
      <img src="/images/hero-right-leaf.png" alt="right-leaf" className="right-leaf" />

      <div className="body">
        <div className="content" style={{ position: 'relative', zIndex: 2 }}>
          <div className="space-y-5 hidden md:block">
            <p>Cool. Crisp. Classic</p>
            <p className="subtitle">Sip the spirit <br /> of Season</p>
          </div>
          <div className="view-cocktails">
            <p className="subtitle">
              Each drink on our menu is crafted with premium ingredients,
              creative flair, and timeless recipes — expertly designed to
              ignite your senses and elevate every sip.
            </p>
            <a href="#cocktails">View Cocktails</a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
