import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { PLATFORMS, fmt } from './data'
import { Icon, Platform } from './Icons'
import { Photo, CountUp, Riyal } from './Shared'

export function Placeholder({ emoji, title, text }) {
  return <div className="empty"><div className="ico">{emoji}</div><h3>{title}</h3><p>{text}</p></div>
}

function useLiveClicks(joined) {
  const [ticks, setTicks] = useState(0)
  useEffect(() => {
    if (!joined.length) return
    const t = setInterval(() => setTicks((n) => n + 1 + Math.floor(Math.random() * 4)), 1400)
    return () => clearInterval(t)
  }, [joined.length])
  return ticks
}

export function Mine({ joined, onDiscover }) {
  const live = useLiveClicks(joined)
  return (
    <>
      <div className="pagehead" style={{ paddingTop: 26 }}><h1>Campaigns</h1></div>
      {joined.length === 0 ? (
        <div className="empty">
          <div className="ico">🚀</div>
          <h3>No campaigns yet</h3>
          <p>Pick a campaign you like, post it, and start earning from the first click.</p>
          <button className="cta" style={{ width: 200, height: 48, marginTop: 8 }} onClick={onDiscover}>Discover campaigns</button>
        </div>
      ) : (
        <div className="list" style={{ paddingTop: 10 }}>
          {joined.map(({ c, platform }) => {
            const P = Platform[platform]
            const clicks = 12 + live
            return (
              <motion.div key={c.id} className="lrow" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
                <Photo c={c} />
                <div className="info">
                  <h4>{c.title}</h4>
                  <span className="sub" style={{ display: 'flex', gap: 6, alignItems: 'center' }}><P size={13} /> {PLATFORMS[platform].name} · <span className="num">{clicks}</span> clicks</span>
                  <span className="badgelive">Approved · Live</span>
                </div>
                <span className="earn-pill">+<span className="num">{(clicks * c.pay).toFixed(1)}</span></span>
              </motion.div>
            )
          })}
        </div>
      )}
    </>
  )
}

export function Wallet({ joined }) {
  const live = useLiveClicks(joined)
  const total = joined.reduce((s, { c }) => s + (12 + live) * c.pay, 0)
  return (
    <>
      <div className="pagehead" style={{ paddingTop: 26 }}><h1>Earnings</h1></div>
      <div className="balance">
        <small>Your balance</small>
        <b><Riyal size={20} style={{ marginInlineEnd: 6 }} /><CountUp to={total} decimals={2} duration={0.3} /></b>
        <span className="badgelive" style={{ color: '#d6ffe9' }}>Updating live</span>
      </div>
      {joined.length === 0 && <Placeholder emoji="💸" title="Your balance is zero… for now" text="Your first campaign starts filling your wallet." />}
    </>
  )
}
