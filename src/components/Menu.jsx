'use client'

import React, { useRef, useState } from 'react'
import { allCocktails } from '../../constants'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const Menu = () => {
    const contentRef = useRef()
    const [currentIndex, setCurrentIndex] = useState(0)
    const [direction, setDirection] = useState(1)

    const totalCocktails = allCocktails.length

    const goToSlide = (index, dir = 1) => {
        setDirection(dir)
        const newIndex = (index + totalCocktails) % totalCocktails
        setCurrentIndex(newIndex)
    }

    const getCocktailAt = (index) => {
        return allCocktails[(currentIndex + index + totalCocktails) % totalCocktails]
    }

    const currentCocktail = getCocktailAt(0)
    const prevCocktail = getCocktailAt(totalCocktails - 1)
    const nextCocktail = getCocktailAt(1)

    useGSAP(() => {
        const img = document.querySelector('.cocktail img')
        const overlay = document.querySelector('.cocktail-overlay')
        const leftLeaf = document.querySelector('#m-left-leaf')
        const rightLeaf = document.querySelector('#m-right-leaf')

        // Parallax leaves
        gsap.to(leftLeaf, { x: 10 * direction, duration: 1, ease: 'power1.out' })
        gsap.to(rightLeaf, { x: -10 * direction, duration: 1, ease: 'power1.out' })

        // Overlay effect
        gsap.fromTo(
            overlay,
            { opacity: 0, backdropFilter: 'blur(0px)' },
            { opacity: 0.5, backdropFilter: 'blur(4px)', duration: 0.5, ease: 'power1.out', onComplete: () => {
                gsap.to(overlay, { opacity: 0, duration: 0.5, ease: 'power1.in' })
            }}
        )

        // Slide in cocktail with scale
        gsap.fromTo(
            img,
            { xPercent: 100 * -direction, opacity: 0, scale: 0.95 },
            { xPercent: 0, opacity: 1, scale: 1, duration: 1, ease: 'power2.out' }
        )

        // Stagger text
        gsap.fromTo('#title', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6, delay: 0.2 })
        gsap.fromTo('.details h2', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, delay: 0.3 })
        gsap.fromTo('.details p', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, delay: 0.4 })
    }, [currentIndex, direction])

    return (
        <section id='menu' aria-labelledby='menu-heading'>
            <img src="/images/slider-left-leaf.png" alt="left-leaf" id="m-left-leaf" />
            <img src="/images/slider-right-leaf.png" alt="right-leaf" id="m-right-leaf" />

            <h2 id="menu-heading" className='sr-only'>Cocktail Menu</h2>

            <nav className='cocktail-tabs' aria-label='Cocktail Navigation'>
                {allCocktails.map((cocktail, index) => {
                    const isActive = index === currentIndex
                    return (
                        <button
                            key={cocktail.id}
                            className={`${isActive ? 'text-white border-white' : 'text-white/50 border-white/50'}`}
                            onClick={() => goToSlide(index, index > currentIndex ? 1 : -1)}
                        >
                            {cocktail.name}
                        </button>
                    )
                })}
            </nav>

            <div className='content'>
                <div className='arrows'>
                    <button onClick={() => goToSlide(currentIndex - 1, -1)}>
                        <span>{prevCocktail.name}</span>
                        <img src="/images/right-arrow.png" alt="right-arrow" aria-hidden='true' />
                    </button>

                    <button onClick={() => goToSlide(currentIndex + 1, 1)}>
                        <span>{nextCocktail.name}</span>
                        <img src="/images/left-arrow.png" alt="left-arrow" aria-hidden='true' />
                    </button>
                </div>

                <div className='cocktail' style={{ position: 'relative', overflow: 'hidden' }}>
                    <img src={currentCocktail.image} className='object-contain' />
                    <div className='cocktail-overlay' style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: 'rgba(0,0,0,0.3)',
                        pointerEvents: 'none'
                    }} />
                </div>

                <div className='recipe'>
                    <div ref={contentRef} className='info'>
                        <p>Recipe for:</p>
                        <p id="title">{currentCocktail.name}</p>
                    </div>

                    <div className='details'>
                        <h2>{currentCocktail.title}</h2>
                        <p>{currentCocktail.description}</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Menu
