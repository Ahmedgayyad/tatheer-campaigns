const P = { fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }
const S = ({ size = 20, children, ...r }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...r}>{children}</svg>
)

export const Icon = {
  home: (p) => <S {...p}><path {...P} d="M4 11l8-7 8 7v8a1 1 0 01-1 1h-4v-6H9v6H5a1 1 0 01-1-1z" /></S>,
  compass: (p) => <S {...p}><circle {...P} cx="12" cy="12" r="9" /><path {...P} d="M15.5 8.5l-2 5-5 2 2-5z" /></S>,
  film: (p) => <S {...p}><rect {...P} x="3" y="4" width="18" height="16" rx="3" /><path {...P} d="M10 9.5v5l4-2.5z" /></S>,
  wallet: (p) => <S {...p}><path {...P} d="M4 7a2 2 0 012-2h11v4" /><rect {...P} x="3" y="7" width="18" height="13" rx="3" /><circle fill="currentColor" cx="16.5" cy="13.5" r="1.2" /></S>,
  search: (p) => <S {...p}><circle {...P} cx="11" cy="11" r="6.5" /><path {...P} d="M16 16l4 4" /></S>,
  filter: (p) => <S {...p}><path {...P} d="M4 7h16M7 12h10M10 17h4" /></S>,
  back: (p) => <S {...p}><path {...P} d="M9 6l6 6-6 6" /></S>,
  close: (p) => <S {...p}><path {...P} d="M6 6l12 12M18 6L6 18" /></S>,
  check: (p) => <S {...p}><path {...P} strokeWidth="2.6" d="M5 12.5l4.5 4.5L19 7.5" /></S>,
  copy: (p) => <S {...p}><rect {...P} x="9" y="9" width="11" height="11" rx="3" /><path {...P} d="M15 9V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7a2 2 0 002 2h3" /></S>,
  users: (p) => <S {...p}><circle {...P} cx="9" cy="8" r="3.2" /><path {...P} d="M3 19c.6-3 3-4.6 6-4.6s5.4 1.6 6 4.6" /><path {...P} d="M16 5.2a3 3 0 010 5.6M18 14.6c1.700.6 2.800 2 3 4.400" /></S>,
  clock: (p) => <S {...p}><circle {...P} cx="12" cy="12" r="9" /><path {...P} d="M12 7v5l3 2" /></S>,
  bolt: (p) => <S {...p}><path fill="currentColor" d="M13 2L4 14h6l-1 8 9-12h-6z" /></S>,
  badge: (p) => (
    <S {...p}>
      <path fill="currentColor" d="M12 2l2.4 1.9 3-.2 1 2.8 2.6 1.6-.9 2.900.9 2.900-2.600 1.600-1 2.800-3-.2L12 22l-2.400-1.900-3 .2-1-2.800L3 16l.9-2.900L3 10.200l2.600-1.600 1-2.800 3 .2z" />
      <path d="M8.500 12l2.500 2.500 4.500-5" stroke="#fff" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </S>
  ),
  link: (p) => <S {...p}><path {...P} d="M10 14a4 4 0 005.700 0l3-3a4 4 0 00-5.700-5.700l-1 1" /><path {...P} d="M14 10a4 4 0 00-5.700 0l-3 3A4 4 0 0011 18.700l1-1" /></S>,
  sparkle: (p) => <S {...p}><path fill="currentColor" d="M12 2l1.800 5.200L19 9l-5.200 1.800L12 16l-1.800-5.200L5 9l5.200-1.800zM19 15l.9 2.100L22 18l-2.100.9L19 21l-.9-2.100L16 18l2.100-.9z" /></S>,
  arrowUp: (p) => <S {...p}><path {...P} d="M7 17L17 7M9 7h8v8" /></S>,
  chat: (p) => <S {...p}><path {...P} d="M5 5h14a2 2 0 012 2v8a2 2 0 01-2 2h-6l-4 3v-3H5a2 2 0 01-2-2V7a2 2 0 012-2z" /></S>,
  pin: (p) => <S {...p}><path {...P} d="M12 21s7-6.100 7-11.500a7 7 0 10-14 0C5 14.900 12 21 12 21z" /><circle {...P} cx="12" cy="9.500" r="2.500" /></S>,
  lines: (p) => <S {...p}><path {...P} d="M5 8h14M5 12h9M5 16h5" /></S>,
  grid: (p) => <S {...p}><rect fill="currentColor" x="3" y="3" width="7" height="7" rx="2" /><rect fill="currentColor" x="14" y="3" width="7" height="7" rx="2" /><rect fill="currentColor" x="3" y="14" width="7" height="7" rx="2" /><rect fill="currentColor" x="14" y="14" width="7" height="7" rx="2" /></S>,
  chev: (p) => <S {...p}><path {...P} strokeWidth="2.4" d="M6 9l6 6 6-6" /></S>,
  chart: (p) => <S {...p}><path {...P} d="M5 20V10M12 20V4M19 20v-7" /></S>,
  image: (p) => <S {...p}><path {...P} d="M4 20l5-9 4 6 3-4 4 7z" /><circle cx="8" cy="6" r="2" fill="currentColor" /></S>,
  note: (p) => <S {...p}><path {...P} d="M5 4h14v11l-5 5H5zM14 20v-5h5" /></S>,
  external: (p) => <S {...p}><path {...P} d="M14 4h6v6M20 4l-9 9M18 14v4a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2h4" /></S>,
}

export const Platform = {
  tiktok: (p) => <S {...p}><path fill="currentColor" d="M16.600 3c.3 2.300 1.700 3.800 4 4v3.100c-1.400 0-2.800-.4-4-1.200v6.100a5.800 5.800 0 11-5-5.800v3.200a2.700 2.700 0 102 2.600V3z" /></S>,
  instagram: (p) => <S {...p}><rect {...P} x="3.500" y="3.500" width="17" height="17" rx="5" /><circle {...P} cx="12" cy="12" r="4" /><circle fill="currentColor" cx="17" cy="7" r="1.100" /></S>,
  snapchat: (p) => <S {...p}><path fill="currentColor" d="M12 2.500c2.800 0 4.700 2 4.700 4.800v1.800c.5.300 1.200.2 1.700.5.4.3-.2.800-.8 1-.5.200-.9.300-.8.800.6 1.600 2 2.300 3 2.600.3.100.3.400 0 .7-.6.500-1.500.5-1.900.8-.3.300-.1 1-.6 1.200-.7.200-1.500-.2-2.300.3-1 .6-1.700 1.700-3 1.700s-2-1.100-3-1.700c-.8-.5-1.600-.1-2.300-.3-.5-.2-.3-.9-.6-1.200-.4-.3-1.300-.3-1.900-.8-.3-.3-.3-.6 0-.7 1-.3 2.400-1 3-2.600.1-.5-.3-.6-.8-.8-.6-.2-1.200-.7-.8-1 .5-.3 1.200-.2 1.700-.5V7.300C7.300 4.500 9.200 2.500 12 2.500z" /></S>,
  x: (p) => <S {...p}><path {...P} strokeWidth="2.200" d="M5 4.500l14 15M19 4.500l-14 15" /></S>,
  youtube: (p) => <S {...p}><rect fill="currentColor" x="2.500" y="5.500" width="19" height="13" rx="4" /><path fill="#fff" d="M10.200 9.500v5l4.400-2.500z" /></S>,
}
