import { useLayoutEffect, type RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export type MotionPage = 'story' | 'characters' | 'world' | 'news'

export function usePageMotion(root: RefObject<HTMLElement | null>, page: MotionPage) {
  useLayoutEffect(() => {
    if (!root.current) return

    const ctx = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      const hero = root.current!.querySelector('.page-hero')
      gsap.to('.page-moon', {
        yPercent: 42, scale: 1.22, opacity: .12, ease: 'none',
        scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 1 },
      })
      gsap.to('.page-gate', {
        yPercent: 18, xPercent: 8, rotate: 2, ease: 'none',
        scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 1 },
      })
      gsap.to('.page-index', {
        xPercent: 16, ease: 'none',
        scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 1 },
      })

      if (page === 'story') {
        gsap.from('.story-prologue > *', {
          y: 90, opacity: 0, stagger: .16,
          scrollTrigger: { trigger: '.story-prologue', start: 'top 80%', end: 'top 35%', scrub: .7 },
        })
        gsap.utils.toArray<HTMLElement>('.chapter-list article').forEach((chapter, index) => {
          const direction = index % 2 ? 1 : -1
          const tl = gsap.timeline({ scrollTrigger: { trigger: chapter, start: 'top 88%', end: 'center 55%', scrub: .75 } })
          tl.from(chapter, { clipPath: direction > 0 ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)' })
            .from(chapter.querySelector('span'), { yPercent: 85, rotate: direction * 8, opacity: 0 }, 0)
            .from(chapter.querySelectorAll('small, h2, p'), { x: direction * 75, opacity: 0, stagger: .08 }, .08)
        })
        gsap.from('.story-oath > *', {
          y: 100, opacity: 0, stagger: .18,
          scrollTrigger: { trigger: '.story-oath', start: 'top 80%', end: 'center 60%', scrub: .8 },
        })
      }

      if (page === 'characters') {
        gsap.utils.toArray<HTMLElement>('.character-showcase article').forEach((card, index) => {
          const portrait = card.querySelector('.showcase-portrait')
          const copy = card.querySelector('.showcase-copy')
          const glyph = card.querySelector('.showcase-portrait > span')
          const weapon = card.querySelector('.portrait-weapon')
          const direction = index % 2 ? 1 : -1
          const tl = gsap.timeline({ scrollTrigger: { trigger: card, start: 'top 86%', end: 'center 48%', scrub: .8 } })
          tl.from(portrait, { clipPath: direction > 0 ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)', x: direction * 80 })
            .from(copy, { x: direction * -90, opacity: 0 }, .08)
            .from(weapon, { scaleX: 0, transformOrigin: direction > 0 ? 'right center' : 'left center' }, .2)
          gsap.to(glyph, { yPercent: 28, rotate: direction * 5, ease: 'none', scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: 1 } })
        })
      }

      if (page === 'world') {
        gsap.from('.world-manifesto > *', {
          y: 80, clipPath: 'inset(0 0 100% 0)', stagger: .18,
          scrollTrigger: { trigger: '.world-manifesto', start: 'top 80%', end: 'center 52%', scrub: .8 },
        })
        gsap.utils.toArray<HTMLElement>('.world-place').forEach((place, index) => {
          const art = place.querySelector('.place-art')
          const structure = place.querySelector('.place-art i')
          const copy = place.querySelector(':scope > div:last-child')
          const direction = index % 2 ? 1 : -1
          const tl = gsap.timeline({ scrollTrigger: { trigger: place, start: 'top 90%', end: 'center 52%', scrub: .85 } })
          tl.from(art, { clipPath: direction > 0 ? 'polygon(100% 0,100% 0,100% 100%,100% 100%)' : 'polygon(0 0,0 0,0 100%,0 100%)', rotateY: direction * 12 })
            .from(copy, { x: direction * 90, opacity: 0 }, .1)
            .from(structure, { yPercent: 65, scaleY: .55, transformOrigin: 'bottom' }, .15)
          gsap.to(art, { yPercent: -7, ease: 'none', scrollTrigger: { trigger: place, start: 'top bottom', end: 'bottom top', scrub: 1 } })
        })
        gsap.from('.lexicon dl > div', { y: 70, opacity: 0, stagger: .15, scrollTrigger: { trigger: '.lexicon', start: 'top 78%', end: 'center 60%', scrub: .7 } })
      }

      if (page === 'news') {
        gsap.from('.news-filter button', {
          x: -45, opacity: 0, stagger: .09,
          scrollTrigger: { trigger: '.news-filter', start: 'top 85%', end: 'bottom 65%', scrub: .6 },
        })
        gsap.utils.toArray<HTMLElement>('.news-list > article').forEach((item, index) => {
          const tl = gsap.timeline({ scrollTrigger: { trigger: item, start: 'top 92%', end: 'center 68%', scrub: .65 } })
          tl.from(item, { x: index % 2 ? 90 : -90, clipPath: index % 2 ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)', opacity: .15 })
            .from(item.querySelector('span'), { scale: 1.8, opacity: 0 }, .12)
            .from(item.querySelectorAll('h2, p, div, i'), { y: 24, opacity: 0, stagger: .04 }, .18)
        })
      }
    }, root)

    const refresh = window.setTimeout(() => ScrollTrigger.refresh(), 80)
    return () => { window.clearTimeout(refresh); ctx.revert() }
  }, [page, root])
}
