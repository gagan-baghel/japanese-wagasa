"use client"

import Link from "next/link"
import { Droplets, Flower, Palette } from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"

const storyPanels = [
  {
    label: "Color Story",
    title: "Vermilion Resolve",
    body: "Lacquer red carries ceremony, confidence, and a sense of visible intention.",
    icon: Palette,
  },
  {
    label: "Motif Story",
    title: "Blossom Quiet",
    body: "A floral reading softens the silhouette and gives the umbrella a fleeting spring memory.",
    icon: Flower,
  },
  {
    label: "Season Story",
    title: "Rain Season",
    body: "The right wagasa does not fight the rain. It turns weather into atmosphere.",
    icon: Droplets,
  },
]

const galleryFrames = [
  {
    title: "Street Light",
    image:
      "https://images.unsplash.com/photo-1685877596988-18f654f1138f?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=2400",
    alt: "Umbrella in a rainy Japanese street",
  },
  {
    title: "Sakura Hush",
    image:
      "https://images.unsplash.com/photo-1745160423754-d9bfbaa13dc3?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTR8fGNoZXJyeSUyMGJsb3Nzb20lMjB1bWJyZWxsYSUyMGphcGFuJTIwdW5zcGxhc2h8ZW58MHx8fHwxNzcyNDk1NTY4fDA&ixlib=rb-4.1.0&q=60&w=2400",
    alt: "Cherry blossoms and umbrella in Japan",
  },
]

export function WagasaConfigurator() {
  return (
    <div className="grid h-full w-full gap-6 lg:grid-cols-[1.15fr_0.85fr]">
      <div className="grid gap-6">
        <div className="rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top,#f0d2bf_0%,#b65555_32%,#6b1111_72%,#250909_100%)] p-8 shadow-[0_24px_80px_rgba(0,0,0,0.28)]">
          <div className="mb-4 flex items-center justify-between text-xs uppercase tracking-[0.35em] text-white/55">
            <span>Top View</span>
            <span>Wagasa Reading</span>
          </div>

          <div className="relative mx-auto aspect-square w-full max-w-[520px]">
            <div className="absolute inset-[-5%] rounded-full border border-white/10" />
            <div className="absolute inset-0 rounded-full border border-white/15 bg-black/15 shadow-[inset_0_0_60px_rgba(255,255,255,0.06)]" />
            <Image
              src="/wagasa-top.png"
              fill
              alt="Top-view wagasa from above"
              sizes="(max-width: 1024px) 80vw, 520px"
              className="object-contain p-[4%] drop-shadow-[0_25px_40px_rgba(0,0,0,0.35)]"
            />
          </div>

          <div className="mx-auto mt-6 max-w-2xl rounded-[1.5rem] border border-white/10 bg-black/20 px-6 py-5 text-center backdrop-blur-sm">
            <p className="text-xs uppercase tracking-[0.35em] text-white/45">Story Reading</p>
            <p className="mt-2 font-serif text-2xl text-white">Every wagasa tells a different story.</p>
            <p className="mt-2 text-sm leading-relaxed text-white/70">
              Read it through color, weather, symbol, and the silence it creates around the person carrying it.
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {storyPanels.map((panel) => {
            const Icon = panel.icon

            return (
              <article
                key={panel.title}
                className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-black/30"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/10">
                  <Icon className="h-5 w-5 text-white/80" />
                </div>
                <p className="mb-2 text-xs uppercase tracking-[0.3em] text-white/45">{panel.label}</p>
                <h3 className="mb-3 font-serif text-2xl text-white">{panel.title}</h3>
                <p className="text-sm leading-relaxed text-white/70">{panel.body}</p>
              </article>
            )
          })}
        </div>
      </div>

      <div className="grid gap-4">
        <div className="rounded-[1.75rem] border border-white/10 bg-black/25 p-6 backdrop-blur-md">
          <p className="mb-3 text-xs uppercase tracking-[0.35em] text-white/45">Know Your Wagasa</p>
          <h3 className="mb-3 font-serif text-3xl text-white">A quieter way to choose.</h3>
          <p className="text-sm leading-relaxed text-white/68">
            Read the umbrella as an object of character. Material, weather, and mood come first, before trend or
            ornament.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {galleryFrames.map((frame) => (
            <article
              key={frame.title}
              className="group overflow-hidden rounded-[1.75rem] border border-white/10 bg-black/20 shadow-2xl transition duration-300 hover:-translate-y-1 hover:border-white/20"
            >
              <div className="relative h-56">
                <Image
                  src={frame.image}
                  fill
                  alt={frame.alt}
                  unoptimized
                  sizes="(max-width: 640px) 100vw, 20vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <p className="font-serif text-2xl text-white">{frame.title}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="rounded-[1.75rem] border border-white/10 bg-black/25 p-6 backdrop-blur-md">
          <p className="mb-3 text-xs uppercase tracking-[0.35em] text-white/45">Bespoke Direction</p>
          <p className="mb-6 text-sm leading-relaxed text-white/68">
            Tell the atelier whether you want a street-light red, a blossom hush, or a rain-season indigo, and the
            umbrella begins to read like a personal chapter.
          </p>
          <div className="grid gap-3">
            {["Lantern Vermilion", "Blossom Quiet", "Rain Season Indigo"].map((note) => (
              <div
                key={note}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/78 transition duration-300 hover:border-white/20 hover:bg-white/10"
              >
                {note}
              </div>
            ))}
          </div>
          <Button asChild className="mt-6 w-full bg-[#7A1212] text-white hover:bg-[#5A0E0E]">
            <Link href="mailto:atelier@wagasa.jp?subject=Bespoke%20Wagasa%20Inquiry">Request Your Wagasa Story</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
