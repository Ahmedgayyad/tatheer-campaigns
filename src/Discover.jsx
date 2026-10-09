import { useState } from 'react'
import { motion } from 'framer-motion'
import { CAMPAIGNS, FILTERS, TYPES, fmt } from './data'

// Discover — implemented from Figma node 6:44 (iPhone 17 - 1). Sizes, colours and radii follow the design.
const A = import.meta.env.BASE_URL + 'assets/'
const EASE = [0.22, 1, 0.36, 1]

const Platform = ({ id, small }) => (
  <span className="d-plat" data-platform={id}>
    {id === 'youtube'
      ? <img src={A + (small ? 'youtube-sm.svg' : 'youtube.svg')} alt="" style={small ? { width: 12, height: 12 } : { width: 14, height: 9 }} />
      : <img src={A + id + '.svg'} alt="" style={{ width: 14, height: 14 }} />}
  </span>
)

const Logo = ({ src, size = 20 }) => (
  <span className="d-logo" style={{ width: size, height: size }}>
    <img className="bg" src={A + 'logo-bg.png'} alt="" />
    <img className="fg" src={src} alt="" />
  </span>
)

const Earn = ({ v, style }) => (
  <span className="d-earn" style={style}>
    <img src={A + 'riyal.svg'} alt="SAR" width="12" height="13" />
    <b>{fmt(v)}</b>
    <small>/click</small>
  </span>
)

const Creators = ({ n, light }) => (
  <span className="d-creators">
    <img src={A + (light ? 'users-w.svg' : 'users.svg')} alt="" width="12" height="12" />
    <b style={light ? { color: '#fff' } : undefined}>{n}</b>
  </span>
)

function Hero({ c, onOpen }) {
  return (
    <motion.article
      className="d-hero"
      onClick={() => onOpen(c)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onOpen(c)}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: EASE }}
      whileTap={{ scale: 0.985 }}
    >
      <div className="d-poster">
        <img className="poster" src={c.img} alt="" />
        <div className="shade"><img src={A + 'poster-shade.png'} alt="" /></div>
        <img className="pager" src={A + 'pager.svg'} alt="" />
        <Earn v={c.pay} style={{ position: 'absolute', left: 12, top: 9, background: 'rgba(231,248,241,.7)' }} />
        <div className="copy">
          <span className="brand"><Logo src={c.logo} size={24} /><span>{c.brand}</span></span>
          <div className="stack">
            <p className="title">{c.title}</p>
            <div className="foot">
              <span className="plats">
                <span className="p">{c.platforms.map((p) => <Platform key={p} id={p} />)}</span>
                <Creators n={c.creators} light />
              </span>
              <span className="d-view">View</span>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  )
}

function Card({ c, i, onOpen }) {
  return (
    <motion.article
      className="d-card"
      onClick={() => onOpen(c)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onOpen(c)}
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.08 * i + 0.1, duration: 0.5, ease: EASE }}
      whileTap={{ scale: 0.985 }}
    >
      <div className="cv">
        <img src={c.img} alt="" />
      </div>
      <div className="body">
        <div className="hd">
          <div className="line">
            <span className="who"><span className="b"><Logo src={c.logo} size={20} /><span>{c.brand}</span></span><span className="age">· {c.days}d</span></span>
            <span className="p">{c.platforms.map((p) => <Platform key={p} id={p} small={p === 'youtube' && c.platforms[1] === 'youtube'} />)}</span>
          </div>
          <p className="t">{c.title}</p>
        </div>
        <div className="price">
          <Earn v={c.pay} style={{ background: '#e7f8f1' }} />
          <Creators n={c.creators} />
        </div>
      </div>
    </motion.article>
  )
}

export default function Discover({ onOpen, onFilters, sort }) {
  const [filter, setFilter] = useState('all')
  const match = (c) => filter === 'all' || c.type === filter
  const order = {
    pay: (a, b) => b.pay - a.pay,
    creators: (a, b) => b.creators - a.creators,
    ending: (a, b) => a.days - b.days,
  }[sort] || (() => 0)
  const hero = CAMPAIGNS.find((c) => c.hero)
  const pick = (g) => CAMPAIGNS.filter((c) => !c.hero && (c.group || "for-you") === g && match(c)).sort(g === "new" ? () => 0 : order)
  const forYou = pick("for-you")
  const fresh = pick("new")

  return (
    <div className="d-screen">
      <div className="d-filter">
        <div className="seg">
          {FILTERS.map((f) => (
            <button key={f.id} className={filter === f.id ? 'on' : ''} onClick={() => setFilter(f.id)}>
              {filter === f.id && <motion.span layoutId="dseg" className="pill" transition={{ type: 'spring', stiffness: 520, damping: 40 }} />}
              <span>{f.label}</span>
            </button>
          ))}
        </div>
        <button className="fbtn" onClick={onFilters}>
          <img src={A + 'filters.svg'} alt="" width="16" height="16" /> Filters <img src={A + 'chevron.svg'} alt="" width="12" height="12" />
        </button>
      </div>

      <div className="d-main">
        {hero && match(hero) && <Hero c={hero} onOpen={onOpen} />}
        {forYou.length > 0 && (
          <section className="d-list">
            <h2>Campaigns for you &gt;</h2>
            <div className="row" key={filter + sort}>
              {forYou.map((c, i) => <Card key={c.id} c={c} i={i} onOpen={onOpen} />)}
            </div>
          </section>
        )}
        {fresh.length > 0 && (
          <section className="d-list">
            <h2>New campaigns &gt;</h2>
            <div className="row" key={filter + sort}>
              {fresh.map((c, i) => <Card key={c.id} c={c} i={i} onOpen={onOpen} />)}
            </div>
          </section>
        )}
        {forYou.length + fresh.length === 0 && <div className="d-empty"><b>No more campaigns here</b><span>New campaigns land every day.</span></div>}
      </div>
    </div>
  )
}
