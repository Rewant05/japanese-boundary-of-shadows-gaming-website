import { useLayoutEffect, useRef } from 'react'

const SPEED = 1.7
const ms = (seconds: number) => seconds * 1000 / SPEED

export default function CinematicLoader({ onComplete }: { onComplete: () => void }) {
  const root = useRef<HTMLDivElement>(null)
  const progress = useRef<HTMLSpanElement>(null)
  useLayoutEffect(() => {
    const previousOverflow = document.documentElement.style.overflow
    document.documentElement.style.overflow = 'hidden'
    const animations: Animation[] = []
    let frame = 0
    let finished = false
    let completeTimer = 0
    const finish = () => {
      if (finished) return
      finished = true
      document.documentElement.style.overflow = previousOverflow
      onComplete()
    }
    const play = (selector: string, frames: Keyframe[], start: number, duration: number, easing = 'linear', fill: FillMode = 'both') => {
      const elements = root.current?.querySelectorAll<HTMLElement>(selector) ?? []
      elements.forEach((element) => animations.push(element.animate(frames, { delay: ms(start), duration: ms(duration), easing, fill })))
    }
    const playStagger = (selector: string, frames: Keyframe[], start: number, stagger: number, duration: number, easing = 'linear') => {
      const elements = root.current?.querySelectorAll<HTMLElement>(selector) ?? []
      elements.forEach((element, index) => animations.push(element.animate(frames, { delay: ms(start + index * stagger), duration: ms(duration), easing, fill: 'both' })))
    }

    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const fade = root.current?.animate([{ opacity: 1 }, { opacity: 0 }], { delay: 150, duration: 350, fill: 'forwards' })
      if (fade) { animations.push(fade); fade.finished.then(finish).catch(() => undefined) }
      completeTimer = window.setTimeout(finish, 500)
    } else {
      play('.loader-bg', [{ transform: 'scale(1.12)', opacity: 0 }, { transform: 'scale(1)', opacity: .42 }], 0, 1.5, 'cubic-bezier(.215,.61,.355,1)')
      play('.loader-letterbox.top', [{ transform: 'translateY(-100%)' }, { transform: 'translateY(0)' }], 0, .65, 'cubic-bezier(.165,.84,.44,1)')
      play('.loader-letterbox.bottom', [{ transform: 'translateY(100%)' }, { transform: 'translateY(0)' }], 0, .65, 'cubic-bezier(.165,.84,.44,1)')
      playStagger('.loader-hud span, .loader-coordinates', [{ opacity: 0, transform: 'translateX(-20px)' }, { opacity: 1, transform: 'translateX(0)' }], .2, .08, .35)
      play('.loader-sigil', [{ opacity: 0, transform: 'translate(-50%,-50%) scale(.35) rotate(-55deg)' }, { opacity: 1, transform: 'translate(-50%,-50%) scale(1) rotate(0)' }], .3, .9, 'cubic-bezier(.19,1,.22,1)')
      play('.loader-sigil-ring', [{ transform: 'rotate(0)' }, { transform: 'rotate(145deg)' }], .3, 2.2)
      play('.loader-kanji', [{ opacity: 0, transform: 'translate(-50%,-50%) scale(1.45)', filter: 'blur(22px)' }, { opacity: 1, transform: 'translate(-50%,-50%) scale(1)', filter: 'blur(0)' }], .45, .8)
      playStagger('.loader-title span', [{ opacity: 0, transform: 'translateY(125%) rotateX(-75deg)' }, { opacity: 1, transform: 'translateY(0) rotateX(0)' }], .72, .07, .7, 'cubic-bezier(.23,1,.32,1)')
      play('.loader-slash', [{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }], 1.02, .72, 'cubic-bezier(.77,0,.175,1)')
      play('.loader-progress i', [{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }], .55, 1.35, 'cubic-bezier(.645,.045,.355,1)')
      play('.loader-copy-a', [{ opacity: 1, transform: 'translateY(0)' }, { opacity: 0, transform: 'translateY(-8px)' }], 1.55, .2)
      play('.loader-copy-b', [{ opacity: 0, transform: 'translateY(0)' }, { opacity: 1, transform: 'translateY(0)' }], 1.58, .25)
      play('.loader-title', Array.from({ length: 7 }, (_, index) => ({ offset: index / 6, transform: index % 2 ? 'translateX(-5px)' : 'translateX(0)', textShadow: index % 2 ? '4px 0 #c20f2f, -4px 0 #433057' : '-2px 0 #961028, 2px 0 #2d2044' })), 1.85, .33)
      play('.loader-flash', [{ opacity: 0 }, { opacity: .75 }], 2.18, .06)
      play('.loader-flash', [{ opacity: .75 }, { opacity: 0 }], 2.24, .12, 'linear', 'forwards')
      play('.loader-slash', [{ transform: 'scaleX(1) scaleY(1)', opacity: 1 }, { transform: 'scaleX(1) scaleY(26)', opacity: .4 }], 2.28, .2, 'cubic-bezier(.55,.055,.675,.19)', 'forwards')
      play('.loader-content, .loader-hud, .loader-coordinates, .loader-sigil', [{ opacity: 1 }, { opacity: 0 }], 2.3, .18, 'linear', 'forwards')
      play('.loader-half.top', [{ transform: 'translate(0,0)' }, { transform: 'translate(-8%,-108%)' }], 2.42, .85, 'cubic-bezier(.77,0,.175,1)', 'forwards')
      play('.loader-half.bottom', [{ transform: 'translate(0,0)' }, { transform: 'translate(8%,108%)' }], 2.42, .85, 'cubic-bezier(.77,0,.175,1)', 'forwards')
      play('.loader-bg', [{ transform: 'scale(1)', opacity: .42 }, { transform: 'scale(1.1)', opacity: 0 }], 2.45, .7, 'linear', 'forwards')

      const countStart = performance.now() + ms(.55)
      const countDuration = ms(1.35)
      let lastCount = -1
      const updateCount = (now: number) => {
        const raw = Math.min(1, Math.max(0, (now - countStart) / countDuration))
        const eased = raw < .5 ? 4 * raw * raw * raw : 1 - Math.pow(-2 * raw + 2, 3) / 2
        const nextCount = Math.round(eased * 100)
        if (progress.current && nextCount !== lastCount) {
          lastCount = nextCount
          progress.current.textContent = String(nextCount).padStart(3, '0')
        }
        if (raw < 1) frame = requestAnimationFrame(updateCount)
      }
      frame = requestAnimationFrame(updateCount)

      const exit = root.current?.animate([{ opacity: 1 }, { opacity: 0 }], { delay: ms(3.22), duration: ms(.08), fill: 'forwards' })
      if (exit) { animations.push(exit); exit.finished.then(finish).catch(() => undefined) }
      completeTimer = window.setTimeout(finish, ms(3.3))
    }

    return () => {
      document.documentElement.style.overflow = previousOverflow
      window.clearTimeout(completeTimer)
      cancelAnimationFrame(frame)
      animations.forEach((animation) => animation.cancel())
    }
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
