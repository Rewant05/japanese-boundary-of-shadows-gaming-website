import { lazy, Suspense, useCallback, useEffect, useState } from 'react'
import CinematicLoader from '../components/CinematicLoader'
import CinematicScrollExperience from '../components/CinematicScrollExperience'

const CombatScrollSection = lazy(() => import('../components/CombatScrollSection'))
const CharacterStackSection = lazy(() => import('../components/CharacterStackSection'))
const WorldJourneySection = lazy(() => import('../components/WorldJourneySection'))
const FinalCta = lazy(() => import('../components/FinalCta'))

let loaderShownThisVisit = false

export default function HomePage() {
  const [loading, setLoading] = useState(() => !loaderShownThisVisit)
  const [showChapters, setShowChapters] = useState(() => window.scrollY > 0)
  const complete = useCallback(() => { loaderShownThisVisit = true; setLoading(false) }, [])

  useEffect(() => {
    if (showChapters) return
    const reveal = () => setShowChapters(true)
    window.addEventListener('scroll', reveal, { passive: true, once: true })
    window.addEventListener('wheel', reveal, { passive: true, once: true })
    window.addEventListener('touchstart', reveal, { passive: true, once: true })
    return () => {
      window.removeEventListener('scroll', reveal)
      window.removeEventListener('wheel', reveal)
      window.removeEventListener('touchstart', reveal)
    }
  }, [showChapters])

  return <main>
    {loading && <CinematicLoader onComplete={complete} />}
    <CinematicScrollExperience active={!loading} />
    {showChapters && <Suspense fallback={null}>
      <CombatScrollSection />
      <CharacterStackSection />
      <WorldJourneySection />
      <FinalCta />
    </Suspense>}
  </main>
}
