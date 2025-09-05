import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { SplitText } from 'gsap/all'
import React from 'react'

const About = () => {
  useGSAP(() => {
    const titleSplit = SplitText.create('#about h2', { type: 'words' })

    const scrollTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: '#about',
        start: 'top center',
      },
    })

    scrollTimeline
      .from(titleSplit.words, {
        opacity: 0,
        duration: 1,
        yPercent: 100,
        ease: 'expo.out',
        stagger: 0.02,
      })
      .from(
        '.top-grid div, .bottom-grid div',
        {
          opacity: 0,
          duration: 1,
          ease: 'power1.inOut',
          stagger: 0.04,
        },
        '-=0.5'
      )
  })

  return (
    <div id="about" className="px-5 md:px-0">
      <div className="mb-16">
        <div className="content max-w-6xl mx-auto">
          <div className="md:col-span-8">
            <p className="badge">Best Sips in India</p>
            <h2>
              Where Every Detail Matters <span className="text-white">-</span> from
              muddle to garnish
            </h2>
          </div>

          <div className="sub-content mt-6 md:mt-10">
            <p className="text-sm md:text-base">
              Every drink we serve reflects our passion for precision — from the first muddle
              to the final garnish. It’s this attention to detail that transforms a simple
              drink into an unforgettable experience.
            </p>

            <div className="mt-4">
              <p className="md:text-3xl text-xl font-bold">
                <span>4.5</span>/5
              </p>
              <p className="text-sm text-white-100">More than +12000 customers</p>
            </div>
          </div>
        </div>
      </div>

      {/* Top Grid */}
      <div className="top-grid grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-3 w-full">
          <div className="noisy" />
          <img
            src="/images/abt1.png"
            alt="grid-img-1"
            className="w-full h-auto object-cover rounded"
          />
        </div>

        <div className="md:col-span-6 w-full">
          <div className="noisy noisy-light" />
          <img
            src="/images/abt2.png"
            alt="grid-img-2"
            className="w-full h-auto object-cover rounded"
          />
        </div>

        <div className="md:col-span-3 w-full">
          <img
            src="/images/abt5.png"
            alt="grid-img-5"
            className="w-full h-auto object-cover rounded"
          />
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="bottom-grid grid grid-cols-1 md:grid-cols-12 gap-4 mt-4 md:mt-8">
        <div className="md:col-span-8 w-full">
          <div className="noisy" />
          <img
            src="/images/abt3.png"
            alt="grid-img-8"
            className="w-full h-auto object-cover rounded"
          />
        </div>

        <div className="md:col-span-4 w-full">
          <div className="noisy" />
          <img
            src="/images/abt4.png"
            alt="grid-img-4"
            className="w-full h-auto object-cover rounded"
          />
        </div>
      </div>
    </div>
  )
}

export default About
