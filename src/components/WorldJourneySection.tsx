import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { siteData } from '../config/siteData'

gsap.registerPlugin(ScrollTrigger)

export default function WorldJourneySection() {
  const root = useRef<HTMLElement>(null)
  useEffect(() => {
    let ctx: gsap.Context | undefined
    const start = () => { ctx = gsap.context(() => {
      if (matchMedia('(prefers-reduced-motion: reduce), (max-width: 760px)').matches) {
        gsap.set('.journey-path', { strokeDashoffset: 0 })
        return
      }
      gsap.fromTo('.journey-path', { strokeDashoffset: 1650 }, { strokeDashoffset: 0, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top 70%', end: 'bottom 60%', scrub: 1 } })
      gsap.utils.toArray<HTMLElement>('.location').forEach((el) => gsap.from(el, { opacity: 0, x: el.classList.contains('right') ? 70 : -70, clipPath: 'inset(0 0 100% 0)', scrollTrigger: { trigger: el, start: 'top 75%', end: 'top 45%', scrub: 1 } }))
    }, root) }
    const idle = ('requestIdleCallback' in window ? window.requestIdleCallback(start, { timeout: 1200 }) : setTimeout(start, 1)) as number
    return () => { if ('cancelIdleCallback' in window) window.cancelIdleCallback(idle); else clearTimeout(idle); ctx?.revert() }
  }, [])
  return <section className="journey" ref={root}>
    <header><span>世界</span><small>WORLD ARCHIVE / 05 LOCATIONS</small><h2>記憶を辿る、<br />境界への旅。</h2></header>
    <svg className="journey-map" viewBox="0 0 1000 1650" preserveAspectRatio="none" aria-hidden="true"><path className="journey-path-shadow" d="M500 0 C800 180 120 300 470 490 S900 760 510 940 S120 1220 530 1650"/><path className="journey-path" d="M500 0 C800 180 120 300 470 490 S900 760 510 940 S120 1220 530 1650"/></svg>
    <div className="locations">{siteData.locations.map((l, i) => <article className={`location ${i % 2 ? 'right' : 'left'}`} key={l.name}>
      <span>{l.no}</span><div className={`location-visual loc-${i + 1}`}><img src={l.image} alt={l.name} loading="lazy" /><i /><b>{l.sub}</b></div><div><small>境界領域 {l.no}</small><h3>{l.name}</h3><p>{l.detail}</p></div>
    </article>)}</div>
  </section>
}
