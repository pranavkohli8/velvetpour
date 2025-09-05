import React, { useState, useEffect } from 'react'
import { cocktailLists, mockTailLists } from '../../constants'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const Cocktails = () => {
  const [suggestion, setSuggestion] = useState(null)
  const [gradientPos, setGradientPos] = useState({ x: 50, y: 50 })
  const [cardGradientPos, setCardGradientPos] = useState({ x: 50, y: 50 })
  const [cardTilt, setCardTilt] = useState({ rotateX: 0, rotateY: 0 })
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 767)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useGSAP(() => {
    const parallaxTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: '#cocktails',
        start: 'top 30%',
        end: 'bottom 80%',
        scrub: true,
      },
    })

    parallaxTimeline
      .from('#c-left-leaf', { x: -100, y: 100 })
      .from('#c-right-leaf', { x: 100, y: 100 })
  })

  const handleSuggest = () => {
    const allDrinks = [...cocktailLists, ...mockTailLists]
    const randomDrink = allDrinks[Math.floor(Math.random() * allDrinks.length)]
    setSuggestion(randomDrink)
  }

  const handleMouseMove = (e) => {
    if (isMobile) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setGradientPos({ x, y })
  }

  const handleCardMouseMove = (e) => {
    if (!isMobile) {
      const rect = e.currentTarget.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      setCardGradientPos({ x, y })
    }
  }

  const handleCardTouchMove = (e) => {
    if (!isMobile || !suggestion) return
    const touch = e.touches[0]
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((touch.clientX - rect.left) / rect.width - 0.5) * 10 // tilt max ±5 deg
    const y = ((touch.clientY - rect.top) / rect.height - 0.5) * -10
    setCardTilt({ rotateX: y, rotateY: x })
    setCardGradientPos({ x: (x + 50), y: (y + 50) }) // subtle gradient shift
  }

  const handleCardTouchEnd = () => {
    setCardTilt({ rotateX: 0, rotateY: 0 }) // reset tilt
    setCardGradientPos({ x: 50, y: 50 }) // reset gradient
  }

  return (
    <section id="cocktails" className="noisy">
      <img src="/images/cocktail-left-leaf.png" alt="l-leaf" id="c-left-leaf" />
      <img src="/images/cocktail-right-leaf.png" alt="r-leaf" id="c-right-leaf" />

      <div className="list">
        <div className="popular">
          <h2>Most Popular Cocktails:</h2>
          <ul>
            {cocktailLists.map((drink) => (
              <li key={drink.name}>
                <div className="md:me-28">
                  <h3>{drink.name}</h3>
                  <p>
                    {drink.country} | {drink.detail}
                  </p>
                </div>
                <span>- {drink.price}</span>
              </li>
            ))}
          </ul>
        </div>

        <div
          className="text-center"
          style={{
            marginTop: isMobile ? '20px' : '35px',
            marginBottom: isMobile ? '20px' : '35px',
          }}
        >
          <button
            onClick={handleSuggest}
            onMouseMove={handleMouseMove}
            className="px-6 py-3 rounded-xl shadow-md text-white transition relative overflow-hidden"
            style={{
              background: isMobile
                ? '#059669'
                : `radial-gradient(circle at ${gradientPos.x}% ${gradientPos.y}%, #34d399, #059669)`,
            }}
          >
            Suggest me a drink 🍸
          </button>

          {suggestion && (
            <div
              onMouseMove={handleCardMouseMove}
              onTouchMove={handleCardTouchMove}
              onTouchEnd={handleCardTouchEnd}
              className="mx-auto rounded-xl shadow-lg text-gray-200 flex flex-col items-center justify-center transition-all"
              style={{
                minHeight: '100px',
                width: '260px',
                marginTop: isMobile ? '15px' : '20px',
                marginBottom: isMobile ? '15px' : '20px',
                background: `radial-gradient(circle at ${cardGradientPos.x}% ${cardGradientPos.y}%, rgba(255,255,255,0.08), rgba(20,20,20,0.95))`,
                border: '1px solid rgba(255,255,255,0.1)',
                transform: `rotateX(${cardTilt.rotateX}deg) rotateY(${cardTilt.rotateY}deg)`,
              }}
            >
              <h3 className="text-lg font-bold text-gray-100">{suggestion.name}</h3>
              <p className="text-sm opacity-80">
                {suggestion.country} | {suggestion.detail}
              </p>
            </div>
          )}
        </div>

        <div className="loved">
          <h2>Most loved Mocktails:</h2>
          <ul>
            {mockTailLists.map((drink) => (
              <li key={drink.name}>
                <div className="me-28">
                  <h3>{drink.name}</h3>
                  <p>
                    {drink.country} | {drink.detail}
                  </p>
                </div>
                <span>- {drink.price}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default Cocktails
