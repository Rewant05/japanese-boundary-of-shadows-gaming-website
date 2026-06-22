import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'

export default function CinematicLoader({ onComplete }: { onComplete: () => void }) {
  const root = useRef<HTMLDivElement>(null)
  const progress = useRef<HTMLSpanElement>(null)
  useLayoutEffect(() => {
    const previousOverflow = document.documentElement.style.overflow
    document.documentElement.style.overflow = 'hidden'
    const ctx = gsap.context(() => {
      const finish = () => { document.documentElement.style.overflow = previousOverflow; onComplete() }
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.to(root.current, { autoAlpha: 0, duration: .35, delay: .15, onComplete: finish })
        return
      }

      const count = { value: 0 }
      const tl = gsap.timeline({ onComplete: finish })
      tl.fromTo('.loader-bg', { scale: 1.16, filter: 'blur(16px)', opacity: 0 }, { scale: 1, filter: 'blur(0px)', opacity: .42, duration: 1.5, ease: 'power2.out' })
        .from('.loader-letterbox.top', { yPercent: -100, duration: .65, ease: 'power3.out' }, 0)
        .from('.loader-letterbox.bottom', { yPercent: 100, duration: .65, ease: 'power3.out' }, 0)
        .from('.loader-hud span, .loader-coordinates', { opacity: 0, x: -20, stagger: .08, duration: .35 }, .2)
        .from('.loader-sigil', { opacity: 0, scale: .35, rotate: -55, duration: .9, ease: 'expo.out' }, .3)
        .to('.loader-sigil-ring', { rotate: 145, duration: 2.2, ease: 'none' }, .3)
        .from('.loader-kanji', { opacity: 0, scale: 1.45, filter: 'blur(22px)', duration: .8 }, .45)
        .from('.loader-title span', { yPercent: 125, rotateX: -75, opacity: 0, stagger: .07, duration: .7, ease: 'power4.out' }, .72)
        .fromTo('.loader-slash', { scaleX: 0 }, { scaleX: 1, duration: .72, ease: 'power4.inOut' }, 1.02)
        .to(count, { value: 100, duration: 1.35, ease: 'power2.inOut', onUpdate: () => { if (progress.current) progress.current.textContent = String(Math.round(count.value)).padStart(3, '0') } }, .55)
        .to('.loader-progress i', { scaleX: 1, duration: 1.35, ease: 'power2.inOut' }, .55)
        .to('.loader-copy-a', { opacity: 0, y: -8, duration: .2 }, 1.55)
        .to('.loader-copy-b', { opacity: 1, y: 0, duration: .25 }, 1.58)
        .to('.loader-title', { x: -5, textShadow: '4px 0 #c20f2f, -4px 0 #433057', duration: .055, repeat: 5, yoyo: true }, 1.85)
        .to('.loader-flash', { opacity: .75, duration: .06 }, 2.18)
        .to('.loader-flash', { opacity: 0, duration: .12 }, 2.24)
        .to('.loader-slash', { scaleY: 26, opacity: .4, duration: .2, ease: 'power3.in' }, 2.28)
        .to('.loader-content, .loader-hud, .loader-coordinates, .loader-sigil', { opacity: 0, duration: .18 }, 2.3)
        .to('.loader-half.top', { yPercent: -108, xPercent: -8, duration: .85, ease: 'power4.inOut' }, 2.42)
        .to('.loader-half.bottom', { yPercent: 108, xPercent: 8, duration: .85, ease: 'power4.inOut' }, 2.42)
        .to('.loader-bg', { scale: 1.1, opacity: 0, duration: .7 }, 2.45)
        .to(root.current, { autoAlpha: 0, duration: .08 }, 3.22)
    }, root)
    return () => { document.documentElement.style.overflow = previousOverflow; ctx.revert() }
  }, [onComplete])
  return <div className="cinematic-loader" ref={root}>
    <div className="loader-bg" /><div className="loader-flash" />
    <div className="loader-half top" /><div className="loader-half bottom" />
    <div className="loader-letterbox top" /><div className="loader-letterbox bottom" />
    <div className="loader-hud"><span>境界接続</span><b>KYŌKAI / PROTOCOL 06</b></div>
    <div className="loader-coordinates">35.6762° N<br />139.6503° E</div>
    <div className="loader-sigil"><i className="loader-sigil-ring" /><i /><i /></div>
    <div className="loader-content">
      <span className="loader-kanji">界</span>
      <h1 className="loader-title" aria-label="影ノ境界">{'影ノ境界'.split('').map((c, i) => <span key={i}>{c}</span>)}</h1>
      <div className="loader-slash" />
      <p className="loader-copy-a">境界を開いています…</p><p className="loader-copy-b">記憶を読み込んでいます…</p>
      <div className="loader-progress"><i /><span ref={progress}>000</span><em>%</em></div>
      <b>KUROGANE INTERACTIVE — 2026</b>
    </div>
  </div>
}
