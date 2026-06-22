import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { siteData } from '../config/siteData'
import Link from '../components/Link'
import { usePageMotion } from '../hooks/usePageMotion'

function PageHero({ index, eyebrow, title, copy }: { index: string, eyebrow: string, title: string, copy: string }) {
  return <header className="page-hero"><div className="page-moon" /><div className="page-gate"><i /><i /><i /></div><motion.span className="page-index" initial={{ opacity: 0, x: -120 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.25, ease: [0.16, 1, 0.3, 1] }}>{index}</motion.span><motion.div className="page-hero-copy" initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: .13, delayChildren: .15 } } }}><motion.small variants={{ hidden: { opacity: 0, x: -35 }, show: { opacity: 1, x: 0 } }}>{eyebrow}</motion.small><motion.h1 variants={{ hidden: { opacity: 0, y: 80, clipPath: 'inset(0 0 100% 0)' }, show: { opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)', transition: { duration: .95, ease: [0.16, 1, 0.3, 1] } } }}>{title}</motion.h1><motion.p variants={{ hidden: { opacity: 0, y: 25 }, show: { opacity: 1, y: 0 } }}>{copy}</motion.p></motion.div><motion.b className="page-vertical" initial={{ opacity: 0, y: -35 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .75 }}>影ノ境界　公式記録</motion.b></header>
}

export function StoryPage() {
  const root = useRef<HTMLElement>(null)
  usePageMotion(root, 'story')
  return <motion.main ref={root} className="inner-page story-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .55 }}><PageHero index="01" eyebrow="STORY / 物語" title="失くした名を、\n斬り戻せ。" copy="これは、忘却に抗う者たちの物語。" />
    <section className="story-prologue"><span>序章</span><blockquote>「目を覚ました時、名前だけが消えていた。残されたのは、黒い刀と、誰かを守れなかったという感覚だけだった。」</blockquote><p>西暦二〇四六年。現世と常闇が重なった大災厄「境界崩落」から十年。人々は夜ごと記憶を失い、それを当然のこととして生きていた。</p></section>
    <section className="chapter-list">{siteData.chapters.map((c, i) => <article key={c.title}><span>{c.no}</span><small>CHAPTER 0{i}</small><h2>{c.title}</h2><p>{c.text}</p><i /></article>)}</section>
    <section className="story-oath"><small>THE TRUTH REMAINS IN SHADOW</small><h2>忘れるな。<br />痛みこそが、<br />お前の証だ。</h2><Link href="/characters" className="action primary slash-link">登場人物へ</Link></section>
  </motion.main>
}

export function CharactersPage() {
  const root = useRef<HTMLElement>(null)
  usePageMotion(root, 'characters')
  return <motion.main ref={root} className="inner-page characters-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .55 }}><PageHero index="02" eyebrow="CHARACTERS / 登場人物" title="影を背負う、\n四つの運命。" copy="交錯する記憶。その刃は、誰に向けられるのか。" />
    <section className="character-showcase">{siteData.characters.map((c, i) => <article className={i % 2 ? 'reverse' : ''} key={c.name} style={{ '--accent': c.color } as React.CSSProperties}>
      <div className="showcase-portrait"><img src={c.image} alt={`${c.name} — ${c.role}`} loading={i === 0 ? 'eager' : 'lazy'} /><span>{c.glyph}</span><i className="portrait-head" /><i className="portrait-body" /><i className="portrait-weapon" /><b>{c.id}</b></div>
      <div className="showcase-copy"><small>境界人物記録 / {c.id}</small><h2>{c.name}</h2><h3>{c.role}</h3><blockquote>「{c.quote}」</blockquote><p>{i === 0 ? '朽ちた神社で目覚めた青年。失われた名前の代わりに、影を斬る異能と黒刀「無銘」を手にしていた。' : i === 1 ? '代々、境界の声を読む白埜家の最後の巫女。穏やかな微笑みの奥に、世界の終わりを知る瞳を隠す。' : i === 2 ? '支配局を裏切った元執行官。二挺の霊装銃を操り、軽口を叩きながらも決して仲間を見捨てない。' : '境界監視局の最高位執行官。自らの影を無数の刃へ変え、レンたちの行く先に立ちはだかる。'}</p></div>
    </article>)}</section>
  </motion.main>
}

export function WorldPage() {
  const root = useRef<HTMLElement>(null)
  usePageMotion(root, 'world')
  return <motion.main ref={root} className="inner-page world-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .55 }}><PageHero index="03" eyebrow="WORLD / 世界観" title="夜の底に、\nもうひとつの世界。" copy="記憶と影が実体を持つ、境界都市ミカゲ。" />
    <section className="world-manifesto"><small>THE BORDER COLLAPSE / 境界崩落</small><h2>二つの世界が重なった夜、<br />人類は過去を失った。</h2><p>現世と常闇。その境目が砕けたことで、都市には異形「虚喰」が出現。彼らは人の記憶を喰らい、奪った過去の姿をまとって徘徊する。</p></section>
    <section className="world-locations">{siteData.locations.map((l, i) => <article key={l.name} className={`world-place place-${i + 1}`}><div className="place-art"><img src={l.image} alt={l.name} loading="lazy" /><i /><span>{l.no}</span></div><div><small>AREA {l.no}　{l.sub}</small><h2>{l.name}</h2><p>{l.detail}</p></div></article>)}</section>
    <section className="lexicon"><h2>境界用語録</h2><dl><div><dt>常闇</dt><dd>人の記憶が形を持つ、現世の裏側。</dd></div><div><dt>虚喰</dt><dd>記憶を喰らい、その姿を模倣する異形。</dd></div><div><dt>境界士</dt><dd>影へ干渉し、常闇と戦う異能者。</dd></div></dl></section>
  </motion.main>
}

export function NewsPage() {
  const root = useRef<HTMLElement>(null)
  usePageMotion(root, 'news')
  return <motion.main ref={root} className="inner-page news-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .55 }}><PageHero index="04" eyebrow="NEWS / ニュース" title="境界通信。" copy="『影ノ境界』の最新情報をお届けします。" />
    <section className="news-list"><div className="news-filter"><button className="active">すべて</button><button>ゲーム情報</button><button>映像・音楽</button><button>お知らせ</button></div>
      {siteData.news.map((n, i) => <article key={n.title}><span>0{i + 1}</span><div><time>{n.date}</time><b>{n.tag}</b></div><h2>{n.title}</h2><p>{n.text}</p><i>↗</i></article>)}</section>
  </motion.main>
}

export function ContactPage() {
  const [sent, setSent] = useState(false)
  return <main className="inner-page"><PageHero index="05" eyebrow="CONTACT / お問い合わせ" title="境界通信局。" copy="ゲーム、取材、サポートに関するお問い合わせ。" />
    <section className="contact-wrap"><aside><small>KUROGANE INTERACTIVE</small><h2>お問い合わせ窓口</h2><p>内容を確認後、通常3〜5営業日以内に担当者より返信いたします。</p><dl><div><dt>メール</dt><dd><a href={`mailto:${siteData.email}`}>{siteData.email}</a></dd></div><div><dt>所在地</dt><dd>{siteData.address}</dd></div></dl><div className="social-row">{siteData.socials.map(s => <a href={s.url} key={s.label}>{s.label} ↗</a>)}</div></aside>
      {sent ? <div className="form-success"><span>送</span><h2>送信しました。</h2><p>お問い合わせありがとうございます。<br />境界通信局より折り返しご連絡いたします。</p><button className="action" onClick={() => setSent(false)}>新しいお問い合わせ</button></div> : <form onSubmit={(e) => { e.preventDefault(); setSent(true) }}><label>お問い合わせ種別<select required defaultValue=""><option value="" disabled>選択してください</option><option>ゲームについて</option><option>テクニカルサポート</option><option>取材・配信について</option><option>その他</option></select></label><label>お名前<input required type="text" placeholder="境界 太郎" /></label><label>メールアドレス<input required type="email" placeholder="name@example.jp" /></label><label>お問い合わせ内容<textarea required rows={7} placeholder="お問い合わせ内容をご記入ください。" /></label><label className="check"><input required type="checkbox" /><span><Link href="/privacy">プライバシーポリシー</Link>に同意します</span></label><button className="action primary slash-link" type="submit">内容を送信する</button></form>}
    </section>
  </main>
}

const privacySections = [
  ['個人情報の取り扱いについて', 'KUROGANE INTERACTIVE（以下「当社」）は、お客様の個人情報を適切に保護することを重要な責務と考え、個人情報の保護に関する法律その他の関連法令を遵守します。'],
  ['取得する情報', '当社は、お問い合わせ時に氏名、メールアドレス、お問い合わせ内容を取得します。また、本サイトの利用状況、端末情報、アクセスログ等を自動的に取得する場合があります。'],
  ['利用目的', '取得した情報は、お問い合わせへの対応、本サービスの提供・改善、不正利用の防止、重要なお知らせの送付、統計データの作成に利用します。'],
  ['第三者提供', '法令に基づく場合を除き、ご本人の同意なく個人情報を第三者へ提供しません。業務委託先には必要な範囲で情報を提供し、適切な監督を行います。'],
  ['Cookieについて', '本サイトでは利便性の向上および利用状況の分析のためCookieを使用する場合があります。ブラウザの設定によりCookieを無効化できます。'],
  ['安全管理措置', '個人情報への不正アクセス、漏えい、滅失または毀損を防止するため、組織的・技術的な安全管理措置を講じます。'],
  ['開示・訂正・削除', '個人情報の開示、訂正、利用停止または削除をご希望の場合は、本人確認のうえ法令に従って対応します。'],
]
const termsSections = [
  ['規約への同意', '本サイトを利用することで、本規約に同意したものとみなします。同意いただけない場合は、本サイトの利用をお控えください。'],
  ['知的財産権', '本サイトおよび「影ノ境界」に関する文章、画像、映像、音楽、商標その他すべてのコンテンツの権利は、当社または正当な権利者に帰属します。'],
  ['禁止事項', '法令または公序良俗に反する行為、第三者の権利を侵害する行為、本サイトの運営を妨害する行為、不正アクセス、コンテンツの無断転載・改変・販売を禁止します。'],
  ['免責事項', '当社は、本サイトの内容の正確性、完全性、継続性を保証しません。本サイトの利用により生じた損害について、当社の故意または重過失による場合を除き責任を負いません。'],
  ['サービスの変更・停止', '当社は、事前の通知なく本サイトの内容を変更し、または提供を中断・終了する場合があります。'],
  ['準拠法・管轄', '本規約は日本法に準拠します。本サイトに関する紛争については、東京地方裁判所を第一審の専属的合意管轄裁判所とします。'],
]

export function LegalPage({ type }: { type: 'privacy' | 'terms' }) {
  const privacy = type === 'privacy'; const sections = privacy ? privacySections : termsSections
  return <main className="inner-page legal-page"><PageHero index={privacy ? '06' : '07'} eyebrow={privacy ? 'PRIVACY POLICY' : 'TERMS OF USE'} title={privacy ? 'プライバシー\nポリシー' : '利用規約'} copy="KUROGANE INTERACTIVE 公式サイト運営方針" />
    <section className="legal-content"><header><span>制定日：2026年3月1日</span><span>最終改定日：2026年6月1日</span></header>{sections.map((s, i) => <article key={s[0]}><span>{String(i + 1).padStart(2, '0')}</span><div><h2>{s[0]}</h2><p>{s[1]}</p></div></article>)}<article><span>{String(sections.length + 1).padStart(2, '0')}</span><div><h2>お問い合わせ先</h2><p>{siteData.studio}<br />{siteData.address}<br /><a href={`mailto:${siteData.email}`}>{siteData.email}</a></p></div></article></section>
  </main>
}
