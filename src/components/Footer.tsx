import { siteData } from '../config/siteData'
import Link from './Link'

export default function Footer() {
  return <footer className="footer">
    <div className="footer-mark">影</div>
    <div><h2>影ノ境界</h2><p>闇を斬り、記憶を取り戻せ。</p></div>
    <div className="footer-links"><Link href="/privacy">プライバシーポリシー</Link><Link href="/terms">利用規約</Link><a href={`mailto:${siteData.email}`}>お問い合わせ</a></div>
    <div className="footer-meta"><span>{siteData.platforms.join(' / ')}</span><span>© 2026 {siteData.studio}</span></div>
  </footer>
}
