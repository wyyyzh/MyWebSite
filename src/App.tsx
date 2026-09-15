import { useState } from 'react'
import ActivityGraph from './components/ActivityGraph'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Intro from './components/Intro'
import Nav from './components/Nav'
import Projects from './components/Projects'
import ReadmeDrawer from './components/ReadmeDrawer'
import Timeline from './components/Timeline'

export default function App() {
  const [readmeOpen, setReadmeOpen] = useState(false)

  return (
    <div className="relative z-10 flex min-h-screen flex-col">
      <Nav onOpenReadme={() => setReadmeOpen(true)} />

      <main className="flex-1">
        <Hero />
        <ActivityGraph />
        <Intro />
        <Projects />
        <Timeline />
      </main>

      <Footer />
      <ReadmeDrawer open={readmeOpen} onClose={() => setReadmeOpen(false)} />
    </div>
  )
}
