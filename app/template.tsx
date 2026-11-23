'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useEffect } from 'react'

let hasNavigated = false

export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion()
  const animate = hasNavigated && !reduce

  useEffect(() => {
    hasNavigated = true
  }, [])

  if (!animate) {
    return (
      <div id="content" tabIndex={-1} className="outline-none">
        {children}
      </div>
    )
  }

  // Page transition (internal nav only — the first load is covered by the
  // full-screen SiteLoader instead): a soft fade + a whisper of scale,
  // so album/gallery pages crossfade instead of hard-jumping.
  return (
    <motion.div
      id="content"
      tabIndex={-1}
      className="outline-none"
      initial={{ opacity: 0, y: 8, scale: 0.998 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
