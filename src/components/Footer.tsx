import { siteMeta } from '../config/siteMeta'
import Link from './Link'

export default function Footer() {
  return <footer className="footer">
    <div className="footer-mark">影</div>
    <div><h2>影ノ境界</h2><p>闇を斬り、記憶を取り戻せ。</p></div>
    <div className="footer-links"><Link href="/about">会社情報</Link><Link href="/contact">お問い合わせ</Link><Link href="/privacy">プライバシーポリシー</Link><Link href="/terms">利用規約</Link></div>
    <div className="footer-meta"><span>{siteMeta.platforms.join(' / ')}</span><span>© 2026 {siteMeta.studio}</span></div>
  </footer>
}
