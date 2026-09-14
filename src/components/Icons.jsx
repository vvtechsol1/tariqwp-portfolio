const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

export const ArrowUpRight = ({ size = 16, ...p }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...base} {...p}>
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
)

export const ArrowRight = ({ size = 16, ...p }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...base} {...p}>
    <path d="M4 12h15M13 6l6 6-6 6" />
  </svg>
)

export const ArrowUp = ({ size = 18, ...p }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...base} {...p}>
    <path d="M12 19V5M6 11l6-6 6 6" />
  </svg>
)

export const Close = ({ size = 17, ...p }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...base} {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
)

export const Star = ({ size = 15, ...p }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="m12 2 2.9 6.1 6.6.9-4.8 4.6 1.2 6.6L12 17.1 6.1 20.2l1.2-6.6L2.5 9l6.6-.9L12 2Z" />
  </svg>
)

export const Sun = (p) => (
  <svg viewBox="0 0 24 24" {...base} strokeWidth={2} {...p}>
    <circle cx="12" cy="12" r="4.2" />
    <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" />
  </svg>
)

export const Moon = (p) => (
  <svg viewBox="0 0 24 24" {...base} strokeWidth={2} {...p}>
    <path d="M20 14.5A8.2 8.2 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" />
  </svg>
)

export const Github = ({ size = 17, ...p }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M12 1.8a10.2 10.2 0 0 0-3.2 19.9c.5.1.7-.2.7-.5v-1.9c-2.8.6-3.4-1.3-3.4-1.3-.5-1.2-1.2-1.5-1.2-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.6-1.4-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.7 1a9.4 9.4 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.4 4.7-4.6 5 .4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5A10.2 10.2 0 0 0 12 1.8Z" />
  </svg>
)

export const Mail = ({ size = 17, ...p }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...base} {...p}>
    <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
    <path d="m3 7 9 6 9-6" />
  </svg>
)

export const Globe = ({ size = 16, ...p }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...base} {...p}>
    <circle cx="12" cy="12" r="9.2" />
    <path d="M3 12h18M12 2.8c2.4 2.6 3.6 5.7 3.6 9.2s-1.2 6.6-3.6 9.2c-2.4-2.6-3.6-5.7-3.6-9.2S9.6 5.4 12 2.8Z" />
  </svg>
)

export const Check = ({ size = 17, ...p }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...base} {...p}>
    <path d="M20 6 9 17l-5-5" />
  </svg>
)

/* ---- service icons: 32px line art, matching the reference's orange outline look ---- */
const svc = { ...base, strokeWidth: 1.5, width: 32, height: 32, viewBox: '0 0 32 32' }

export const IcoSaaS = (p) => (
  <svg {...svc} {...p}>
    <path d="M5 11.5 16 6l11 5.5L16 17 5 11.5Z" />
    <path d="m5 16.8 11 5.5 11-5.5M5 22.1l11 5.5 11-5.5" />
  </svg>
)

export const IcoAI = (p) => (
  <svg {...svc} {...p}>
    <path d="M11 4.5 12.4 8 16 9.4 12.4 10.8 11 14.3 9.6 10.8 6 9.4 9.6 8 11 4.5Z" />
    <path d="M22 14l1 2.6 2.6 1L23 18.6 22 21.2 21 18.6 18.4 17.6l2.6-1L22 14Z" />
    <path d="M6 22.5h7M9.5 19v7" />
  </svg>
)

export const IcoWordPress = (p) => (
  <svg {...svc} {...p}>
    <circle cx="16" cy="16" r="11" />
    <path d="M6.2 12.4h6.2M9.3 12.4 13 24l3.4-9.4M17.2 12.4h5.6M19 12.4 22.7 24l3-8.6" />
  </svg>
)

export const IcoLaravel = (p) => (
  <svg {...svc} {...p}>
    <path d="M4 9.5 10.3 6l6.3 3.5v7L10.3 20 4 16.5v-7Z" />
    <path d="m16.6 12.5 6.3-3.5L29 12.5v7L22.9 23l-6.3-3.5" />
    <path d="M10.3 13v7" />
  </svg>
)

export const IcoMobile = (p) => (
  <svg {...svc} {...p}>
    <rect x="9.5" y="3.5" width="13" height="25" rx="3" />
    <path d="M14 6.6h4M16 24.6h.01" />
  </svg>
)

export const IcoSeo = (p) => (
  <svg {...svc} {...p}>
    <circle cx="14" cy="14" r="8.5" />
    <path d="m20.2 20.2 6.3 6.3" />
    <path d="m10.5 15.5 2.5-3 2.5 2.5 2.5-3.5" />
  </svg>
)

export const IcoDashboard = (p) => (
  <svg {...svc} {...p}>
    <rect x="4" y="5" width="24" height="22" rx="3" />
    <path d="M4 11h24M10 17h5M10 21.5h9" />
  </svg>
)

export const IcoPlug = (p) => (
  <svg {...svc} {...p}>
    <path d="M12.5 4v6M19.5 4v6" />
    <path d="M9 10h14v4a7 7 0 0 1-7 7 7 7 0 0 1-7-7v-4Z" />
    <path d="M16 21v7" />
  </svg>
)

/* ---- WordPress service icons ---- */
export const IcoBug = (p) => (
  <svg {...svc} {...p}>
    <rect x="10" y="9" width="12" height="16" rx="6" />
    <path d="M12 8a4 4 0 0 1 8 0M10 13H4M22 13h6M10 19H5M22 19h5M11.5 24l-3 4M20.5 24l3 4" />
  </svg>
)

export const IcoBolt = (p) => (
  <svg {...svc} {...p}>
    <path d="M18 3 7 18h7l-2 11 11-15h-7l2-11Z" />
  </svg>
)

export const IcoShield = (p) => (
  <svg {...svc} {...p}>
    <path d="M16 3.5 26 7v8.5c0 6.4-4.2 11.4-10 13.2C10.2 26.9 6 21.9 6 15.5V7l10-3.5Z" />
    <path d="m11.5 15.5 3.2 3.2 6-6.4" />
  </svg>
)

export const IcoMigrate = (p) => (
  <svg {...svc} {...p}>
    <path d="M4 10h17M17 6l4 4-4 4" />
    <path d="M28 22H11M15 26l-4-4 4-4" />
  </svg>
)

export const IcoDesign = (p) => (
  <svg {...svc} {...p}>
    <rect x="4" y="4" width="10" height="10" rx="2" />
    <rect x="18" y="4" width="10" height="10" rx="5" />
    <rect x="4" y="18" width="10" height="10" rx="2" />
    <path d="M18 18h10v10H18z" />
  </svg>
)

export const IcoCart = (p) => (
  <svg {...svc} {...p}>
    <path d="M3 5h4l3.2 14.3a2 2 0 0 0 2 1.7h9.6a2 2 0 0 0 2-1.6L26 10H8" />
    <circle cx="13" cy="26" r="1.6" />
    <circle cx="23" cy="26" r="1.6" />
  </svg>
)

export const IcoPuzzle = (p) => (
  <svg {...svc} {...p}>
    <path d="M13 4.5a2.8 2.8 0 0 1 5.6 0V7H23a1.5 1.5 0 0 1 1.5 1.5V13h2.2a2.8 2.8 0 0 1 0 5.6H24.5V23A1.5 1.5 0 0 1 23 24.5h-4.5v2.2a2.8 2.8 0 0 1-5.6 0V24.5H8.5A1.5 1.5 0 0 1 7 23v-4.5H4.8a2.8 2.8 0 0 1 0-5.6H7V8.5A1.5 1.5 0 0 1 8.5 7H13V4.5Z" />
  </svg>
)

export const IcoCode = (p) => (
  <svg {...svc} {...p}>
    <path d="m10 10-6 6 6 6M22 10l6 6-6 6M19 6l-6 20" />
  </svg>
)

/* ---- niche build types ---- */
export const IcoUsers = (p) => (
  <svg {...svc} {...p}>
    <circle cx="12" cy="11" r="4.5" />
    <path d="M4 26c0-4.4 3.6-8 8-8s8 3.6 8 8" />
    <path d="M21 7.4a4.5 4.5 0 0 1 0 8.7M23.5 26c0-3.4-1.3-5.8-3-7.2" />
  </svg>
)

export const IcoBook = (p) => (
  <svg {...svc} {...p}>
    <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4H15v22H6.5A2.5 2.5 0 0 0 4 28.5v-22Z" />
    <path d="M28 6.5A2.5 2.5 0 0 0 25.5 4H15v22h10.5a2.5 2.5 0 0 1 2.5 2.5v-22Z" />
  </svg>
)

export const IcoCalendar = (p) => (
  <svg {...svc} {...p}>
    <rect x="4" y="6" width="24" height="22" rx="3" />
    <path d="M4 13h24M10 3v6M22 3v6" />
    <path d="m12.5 20 2.5 2.5 5-5" />
  </svg>
)

export const IcoHome = (p) => (
  <svg {...svc} {...p}>
    <path d="M4 14 16 4l12 10" />
    <path d="M7 12.5V27h18V12.5" />
    <path d="M13 27v-7h6v7" />
  </svg>
)

export const IcoCard = (p) => (
  <svg {...svc} {...p}>
    <rect x="3" y="7" width="26" height="18" rx="3" />
    <path d="M3 13h26M8 20h5" />
  </svg>
)

export const IcoWrench = (p) => (
  <svg {...svc} {...p}>
    <path d="M22.5 4a7.5 7.5 0 0 0-7 10.2L4.6 25.2a2.5 2.5 0 0 0 3.5 3.5L19.3 17.8A7.5 7.5 0 0 0 28.6 8l-4.2 4.2-4.2-1-1-4.2L23.4 3a7.6 7.6 0 0 0-.9-.1Z" />
  </svg>
)
