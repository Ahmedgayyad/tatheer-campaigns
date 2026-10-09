import { useEffect, useState } from 'react'
import { animate, useMotionValue, useTransform, motion } from 'framer-motion'
import { Icon, Platform } from './Icons'
import { TYPES } from './data'

// صورة الحملة من موقع تأثير، مع لون احتياطي لو تعذر تحميلها
export function Photo({ c, className = '', children }) {
  const [ok, setOk] = useState(true)
  return (
    <div className={`photo ${className}`} style={{ '--tint': c.tint }}>
      {ok && <img src={c.img} alt="" loading="lazy" onError={() => setOk(false)} />}
      {!ok && <span className="ph">{c.brand[0]}</span>}
      {children}
    </div>
  )
}

export const TypeChip = ({ type }) => {
  const t = TYPES[type]
  return <span className={`chip ${t.tone}`}><i />{t.label}</span>
}

export const BrandRow = ({ c }) => (
  <div className="brandrow">
    <span className="bdot">{c.brand[0]}</span>
    <span>{c.brand}</span>
    {c.verified && <span className="vb"><Icon.badge size={15} /></span>}
  </div>
)

export const PlatformRow = ({ ids, size = 16, boxed = true }) => (
  <div className="pays">
    {ids.map((id) => {
      const P = Platform[id]
      return <span key={id} className={boxed ? 'pic' : ''}><P size={size} /></span>
    })}
  </div>
)

export function CountUp({ to, decimals = 0, duration = 1.1 }) {
  const mv = useMotionValue(0)
  const text = useTransform(mv, (v) => v.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }))
  useEffect(() => {
    const ctl = animate(mv, to, { duration, ease: [0.22, 1, 0.36, 1] })
    return ctl.stop
  }, [to])
  return <motion.span className="num">{text}</motion.span>
}

export function useToast() {
  const [msg, setMsg] = useState(null)
  useEffect(() => {
    if (!msg) return
    const t = setTimeout(() => setMsg(null), 1800)
    return () => clearTimeout(t)
  }, [msg])
  return [msg, setMsg]
}

// Saudi riyal symbol (replaces the "SAR" text). Takes the surrounding text colour.
export const Riyal = ({ size = 12, style }) => (
  <span className="riyal" role="img" aria-label="SAR" style={{ width: size * 0.92, height: size, ...style }} />
)
