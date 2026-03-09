"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Volume2, VolumeX } from "lucide-react"

import { CursorTrail } from "@/components/cursor-trail"
import { VerticalNav } from "@/components/vertical-nav"
import { WagasaConfigurator } from "@/components/wagasa-configurator"
import { Button } from "@/components/ui/button"

type SectionMeta = {
  id: string
  name: string
  tooltip: string
  width: number
}

const sections: SectionMeta[] = [
  { id: "birth", name: "Birth", tooltip: "Birth of the Umbrella", width: 1.95 },
  { id: "collection", name: "Collection", tooltip: "The Collection", width: 2.35 },
  { id: "ritual", name: "Ritual", tooltip: "The Ritual of Rain", width: 2.3 },
  { id: "design", name: "Design", tooltip: "Know Your Wagasa", width: 1.4 },
  { id: "philosophy", name: "Philosophy", tooltip: "Philosophy", width: 1.8 },
]

const imagery = {
  heroBackdrop:
    "https://images.unsplash.com/photo-1752146260589-bd77152e00c2?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8N3x8SmFwYW5lc2UlMjBsYW50ZXJuJTIwYWxsZXklMjBuaWdodCUyMFVuc3BsYXNofGVufDB8fHx8MTc3MjQ5NTI0NXww&ixlib=rb-4.1.0&q=60&w=3000",
  heroPortrait:
    "https://images.unsplash.com/photo-1760677796103-254e55ca30c7?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTJ8fHRyYWRpdGlvbmFsJTIwamFwYW5lc2UlMjB1bWJyZWxsYXMlMjBvdXRzaWRlJTIwdGVtcGxlJTIwZnJlZSUyMHVuc3BsYXNofGVufDB8fHx8MTc3MjQ5NTYzNHww&ixlib=rb-4.1.0&q=60&w=3000",
  birthBackdrop:
    "https://images.unsplash.com/photo-1759756215426-9919df3addab?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8NXx8amFwYW5lc2UlMjB1bWJyZWxsYSUyMHRlbXBsZSUyMHBhdGglMjB1bnNwbGFzaHxlbnwwfHx8fDE3NzI0OTUzNjB8MA&ixlib=rb-4.1.0&q=60&w=3000",
  ritualBackdrop:
    "https://images.unsplash.com/photo-1685877596988-18f654f1138f?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000",
  philosophyBackdrop:
    "https://images.unsplash.com/photo-1752486377011-2c48f78375e4?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8Nnx8amFwYW5lc2UlMjBsYW50ZXJuJTIwYWxsZXklMjBuaWdodCUyMFVuc3BsYXNofGVufDB8fHx8MTc3MjQ5NTI0NXww&ixlib=rb-4.1.0&q=60&w=3000",
  philosophyCenter:
    "https://images.unsplash.com/photo-1745160423754-d9bfbaa13dc3?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTR8fGNoZXJyeSUyMGJsb3Nzb20lMjB1bWJyZWxsYSUyMGphcGFuJTIwdW5zcGxhc2h8ZW58MHx8fHwxNzcyNDk1NTY4fDA&ixlib=rb-4.1.0&q=60&w=3000",
}

const collectionCards = [
  {
    title: "Lantern Vermilion",
    description: "A lacquer red study shaped by alleys, lantern glow, and after-rain reflections.",
    alt: "Japanese lantern alley at night",
    src: imagery.heroBackdrop,
  },
  {
    title: "Temple Path",
    description: "Muted stone, paper ribs, and ceremonial calm inspired by shrine approaches.",
    alt: "Traditional Japanese umbrellas by a temple path",
    src: imagery.birthBackdrop,
  },
  {
    title: "Rain Crossing",
    description: "Deep indigo reflections and wet asphalt translated into a night procession palette.",
    alt: "Umbrella in a rainy Japanese street",
    src: imagery.ritualBackdrop,
  },
  {
    title: "Blossom Quiet",
    description: "Soft sakura notes and lantern haze for a lighter, more contemplative silhouette.",
    alt: "Cherry blossoms and umbrella in Japan",
    src: imagery.philosophyCenter,
  },
]

const ritualMoments = [
  {
    quote: '"The sound of rain needs no translation."',
    alt: "Umbrella in a rainy Japanese street",
    src: imagery.ritualBackdrop,
  },
  {
    quote: '"Between the silence and the storm, there is the umbrella."',
    alt: "Traditional Japanese lantern alley at night",
    src: imagery.heroBackdrop,
  },
  {
    quote: '"Under one umbrella, we share the same sky."',
    alt: "Cherry blossoms and umbrella in Japan",
    src: imagery.philosophyCenter,
  },
]

const philosophyQuotes = [
  '"The umbrella does not stop the rain, but allows us to dance with it."',
  '"What is more beautiful than the meeting of paper and water?"',
  '"The craftsperson\u2019s hands remember what the mind forgets."',
]

export default function Home() {
  const scrollStageRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const offsetsRef = useRef<number[]>([])
  const maxTranslateRef = useRef(0)
  const scrollRafRef = useRef<number>(0)
  const animationRafRef = useRef<number>(0)
  const currentSectionRef = useRef(0)
  const targetTranslateRef = useRef(0)
  const renderedTranslateRef = useRef(0)

  const [audioPlaying, setAudioPlaying] = useState(false)
  const [currentSection, setCurrentSection] = useState(0)
  const [showIntro, setShowIntro] = useState(true)
  const [trackHeight, setTrackHeight] = useState("100vh")
  const [progressWidth, setProgressWidth] = useState("5%")
  const [viewportSize, setViewportSize] = useState({ width: 0, height: 0 })

  const syncViewportSize = () => {
    setViewportSize((current) => {
      const next = { width: window.innerWidth, height: window.innerHeight }
      return current.width === next.width && current.height === next.height ? current : next
    })
  }

  const jumpToStage = (behavior: ScrollBehavior = "smooth") => {
    const stage = scrollStageRef.current
    if (!stage) return

    const stageTop = stage.getBoundingClientRect().top + window.scrollY
    window.scrollTo({ top: stageTop, behavior })
  }

  const getSectionViewportStyle = (widthMultiplier: number) => ({
    width: viewportSize.width > 0 ? `${widthMultiplier * viewportSize.width}px` : undefined,
    height: viewportSize.height > 0 ? `${viewportSize.height}px` : undefined,
  })

  useEffect(() => {
    const updateTrackMetrics = () => {
      const track = trackRef.current
      if (!track) return

      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight
      const sectionNodes = Array.from(track.querySelectorAll<HTMLElement>("[data-scroll-section='true']"))
      offsetsRef.current = sectionNodes.map((node) => node.offsetLeft)

      const totalWidth = track.scrollWidth
      maxTranslateRef.current = Math.max(totalWidth - viewportWidth, 0)
      targetTranslateRef.current = Math.min(targetTranslateRef.current, maxTranslateRef.current)
      renderedTranslateRef.current = Math.min(renderedTranslateRef.current, maxTranslateRef.current)
      setTrackHeight(`${maxTranslateRef.current + viewportHeight}px`)
    }

    const applyTrackState = (distance: number) => {
      const track = trackRef.current
      if (!track) return

      const maxTranslate = maxTranslateRef.current
      track.style.transform = `translate3d(${-distance}px, 0, 0)`

      const nextSection = offsetsRef.current.reduce((active, offset, index) => {
        if (distance >= offset - window.innerWidth * 0.2) {
          return index
        }
        return active
      }, 0)

      if (currentSectionRef.current !== nextSection) {
        currentSectionRef.current = nextSection
        setCurrentSection(nextSection)
      }

      const progress = maxTranslate === 0 ? 0 : distance / maxTranslate
      setProgressWidth(`${Math.max(5, progress * 100)}%`)
    }

    const animateTrack = () => {
      const difference = targetTranslateRef.current - renderedTranslateRef.current

      if (Math.abs(difference) < 0.5) {
        renderedTranslateRef.current = targetTranslateRef.current
        applyTrackState(renderedTranslateRef.current)
        animationRafRef.current = 0
        return
      }

      renderedTranslateRef.current += difference * 0.14
      applyTrackState(renderedTranslateRef.current)
      animationRafRef.current = requestAnimationFrame(animateTrack)
    }

    const updateScrollState = (immediate = false) => {
      const stage = scrollStageRef.current
      if (!stage) return

      const maxTranslate = maxTranslateRef.current
      const stageRect = stage.getBoundingClientRect()
      const distance = Math.min(Math.max(-stageRect.top, 0), maxTranslate)
      targetTranslateRef.current = distance

      if (immediate) {
        renderedTranslateRef.current = distance
        applyTrackState(distance)
        return
      }

      if (!animationRafRef.current) {
        animationRafRef.current = requestAnimationFrame(animateTrack)
      }
    }

    const onScroll = () => {
      cancelAnimationFrame(scrollRafRef.current)
      scrollRafRef.current = requestAnimationFrame(() => updateScrollState())
    }

    syncViewportSize()
    updateTrackMetrics()
    updateScrollState(true)

    const resizeObserver =
      typeof ResizeObserver === "undefined"
        ? null
        : new ResizeObserver(() => {
            updateTrackMetrics()
            updateScrollState(true)
          })

    if (trackRef.current && resizeObserver) {
      resizeObserver.observe(trackRef.current)
    }

    const handleResize = () => {
      syncViewportSize()
      requestAnimationFrame(() => {
        updateTrackMetrics()
        updateScrollState(true)
      })
    }

    window.addEventListener("resize", handleResize)
    window.visualViewport?.addEventListener("resize", handleResize)
    window.addEventListener("scroll", onScroll, { passive: true })

    return () => {
      resizeObserver?.disconnect()
      window.removeEventListener("resize", handleResize)
      window.visualViewport?.removeEventListener("resize", handleResize)
      window.removeEventListener("scroll", onScroll)
      cancelAnimationFrame(scrollRafRef.current)
      cancelAnimationFrame(animationRafRef.current)
    }
  }, [])

  useEffect(() => {
    if (!showIntro) return

    const enterExperience = () => {
      setShowIntro(false)
      requestAnimationFrame(() => {
        jumpToStage("auto")
      })
    }

    const handleWheel = () => enterExperience()
    const handleKeyDown = (event: KeyboardEvent) => {
      if (["Space", "ArrowRight", "ArrowDown", "Enter"].includes(event.code)) {
        enterExperience()
      }
    }

    window.addEventListener("wheel", handleWheel, { passive: true, once: true })
    window.addEventListener("touchstart", enterExperience, { passive: true, once: true })
    window.addEventListener("keydown", handleKeyDown, { once: true })

    return () => {
      window.removeEventListener("wheel", handleWheel)
      window.removeEventListener("touchstart", enterExperience)
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [showIntro])

  const toggleAudio = () => {
    setAudioPlaying((value) => !value)
  }

  const startExperience = () => {
    setShowIntro(false)
    jumpToStage()
  }

  const scrollToSection = (index: number) => {
    const stage = scrollStageRef.current
    if (!stage) return

    const stageTop = window.scrollY + stage.getBoundingClientRect().top
    const targetOffset = Math.min(offsetsRef.current[index] ?? 0, maxTranslateRef.current)
    const target = stageTop + targetOffset

    setShowIntro(false)
    window.scrollTo({ top: target, behavior: "smooth" })
  }

  return (
    <main className="relative min-h-screen bg-[#120c0a] text-white">
      <CursorTrail />

      {showIntro && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden px-6 text-center text-white transition-opacity duration-700">
          <div className="absolute inset-0">
            <Image
              src={imagery.heroBackdrop}
              fill
              alt=""
              unoptimized
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(72,2,7,0.38),rgba(120,8,13,0.82)),radial-gradient(circle_at_center,rgba(190,25,27,0.2),rgba(83,4,6,0.88)_72%)]" />
            <div className="absolute inset-0 bg-[#8f0d14]/55 mix-blend-multiply" />
          </div>

          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[72vw] w-[72vw] max-h-[940px] max-w-[940px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[46vw] w-[46vw] max-h-[620px] max-w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />

          <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center">
            <div className="mb-6 flex items-center gap-4 text-[11px] uppercase tracking-[0.55em] text-white/70 sm:text-xs">
              <span className="h-px w-12 bg-white/30 sm:w-20" />
              <span>傘 · Wagasa Atelier</span>
              <span className="h-px w-12 bg-white/30 sm:w-20" />
            </div>

            <div className="relative mb-10 h-44 w-44 sm:h-72 sm:w-72">
              <div className="absolute inset-[-12%] rounded-full border border-white/10" />
              <div className="absolute inset-0 overflow-hidden rounded-full border border-white/30 shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
                <Image
                  src={imagery.heroPortrait}
                  fill
                  alt="Traditional Japanese umbrellas near a temple path"
                  unoptimized
                  sizes="(max-width: 640px) 176px, 288px"
                  className="object-cover"
                />
              </div>
            </div>

            <h1 className="mb-4 font-serif text-5xl font-medium tracking-[0.08em] text-white sm:text-7xl">
              「傘は空の詩。」
            </h1>
            <p className="mb-3 font-serif text-2xl italic text-white/90 sm:text-4xl">A wagasa is a poem for the sky.</p>
            <p className="mb-10 text-xs uppercase tracking-[0.4em] text-white/60 sm:text-sm">
              Scroll · Swipe · Touch to begin
            </p>
            <Button
              onClick={startExperience}
              className="h-14 min-w-[220px] rounded-2xl border border-white/20 bg-white/10 px-10 text-lg font-medium text-white backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:bg-white/20 hover:shadow-[0_20px_40px_rgba(0,0,0,0.28)]"
            >
              Enter the Story
            </Button>
          </div>
        </div>
      )}

      <header className="fixed left-0 top-0 z-40 w-full">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
          <div className="rounded-full border border-white/10 bg-black/20 px-4 py-2 backdrop-blur-md transition duration-300 hover:border-white/20 hover:bg-black/30">
            <p className="font-serif text-lg tracking-[0.25em]">傘 · WAGASA</p>
          </div>
          <div className="hidden items-center gap-5 rounded-full border border-white/10 bg-black/20 px-4 py-2 text-sm text-white/70 backdrop-blur-md md:flex">
            <button type="button" onClick={() => scrollToSection(1)} className="transition duration-300 hover:-translate-y-0.5 hover:text-white">
              Collection
            </button>
            <button type="button" onClick={() => scrollToSection(3)} className="transition duration-300 hover:-translate-y-0.5 hover:text-white">
              Design
            </button>
            <Link href="mailto:atelier@wagasa.jp" className="transition duration-300 hover:-translate-y-0.5 hover:text-white">
              Contact
            </Link>
          </div>
        </div>
      </header>

      <div ref={scrollStageRef} className="relative" style={{ height: trackHeight }}>
        <div
          className="sticky left-0 top-0 h-screen overflow-hidden"
          style={{
            width: viewportSize.width > 0 ? `${viewportSize.width}px` : undefined,
            height: viewportSize.height > 0 ? `${viewportSize.height}px` : undefined,
          }}
        >
          <div
            ref={trackRef}
            className="flex h-screen will-change-transform"
            style={{ height: viewportSize.height > 0 ? `${viewportSize.height}px` : undefined }}
          >
            <section
              id="birth"
              data-scroll-section="true"
              className="relative h-screen w-[195vw] shrink-0 overflow-hidden bg-[#7A1212]"
              style={getSectionViewportStyle(1.95)}
            >
              <div className="absolute inset-0">
                <Image
                  src={imagery.birthBackdrop}
                  fill
                  alt=""
                  unoptimized
                  sizes="300vw"
                  className="object-cover object-center opacity-40"
                />
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(26,8,5,0.9)_0%,rgba(92,13,17,0.7)_28%,rgba(122,18,18,0.48)_52%,rgba(24,12,9,0.72)_100%)]" />
              </div>
              <div className="absolute left-[7%] top-[16%] max-w-xl">
                <p className="mb-4 text-sm uppercase tracking-[0.45em] text-[#f0d7c3]/70">Chapter One</p>
                <h2 className="mb-6 max-w-md font-serif text-5xl font-medium leading-tight sm:text-6xl">
                  Birth of the Umbrella
                </h2>
                <p className="mb-8 max-w-lg text-lg leading-relaxed text-white/78">
                  Bamboo, paper, thread, lacquer, and patience. Every wagasa begins as a ritual of hands, weather, and
                  timing. The object is light, but the making is slow.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button
                    onClick={() => scrollToSection(1)}
                    className="rounded-full bg-[#f1dfd0] px-6 text-[#7A1212] transition duration-300 hover:-translate-y-0.5 hover:bg-[#f7ebe2] hover:shadow-[0_18px_35px_rgba(0,0,0,0.22)]"
                  >
                    Explore the Collection
                  </Button>
                  <button
                    type="button"
                    onClick={() => scrollToSection(3)}
                    className="inline-flex items-center rounded-full border border-white/20 bg-black/15 px-5 py-3 text-sm text-white/80 backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 hover:border-white/40 hover:bg-black/25 hover:text-white"
                  >
                    Know Your Wagasa
                  </button>
                </div>

                <div className="mt-10 grid w-full max-w-xl gap-4 sm:grid-cols-3">
                  {[
                    { label: "Materials", value: "Bamboo · Washi · Lacquer" },
                    { label: "Making Rhythm", value: "36 careful stages" },
                    { label: "Atmosphere", value: "Shade in summer, poetry in rain" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="rounded-[1.5rem] border border-white/10 bg-black/20 p-4 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-black/30"
                    >
                      <p className="mb-2 text-xs uppercase tracking-[0.3em] text-[#f0d7c3]/60">{item.label}</p>
                      <p className="text-sm leading-relaxed text-white/80">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="group absolute left-[44%] top-[12%] h-[64vh] w-[22vw] overflow-hidden rounded-[2rem] border border-white/10 bg-black/20 shadow-2xl transition duration-500 hover:-translate-y-2 hover:border-white/20">
                <Image
                  src={imagery.heroPortrait}
                  fill
                  alt="Traditional Japanese umbrellas by a temple path"
                  unoptimized
                  sizes="22vw"
                  className="object-cover opacity-90 transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              </div>
              <div className="group absolute left-[68%] top-[18%] h-[34vh] w-[14vw] overflow-hidden rounded-[2rem] border border-white/10 bg-black/20 shadow-2xl transition duration-500 hover:-translate-y-2 hover:border-white/20">
                <Image
                  src={imagery.philosophyBackdrop}
                  fill
                  alt="Japanese lantern alley at night"
                  unoptimized
                  sizes="14vw"
                  className="object-cover opacity-85 transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              </div>
              <div className="group absolute left-[83%] top-[25%] h-[42vh] w-[17vw] overflow-hidden rounded-[2rem] border border-white/10 bg-black/20 shadow-2xl transition duration-500 hover:-translate-y-2 hover:border-white/20">
                <Image
                  src={imagery.birthBackdrop}
                  fill
                  alt="Stone path and traditional umbrellas in Japan"
                  unoptimized
                  sizes="17vw"
                  className="object-cover opacity-80 transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              </div>

              <div className="absolute left-[104%] top-[19%] max-w-sm rounded-[2rem] border border-white/10 bg-black/20 p-8 backdrop-blur-md">
                <div className="mb-6 font-serif text-6xl font-light text-[#f7e3d0]">
                  <span className="writing-vertical-rl inline-block">工芸の魂</span>
                </div>
                <p className="text-lg leading-relaxed text-white/75">
                  The soul of craftsmanship survives in every fold. When rain touches paper, technique becomes memory,
                  and memory becomes atmosphere.
                </p>
              </div>

            </section>

            <section
              id="collection"
              data-scroll-section="true"
              className="relative h-screen w-[235vw] shrink-0 overflow-hidden bg-[#0F3D3E]"
              style={getSectionViewportStyle(2.35)}
            >
              <div className="absolute inset-0">
                <Image
                  src={imagery.philosophyBackdrop}
                  fill
                  alt=""
                  unoptimized
                  sizes="300vw"
                  className="object-cover object-center opacity-25"
                />
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,20,22,0.94)_0%,rgba(11,47,49,0.82)_30%,rgba(15,61,62,0.58)_52%,rgba(8,16,17,0.86)_100%)]" />
              </div>
              <div className="absolute left-[8%] top-[18%] max-w-md">
                <p className="mb-4 text-sm uppercase tracking-[0.45em] text-[#d4e5dc]/65">Chapter Two</p>
                <h2 className="mb-6 font-serif text-5xl font-medium sm:text-6xl">The Collection</h2>
                <p className="text-lg leading-relaxed text-white/78">
                  Traditional silhouettes, lacquered finishes, season-led palettes, and contemporary street-light
                  moods. Each one carries weather differently.
                </p>
              </div>

              <div className="absolute left-[30%] top-[18%] flex gap-6">
                {collectionCards.map((card) => (
                  <article
                    key={card.title}
                    className="group relative h-[56vh] w-[17.5vw] min-w-[220px] overflow-hidden rounded-[2rem] border border-white/10 bg-black/25 shadow-2xl transition duration-500 hover:-translate-y-3 hover:border-white/20"
                  >
                    <Image
                      src={card.src}
                      fill
                      alt={card.alt}
                      unoptimized
                      sizes="17.5vw"
                      className="object-cover transition duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/15 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-6">
                      <p className="mb-2 text-[11px] uppercase tracking-[0.35em] text-white/55">Atelier Edition</p>
                      <h3 className="mb-2 font-serif text-2xl">{card.title}</h3>
                      <p className="text-sm leading-relaxed text-white/75">{card.description}</p>
                    </div>
                  </article>
                ))}
              </div>

              <div className="absolute left-[112%] top-[16%] max-w-lg rounded-[2rem] border border-white/10 bg-black/25 px-8 py-7 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-white/20">
                <p className="mb-4 text-xs uppercase tracking-[0.4em] text-[#d4e5dc]/65">Palette Direction</p>
                <p className="text-lg leading-relaxed text-white/76">
                  Vermilion, temple stone, indigo rain, and sakura dusk. Each palette is grounded in shrine paths,
                  lantern alleys, wet stone, and seasonal light.
                </p>
              </div>
            </section>

            <section
              id="ritual"
              data-scroll-section="true"
              className="relative h-screen w-[230vw] shrink-0 overflow-hidden bg-[#2C3639]"
              style={getSectionViewportStyle(2.3)}
            >
              <div className="absolute inset-0">
                <Image
                  src={imagery.ritualBackdrop}
                  fill
                  alt=""
                  unoptimized
                  sizes="300vw"
                  className="object-cover object-center opacity-30"
                />
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(12,14,16,0.9)_0%,rgba(28,36,38,0.76)_28%,rgba(44,54,57,0.56)_54%,rgba(8,10,12,0.88)_100%)]" />
              </div>
              <div className="absolute left-[8%] top-[18%] max-w-md">
                <p className="mb-4 text-sm uppercase tracking-[0.45em] text-[#d9e6ea]/65">Chapter Three</p>
                <h2 className="mb-6 font-serif text-5xl font-medium sm:text-6xl">The Ritual of Rain</h2>
                <p className="text-lg leading-relaxed text-white/78">
                  Rain in Japan is rhythm rather than interruption. The wagasa turns weather into ceremony, shadow into
                  shelter, and movement into reflection.
                </p>
              </div>

              <div className="absolute left-[31%] top-[14%] flex gap-7">
                {ritualMoments.map((moment, index) => (
                  <article
                    key={moment.quote}
                    className="group relative h-[64vh] w-[24vw] min-w-[280px] overflow-hidden rounded-[2rem] border border-white/10 bg-black/25 shadow-2xl transition duration-500 hover:-translate-y-2 hover:border-white/20"
                    style={{ marginTop: index % 2 === 0 ? 0 : 48 }}
                  >
                    <Image
                      src={moment.src}
                      fill
                      alt={moment.alt}
                      unoptimized
                      sizes="24vw"
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-8">
                      <p className="max-w-md font-serif text-xl italic leading-relaxed text-white/90">{moment.quote}</p>
                    </div>
                  </article>
                ))}
              </div>

              <div className="absolute left-[116%] top-[20%] max-w-sm rounded-[2rem] border border-white/10 bg-black/25 p-8 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-white/20">
                <p className="mb-3 text-xs uppercase tracking-[0.35em] text-[#d9e6ea]/60">Atmosphere Notes</p>
                <p className="text-base leading-relaxed text-white/78">
                  Reflections, wet stone, lantern spill, quiet crossings. This chapter should feel like listening to
                  rain rather than watching a storm.
                </p>
              </div>
            </section>

            <section
              id="design"
              data-scroll-section="true"
              className="relative h-screen w-[140vw] shrink-0 overflow-hidden bg-[#3F4E4F]"
              style={getSectionViewportStyle(1.4)}
            >
              <div className="absolute inset-0">
                <Image
                  src={imagery.heroPortrait}
                  fill
                  alt=""
                  unoptimized
                  sizes="200vw"
                  className="object-cover object-center opacity-20"
                />
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(18,24,24,0.9)_0%,rgba(34,44,44,0.82)_24%,rgba(63,78,79,0.72)_48%,rgba(15,19,20,0.92)_100%)]" />
              </div>
              <div className="absolute left-[6%] top-[15%] max-w-sm">
                <p className="mb-4 text-sm uppercase tracking-[0.45em] text-[#e3e7df]/65">Chapter Four</p>
                <h2 className="mb-6 font-serif text-5xl font-medium sm:text-6xl">Know Your Wagasa</h2>
                <p className="mb-8 text-lg leading-relaxed text-white/78">
                  Read the umbrella from above. Color, season, and symbol come together as a story object, each wagasa
                  carrying a different emotional atmosphere.
                </p>
                <div className="rounded-[1.5rem] border border-white/10 bg-black/15 p-5 backdrop-blur-md">
                  <p className="mb-4 text-sm uppercase tracking-[0.3em] text-white/50">Direct Links</p>
                  <div className="flex flex-wrap gap-3 text-sm">
                    <button
                      type="button"
                      onClick={() => scrollToSection(0)}
                      className="rounded-full border border-white/15 px-4 py-2 transition duration-300 hover:-translate-y-0.5 hover:border-white/35 hover:bg-white/5"
                    >
                      Story Start
                    </button>
                    <button
                      type="button"
                      onClick={() => scrollToSection(4)}
                      className="rounded-full border border-white/15 px-4 py-2 transition duration-300 hover:-translate-y-0.5 hover:border-white/35 hover:bg-white/5"
                    >
                      Philosophy
                    </button>
                    <Link href="mailto:atelier@wagasa.jp" className="rounded-full border border-white/15 px-4 py-2 transition duration-300 hover:-translate-y-0.5 hover:border-white/35 hover:bg-white/5">
                      Request Bespoke Order
                    </Link>
                  </div>
                </div>
              </div>

              <div className="absolute left-[33%] top-[10%] h-[78vh] w-[58vw] min-w-[700px] max-w-[1120px]">
                <WagasaConfigurator />
              </div>
            </section>

            <section
              id="philosophy"
              data-scroll-section="true"
              className="relative h-screen w-[180vw] shrink-0 overflow-hidden bg-[#1A120B]"
              style={getSectionViewportStyle(1.8)}
            >
              <div className="absolute inset-0">
                <Image
                  src={imagery.philosophyBackdrop}
                  fill
                  alt=""
                  unoptimized
                  sizes="200vw"
                  className="object-cover object-center opacity-26"
                />
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(16,8,5,0.95)_0%,rgba(35,17,10,0.8)_28%,rgba(26,18,11,0.56)_48%,rgba(10,7,5,0.92)_100%)]" />
              </div>
              <div className="absolute left-[8%] top-[18%] max-w-md">
                <p className="mb-4 text-sm uppercase tracking-[0.45em] text-[#e9d8c5]/65">Chapter Five</p>
                <h2 className="mb-6 font-serif text-5xl font-medium sm:text-6xl">Philosophy</h2>
                <p className="text-lg leading-relaxed text-white/78">
                  The wagasa is not only protection. It is a way of moving through impermanence with grace, softness,
                  and visible intention.
                </p>
              </div>

              <div className="absolute left-[38%] top-1/2 -translate-y-1/2">
                <div className="relative h-[56vh] w-[56vh] max-h-[620px] max-w-[620px]">
                  <div className="absolute inset-[-8%] rounded-full border border-white/10" />
                  <div className="absolute inset-0 overflow-hidden rounded-full border border-white/20 shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
                    <Image
                      src={imagery.philosophyCenter}
                      fill
                      alt="Cherry blossoms and umbrella in Japan"
                      unoptimized
                      sizes="60vh"
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,0,0,0.02)_0%,rgba(0,0,0,0.58)_88%)]" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="max-w-sm text-center font-serif text-2xl italic leading-relaxed text-white/90">
                      &ldquo;In every storm, there is a flower waiting to be held.&rdquo;
                    </p>
                  </div>
                </div>
              </div>

              {philosophyQuotes.map((quote, index) => (
                <div
                  key={quote}
                  className="absolute max-w-xs rounded-[1.5rem] border border-white/10 bg-black/20 px-6 py-5 text-white/85 backdrop-blur-md"
                  style={{
                    left: `${72 + index * 18}%`,
                    top: `${24 + (index % 2) * 26}%`,
                  }}
                >
                  <p className="font-serif text-xl italic leading-relaxed">{quote}</p>
                </div>
              ))}
            </section>
          </div>
        </div>
      </div>

      <VerticalNav currentSection={currentSection} sections={sections} onSelect={scrollToSection} />

      <button
        type="button"
        onClick={toggleAudio}
        className="fixed bottom-8 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/10 backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:bg-white/20 hover:shadow-[0_18px_35px_rgba(0,0,0,0.25)]"
        aria-label={audioPlaying ? "Mute ambient audio" : "Play ambient audio"}
      >
        {audioPlaying ? <VolumeX className="h-5 w-5 text-white" /> : <Volume2 className="h-5 w-5 text-white" />}
      </button>

      <div className="fixed bottom-0 left-0 z-40 h-1 w-full bg-white/10">
        <div
          className="h-full bg-[linear-gradient(90deg,#7A1212,#7A1212_70%,#D4AF37_85%,#7A1212_100%)] transition-[width] duration-300 ease-out"
          style={{ width: progressWidth }}
        />
      </div>

      <footer className="fixed bottom-0 left-0 z-30 w-full bg-gradient-to-t from-black/50 via-black/20 to-transparent pb-5 pt-12 text-white/70">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-3 px-6 text-sm md:flex-row md:items-center">
          <p>© 2026 Wagasa. Horizontal story experience.</p>
          <div className="flex flex-wrap gap-4">
            <button type="button" onClick={() => scrollToSection(0)} className="transition duration-300 hover:-translate-y-0.5 hover:text-white">
              Start
            </button>
            <button type="button" onClick={() => scrollToSection(1)} className="transition duration-300 hover:-translate-y-0.5 hover:text-white">
              Collection
            </button>
            <button type="button" onClick={() => scrollToSection(3)} className="transition duration-300 hover:-translate-y-0.5 hover:text-white">
              Design
            </button>
            <Link href="mailto:atelier@wagasa.jp" className="transition duration-300 hover:-translate-y-0.5 hover:text-white">
              atelier@wagasa.jp
            </Link>
          </div>
          <p className="text-xs uppercase tracking-[0.3em] text-white/45">Original concept and build</p>
        </div>
      </footer>
    </main>
  )
}
