import { motion } from 'framer-motion'

// Tab bar — Figma 6:44 (Tab Bar, Liquid Glass Dark): 402×87, px 24 / py 16, icons 24, labels 12/12 SF Pro.
// Active tab is a pill rgba(117,82,254,.8) with px 12; tabs overlap by 8 (mr -8) like the design.
const A = import.meta.env.BASE_URL + 'assets/'
const TABS = [
  { id: 'home', label: 'Home', icon: A + 'tab-home.svg' },
  { id: 'discover', label: 'Discover', icon: A + 'tab-discover.svg' },
  { id: 'mine', label: 'Campaigns', icon: A + 'tab-campaigns.svg' },
  { id: 'wallet', label: 'Earnings', icon: A + 'tab-earnings.svg' },
]

export default function TabBar({ value, onChange }) {
  return (
    <nav className="tabbar" aria-label="Main">
      <div className="tabbar-inner">
        <div className="tabbar-bg" />
        {TABS.map(({ id, label, icon }) => {
          const on = value === id
          return (
            <button key={id} className={`tab ${on ? 'on' : ''}`} onClick={() => onChange(id)} aria-current={on ? 'page' : undefined}>
              {on && <motion.span layoutId="tabsel" className="tab-sel" transition={{ type: 'spring', stiffness: 520, damping: 38 }} />}
              <img className="tab-ico" src={icon} alt="" width="24" height="24" />
              <span className="tab-label">{label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
