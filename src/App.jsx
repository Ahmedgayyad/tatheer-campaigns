import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Discover from './Discover'
import Detail from './Detail'
import Flow from './Flow'
import { Mine, Placeholder, Wallet } from './Tabs'
import TabBar from './TabBar'
import FilterSheet from './FilterSheet'
import { useToast } from './Shared'

export default function App() {
  const [tab, setTab] = useState('discover')
  const [open, setOpen] = useState(null)
  const [flow, setFlow] = useState(false)
  const [joined, setJoined] = useState([])
  const [sheet, setSheet] = useState(false)
  const [sort, setSort] = useState('pay')
  const [toast, setToast] = useToast()

  const hasJoined = open && joined.some((j) => j.c.id === open.id)

  return (
    <div className="app">
      <AnimatePresence mode="wait">
        <motion.div key={tab} className="screen" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.22 }}>
          {tab === 'discover' && <Discover onOpen={setOpen} onFilters={() => setSheet(true)} sort={sort} />}
          {tab === 'mine' && <Mine joined={joined} onDiscover={() => setTab('discover')} />}
          {tab === 'wallet' && <Wallet joined={joined} />}
          {tab === 'home' && <Placeholder emoji="👋" title="Welcome" text="Home is coming soon. Start from Discover and try your first campaign." />}
        </motion.div>
      </AnimatePresence>

      <TabBar value={tab} onChange={setTab} />

      <AnimatePresence>
        {open && <Detail key="detail" c={open} joined={hasJoined} onClose={() => setOpen(null)} onStart={() => setFlow(true)} />}
        {open && flow && (
          <Flow
            key="flow" c={open} toast={setToast}
            onClose={() => { const went = joined.some((j) => j.c.id === open.id); setFlow(false); if (went) { setOpen(null); setTab('mine') } }}
            onDone={(c, platform, url) => setJoined((j) => [...j.filter((x) => x.c.id !== c.id), { c, platform, url }])}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {sheet && <FilterSheet key="filters" sort={sort} onSort={setSort} onClose={() => setSheet(false)} />}
      </AnimatePresence>

      <AnimatePresence>
        {toast &&<motion.div className="toast" initial={{ y: -40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -40, opacity: 0 }}>{toast}</motion.div>}
      </AnimatePresence>
    </div>
  )
}
