import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { siteData } from '../config/siteData'

gsap.registerPlugin(ScrollTrigger)

export default function CombatScrollSection() {
  const root = useRef<HTMLElement>(null); const track = useRef<HTMLDivElement>(null)
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (matchMedia('(prefers-reduced-motion: reduce), (max-width: 760px)').matches) return
      gsap.to(track.current, { xPercent: -75, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top top', end: '+=4000', pin: true, scrub: 1, invalidateOnRefresh: true } })
      gsap.to('.combat-progress i', { scaleX: 1, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top top', end: '+=4000', scrub: true } })
    }, root)
    return () => ctx.revert()
  }, [])
  return <section className="combat" ref={root}>
    <div className="section-stamp"><span>戦闘</span><b>COMBAT SYSTEM</b></div>
    <div className="combat-track" ref={track}>{siteData.combat.map((f, i) => <article className="combat-slide" key={f.title}>
      <div className="combat-copy"><span className="combat-index">0{i + 1}</span><small>{f.id}ノ型</small><h2>{f.title}</h2><p>{f.text}</p><b>{f.stat}</b></div>
      <div className={`combat-visual visual-${i + 1}`}><i className="ring" /><i className="blade" /><span>{f.id}</span><em>境界戦技</em></div>
    </article>)}</div>
    <div className="combat-progress"><span>01</span><div><i /></div><span>04</span></div>
  </section>
}
