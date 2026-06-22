import { useCallback, useState } from 'react'
import CinematicLoader from '../components/CinematicLoader'
import CinematicScrollExperience from '../components/CinematicScrollExperience'
import CombatScrollSection from '../components/CombatScrollSection'
import CharacterStackSection from '../components/CharacterStackSection'
import WorldJourneySection from '../components/WorldJourneySection'
import FinalCta from '../components/FinalCta'

let loaderShownThisVisit = false

export default function HomePage() {
  const [loading, setLoading] = useState(() => !loaderShownThisVisit)
  const complete = useCallback(() => { loaderShownThisVisit = true; setLoading(false) }, [])
  return <main>{loading && <CinematicLoader onComplete={complete} />}<CinematicScrollExperience /><CombatScrollSection /><CharacterStackSection /><WorldJourneySection /><FinalCta /></main>
}
