import { lazy, Suspense, useEffect, useState, type ComponentType, type LazyExoticComponent } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'

const StoryPage = lazy(() => import('./pages/InnerPages').then(module => ({ default: module.StoryPage })))
const CharactersPage = lazy(() => import('./pages/InnerPages').then(module => ({ default: module.CharactersPage })))
const WorldPage = lazy(() => import('./pages/InnerPages').then(module => ({ default: module.WorldPage })))
const NewsPage = lazy(() => import('./pages/InnerPages').then(module => ({ default: module.NewsPage })))
const AboutPage = lazy(() => import('./pages/InnerPages').then(module => ({ default: module.AboutPage })))
const ContactPage = lazy(() => import('./pages/InnerPages').then(module => ({ default: module.ContactPage })))
const PrivacyPage = lazy(() => import('./pages/InnerPages').then(module => ({ default: module.PrivacyPage })))
const TermsPage = lazy(() => import('./pages/InnerPages').then(module => ({ default: module.TermsPage })))

const routes: Record<string, LazyExoticComponent<ComponentType>> = {
  '/story': StoryPage, '/characters': CharactersPage, '/world': WorldPage,
  '/news': NewsPage, '/about': AboutPage, '/contact': ContactPage,
  '/privacy': PrivacyPage, '/terms': TermsPage,
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
  const CurrentPage: ComponentType | LazyExoticComponent<ComponentType> = path === '/' ? HomePage : (routes[path] ?? HomePage)
  return <div className="app-shell"><Navbar /><Suspense fallback={<div className="route-loader"><i /><span>境界を接続しています</span></div>}><CurrentPage key={path} /></Suspense><Footer /></div>
}
