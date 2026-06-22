import { siteData } from '../config/siteData'
import Link from './Link'

export default function FinalCta() {
  return <section className="final-cta" id="final"><div className="final-key-art" /><div className="final-moon" /><div className="final-gate"><i /><i /><i /></div><div className="final-fog" />
    <div className="final-content"><span>最終記録</span><h2>境界の向こうで、<br />記憶が待っている。</h2><p>{siteData.tagline}</p>
      <div className="final-actions"><a className="action primary slash-link" href="#wishlist">ウィッシュリストに追加</a><Link href="/news" className="action">最新情報を見る</Link></div>
      <div className="platforms">{siteData.platforms.map(p => <b key={p}>{p}</b>)}</div><strong>{siteData.release}</strong>
    </div>
  </section>
}
