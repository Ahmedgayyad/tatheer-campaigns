import { useEffect, useState } from 'react'

const W = 402
const H = 874
const BEZEL = 12

// على الشاشات الكبيرة: موكب iPhone 17 (402×874) يتصغّر ليناسب الشاشة. على الموبايل: ملء الشاشة بدون إطار.
function useFrameMode() {
  const calc = () => ({
    framed: window.innerWidth >= 520 && window.matchMedia("(hover: hover) and (pointer: fine)").matches,
    scale: Math.min(1, (window.innerHeight - 24) / (H + BEZEL * 2), (window.innerWidth - 24) / (W + BEZEL * 2)),
  })
  const [s, setS] = useState(calc)
  useEffect(() => {
    const on = () => setS(calc())
    window.addEventListener('resize', on)
    return () => window.removeEventListener('resize', on)
  }, [])
  return s
}

function StatusBar() {
  return (
    <div className="statusbar" aria-hidden="true">
      <span className="sb-time">9:41</span>
      <div className="island" />
      <div className="sb-icons">
        <span className="sb-signal"><i /><i /><i /><i /></span>
        <span className="sb-wifi" />
        <span className="sb-batt"><i /></span>
      </div>
    </div>
  )
}

export default function PhoneFrame({ children }) {
  const { framed, scale } = useFrameMode()
  if (!framed) return <div className="fullscreen">{children}</div>
  return (
    <div className="stage">
      <div className="device-box" style={{ width: (W + BEZEL * 2) * scale, height: (H + BEZEL * 2) * scale }}>
        <div className="device" style={{ width: W + BEZEL * 2, height: H + BEZEL * 2, transform: `scale(${scale})` }}>
          <div className="screenwrap" style={{ width: W, height: H }}>
            {children}
            <StatusBar />
            <div className="homebar" />
          </div>
        </div>
      </div>
    </div>
  )
}
