import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from './Link'

gsap.registerPlugin(ScrollTrigger)

export default function CinematicScrollExperience() {
  const root = useRef<HTMLElement>(null)
  useLayoutEffect(() => {
    if (!root.current) return
    const ctx = gsap.context(() => {
      const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduce) return
      const mobile = matchMedia('(max-width: 760px)').matches
      const tl = gsap.timeline({ scrollTrigger: { trigger: root.current, start: 'top top', end: mobile ? '+=2300' : '+=3500', pin: true, scrub: 1, invalidateOnRefresh: true } })
      tl.fromTo('.moon', { scale: .55, opacity: 0 }, { scale: 1, opacity: .75, duration: 1.4 })
        .from('.hero-title .char', { yPercent: 110, rotateX: -80, opacity: 0, stagger: .1, duration: 1.2 }, .2)
        .from('.hero-kicker, .hero-subtitle', { clipPath: 'inset(0 100% 0 0)', duration: .9 }, .75)
        .to('.fog-a', { xPercent: 25, duration: 2 }, 0).to('.fog-b', { xPercent: -30, duration: 2 }, 0)
        .to('.hero-title .char:nth-child(odd)', { xPercent: -80, rotate: -4, opacity: 0, duration: .7 }, 1.6)
        .to('.hero-title .char:nth-child(even)', { xPercent: 80, rotate: 4, opacity: 0, duration: .7 }, 1.6)
        .fromTo('.red-slash', { scaleX: 0, rotate: -10 }, { scaleX: 1.3, rotate: -10, duration: .55, ease: 'power4.in' }, 1.55)
        .from('.fighter', { opacity: 0, xPercent: 20, filter: 'blur(15px)', duration: .8 }, 1.65)
        .to('.scene', { scale: 1.23, z: 200, duration: 1.4, ease: 'power2.inOut' }, 2.1)
        .from('.shrine', { yPercent: 50, opacity: 0, duration: .8 }, 2.2)
        .from('.city-shape', { yPercent: 80, opacity: 0, stagger: .06, duration: .7 }, 2.25)
        .from('.side-prophecy', { yPercent: 25, opacity: 0, duration: .8 }, 2.45)
        .to('.slash-flare', { opacity: 1, xPercent: 150, duration: .4 }, 2.7)
        .to('.chapter-copy', { yPercent: -30, opacity: 0, duration: .5 }, 2.65)
        .from('.reveal-panel', { clipPath: 'inset(0 0 100% 0)', xPercent: (i) => i ? 20 : -20, stagger: .15, duration: 1 }, 2.8)
        .from('.reveal-number', { yPercent: 80, opacity: 0, duration: .7 }, 3)
        .to('.reveal-stage', { opacity: 0, scale: 1.08, duration: .8 }, 4.1)
        .to('.scene', { filter: 'brightness(.35)', duration: .8 }, 4.1)
        .from('.intro-final', { opacity: 0, yPercent: 20, duration: .8 }, 4.3)
        .from('.intro-final .action', { clipPath: 'inset(0 100% 0 0)', stagger: .15, duration: .6 }, 4.45)
    }, root)
    return () => ctx.revert()
  }, [])

  return <section className="cinematic-intro" ref={root}>
    <div className="scene">
      <div className="scene-key-art" />
      <div className="moon" /><div className="moon-ray" />
      <div className="city">{Array.from({ length: 12 }, (_, i) => <i key={i} className="city-shape" style={{ height: `${18 + (i % 5) * 8}%` }} />)}</div>
      <div className="shrine"><i /><i /><i /></div>
      <div className="fighter"><span className="fighter-head" /><span className="fighter-body" /><span className="fighter-sword" /></div>
      <div className="fog fog-a" /><div className="fog fog-b" />
    </div>
    <div className="chapter-copy">
      <span className="hero-kicker">壱　覚醒</span>
      <h1 className="hero-title">{'影ノ境界'.split('').map((c, i) => <span className="char" key={i}>{c}</span>)}</h1>
      <p className="hero-subtitle">失われた記憶は、闇の向こうにある。</p>
    </div>
    <div className="red-slash" /><div className="slash-flare" />
    <p className="side-prophecy">境界が、開く。</p>
    <div className="reveal-stage">
      <span className="reveal-number">01</span>
      <div className="reveal-panel panel-a"><b>黒瀬</b><em>記憶を失った剣士</em></div>
      <div className="reveal-panel panel-b"><b>レン</b><em>THE NAMELESS SWORD</em></div>
    </div>
    <div className="intro-final" id="wishlist">
      <small>2026 — 冬、境界は開く</small><h2>闇を斬り、<br />記憶を取り戻せ。</h2>
      <div><a href="#final" className="action primary slash-link">ウィッシュリストに追加</a><Link href="/story" className="action">物語を見る</Link></div>
    </div>
    <div className="scroll-signal"><span>SCROLL TO AWAKEN</span><i /></div>
  </section>
}
