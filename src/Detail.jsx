import { motion } from 'framer-motion'
import { fmt } from './data'

// Campaign details — implemented from Figma node 61:1236 (Campaign deatils).
const A = import.meta.env.BASE_URL + 'assets/'
const D = import.meta.env.BASE_URL + 'assets/d/'
const NAMES = { tiktok: 'Snapchat', instagram: 'Instagram', youtube: 'YouTube' }

const Plat = ({ id }) => (
  <span className="dd-plat">
    {id === 'youtube'
      ? <img src={A + 'youtube.svg'} alt="" style={{ width: 14, height: 9 }} />
      : <img src={A + id + '.svg'} alt="" style={{ width: 14, height: 14 }} />}
  </span>
)

const Riyal = () => <img src={D + 'riyal.svg'} alt="SAR" width="11" height="12" />

const Head = ({ icon, size = 14, cls = "", children }) => (
  <div className={`dd-head ${cls}`}><img src={D + icon} alt="" width={size} height={size} />{children}</div>
)

export default function Detail({ c, joined, onClose, onStart }) {
  const per1k = c.pay * 1000
  const brief = c.brief || [c.pitch.replace(/\.$/, ''), 'Keep your link on screen for two seconds', 'Reposting is allowed']

  return (
    <motion.div
      className="sheet dd"
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', stiffness: 380, damping: 40 }}
    >
      <div className="dd-bar">
        <button className="back" onClick={onClose}><img src={D + 'back.svg'} alt="" width="14" height="14" />Back</button>
        <button className="link" aria-label="Open link"><img src={D + 'link.svg'} alt="" width="16" height="16" /></button>
      </div>

      <div className="dd-scroll">
      <div className="dd-hero">
        <img className="cover" src={c.heroImg || c.img} alt="" />
        <div className="shade" />
        <div className="info">
          <span className="brand">
            <span className="d-logo" style={{ width: 22, height: 22 }}><img className="bg" src={A + 'logo-bg.webp'} alt="" /><img className="fg" src={c.logo} alt="" /></span>
            {c.brand}
          </span>
          <h1>{c.title}</h1>
        </div>
        <div className="dd-chips"><span>{c.category}</span><span>General</span></div>
      </div>

      <div className="dd-plats">
        {c.platforms.map((p) => (
          <section key={p} className="dd-card pcard">
            <div className="ph"><Plat id={p} />{NAMES[p]}</div>
            <div className="cols">
              <div><small>Per 1K clicks</small><b><Riyal />{fmt(per1k)}</b></div>
              <div><small>Min payout</small><b><Riyal />20</b></div>
              <div><small>Max payout</small><b><Riyal />999</b></div>
            </div>
          </section>
        ))}
      </div>

      <div className="dd-stack">
        <section className="dd-card">
          <Head icon="brief.svg">Brief</Head>
          <ul className="bullets">
            {brief.map((b) => <li key={b}><img src={D + 'bullet.svg'} alt="" />{b}</li>)}
          </ul>
        </section>

        <section className="dd-card">
          <Head icon="requirements.svg" size={16} cls="sm">Requirements</Head>
          <ul className="reqs">
            {c.dos.map((d) => <li key={d}><i className="y"><img src={D + 'check.svg'} alt="" width="12" height="12" /></i>{d}</li>)}
            {c.donts.map((d) => <li key={d}><i className="n"><img src={D + 'cross.svg'} alt="" width="11" height="11" /></i>{d}</li>)}
          </ul>
        </section>

        <section className="dd-card">
          <Head icon="reference.svg">Reference materials</Head>
          <a className="ref" href="#" onClick={(e) => e.preventDefault()}>
            <img src={D + 'drive.svg'} alt="" width="14" height="14" />
            <b>Product images &amp; logo</b>
            <img src={D + 'external.svg'} alt="" width="14" height="14" />
          </a>
        </section>
      </div>

      </div>

      <div className="dd-cta">
        <button onClick={onStart}>{joined ? 'Continue' : 'Join Campaign'}</button>
      </div>
    </motion.div>
  )
}
