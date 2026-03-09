"use client"

import { motion } from "framer-motion"

import { cn } from "@/lib/utils"

interface NavSection {
  name: string
  tooltip: string
}

interface VerticalNavProps {
  currentSection: number
  sections: NavSection[]
  onSelect: (index: number) => void
}

export function VerticalNav({ currentSection, sections, onSelect }: VerticalNavProps) {
  return (
    <nav className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 md:block">
      <ul className="relative flex flex-col items-center gap-3 rounded-[2rem] border border-white/10 bg-black/25 px-3 py-4 shadow-[0_20px_50px_rgba(0,0,0,0.25)] backdrop-blur-md">
        {sections.map((section, index) => (
          <li key={section.name} className="relative">
            <button
              type="button"
              onClick={() => onSelect(index)}
              className="group relative flex h-12 w-12 items-center justify-center rounded-full transition-transform duration-300 hover:scale-105"
              aria-label={`Navigate to ${section.name} section`}
            >
              {currentSection === index && (
                <motion.span
                  layoutId="activeSection"
                  className="absolute inset-0 rounded-full border border-white/20 bg-white/10 shadow-[inset_0_0_18px_rgba(255,255,255,0.08)]"
                  transition={{ type: "spring", stiffness: 260, damping: 24 }}
                />
              )}
              <span
                className={cn(
                  "absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-300",
                  currentSection === index ? "bg-[#f1dfd0] shadow-[0_0_16px_rgba(241,223,208,0.45)]" : "bg-white/35 group-hover:bg-white/80",
                )}
              />
              <span className="absolute right-full mr-4 whitespace-nowrap rounded-full border border-white/10 bg-black/55 px-3 py-1.5 text-xs uppercase tracking-[0.25em] text-white/75 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                {section.tooltip}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
