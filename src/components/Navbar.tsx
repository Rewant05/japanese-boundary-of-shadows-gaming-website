import { useEffect, useState } from 'react'
import { siteData } from '../config/siteData'
import Link from './Link'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const previous = document.body.style.overflow
    document.body.style.overflow = open ? 'hidden' : previous
    return () => { document.body.style.overflow = previous }
  }, [open])
  return <>
    <header className="nav-shell">
      <Link href="/" className="brand" onClick={() => setOpen(false)}><span>影ノ境界</span><small>KAGE NO KYŌKAI</small></Link>
      <nav className="desktop-nav">{siteData.nav.map(n => <Link href={n.path} key={n.path}>{n.label}</Link>)}</nav>
      <a className="nav-cta slash-link" href="#wishlist">ウィッシュリスト <b>＋</b></a>
      <button className={`menu-button ${open ? 'is-open' : ''}`} onClick={() => setOpen(v => !v)} aria-label="メニュー" aria-expanded={open}><i /><i /></button>
    </header>
    <aside className={`mobile-menu ${open ? 'is-open' : ''}`} aria-hidden={!open}>
      <div className="menu-moon" />
      <span className="vertical-caption">境界案内</span>
      <nav>{siteData.nav.map((n, i) => <Link href={n.path} key={n.path} onClick={() => setOpen(false)}><em>0{i + 1}</em>{n.label}</Link>)}</nav>
      <small>© 2026 KUROGANE INTERACTIVE</small>
    </aside>
  </>
}
