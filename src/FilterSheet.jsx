import { motion } from 'framer-motion'
import { SORTS } from './data'
import { Icon } from './Icons'

// Bottom sheet opened by the "Filters" button in the Discover filter row
export default function FilterSheet({ sort, onSort, onClose }) {
  return (
    <>
      <motion.div className="scrim" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
      <motion.div className="fsheet" initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', stiffness: 420, damping: 42 }}>
        <span className="grab" />
        <h3>Sort campaigns</h3>
        <div className="opts">
          {SORTS.map((s) => (
            <button key={s.id} className={sort === s.id ? 'on' : ''} onClick={() => { onSort(s.id); onClose() }}>
              <span>{s.label}</span>
              <i>{sort === s.id && <Icon.check size={14} />}</i>
            </button>
          ))}
        </div>
      </motion.div>
    </>
  )
}
