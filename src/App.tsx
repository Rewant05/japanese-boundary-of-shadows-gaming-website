import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import { CharactersPage, ContactPage, LegalPage, NewsPage, StoryPage, WorldPage } from './pages/InnerPages'

const routes: Record<string, React.ReactNode> = {
  '/story': <StoryPage />, '/characters': <CharactersPage />, '/world': <WorldPage />,
  '/news': <NewsPage />, '/contact': <ContactPage />,
  '/privacy': <LegalPage type="privacy" />, '/terms': <LegalPage type="terms" />,
}

export default function App() {
  const [path, setPath] = useState(window.location.pathname)
  useEffect(() => {
    const onPop = () => setPath(window.location.pathname)
    const onNavigate = () => setPath(window.location.pathname)
    window.addEventListener('popstate', onPop)
    window.addEventListener('app:navigate', onNavigate)
    return () => { window.removeEventListener('popstate', onPop); window.removeEventListener('app:navigate', onNavigate) }
  }, [])
  useEffect(() => window.scrollTo(0, 0), [path])
  return <div className="app-shell"><Navbar /><AnimatePresence mode="wait" initial={false}><motion.div key={path} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .35 }}>{path === '/' ? <HomePage /> : (routes[path] ?? <HomePage />)}</motion.div></AnimatePresence><Footer /></div>
}
