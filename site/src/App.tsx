import { useEffect } from 'react'
import { About } from './components/About'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { MenuProvider, useMenu } from './components/MenuContext'
import { PreviewBanner } from './components/PreviewBanner'
import { Process } from './components/Process'
import { Quote } from './components/Quote'
import { Why } from './components/Why'
import { Work } from './components/Work'
import { Hero } from './components/Hero'
import { SHOW_WORK } from './content/work'

export function App() {
  return (
    <MenuProvider>
      <Frame />
    </MenuProvider>
  )
}

function Frame() {
  const { open } = useMenu()

  useEffect(() => {
    const onPop = () => {
      const id = location.hash.replace('#', '')
      if (!id) return
      document.getElementById(id)?.scrollIntoView({ behavior: 'auto', block: 'start' })
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  return (
    <>
      <a className="skip" href="#main" inert={open ? true : undefined}>
        Skip to content
      </a>
      <PreviewBanner inert={open} />
      <Header />
      <main id="main" tabIndex={-1} inert={open ? true : undefined}>
        <Hero />
        <Why />
        {SHOW_WORK ? <Work /> : null}
        <Quote />
        <Process />
        <About />
        <Contact />
      </main>
      <Footer inert={open} />
    </>
  )
}
