import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { PLATFORMS, fmt } from './data'
import { Icon } from './Icons'
import { CountUp, Riyal } from './Shared'

// Join flow — full-screen, animated steps:
// 1 choose platform → 2 connect your account → 3 add your link to your bio → 4 submit the post link → check → approved
const A = import.meta.env.BASE_URL + 'assets/'
const HOSTS = { tiktok: 'snapchat.com', instagram: 'instagram.com', snapchat: 'snapchat.com', x: 'x.com', youtube: 'youtu' }
const DEMO = { tiktok: 'https://www.snapchat.com/spotlight/W7_abc', instagram: 'https://www.instagram.com/reel/Cx8aB/', snapchat: 'https://www.snapchat.com/spotlight/W7_abc', x: 'https://x.com/you/status/178', youtube: 'https://youtu.be/dQw4w9' }
const STEPS = 4
const EASE = [0.22, 1, 0.36, 1]
const HANDLES = { tiktok: '@sara.tatheer', snapchat: '@sara.tatheer', instagram: '@a_k_g_206', youtube: '@sara.tv', x: '@sara_t' }
const TITLES = ['Choose a platform', 'Connect your account', 'Add your link to your bio', 'Submit your post']

const PIcon = ({ id, size = 20 }) => (
  id === 'youtube'
    ? <img src={A + 'youtube.svg'} alt="" style={{ width: size, height: size * 0.64 }} />
    : <img src={A + id + '.svg'} alt="" style={{ width: size, height: size }} />
)

async function copyText(text) {
  try { await navigator.clipboard.writeText(text) } catch {
    const t = document.createElement('textarea'); t.value = text; document.body.appendChild(t); t.select(); document.execCommand('copy'); t.remove()
  }
}

function CopyRow({ label, value, onCopied }) {
  const [done, setDone] = useState(false)
  const go = async () => { await copyText(value); setDone(true); onCopied?.(); setTimeout(() => setDone(false), 1800) }
  return (
    <div className="fl-copy">
      <span className="lbl">{label}</span>
      <div className="row">
        <code>{value}</code>
        <button className={done ? 'done' : ''} onClick={go}>{done ? <><Icon.check size={14} /> Copied</> : <><Icon.copy size={14} /> Copy</>}</button>
      </div>
    </div>
  )
}

function Confetti() {
  const bits = useMemo(() => Array.from({ length: 28 }, (_, i) => ({
    x: (Math.random() - 0.5) * 340, y: 140 + Math.random() * 260, r: Math.random() * 540 - 270,
    c: ['#7552fe', '#c9b8ff', '#10b981', '#f97316', '#ec4899', '#fff'][i % 6], d: Math.random() * 0.25,
  })), [])
  return bits.map((b, i) => (
    <motion.i key={i} className="confetti" style={{ background: b.c }}
      initial={{ x: 0, y: 40, opacity: 1, rotate: 0, scale: 1 }}
      animate={{ x: b.x, y: [40, -60 - Math.random() * 60, b.y], opacity: [1, 1, 0], rotate: b.r }}
      transition={{ duration: 1.7, delay: b.d, ease: 'easeOut' }} />
  ))
}

// animated check mark: the stroke draws itself
const Tick = ({ size = 14, sw = 3 }) => (
  <svg className="tick" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
)

const pane = (dir) => ({
  initial: { opacity: 0, x: 36 * dir },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -36 * dir },
  transition: { duration: 0.32, ease: EASE },
})

export default function Flow({ c, onClose, onDone, toast }) {
  const [step, setStep] = useState(0)
  const [dir, setDir] = useState(1)
  const [platform, setPlatform] = useState(c.platforms[0])
  const [acct, setAcct] = useState('idle') // idle → connecting → connected → (connect another) picking → connecting
  const [accounts, setAccounts] = useState([])
  const [urls, setUrls] = useState({}) // one post link per linked account
  const [errors, setErrors] = useState({})
  const [scan, setScan] = useState(-1)

  const name = platform ? PLATFORMS[platform].name : ''
  const link = `tatheer.app/r/${c.id}-xyz`
  const okUrl = (id, u = '') => !!u.trim() && u.includes(HOSTS[id]) && /^https?:\/\/\S+\.\S+/.test(u.trim())
  const done = step === 4
  const linked = accounts.map((a) => a.platform)
  const filled = linked.filter((id) => (urls[id] || '').trim())
  const validIds = filled.filter((id) => okUrl(id, urls[id]))
  const allValid = filled.length > 0 && validIds.length === filled.length
  const scanning = scan >= 0

  const go = (n) => { setDir(n > step ? 1 : -1); setStep(n) }
  const back = () => {
    if (step === 1 && acct === 'picking') { setAcct('connected'); return }
    return step === 0 || done ? onClose() : go(step - 1)
  }
  const submit = () => {
    const bad = {}
    filled.forEach((id) => { if (!okUrl(id, urls[id])) bad[id] = `This doesn’t look like a ${PLATFORMS[id].name} link. Open your video in ${PLATFORMS[id].name}, tap Share, then Copy link.` })
    setErrors(bad)
    if (Object.keys(bad).length || !filled.length) return
    setScan(0)
  }

  useEffect(() => {
    if (acct !== 'connecting') return
    const t = setTimeout(() => {
      setAccounts((a) => (a.some((x) => x.platform === platform) ? a : [...a, { platform, handle: HANDLES[platform] || '@sara.tatheer' }]))
      setAcct('connected')
    }, 2200)
    return () => clearTimeout(t)
  }, [acct])

  useEffect(() => {
    if (scan < 0) return
    if (scan >= 3) { const t = setTimeout(() => { onDone(c, validIds[0], urls[validIds[0]]); setDir(1); setStep(4); setScan(-1) }, 900); return () => clearTimeout(t) }
    const t = setTimeout(() => setScan(scan + 1), 1100)
    return () => clearTimeout(t)
  }, [scan])

  const vp = validIds[0] || platform
  const checks = [
    { t: 'It was posted from the account you linked' },
    { t: 'You haven’t sent this video to this campaign before' },
    { t: 'It went live in the last 30 minutes' },
  ]

  // primary action per step
  let cta = null
  if (step === 0) cta = <button className="main" disabled={!platform} onClick={() => { setAcct(linked.includes(platform) ? 'connected' : 'idle'); go(1) }}>Continue</button>
  if (step === 1 && acct === 'idle') cta = <button className="main" onClick={() => setAcct('connecting')}>Connect {name}</button>
  if (step === 1 && acct === 'connected') cta = (
    <div className="two">
      <button className="ghost" onClick={() => setAcct('picking')}>Connect another</button>
      <button className="main" onClick={() => go(2)}>Done</button>
    </div>
  )
  if (step === 2) cta = <button className="main" onClick={() => go(3)}>I’ve posted my video</button>
  if (step === 3 && scanning) cta = (
    <div className="two">
      <button className="ghost" disabled>Cancel</button>
      <button className="main" disabled>Checking…</button>
    </div>
  )
  if (step === 3 && !scanning) cta = (
    <div className="two">
      <button className="ghost" onClick={onClose}>Cancel</button>
      <button className="main" disabled={!filled.length} onClick={submit}>Submit</button>
    </div>
  )
  if (done) cta = <button className="main" onClick={onClose}>See my campaigns</button>

  return (
    <motion.div className="fl" initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', stiffness: 360, damping: 40 }}>
      {!done && (
        <div className="fl-top">
          <button className="rd" onClick={back} aria-label={step === 0 ? 'Close' : 'Back'}>{step === 0 ? <Icon.close size={16} /> : <Icon.back size={16} style={{ rotate: '180deg' }} />}</button>
          <div className="bar"><motion.i animate={{ width: `${((step + 1) / STEPS) * 100}%` }} transition={{ duration: 0.45, ease: EASE }} /></div>
          <span className="cnt">{step + 1}/{STEPS}</span>
        </div>
      )}

      <div className="fl-body">
        <AnimatePresence mode="wait" initial={false}>
          {step === 0 && (
            <motion.div key="s0" className="fl-pane" {...pane(dir)}>
              <h3>{TITLES[0]}</h3>
              <p className="sub">Where will you post your video?</p>
              <div className="list">
                {c.platforms.map((id, i) => (
                  <motion.button key={id} className={`opt ${platform === id ? 'on' : ''}`} onClick={() => setPlatform(id)}
                    initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06 * i + 0.1, duration: 0.35, ease: EASE }}>
                    <span className="ic"><PIcon id={id} size={20} /></span>
                    <b>{PLATFORMS[id].name}</b>
                    <span className="tk">{platform === id && <Icon.check size={14} />}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div key="s1" className="fl-pane" {...pane(dir)}>
              <h3>{acct === 'connected' ? 'Account connected' : acct === 'picking' ? 'Connect a platform' : TITLES[1]}</h3>
              <p className="sub">
                {(acct === 'idle' || acct === 'connecting') && `Link your ${name} account so we can confirm the post is yours.`}
                {acct === 'picking' && 'Choose a platform to link a new account.'}
                {acct === 'connected' && 'Connected. You can link another platform or finish here.'}
              </p>

              {acct === 'picking' && (
                <div className="list">
                  {c.platforms.map((id, i) => (
                    <motion.button key={id} className="opt" onClick={() => { setPlatform(id); setAcct('connecting') }}
                      initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06 * i + 0.05, duration: 0.35, ease: EASE }}>
                      <span className="ic"><PIcon id={id} size={20} /></span>
                      <b>{PLATFORMS[id].name}</b>
                      <span className="tk">{accounts.some((a) => a.platform === id) && <Icon.check size={14} />}</span>
                    </motion.button>
                  ))}
                </div>
              )}
              {acct === 'idle' && (
                <div className="fl-hero"><span className="big"><PIcon id={platform} size={34} /></span><b>{name}</b><small>Read-only access to your public profile</small></div>
              )}
              {acct === 'connecting' && (
                <div className="fl-hero">
                  <div className="ring"><div className="core"><PIcon id={platform} size={26} /></div></div>
                  <b>Opening {name}…</b>
                  <button className="again" disabled><i className="sp" /> Connecting…</button>
                </div>
              )}
              {acct === 'connected' && accounts.map((a, i) => (
                <motion.div key={a.platform} className="fl-acct" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.05 * i, duration: 0.35, ease: EASE }}>
                  <span className="av"><img src={A + "d/avatar-sara.png"} alt="" /><i className="bd">{a.platform === 'tiktok' || a.platform === 'snapchat' ? <img src={A + "d/snap-badge.svg"} alt="" /> : <PIcon id={a.platform} size={10} />}</i></span>
                  <div><b>{a.handle}</b><small>{PLATFORMS[a.platform].name} · 149 followers · 70 reach in the last 28 days</small></div>
                  <motion.span className="ok" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring', stiffness: 400, damping: 16 }}><Icon.check size={13} /></motion.span>
                </motion.div>
              ))}
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="s2" className="fl-pane" {...pane(dir)}>
              <h3>{TITLES[2]}</h3>
              <p className="sub">This link tracks your performance.</p>
              <CopyRow label="Your unique link" value={link} onCopied={() => toast('Link copied')} />
              <div className="fl-accts">
                {linked.map((id, i) => (
                  <motion.div key={id} className="fl-where" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i + 0.12, duration: 0.35, ease: EASE }}>
                    <span className="pi"><PIcon id={id} size={34} /></span>
                    <div><b>{PLATFORMS[id].name}</b><small>Paste it in your {id === 'youtube' ? 'video description' : 'bio'}, then publish your video</small></div>
                    <button onClick={() => toast(`Opening ${PLATFORMS[id].name}`)} aria-label={`Open ${PLATFORMS[id].name}`}><Icon.external size={14} /></button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="s3" className="fl-pane" {...pane(dir)}>
              <h3>{TITLES[3]}</h3>
              <p className="sub">Paste the link of your published video. We use it as proof and start counting your clicks.</p>
              <div className="fl-mini">
                <img src={c.img} alt="" />
                <div><b>{c.title}</b><span className="fl-pill"><img src={A + 'riyal.svg'} alt="SAR" width="12" height="13" /><b>{fmt(c.pay)}</b><small>/click</small></span></div>
              </div>
              <div className="fl-sep" />
              {linked.map((id) => (
                <div key={id} className="fl-field">
                  <div className="fl-lbl"><b>{PLATFORMS[id].name} post link</b><span className="pi"><PIcon id={id} size={20} /></span></div>
                  <div className={`fl-in ${errors[id] ? 'bad' : ''}`}>
                    <input disabled={scanning} value={urls[id] || ''} onChange={(e) => { setUrls({ ...urls, [id]: e.target.value }); setErrors({ ...errors, [id]: '' }) }} inputMode="url" />
                    <button className="demo" disabled={scanning} onClick={() => { setUrls({ ...urls, [id]: DEMO[id] }); setErrors({ ...errors, [id]: '' }) }}>Demo paste</button>
                  </div>
                  {errors[id] && <span className="fl-err">{errors[id]}</span>}
                </div>
              ))}
              <ul className="fl-chk">
                {checks.map((k, i) => <li key={k.t} className={scan > i ? 'ok' : scan === i ? 'now' : ''}><span className="ck">{scan > i ? <Tick size={12} sw={3.4} /> : scan === i ? <i className="sp" /> : null}</span>{k.t}</li>)}
              </ul>
            </motion.div>
          )}

          {done && (
            <motion.div key="done" className="fl-pane center win" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: EASE }}>
              <motion.img className="winicon" src={A + "d/user-check.svg"} alt="" width="80" height="80" initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 260, damping: 16 }} />
              <h3>You’re in!</h3>
              <p className="sub">Your {validIds.map((i) => PLATFORMS[i].name).join(' and ')} video{validIds.length > 1 ? 's are' : ' is'} approved. From now on you earn money every time someone taps your link.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {cta && <div className="fl-actions">{cta}</div>}
    </motion.div>
  )
}
