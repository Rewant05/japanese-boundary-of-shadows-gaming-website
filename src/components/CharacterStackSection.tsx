import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { siteData } from '../config/siteData'

gsap.registerPlugin(ScrollTrigger)

export default function CharacterStackSection() {
  const root = useRef<HTMLElement>(null)
  useEffect(() => {
    let ctx: gsap.Context | undefined
    const start = () => { ctx = gsap.context(() => {
      if (matchMedia('(prefers-reduced-motion: reduce), (max-width: 760px)').matches) return
      const cards = gsap.utils.toArray<HTMLElement>('.character-card')
      gsap.set(cards, { zIndex: (i) => cards.length - i })
      const timeline = gsap.timeline({
        scrollTrigger: { trigger: root.current, start: 'top top', end: `+=${(cards.length - 1) * 900}`, pin: '.stack-pin', scrub: .8, invalidateOnRefresh: true },
      })
      cards.slice(0, -1).forEach((card, i) => {
        timeline.to(card, { yPercent: -115, xPercent: i % 2 ? 8 : -8, rotate: i % 2 ? 5 : -5, scale: .88, opacity: 0, ease: 'none', duration: 1 }, i)
      })
    }, root) }
    const idle = ('requestIdleCallback' in window ? window.requestIdleCallback(start, { timeout: 1200 }) : setTimeout(start, 1)) as number
    return () => { if ('cancelIdleCallback' in window) window.cancelIdleCallback(idle); else clearTimeout(idle); ctx?.revert() }
  }, [])
  return <section className="character-stack" ref={root}>
    <div className="stack-pin">
      <div className="section-stamp light"><span>人</span><b>CHARACTERS / 登場人物</b></div>
      <div className="stack-cards">{siteData.characters.map((c, i) => <article className={`character-card card-${i + 1}`} key={c.name} style={{ '--accent': c.color } as React.CSSProperties}>
        <img className="stack-character-art" src={c.image} alt={`${c.name} — ${c.role}`} loading={i === 0 ? 'eager' : 'lazy'} />
        <span className="card-no">{c.id}</span><div className="character-glyph">{c.glyph}</div>
        <div className="character-portrait"><i className="portrait-head" /><i className="portrait-body" /><i className="portrait-weapon" /></div>
        <div className="character-info"><small>境界記録　{c.id}</small><h2>{c.name}</h2><b>{c.role}</b><p>「{c.quote}」</p></div>
        <div className="card-lines" />
      </article>)}</div>
    </div>
  </section>
}
