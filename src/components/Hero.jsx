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

  // ==== Minimal subtle mint-teal streaks effect ====
  useEffect(() => {
    const content = document.querySelector('#hero .content')
    if (!content) return

    const streaksContainer = document.createElement('div')
    streaksContainer.style.position = 'absolute'
    streaksContainer.style.top = 0
    streaksContainer.style.left = 0
    streaksContainer.style.width = '100%'
    streaksContainer.style.height = '100%'
    streaksContainer.style.pointerEvents = 'none'
    streaksContainer.style.overflow = 'hidden'
    streaksContainer.style.zIndex = 0
    content.appendChild(streaksContainer)

    for (let i = 0; i < 10; i++) {
      const line = document.createElement('div')
      line.style.position = 'absolute'
      line.style.top = `${Math.random() * 100}%`
      line.style.left = `${Math.random() * 100}%`
      line.style.width = '1px'
      line.style.height = `${50 + Math.random() * 50}px`
      line.style.background = 'rgba(0,255,200,0.07)' // subtle mint-teal tint
      line.style.borderRadius = '1px'
      streaksContainer.appendChild(line)

      gsap.to(line, {
        y: '+=200',
        duration: 4 + Math.random() * 6,
        repeat: -1,
        ease: 'none',
        delay: Math.random() * 3
      })
    }
  }, [])

  return (
    <section id="hero" className="noisy">
      <h1 className="title" style={{ position: 'relative', zIndex: 1 }}>MOJITO</h1>
      <img src="/images/hero-left-leaf.png" alt="left-leaf" className="left-leaf" />
      <img src="/images/hero-right-leaf.png" alt="right-leaf" className="right-leaf" />

      <div className="body">
        <div className="content" style={{ position: 'relative', zIndex: 2 }}>
          <div className="space-y-5 hidden md:block">
            <p>Cool. Crisp. Classic</p>
            <p className="subtitle">Sip the spirit <br /> of Summer</p>
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
