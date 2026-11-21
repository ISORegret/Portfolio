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

  return (
    <motion.div
      id="content"
      tabIndex={-1}
      className="outline-none"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
