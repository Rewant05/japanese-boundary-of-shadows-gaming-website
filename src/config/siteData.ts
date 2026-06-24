export const siteData = {
  title: '影ノ境界',
  titleReading: 'KAGE NO KYŌKAI',
  tagline: '闇を斬り、記憶を取り戻せ。',
  studio: 'KUROGANE INTERACTIVE',
  release: '2026年 冬 配信予定',
  platforms: ['PC', 'PLAYSTATION 5', 'XBOX SERIES X|S'],
  email: 'contact@kage-kyokai.jp',
  address: '東京都渋谷区神南1-12-16',
  socials: [
    { label: 'X', url: 'https://x.com/' },
    { label: 'YouTube', url: 'https://youtube.com/' },
    { label: 'Discord', url: 'https://discord.com/' },
  ],
  nav: [
    { label: '物語', path: '/story' },
    { label: '登場人物', path: '/characters' },
    { label: '世界観', path: '/world' },
    { label: 'ニュース', path: '/news' },
    { label: '会社情報', path: '/about' },
    { label: 'お問い合わせ', path: '/contact' },
  ],
  characters: [
    { id: '01', name: '黒瀬 レン', role: '記憶を失った剣士', quote: '俺が忘れたものを、影だけが覚えている。', color: '#bb1831', glyph: '斬', image: '/assets/game/hero-kage.webp' },
    { id: '02', name: '白埜 ミオ', role: '境界を読む巫女', quote: '未来はひとつではない。だから、選べる。', color: '#a9b9d8', glyph: '祈', image: '/assets/game/character-mio.webp' },
    { id: '03', name: '灯真 カイ', role: '反逆者の銃使い', quote: '正しさなんて、勝った奴の後書きだ。', color: '#d34c22', glyph: '撃', image: '/assets/game/character-kai.webp' },
    { id: '04', name: '篠宮 アヤメ', role: '影を操る監視者', quote: 'あなたの記憶、本当にあなたのもの？', color: '#6e3d9b', glyph: '影', image: '/assets/game/character-ayame.webp' },
  ],
  combat: [
    { id: '壱', title: '影斬り', text: '敵の影を断ち、存在そのものへ致命の一閃を刻む。', stat: '一閃必滅' },
    { id: '弐', title: '回避反撃', text: '刹那の見切りから時を奪い、静止した戦場を駆け抜ける。', stat: '零秒反応' },
    { id: '参', title: '境界覚醒', text: '生と死の狭間を開き、封じられた異能を解き放つ。', stat: '限界突破' },
    { id: '肆', title: '記憶解放', text: '失われた過去を力へ変え、運命を上書きする奥義。', stat: '因果逆転' },
  ],
  chapters: [
    { no: '序', title: '名を失くした朝', text: '目を覚ました時、名前だけが消えていた。残されたのは、黒い刀と、誰かを守れなかったという感覚だけだった。' },
    { no: '壱', title: '境界都市', text: '夜の底に沈む都市・ミカゲ。現世と常闇が重なるこの街で、人々の記憶は静かに喰われていく。' },
    { no: '弐', title: '四つの残響', text: '剣士、巫女、反逆者、監視者。交わるはずのなかった四つの運命が、ひとつの嘘を斬るために集う。' },
    { no: '終', title: '影の向こう側', text: '失ったものを取り戻す時、世界は同じ形ではいられない。それでもレンは、最後の境界へ刀を向ける。' },
  ],
  locations: [
    { no: 'I', name: '朽ちた神社', sub: '忘却の始点', detail: '月明かりさえ届かぬ禁足地。名を奪われた者が目覚める場所。', image: '/assets/game/hero-kage.webp' },
    { no: 'II', name: '境界都市ネオン街', sub: '眠らない墓標', detail: '欲望と霊障が交差する歓楽区。雨は記憶の匂いを洗い流す。', image: '/assets/game/world-neon-city.webp' },
    { no: 'III', name: '月下の森', sub: '声を喰らう森', detail: '迷い込んだ者の声で囁く樹海。白い鳥居だけが出口を知る。', image: '/assets/game/character-mio.webp' },
    { no: 'IV', name: '黒鉄の塔', sub: '監視者の玉座', detail: '都市の記憶を記録する巨大構造物。最上層には空白の歴史が眠る。', image: '/assets/game/character-ayame.webp' },
    { no: 'V', name: '記憶の海', sub: '世界の最深部', detail: 'すべての過去が漂う境界の果て。真実は、波の下で待っている。', image: '/assets/game/world-memory-sea.webp' },
  ],
  news: [
    { date: '2026.06.18', tag: '映像', title: 'ティザートレーラー公開', text: '雨に沈む境界都市と、主人公・黒瀬レンの戦いを初公開。' },
    { date: '2026.05.30', tag: '募集', title: 'クローズドβ募集開始', text: 'PC版クローズドβテストの参加者募集を開始しました。' },
    { date: '2026.05.12', tag: '音楽', title: 'サウンドトラック試聴版公開', text: '作曲家・雨宮朔による楽曲「残響ノ月」を公開しました。' },
    { date: '2026.04.26', tag: '開発', title: '開発者ノート公開', text: '影を斬る戦闘システムと回避反撃の設計思想をご紹介します。' },
    { date: '2026.03.08', tag: '重要', title: '2026年冬 配信予定', text: 'PC / PlayStation 5 / Xbox Series X|Sにて世界同時配信予定。' },
  ],
}

export type Character = (typeof siteData.characters)[number]
