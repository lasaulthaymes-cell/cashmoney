import { useState, useEffect, useContext, createContext } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// CASH MONEY v3.0 — Architecture Scalable + Dark Mode + Nouvelles Fonctionnalités
// ══════════════════════════════════════════════════════════════════════════════

// ── THEME CONTEXT (Dark/Light Mode) ──────────────────────────────────────────
const ThemeContext = createContext(null);
const useTheme = () => useContext(ThemeContext);

// ── APP CONTEXT (Global State) ────────────────────────────────────────────────
const AppContext = createContext(null);
const useApp = () => useContext(AppContext);

// ── THEME DEFINITIONS ─────────────────────────────────────────────────────────
const THEMES = {
  light: {
    name: "light",
    bg:        "#F3F7EE",
    surface:   "#FFFFFF",
    surface2:  "#F7FAF2",
    border:    "#D8EBC0",
    border2:   "#E8F5D0",
    text:      "#1A2E0A",
    text2:     "#4A5E38",
    muted:     "#8FAD72",
    accent:    "#6DC21E",
    accentDk:  "#3d7a00",
    green1:    "#eef8dc",
    navBg:     "#FFFFFF",
    cardGrad:  "linear-gradient(135deg,#0d3300,#3d7a00 60%,#6DC21E)",
    splashBg:  "linear-gradient(160deg,#0d3300,#2d6b00 50%,#6DC21E)",
    danger:    "#e53e3e",
    warning:   "#F5A623",
    overlay:   "rgba(0,0,0,0.5)",
    shadow:    "0 4px 20px rgba(0,0,0,.08)",
    inputBg:   "#F7FAF2",
    pillBg:    "#F3F7EE",
    toastBg:   "#0D1B2A",
    toastText: "#FFFFFF",
    logoDark:  true,
  },
  dark: {
    name: "dark",
    bg:        "#0A0F07",
    surface:   "#131A0D",
    surface2:  "#1C2614",
    border:    "#2A3D1A",
    border2:   "#344D22",
    text:      "#E8F5D0",
    text2:     "#A8C878",
    muted:     "#5A7A3A",
    accent:    "#7FD926",
    accentDk:  "#5DAB08",
    green1:    "#162110",
    navBg:     "#131A0D",
    cardGrad:  "linear-gradient(135deg,#050E02,#162E06 60%,#2D5E0A)",
    splashBg:  "linear-gradient(160deg,#050E02,#0E2205 50%,#1C4408)",
    danger:    "#FF6B6B",
    warning:   "#FFB84A",
    overlay:   "rgba(0,0,0,0.75)",
    shadow:    "0 4px 20px rgba(0,0,0,.4)",
    inputBg:   "#1C2614",
    pillBg:    "#0A0F07",
    toastBg:   "#7FD926",
    toastText: "#050E02",
    logoDark:  false,
  },
};

// ── DATA LAYER ────────────────────────────────────────────────────────────────
const OP_URI = {
  MTN:    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjAgMTIwIj48cmVjdCB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgcng9IjIwIiBmaWxsPSIjRkZDQjAwIi8+PHRleHQgeD0iNjAiIHk9IjcyIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjQyIiBmb250LXdlaWdodD0iOTAwIiBmb250LWZhbWlseT0iQXJpYWwgQmxhY2ssQXJpYWwsc2Fucy1zZXJpZiIgZmlsbD0iIzAwMDAwMCIgbGV0dGVyLXNwYWNpbmc9Ii0xIj5NVE48L3RleHQ+PHJlY3QgeD0iMTgiIHk9IjgyIiB3aWR0aD0iODQiIGhlaWdodD0iNyIgcng9IjMuNSIgZmlsbD0iI0NDMDAwMCIvPjwvc3ZnPg==",
  Airtel: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjAgMTIwIj48cmVjdCB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgcng9IjIwIiBmaWxsPSIjRkZGRkZGIi8+PHJlY3QgeD0iMSIgeT0iMSIgd2lkdGg9IjExOCIgaGVpZ2h0PSIxMTgiIHJ4PSIxOSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZTBlMGUwIiBzdHJva2Utd2lkdGg9IjIiLz48dGV4dCB4PSI2MCIgeT0iNTYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iNjAiIGZvbnQtd2VpZ2h0PSI5MDAiIGZvbnQtZmFtaWx5PSJBcmlhbCBCbGFjayxBcmlhbCxzYW5zLXNlcmlmIiBmaWxsPSIjRTQwMDAwIj5hPC90ZXh0Pjx0ZXh0IHg9IjYwIiB5PSI5MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIyMCIgZm9udC13ZWlnaHQ9IjcwMCIgZm9udC1mYW1pbHk9IkFyaWFsLHNhbnMtc2VyaWYiIGZpbGw9IiNFNDAwMDAiIGxldHRlci1zcGFjaW5nPSIxIj5haXJ0ZWw8L3RleHQ+PC9zdmc+",
  Orange: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjAgMTIwIj48cmVjdCB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgcng9IjIwIiBmaWxsPSIjRkY2NjAwIi8+PHJlY3QgeD0iMTAiIHk9IjM2IiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjQ4IiByeD0iNCIgZmlsbD0iI0ZGRkZGRiIvPjx0ZXh0IHg9IjYwIiB5PSI2OCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIyMSIgZm9udC13ZWlnaHQ9IjcwMCIgZm9udC1mYW1pbHk9IkFyaWFsLEhlbHZldGljYSxzYW5zLXNlcmlmIiBmaWxsPSIjRkY2NjAwIiBsZXR0ZXItc3BhY2luZz0iMC41Ij5vcmFuZ2U8L3RleHQ+PC9zdmc+",
  Wave:   "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjAgMTIwIj48cmVjdCB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgcng9IjIwIiBmaWxsPSIjMUE3M0U4Ii8+PHRleHQgeD0iNjAiIHk9IjY2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjU0IiBmb250LXdlaWdodD0iOTAwIiBmb250LWZhbWlseT0iQXJpYWwgQmxhY2ssQXJpYWwsc2Fucy1zZXJpZiIgZmlsbD0iI0ZGRkZGRiI+VzwvdGV4dD48cGF0aCBkPSJNMTggODYgUTMzIDc2IDQ4IDg2IFE2MyA5NiA3OCA4NiBROTMgNzYgMTA1IDgyIiBzdHJva2U9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iNSIgZmlsbD0ibm9uZSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBvcGFjaXR5PSIwLjciLz48dGV4dCB4PSI2MCIgeT0iMTA5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE0IiBmb250LXdlaWdodD0iNzAwIiBmb250LWZhbWlseT0iQXJpYWwsc2Fucy1zZXJpZiIgZmlsbD0iI0ZGRkZGRiIgbGV0dGVyLXNwYWNpbmc9IjMiPldBVkU8L3RleHQ+PC9zdmc+",
};

const PAYS = [
  {code:"CM", nom:"Cameroun",          flag:"\u{1F1E8}\u{1F1F2}", devise:"XAF", taux:655,  ops:["MTN","Orange"]},
  {code:"CG", nom:"Congo Brazzaville", flag:"\u{1F1E8}\u{1F1EC}", devise:"XAF", taux:655,  ops:["MTN","Airtel","Orange","Wave"]},
  {code:"CD", nom:"RD Congo",          flag:"\u{1F1E8}\u{1F1E9}", devise:"CDF", taux:2800, ops:["Airtel","MTN","Orange"]},
  {code:"GA", nom:"Gabon",             flag:"\u{1F1EC}\u{1F1E6}", devise:"XAF", taux:655,  ops:["Airtel","MTN"]},
  {code:"SN", nom:"Sénégal",           flag:"\u{1F1F8}\u{1F1F3}", devise:"XOF", taux:655,  ops:["Orange","Wave","MTN"]},
  {code:"ML", nom:"Mali",              flag:"\u{1F1F2}\u{1F1F1}", devise:"XOF", taux:655,  ops:["Orange","Wave","Airtel"]},
  {code:"BF", nom:"Burkina Faso",      flag:"\u{1F1E7}\u{1F1EB}", devise:"XOF", taux:655,  ops:["Airtel","Orange","Wave"]},
];

const PAYS_AUTH = [
  {code:"CM", nom:"Cameroun",          flag:"\u{1F1E8}\u{1F1F2}", ind:"+237"},
  {code:"CG", nom:"Congo Brazzaville", flag:"\u{1F1E8}\u{1F1EC}", ind:"+242"},
  {code:"CD", nom:"RD Congo",          flag:"\u{1F1E8}\u{1F1E9}", ind:"+243"},
  {code:"GA", nom:"Gabon",             flag:"\u{1F1EC}\u{1F1E6}", ind:"+241"},
  {code:"SN", nom:"Sénégal",           flag:"\u{1F1F8}\u{1F1F3}", ind:"+221"},
  {code:"ML", nom:"Mali",              flag:"\u{1F1F2}\u{1F1F1}", ind:"+223"},
  {code:"BF", nom:"Burkina Faso",      flag:"\u{1F1E7}\u{1F1EB}", ind:"+226"},
];

const ALL_OPS = ["MTN","Airtel","Orange","Wave"];

const CONTACTS_INIT = [
  {id:1, nom:"Aminata Diallo",   tel:"+221 77 123 45 67", pays:"SN", op:"Wave",   favori:true},
  {id:2, nom:"Hervé Mbemba",     tel:"+242 06 789 01 23", pays:"CG", op:"Airtel", favori:false},
  {id:3, nom:"Grace Lukeba",     tel:"+243 81 234 56 78", pays:"CD", op:"Orange", favori:true},
  {id:4, nom:"Fatoumata Touré",  tel:"+223 65 345 67 89", pays:"ML", op:"Wave",   favori:false},
  {id:5, nom:"Mariam Ouédraogo", tel:"+226 70 456 78 90", pays:"BF", op:"Orange", favori:false},
  {id:6, nom:"Kofi Mensah",      tel:"+242 05 111 22 33", pays:"CG", op:"MTN",    favori:false},
  {id:7, nom:"Paul Biya Jr",     tel:"+237 67 890 12 34", pays:"CM", op:"MTN",    favori:true},
];

const HISTO_INIT = [
  {id:1, type:"envoi",    dest:"Aminata Diallo",  from:null,             flag:"🇸🇳", mnt:98250,  recu:98250,  dev:"XOF", op:"Wave",   date:"06/03/2026", ok:true},
  {id:2, type:"reception",dest:"Vous",            from:"Marc Fontaine",  flag:"🇫🇷", mnt:75000,  recu:75000,  dev:"XAF", op:"MTN",   date:"05/03/2026", ok:true},
  {id:3, type:"envoi",    dest:"Hervé Mbemba",    from:null,             flag:"🇨🇬", mnt:131000, recu:131000, dev:"XAF", op:"Airtel", date:"28/02/2026", ok:false},
  {id:4, type:"reception",dest:"Vous",            from:"Sophie Laurent", flag:"🇧🇪", mnt:50000,  recu:50000,  dev:"XAF", op:"Orange", date:"24/02/2026", ok:true},
  {id:5, type:"envoi",    dest:"Grace Lukeba",    from:null,             flag:"🇨🇩", mnt:140000, recu:140000, dev:"CDF", op:"Orange", date:"20/02/2026", ok:true},
  {id:6, type:"reception",dest:"Vous",            from:"Jean Dupont",    flag:"🇫🇷", mnt:200000, recu:200000, dev:"XAF", op:"MTN",   date:"15/02/2026", ok:true},
];

const NOTIFS_INIT = [
  {id:1, ic:"✅", titre:"Transfert confirmé",      msg:"98 250 FCFA envoyés à Aminata Diallo via Wave",       heure:"Il y a 2h",       lu:false},
  {id:2, ic:"💰", titre:"Argent reçu !",            msg:"Marc Fontaine vous a envoyé 75 000 XAF via MTN",      heure:"Il y a 4h",       lu:false},
  {id:3, ic:"🔔", titre:"Nouveau taux disponible", msg:"Le taux EUR/XOF a été mis à jour : 1€ = 655,78 XOF", heure:"Il y a 5h",       lu:false},
  {id:4, ic:"🛡️", titre:"Vérification KYC",        msg:"Complétez votre KYC pour débloquer +3M FCFA/mois",   heure:"Hier",            lu:true},
  {id:5, ic:"💰", titre:"Argent reçu !",            msg:"Sophie Laurent vous a envoyé 50 000 XAF via Orange", heure:"Il y a 3 jours",  lu:true},
  {id:6, ic:"💰", titre:"Argent reçu !",            msg:"Jean Dupont vous a envoyé 200 000 XAF via MTN",      heure:"Il y a 23 jours", lu:true},
];

const OP_SOLDES_INIT = {MTN:820000, Airtel:345000, Orange:128000, Wave:512500};

// ── TARIFICATION SCALABLE ─────────────────────────────────────────────────────
const TRANCHES_FRAIS = [
  {min:200,    max:10000,   taux:0.030, label:"3.0%"},
  {min:10001,  max:100000,  taux:0.025, label:"2.5%"},
  {min:100001, max:500000,  taux:0.020, label:"2.0%"},
  {min:500001, max:1000000, taux:0.015, label:"1.5%"},
  {min:1000001,max:Infinity,taux:0.010, label:"1.0%"},
];

const calcFee = (montant) => {
  const tranche = TRANCHES_FRAIS.find(t => montant >= t.min && montant <= t.max);
  if (!tranche) return 0;
  return Math.round(montant * tranche.taux);
};

const getTranche = (montant) => TRANCHES_FRAIS.find(t => montant >= t.min && montant <= t.max);

// ── TAUX DE CHANGE (simulés dynamiquement) ────────────────────────────────────
const generateTaux = () => ({
  EUR: (1 / 655 * (1 + (Math.random() - 0.5) * 0.02)).toFixed(5),
  USD: (1 / 590 * (1 + (Math.random() - 0.5) * 0.02)).toFixed(5),
  GBP: (1 / 780 * (1 + (Math.random() - 0.5) * 0.02)).toFixed(5),
  MAD: (1 / 65  * (1 + (Math.random() - 0.5) * 0.02)).toFixed(5),
});

// ── HELPERS ───────────────────────────────────────────────────────────────────
const getPays   = (code) => PAYS.find(p => p.code === code);
const ini       = (n)    => n.split(" ").map(w => w[0]).join("").slice(0,2).toUpperCase();
const avc       = (n)    => {
  const c = ["#e8001e","#FF6600","#1B9AF5","#4E9912","#9B59B6","#00BCD4"];
  let h = 0; for (let x of n) h = (h*31 + x.charCodeAt(0)) % c.length; return c[h];
};
const fmtNum    = (n)    => n.toLocaleString("fr-FR");
const fmtDate   = ()     => new Date().toLocaleDateString("fr-FR");

const LOGO_WHITE_B64 = "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";
const LOGO_BLACK_B64 = "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";


// ── GLOBAL CSS ────────────────────────────────────────────────────────────────
const makeCss = (T) => `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Plus Jakarta Sans', system-ui, sans-serif; }
  @keyframes slideUp   { from { transform:translateY(100%); opacity:0 } to { transform:translateY(0); opacity:1 } }
  @keyframes slideDownFade { from { transform:translate(-50%, -120%); opacity:0 } to { transform:translate(-50%, 0); opacity:1 } }
  @keyframes fadeIn    { from { opacity:0; transform:translateY(8px) } to { opacity:1; transform:translateY(0) } }
  @keyframes fadeInUp  { from { opacity:0; transform:translateY(20px) } to { opacity:1; transform:translateY(0) } }
  @keyframes pulse     { 0%,100% { transform:scale(1) } 50% { transform:scale(1.05) } }
  @keyframes spin      { from { transform:rotate(0deg) } to { transform:rotate(360deg) } }
  @keyframes shimmer   { 0% { background-position:-200% 0 } 100% { background-position:200% 0 } }
  @keyframes bounce    { 0%,100% { transform:translateY(0) } 50% { transform:translateY(-6px) } }
  @keyframes glow      { 0%,100% { box-shadow:0 0 12px ${T.accent}44 } 50% { box-shadow:0 0 28px ${T.accent}88 } }
  .fadeIn    { animation: fadeIn .35s ease both; }
  .fadeInUp  { animation: fadeInUp .4s ease both; }
  .slideUp   { animation: slideUp .35s cubic-bezier(.25,.46,.45,.94) both; }
  .btn-press:active { transform: scale(0.95) !important; transition: transform .08s !important; }
  ::-webkit-scrollbar { width:0; height:0; }
  input, button, select { font-family: 'Plus Jakarta Sans', system-ui, sans-serif; }
  input:focus { outline:2px solid ${T.accent}; outline-offset:0; }
  ::placeholder { color:${T.muted}; }
  .dark-transition { transition: background .3s, color .3s, border-color .3s, box-shadow .3s; }
`;

// ── SVG ICONS ─────────────────────────────────────────────────────────────────
const ChevL   = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15,18 9,12 15,6"/></svg>;
const ChevR   = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9,18 15,12 9,6"/></svg>;
const Check   = ({color="#fff",size=10}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20,6 9,17 4,12"/></svg>;
const SunIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>;
const MoonIcon= () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>;
const StarIcon= ({filled, color}) => <svg width="16" height="16" viewBox="0 0 24 24" fill={filled?color:"none"} stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg>;
const WifiOff = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="1" y1="1" x2="23" y2="23"/><path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55"/><path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39"/><path d="M10.71 5.05A16 16 0 0 1 22.56 9"/><path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>;

// ── LOGO COMPONENT ────────────────────────────────────────────────────────────
// Note: logos are injected as LOGO_WHITE_B64 / LOGO_BLACK_B64 in the final file
const Logo = ({h=40, dark=false}) => (
  <img src={"data:image/png;base64,"+(dark ? LOGO_BLACK_B64 : LOGO_WHITE_B64)}
    style={{height:h, width:h*2.94, objectFit:"contain"}} alt="Cash Money"/>
);

// ── OPERATOR IMAGE ─────────────────────────────────────────────────────────────
const OpImg = ({name, size=44}) => (
  <img src={OP_URI[name]} style={{width:size, height:size, borderRadius:10, objectFit:"contain", display:"block"}} alt={name}/>
);

// ── QR CODE GENERATOR ─────────────────────────────────────────────────────────
function generateQRPattern(text) {
  let h = 0;
  for (let i = 0; i < text.length; i++) h = Math.imul(31, h) + text.charCodeAt(i) | 0;
  const size = 21;
  const grid = [];
  for (let r = 0; r < size; r++) {
    const row = [];
    for (let c = 0; c < size; c++) {
      const seed = h ^ (r * 127 + c * 31 + r * c);
      row.push(((seed ^ (seed >> 16)) & 1) === 0);
    }
    grid.push(row);
  }
  // Finder patterns
  [[0,0],[0,14],[14,0]].forEach(([sr,sc]) => {
    for (let r = 0; r < 7; r++) for (let c = 0; c < 7; c++) {
      grid[sr+r][sc+c] = (r===0||r===6||c===0||c===6||( r>=2&&r<=4&&c>=2&&c<=4));
    }
  });
  return {grid, size};
}

function QRCode({text, size=200, color="#000", bg="#fff"}) {
  const {grid, size:gs} = generateQRPattern(text);
  const cell = size / gs;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <rect width={size} height={size} fill={bg}/>
      {grid.map((row, r) => row.map((on, c) => on
        ? <rect key={`${r}-${c}`} x={c*cell} y={r*cell} width={cell} height={cell} fill={color}/>
        : null
      ))}
    </svg>
  );
}

// ── THEME TOGGLE BUTTON ───────────────────────────────────────────────────────
function ThemeToggle() {
  const {theme, toggleTheme} = useTheme();
  const T = theme;
  return (
    <button onClick={toggleTheme} className="btn-press"
      style={{display:"flex", alignItems:"center", gap:5, padding:"7px 13px",
        borderRadius:20, border:`1.5px solid ${T.border}`, background:T.surface2,
        color:T.text, cursor:"pointer", fontSize:12, fontWeight:700, transition:"all .2s"}}>
      {T.name === "dark" ? <><SunIcon/> Clair</> : <><MoonIcon/> Sombre</>}
    </button>
  );
}

// ── OFFLINE BANNER ────────────────────────────────────────────────────────────
function OfflineBanner() {
  const {isOnline} = useApp();
  const {theme:T} = useTheme();
  if (isOnline) return null;
  return (
    <div style={{background:"#B45309", color:"#fff", padding:"8px 16px",
      display:"flex", alignItems:"center", gap:8, fontSize:12, fontWeight:700,
      position:"sticky", top:0, zIndex:50}}>
      <WifiOff/> Mode hors ligne — Certaines fonctionnalités peuvent être limitées
    </div>
  );
}

// ── BANNIÈRE ARGENT REÇU ──────────────────────────────────────────────────────
function IncomingMoneyBanner() {
  const {incomingTx, setIncomingTx} = useApp();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (incomingTx) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [incomingTx]);

  if (!incomingTx || !visible) return null;

  return (
    <div style={{
      position:"fixed", top:16, left:"50%", transform:"translateX(-50%)",
      zIndex:99999, width:"calc(100% - 32px)", maxWidth:370,
      background:"linear-gradient(135deg, #16a34a, #22c55e)",
      borderRadius:18, padding:"14px 16px",
      boxShadow:"0 8px 32px rgba(34,197,94,0.45)",
      display:"flex", alignItems:"center", gap:12,
      animation:"slideDownFade 0.4s ease"
    }}>
      <div style={{fontSize:32, flexShrink:0}}>💰</div>
      <div style={{flex:1}}>
        <div style={{fontSize:14, fontWeight:900, color:"#fff", marginBottom:2}}>
          Argent reçu ! 🎉
        </div>
        <div style={{fontSize:12, color:"rgba(255,255,255,0.9)", fontWeight:600}}>
          {incomingTx.from} vous a envoyé {fmtNum(incomingTx.mnt)} XAF via {incomingTx.op}
        </div>
      </div>
      <button onClick={() => { setVisible(false); setIncomingTx(null); }}
        style={{background:"rgba(255,255,255,0.25)", border:"none", borderRadius:10,
          width:28, height:28, cursor:"pointer", color:"#fff", fontWeight:900, fontSize:14,
          display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0}}>
        ✕
      </button>
    </div>
  );
}

function OfflineBanner() {
  const {isOnline} = useApp();
  const {theme:T} = useTheme();
  if (isOnline) return null;
  return (
    <div style={{background:"#B45309", color:"#fff", padding:"8px 16px",
      display:"flex", alignItems:"center", gap:8, fontSize:12, fontWeight:700,
      position:"sticky", top:0, zIndex:50}}>
      <WifiOff/> Mode hors ligne — Certaines fonctionnalités peuvent être limitées
    </div>
  );
}
function TxRow({t, onPress}) {
  const {theme:T} = useTheme();
  const isRecu = t.type === "reception";
  const iconBg = isRecu ? `#22c55e22` : t.ok ? `${T.accent}22` : `${T.danger}22`;
  const icon   = isRecu ? "📥" : t.ok ? "📤" : "⏳";
  const label  = isRecu ? t.from : t.dest;
  const badge  = isRecu ? "💰 Reçu" : t.ok ? "✓ Envoyé" : "⏳ En attente";
  const badgeColor = isRecu ? "#22c55e" : t.ok ? T.accent : T.warning;
  const amtColor   = isRecu ? "#22c55e" : t.ok ? T.accent : T.muted;
  const amtPrefix  = isRecu ? "+" : "-";

  return (
    <div onClick={() => onPress && onPress(t)}
      style={{background:T.surface, borderRadius:14, padding:"12px 14px",
        marginBottom:8, display:"flex", alignItems:"center", gap:12,
        boxShadow:T.shadow, border:`1px solid ${isRecu ? "#22c55e33" : T.border}`,
        cursor: onPress ? "pointer" : "default"}}>
      <div style={{width:42, height:42, borderRadius:12, background:iconBg,
        display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, flexShrink:0}}>
        {icon}
      </div>
      <div style={{flex:1}}>
        <div style={{fontSize:13, fontWeight:700, color:T.text}}>{label}</div>
        <div style={{fontSize:11, color:T.muted, marginTop:2, fontWeight:500}}>
          {t.flag} · {t.op} · {t.date}
        </div>
      </div>
      <div style={{textAlign:"right"}}>
        <div style={{fontSize:14, fontWeight:800, color:amtColor}}>
          {amtPrefix}{fmtNum(t.mnt)} F
        </div>
        <div style={{fontSize:10, fontWeight:600, marginTop:2,
          color:badgeColor, background:`${badgeColor}18`,
          padding:"2px 7px", borderRadius:10}}>
          {badge}
        </div>
      </div>
    </div>
  );
}

// ── NOTIFICATIONS ─────────────────────────────────────────────────────────────
function Notifications({notifs, onBack, onMarkAll}) {
  const {theme:T} = useTheme();
  return (
    <div className="fadeIn" style={{flex:1, overflowY:"auto", background:T.bg, minHeight:"100vh"}}>
      <style>{makeCss(T)}</style>
      <OfflineBanner/>
      <div style={{padding:"14px 16px 10px", background:T.surface,
        borderBottom:`1px solid ${T.border}`, display:"flex", alignItems:"center",
        justifyContent:"space-between", position:"sticky", top:0, zIndex:10}}>
        <button onClick={onBack} style={{display:"flex", alignItems:"center", gap:6,
          background:"none", border:"none", cursor:"pointer", fontSize:15,
          fontWeight:700, color:T.text}}><ChevL/>Retour</button>
        <div style={{fontSize:17, fontWeight:800, color:T.text}}>Notifications</div>
        <button onClick={onMarkAll} style={{background:"none", border:"none",
          cursor:"pointer", fontSize:12, fontWeight:700, color:T.accent}}>Tout lire</button>
      </div>
      <div style={{padding:"12px 14px 0"}}>
        {notifs.map(n => (
          <div key={n.id} style={{background:T.surface, borderRadius:16, padding:"13px 15px",
            marginBottom:10, display:"flex", alignItems:"flex-start", gap:12,
            border:`1.5px solid ${n.lu ? T.border : T.accent}`,
            boxShadow:T.shadow}}>
            <div style={{fontSize:22, flexShrink:0, lineHeight:1}}>{n.ic}</div>
            <div style={{flex:1}}>
              <div style={{fontSize:14, fontWeight:800, color:T.text, marginBottom:3}}>{n.titre}</div>
              <div style={{fontSize:12, color:T.muted, lineHeight:1.5, fontWeight:500}}>{n.msg}</div>
              <div style={{fontSize:11, color:T.muted, marginTop:5, fontWeight:600}}>{n.heure}</div>
            </div>
            {!n.lu && <div style={{width:8, height:8, borderRadius:"50%", background:T.accent, flexShrink:0, marginTop:4}}/>}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── SIMULATEUR DE FRAIS (Widget réutilisable) ─────────────────────────────────
function FeeSimulator({montant}) {
  const {theme:T} = useTheme();
  const tranche = getTranche(montant);
  if (!montant || montant < 200) return null;
  const fee = calcFee(montant);
  const total = montant + fee;
  return (
    <div style={{background:T.green1, borderRadius:12, padding:"10px 13px",
      border:`1px solid ${T.border}`, marginTop:8}}>
      <div style={{fontSize:11, color:T.accentDk, fontWeight:800, marginBottom:6,
        display:"flex", alignItems:"center", gap:4}}>
        💡 Calcul des frais — Tranche {tranche?.label}
      </div>
      {[
        ["Montant", `${fmtNum(montant)} FCFA`],
        [`Frais (${tranche?.label})`, `${fmtNum(fee)} FCFA`],
        ["Total débité", `${fmtNum(total)} FCFA`],
      ].map(([l,v]) => (
        <div key={l} style={{display:"flex", justifyContent:"space-between",
          fontSize:12, padding:"3px 0", color:T.text2}}>
          <span style={{fontWeight:500}}>{l}</span>
          <span style={{fontWeight:l.includes("Total")?800:700}}>{v}</span>
        </div>
      ))}
    </div>
  );
}

// ── TAUX DE CHANGE WIDGET ─────────────────────────────────────────────────────
function TauxWidget() {
  const {theme:T} = useTheme();
  const {taux, taux_update} = useApp();
  return (
    <div style={{background:T.surface, borderRadius:16, padding:"14px 15px",
      boxShadow:T.shadow}}>
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12}}>
        <div style={{fontSize:14, fontWeight:800, color:T.text}}>💱 Taux du jour</div>
        <div style={{fontSize:10, color:T.muted, fontWeight:500}}>
          Mis à jour {taux_update}
        </div>
      </div>
      <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:10}}>
        {Object.entries(taux).map(([dev,val]) => (
          <div key={dev} style={{background:T.surface2, borderRadius:10, padding:"9px 11px",
            border:`1px solid ${T.border}`}}>
            <div style={{fontSize:11, color:T.muted, fontWeight:600}}>{dev}/FCFA</div>
            <div style={{fontSize:16, fontWeight:800, color:T.accent, marginTop:2}}>
              {(1/parseFloat(val)).toFixed(0)}
            </div>
            <div style={{fontSize:9, color:T.muted, fontWeight:500}}>1 {dev} = {(1/parseFloat(val)).toFixed(0)} FCFA</div>
          </div>
        ))}
      </div>
      <div style={{borderTop:`1px solid ${T.border}`, paddingTop:10}}>
        {PAYS.map(p => (
          <div key={p.code} style={{display:"flex", justifyContent:"space-between",
            fontSize:12, color:T.text2, padding:"5px 0", borderBottom:`1px solid ${T.border}`}}>
            <span style={{fontWeight:500}}>{p.flag} 1 000 FCFA</span>
            <span style={{fontWeight:800, color:T.text}}>{(p.taux/655*1000).toFixed(0)} {p.devise}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── SPLASH SCREEN ─────────────────────────────────────────────────────────────
function Splash({onDone}) {
  const {theme:T} = useTheme();
  const [step, setStep] = useState(0);
  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 600);
    const t2 = setTimeout(() => setStep(2), 1500);
    const t3 = setTimeout(() => onDone(), 2600);
    return () => [t1,t2,t3].forEach(clearTimeout);
  }, [onDone]);
  return (
    <div style={{position:"fixed",inset:0,background:T.splashBg,display:"flex",
      flexDirection:"column",alignItems:"center",justifyContent:"center",zIndex:999}}>
      <style>{makeCss(T)}</style>
      <div style={{
        opacity: step>=1?1:0, transform: step>=1?"translateY(0)":"translateY(30px)",
        transition:"all .6s cubic-bezier(.25,.46,.45,.94)", textAlign:"center"
      }}>
        <Logo h={56} dark={false}/>
        <div style={{
          opacity: step>=2?1:0, transform: step>=2?"translateY(0)":"translateY(10px)",
          transition:"all .5s ease .1s",
          fontSize:14, color:"rgba(255,255,255,0.7)", marginTop:12, fontWeight:600, letterSpacing:2
        }}>Votre argent, sans frontières</div>
      </div>
      <div style={{
        position:"absolute", bottom:60,
        opacity: step>=2?1:0, transition:"opacity .5s ease .3s"
      }}>
        <div style={{display:"flex", gap:8, justifyContent:"center"}}>
          {[0,1,2].map(i => (
            <div key={i} style={{
              width: i===0?24:8, height:8, borderRadius:4,
              background:"rgba(255,255,255,0.8)",
              transition:"width .3s ease"
            }}/>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── PIN SCREEN ────────────────────────────────────────────────────────────────
function PinScreen({title="Entrez votre code PIN", onValidate, onBack, canBio=false}) {
  const {theme:T} = useTheme();
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [bioLoading, setBioLoading] = useState(false);
  const [shake, setShake] = useState(false);

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 400);
  };

  const handleKey = (k) => {
    setError("");
    if (k === "del") { setPin(p => p.slice(0,-1)); return; }
    if (pin.length >= 4) return;
    const np = pin + k;
    setPin(np);
    if (np.length === 4) {
      setTimeout(() => {
        const ok = onValidate(np);
        if (!ok) {
          setError("Code incorrect. Réessayez.");
          setPin("");
          triggerShake();
        }
      }, 120);
    }
  };

  const handleBio = () => {
    setBioLoading(true);
    setTimeout(() => {
      setBioLoading(false);
      onValidate("BIO_OK");
    }, 1200);
  };

  const keys = ["1","2","3","4","5","6","7","8","9","",  "0","del"];

  return (
    <div className="fadeIn" style={{flex:1, display:"flex", flexDirection:"column",
      alignItems:"center", justifyContent:"center", background:T.bg, minHeight:"100vh",
      padding:"0 30px 40px"}}>
      <style>{makeCss(T)}</style>
      {onBack && (
        <button onClick={onBack} style={{position:"absolute", top:22, left:16,
          background:"none", border:"none", cursor:"pointer", color:T.text,
          display:"flex", alignItems:"center", gap:4, fontSize:14, fontWeight:700}}>
          <ChevL/> Retour
        </button>
      )}
      <Logo h={38} dark={T.logoDark}/>
      <div style={{marginTop:28, marginBottom:8, fontSize:17, fontWeight:800, color:T.text,
        textAlign:"center"}}>{title}</div>
      <div style={{fontSize:12, color:T.muted, fontWeight:500, marginBottom:28, textAlign:"center"}}>
        Code démo : 1234
      </div>

      {/* PIN dots */}
      <div style={{
        display:"flex", gap:16, marginBottom:10,
        transform: shake ? "translateX(0)" : "",
        animation: shake ? "shake .4s ease" : ""
      }}>
        <style>{`@keyframes shake { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-8px)} 40%{transform:translateX(8px)} 60%{transform:translateX(-6px)} 80%{transform:translateX(6px)} }`}</style>
        {[0,1,2,3].map(i => (
          <div key={i} style={{
            width:16, height:16, borderRadius:"50%",
            background: pin.length > i ? T.accent : "none",
            border: `2.5px solid ${pin.length > i ? T.accent : T.border}`,
            transition:"all .15s ease"
          }}/>
        ))}
      </div>

      {error && (
        <div style={{fontSize:12, color:T.danger, fontWeight:600, marginBottom:8,
          padding:"6px 14px", background:`${T.danger}18`, borderRadius:10}}>{error}</div>
      )}

      {/* Keypad */}
      <div style={{display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12, width:"100%",
        maxWidth:280, marginTop:16}}>
        {keys.map((k, i) => {
          if (k === "") return <div key={i}/>;
          return (
            <button key={i} onClick={() => handleKey(k)} className="btn-press"
              style={{
                height:64, borderRadius:18,
                background: k==="del" ? T.surface2 : T.surface,
                border: `1.5px solid ${T.border}`,
                color: k==="del" ? T.muted : T.text,
                fontSize: k==="del" ? 12 : 22,
                fontWeight: 700, cursor:"pointer",
                boxShadow: T.shadow,
                display:"flex", alignItems:"center", justifyContent:"center"
              }}>
              {k === "del" ? "⌫" : k}
            </button>
          );
        })}
      </div>

      {canBio && (
        <button onClick={handleBio} className="btn-press"
          disabled={bioLoading}
          style={{marginTop:22, padding:"11px 28px", borderRadius:16,
            background:"none", border:`1.5px solid ${T.border}`,
            color:T.text2, cursor:"pointer", fontSize:13, fontWeight:700,
            display:"flex", alignItems:"center", gap:8}}>
          {bioLoading ? <div style={{width:16,height:16,borderRadius:"50%",border:`2px solid ${T.accent}`,borderTopColor:"transparent",animation:"spin .7s linear infinite"}}/> : "🔐"}
          {bioLoading ? "Vérification..." : "Face ID / Empreinte"}
        </button>
      )}
    </div>
  );
}

// ── AUTH SCREEN ───────────────────────────────────────────────────────────────
function Auth({onLogin}) {
  const {theme:T} = useTheme();
  const [step, setStep] = useState("phone"); // phone | pin
  const [pays, setPays] = useState(PAYS_AUTH[0]);
  const [showPays, setShowPays] = useState(false);
  const [tel, setTel] = useState("");

  const handleValidatePin = (p) => {
    if (p === "1234" || p === "BIO_OK") { onLogin({tel:`${pays.ind} ${tel}`, pays}); return true; }
    return false;
  };

  if (step === "pin") return (
    <PinScreen
      title={`Bon retour 👋`}
      onValidate={handleValidatePin}
      onBack={() => setStep("phone")}
      canBio
    />
  );

  return (
    <div className="fadeIn" style={{flex:1, display:"flex", flexDirection:"column",
      alignItems:"center", background:T.bg, minHeight:"100vh", overflowY:"auto"}}>
      <style>{makeCss(T)}</style>
      {/* Header gradient */}
      <div style={{width:"100%", background:T.splashBg, padding:"48px 24px 40px",
        display:"flex", flexDirection:"column", alignItems:"center", borderRadius:"0 0 32px 32px"}}>
        <Logo h={44} dark={false}/>
        <div style={{fontSize:14, color:"rgba(255,255,255,0.7)", marginTop:10,
          fontWeight:600, letterSpacing:1}}>Transferts rapides & sécurisés</div>
      </div>

      <div style={{width:"100%", maxWidth:400, padding:"28px 22px 0", flex:1}}>
        <div style={{fontSize:22, fontWeight:800, color:T.text, marginBottom:6}}>Connexion</div>
        <div style={{fontSize:13, color:T.muted, marginBottom:22, fontWeight:500}}>
          Entrez votre numéro pour continuer
        </div>

        {/* Sélecteur pays */}
        <div style={{fontSize:11, color:T.text2, fontWeight:700, marginBottom:6,
          textTransform:"uppercase", letterSpacing:0.5}}>Pays</div>
        <button onClick={() => setShowPays(true)} className="btn-press"
          style={{width:"100%", padding:"13px 15px", borderRadius:14,
            background:T.inputBg, border:`1.5px solid ${T.border}`,
            display:"flex", alignItems:"center", justifyContent:"space-between",
            cursor:"pointer", marginBottom:14}}>
          <div style={{display:"flex", alignItems:"center", gap:10}}>
            <span style={{fontSize:22}}>{pays.flag}</span>
            <div style={{textAlign:"left"}}>
              <div style={{fontSize:13, fontWeight:700, color:T.text}}>{pays.nom}</div>
              <div style={{fontSize:11, color:T.muted, fontWeight:500}}>{pays.ind}</div>
            </div>
          </div>
          <ChevR/>
        </button>

        {/* Numéro */}
        <div style={{fontSize:11, color:T.text2, fontWeight:700, marginBottom:6,
          textTransform:"uppercase", letterSpacing:0.5}}>Numéro de téléphone</div>
        <div style={{display:"flex", alignItems:"center", gap:8, marginBottom:22}}>
          <div style={{padding:"13px 12px", borderRadius:12, background:T.inputBg,
            border:`1.5px solid ${T.border}`, fontSize:13, fontWeight:700, color:T.muted,
            whiteSpace:"nowrap"}}>{pays.ind}</div>
          <input
            type="tel" placeholder="XX XX XX XX XX"
            value={tel} onChange={e => setTel(e.target.value)}
            style={{flex:1, padding:"13px 14px", borderRadius:12, fontSize:14,
              background:T.inputBg, border:`1.5px solid ${T.border}`,
              color:T.text, fontWeight:600}}
          />
        </div>

        <button onClick={() => tel.length >= 6 && setStep("pin")}
          className="btn-press"
          style={{width:"100%", padding:"15px", borderRadius:16,
            background: tel.length >= 6 ? T.accent : T.border,
            border:"none", color:"#fff", fontSize:15, fontWeight:800,
            cursor: tel.length >= 6 ? "pointer" : "default",
            transition:"background .2s",
            boxShadow: tel.length >= 6 ? `0 4px 16px ${T.accent}55` : "none"}}>
          Continuer →
        </button>

        <div style={{textAlign:"center", marginTop:20, fontSize:12, color:T.muted, fontWeight:500}}>
          En continuant, vous acceptez nos{" "}
          <span style={{color:T.accent, fontWeight:700, cursor:"pointer"}}>Conditions d'utilisation</span>
        </div>
      </div>

      {/* Modal pays */}
      {showPays && (
        <div onClick={() => setShowPays(false)}
          style={{position:"fixed", inset:0, background:T.overlay, zIndex:60, display:"flex",
            flexDirection:"column", justifyContent:"flex-end"}}>
          <div onClick={e => e.stopPropagation()}
            className="slideUp"
            style={{background:T.surface, borderRadius:"24px 24px 0 0", padding:"20px 0 0",
              maxHeight:"70vh", overflowY:"auto"}}>
            <div style={{textAlign:"center", padding:"0 20px 16px",
              borderBottom:`1px solid ${T.border}`, fontSize:16, fontWeight:800, color:T.text}}>
              Choisir un pays
            </div>
            {PAYS_AUTH.map(p => (
              <button key={p.code} onClick={() => {setPays(p); setShowPays(false);}}
                className="btn-press"
                style={{width:"100%", padding:"14px 20px", background:"none", border:"none",
                  cursor:"pointer", display:"flex", alignItems:"center", gap:14,
                  borderBottom:`1px solid ${T.border}`}}>
                <span style={{fontSize:24}}>{p.flag}</span>
                <div style={{textAlign:"left", flex:1}}>
                  <div style={{fontSize:14, fontWeight:700, color:T.text}}>{p.nom}</div>
                  <div style={{fontSize:12, color:T.muted}}>{p.ind}</div>
                </div>
                {p.code === pays.code && (
                  <div style={{width:20, height:20, borderRadius:"50%", background:T.accent,
                    display:"flex", alignItems:"center", justifyContent:"center"}}>
                    <Check size={10}/>
                  </div>
                )}
              </button>
            ))}
            <div style={{height:24}}/>
          </div>
        </div>
      )}
    </div>
  );
}

// ── MODAL QR PAR OPÉRATEUR ────────────────────────────────────────────────────
function OpQRModal({op, user, T, onClose, onScanPay}) {
  const qrData = JSON.stringify({
    app:"cashmoney", op, tel:user?.tel||"", nom:user?.nom||"", v:1
  });
  return (
    <div onClick={onClose}
      style={{position:"fixed",inset:0,background:T.overlay,zIndex:80,
        display:"flex",flexDirection:"column",justifyContent:"flex-end"}}>
      <div onClick={e=>e.stopPropagation()} className="slideUp"
        style={{background:T.surface,borderRadius:"24px 24px 0 0",padding:"24px 20px 40px"}}>
        {/* Handle */}
        <div style={{width:36,height:4,borderRadius:2,background:T.border,margin:"0 auto 20px"}}/>
        <div style={{textAlign:"center",marginBottom:18}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:10,marginBottom:6}}>
            <OpImg name={op} size={32}/>
            <div style={{fontSize:16,fontWeight:800,color:T.text}}>QR Code {op}</div>
          </div>
          <div style={{fontSize:12,color:T.muted,fontWeight:500}}>
            Faites scanner ce code pour recevoir un paiement
          </div>
        </div>
        {/* QR */}
        <div style={{display:"flex",justifyContent:"center",marginBottom:16,
          padding:20,background:T.bg,borderRadius:20,border:`1px solid ${T.border}`}}>
          <div style={{position:"relative"}}>
            <QRCode text={qrData} size={200}
              color={T.name==="dark"?"#E8F5D0":"#0d3300"} bg="transparent"/>
            {/* Logo overlay au centre */}
            <div style={{position:"absolute",top:"50%",left:"50%",
              transform:"translate(-50%,-50%)",
              width:40,height:40,borderRadius:10,background:T.surface,
              display:"flex",alignItems:"center",justifyContent:"center",
              border:`2px solid ${T.border}`}}>
              <OpImg name={op} size={28}/>
            </div>
          </div>
        </div>
        {/* Infos */}
        <div style={{background:T.surface2,borderRadius:14,padding:"12px 16px",
          border:`1px solid ${T.border}`,marginBottom:16}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
            <span style={{fontSize:11,color:T.muted,fontWeight:600}}>Opérateur</span>
            <span style={{fontSize:12,fontWeight:800,color:T.text}}>{op}</span>
          </div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <span style={{fontSize:11,color:T.muted,fontWeight:600}}>Numéro</span>
            <span style={{fontSize:12,fontWeight:800,color:T.text}}>{user?.tel||"Non défini"}</span>
          </div>
        </div>
        {/* Bouton Scanner */}
        <button onClick={onScanPay} className="btn-press"
          style={{width:"100%",padding:14,borderRadius:16,
            background:"linear-gradient(135deg,#0d3300,#6DC21E)",
            border:"none",color:"#fff",fontSize:14,fontWeight:800,cursor:"pointer",
            display:"flex",alignItems:"center",justifyContent:"center",gap:10,marginBottom:10}}>
          <span style={{fontSize:18}}>📷</span> Scanner & Payer
        </button>
        <button onClick={onClose} className="btn-press"
          style={{width:"100%",padding:13,borderRadius:16,
            background:T.surface2,border:`1.5px solid ${T.border}`,
            color:T.text2,fontSize:13,fontWeight:700,cursor:"pointer"}}>
          Fermer
        </button>
      </div>
    </div>
  );
}

// ── SCANNER & PAY MODAL ───────────────────────────────────────────────────────
// Simule le scan du QR code d'un marchand/contact et permet le paiement direct
const MERCHANTS = [
  {nom:"Restaurant Le Baobab",   tel:"+237 65 111 22 33", op:"MTN",    type:"marchand", cat:"🍽️"},
  {nom:"Pharmacie Central",      tel:"+237 67 333 44 55", op:"Orange", type:"marchand", cat:"💊"},
  {nom:"Supermarché Promo",      tel:"+242 06 555 66 77", op:"Airtel", type:"marchand", cat:"🛒"},
  {nom:"Station Total Nsam",     tel:"+237 65 777 88 99", op:"MTN",    type:"marchand", cat:"⛽"},
  {nom:"Téléboutique Télémax",   tel:"+221 77 999 00 11", op:"Wave",   type:"marchand", cat:"📱"},
  {nom:"École Privée Saint-Ex",  tel:"+242 05 222 33 44", op:"MTN",    type:"marchand", cat:"🎓"},
  {nom:"Clinique Santé Plus",    tel:"+237 69 444 55 66", op:"Orange", type:"marchand", cat:"🏥"},
  {nom:"Agence Immo GreenCity",  tel:"+226 70 666 77 88", op:"Orange", type:"marchand", cat:"🏢"},
];

function ScanPayModal({T, user, opSoldes, opActif, onClose, onPaySuccess}) {
  const [step, setStep] = useState("scan"); // scan | confirm | pin | success
  const [scanned, setScanned] = useState(null);
  const [montant, setMontant] = useState("");
  const [motif, setMotif] = useState("");
  const [scanning, setScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState(false);

  const mnt = parseInt(montant.replace(/\D/g,"")) || 0;
  const fee = calcFee(mnt);
  const total = mnt + fee;
  const solde = opSoldes[opActif] ?? 0;
  const canPay = mnt >= 200 && total <= solde;

  // Simulation du scan
  const startScan = (merchant) => {
    setScanning(true);
    setScanProgress(0);
    const interval = setInterval(() => {
      setScanProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setScanning(false);
          setScanned(merchant);
          setStep("confirm");
          return 100;
        }
        return p + 8;
      });
    }, 80);
  };

  const handlePin = (digit) => {
    if (pin.length >= 4) return;
    const newPin = pin + digit;
    setPin(newPin);
    if (newPin.length === 4) {
      setTimeout(() => {
        if (newPin === "1234") {
          setStep("success");
          setTimeout(() => {
            onPaySuccess({
              dest: scanned.nom,
              tel: scanned.tel,
              op: opActif,
              mnt, fee, total,
              motif: motif || "Paiement QR",
              type: scanned.type,
              cat: scanned.cat
            });
            onClose();
          }, 1800);
        } else {
          setPinError(true);
          setPin("");
          setTimeout(() => setPinError(false), 800);
        }
      }, 300);
    }
  };

  return (
    <div onClick={step === "scan" ? onClose : undefined}
      style={{position:"fixed",inset:0,background:T.overlay,zIndex:90,
        display:"flex",flexDirection:"column",justifyContent:"flex-end"}}>
      <div onClick={e=>e.stopPropagation()} className="slideUp"
        style={{background:T.surface,borderRadius:"24px 24px 0 0",
          maxHeight:"92vh",overflowY:"auto",padding:"24px 20px 40px"}}>
        {/* Handle */}
        <div style={{width:36,height:4,borderRadius:2,background:T.border,margin:"0 auto 16px"}}/>

        {/* STEP: SCAN */}
        {step === "scan" && (
          <div className="fadeIn">
            <div style={{textAlign:"center",marginBottom:20}}>
              <div style={{fontSize:16,fontWeight:800,color:T.text,marginBottom:4}}>
                📷 Scanner un QR Code
              </div>
              <div style={{fontSize:12,color:T.muted}}>
                Pointez vers le QR code du marchand ou contact
              </div>
            </div>

            {/* Viewfinder simulé */}
            <div style={{position:"relative",height:200,borderRadius:20,overflow:"hidden",
              background:T.name==="dark"?"#0a0f07":"#111",marginBottom:20,
              border:`2px solid ${T.border}`,display:"flex",alignItems:"center",justifyContent:"center"}}>
              {/* Coins du scanner */}
              {[{top:12,left:12},{top:12,right:12},{bottom:12,left:12},{bottom:12,right:12}].map((pos,i)=>(
                <div key={i} style={{position:"absolute",...pos,width:28,height:28,
                  borderColor:T.accent,borderStyle:"solid",
                  borderTopWidth: pos.top!==undefined ? 3:0,
                  borderBottomWidth: pos.bottom!==undefined ? 3:0,
                  borderLeftWidth: pos.left!==undefined ? 3:0,
                  borderRightWidth: pos.right!==undefined ? 3:0,
                  borderRadius: pos.top!==undefined&&pos.left!==undefined ? "8px 0 0 0"
                    : pos.top!==undefined ? "0 8px 0 0"
                    : pos.left!==undefined ? "0 0 0 8px" : "0 0 8px 0"
                }}/>
              ))}
              {/* Ligne de scan animée */}
              {!scanning && (
                <div style={{position:"absolute",left:20,right:20,height:2,
                  background:`linear-gradient(90deg,transparent,${T.accent},transparent)`,
                  animation:"scanLine 2s ease-in-out infinite",
                  top:"50%"}}/>
              )}
              {scanning && (
                <div style={{textAlign:"center"}}>
                  <div style={{fontSize:32,marginBottom:8,animation:"spin 1s linear infinite",display:"inline-block"}}>⟳</div>
                  <div style={{color:T.accent,fontWeight:700,fontSize:13}}>Détection... {scanProgress}%</div>
                  <div style={{width:160,height:4,background:T.border,borderRadius:2,margin:"8px auto 0"}}>
                    <div style={{width:`${scanProgress}%`,height:"100%",
                      background:T.accent,borderRadius:2,transition:"width .1s"}}/>
                  </div>
                </div>
              )}
              {!scanning && (
                <div style={{textAlign:"center"}}>
                  <div style={{fontSize:40,marginBottom:6}}>📸</div>
                  <div style={{color:"rgba(255,255,255,0.5)",fontSize:11}}>En attente de scan...</div>
                </div>
              )}
            </div>

            {/* QR codes à scanner (marchands/contacts) */}
            <div style={{fontSize:12,fontWeight:800,color:T.text2,marginBottom:10}}>
              QR codes disponibles à scanner :
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:8,maxHeight:260,overflowY:"auto"}}>
              {MERCHANTS.map((m,i) => (
                <button key={i} onClick={() => !scanning && startScan(m)} className="btn-press"
                  disabled={scanning}
                  style={{display:"flex",alignItems:"center",gap:12,
                    background:T.surface2,border:`1.5px solid ${T.border}`,
                    borderRadius:14,padding:"11px 14px",cursor:"pointer",
                    opacity: scanning ? 0.5 : 1, textAlign:"left"}}>
                  <div style={{width:40,height:40,borderRadius:12,
                    background:`${T.accent}22`,display:"flex",
                    alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>
                    {m.cat}
                  </div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:13,fontWeight:700,color:T.text,
                      overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{m.nom}</div>
                    <div style={{fontSize:10,color:T.muted,fontWeight:500}}>{m.tel} · {m.op}</div>
                  </div>
                  <div style={{display:"flex",alignItems:"center",gap:6,flexShrink:0}}>
                    <div style={{width:28,height:28,borderRadius:8,background:T.surface,
                      border:`1px solid ${T.border}`,display:"flex",alignItems:"center",justifyContent:"center"}}>
                      <OpImg name={m.op} size={18}/>
                    </div>
                    <span style={{fontSize:16,color:T.muted}}>▶</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP: CONFIRM (montant) */}
        {step === "confirm" && scanned && (
          <div className="fadeIn">
            <button onClick={() => {setStep("scan"); setScanned(null); setMontant(""); setMotif("");}}
              style={{background:"none",border:"none",color:T.text2,cursor:"pointer",
                display:"flex",alignItems:"center",gap:6,fontSize:13,fontWeight:600,marginBottom:16}}>
              ← Retour
            </button>
            <div style={{textAlign:"center",marginBottom:20}}>
              <div style={{width:64,height:64,borderRadius:20,
                background:`${T.accent}22`,display:"flex",
                alignItems:"center",justifyContent:"center",fontSize:32,
                margin:"0 auto 12px"}}>
                {scanned.cat}
              </div>
              <div style={{fontSize:16,fontWeight:800,color:T.text}}>{scanned.nom}</div>
              <div style={{fontSize:12,color:T.muted,marginTop:4}}>
                {scanned.tel} · <span style={{color:T.accent}}>{scanned.op}</span>
              </div>
            </div>

            {/* Opérateur de paiement */}
            <div style={{background:T.surface2,borderRadius:14,padding:"12px 16px",
              border:`1px solid ${T.border}`,marginBottom:14}}>
              <div style={{fontSize:11,color:T.muted,fontWeight:600,marginBottom:8}}>Payer depuis</div>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <OpImg name={opActif} size={28}/>
                <div style={{flex:1}}>
                  <div style={{fontSize:13,fontWeight:700,color:T.text}}>{opActif}</div>
                  <div style={{fontSize:11,color:T.muted}}>
                    Solde : {fmtNum(solde)} FCFA
                  </div>
                </div>
              </div>
            </div>

            {/* Saisie montant */}
            <div style={{marginBottom:12}}>
              <div style={{fontSize:11,color:T.muted,fontWeight:700,marginBottom:6}}>Montant à payer (FCFA)</div>
              <div style={{position:"relative"}}>
                <input value={montant}
                  onChange={e => setMontant(e.target.value.replace(/\D/g,""))}
                  placeholder="0"
                  style={{width:"100%",padding:"14px 70px 14px 16px",borderRadius:14,
                    border:`2px solid ${mnt>0 ? T.accent : T.border}`,
                    background:T.inputBg,color:T.text,fontSize:20,fontWeight:800,
                    textAlign:"center",transition:"border-color .2s"}}/>
                <div style={{position:"absolute",right:14,top:"50%",transform:"translateY(-50%)",
                  fontSize:12,fontWeight:700,color:T.muted}}>FCFA</div>
              </div>
            </div>

            {/* Motif optionnel */}
            <div style={{marginBottom:16}}>
              <div style={{fontSize:11,color:T.muted,fontWeight:700,marginBottom:6}}>Motif (optionnel)</div>
              <input value={motif} onChange={e => setMotif(e.target.value)}
                placeholder="Ex: Facture Janvier, Médicaments..."
                style={{width:"100%",padding:"11px 14px",borderRadius:14,
                  border:`1.5px solid ${T.border}`,background:T.inputBg,
                  color:T.text,fontSize:13,fontWeight:500}}/>
            </div>

            {/* Récap frais */}
            {mnt >= 200 && (
              <div className="fadeIn" style={{background:T.surface2,borderRadius:14,
                padding:"12px 16px",border:`1px solid ${T.border}`,marginBottom:16}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                  <span style={{fontSize:12,color:T.muted}}>Montant</span>
                  <span style={{fontSize:12,fontWeight:700,color:T.text}}>{fmtNum(mnt)} FCFA</span>
                </div>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                  <span style={{fontSize:12,color:T.muted}}>Frais ({getTranche(mnt)?.label||""})</span>
                  <span style={{fontSize:12,fontWeight:700,color:T.warning}}>{fmtNum(fee)} FCFA</span>
                </div>
                <div style={{borderTop:`1px solid ${T.border}`,paddingTop:8,
                  display:"flex",justifyContent:"space-between"}}>
                  <span style={{fontSize:13,fontWeight:800,color:T.text}}>Total débité</span>
                  <span style={{fontSize:13,fontWeight:900,color:T.accent}}>{fmtNum(total)} FCFA</span>
                </div>
              </div>
            )}

            {/* Alertes */}
            {mnt > 0 && mnt < 200 && (
              <div style={{background:"#fef2f2",border:"1px solid #fca5a5",borderRadius:12,
                padding:"10px 14px",marginBottom:12,fontSize:12,color:"#dc2626",fontWeight:600}}>
                ⚠️ Montant minimum : 200 FCFA
              </div>
            )}
            {mnt >= 200 && total > solde && (
              <div style={{background:"#fef2f2",border:"1px solid #fca5a5",borderRadius:12,
                padding:"10px 14px",marginBottom:12,fontSize:12,color:"#dc2626",fontWeight:600}}>
                ⚠️ Solde insuffisant ({fmtNum(solde)} FCFA disponibles)
              </div>
            )}

            <button onClick={() => canPay && setStep("pin")} className="btn-press"
              disabled={!canPay}
              style={{width:"100%",padding:15,borderRadius:16,
                background: canPay ? "linear-gradient(135deg,#0d3300,#6DC21E)" : T.border,
                border:"none",color: canPay ? "#fff" : T.muted,
                fontSize:14,fontWeight:800,cursor: canPay ? "pointer":"not-allowed",
                transition:"all .2s"}}>
              {canPay ? `Payer ${fmtNum(total)} FCFA` : "Payer"}
            </button>
          </div>
        )}

        {/* STEP: PIN */}
        {step === "pin" && (
          <div className="fadeIn">
            <div style={{textAlign:"center",marginBottom:24}}>
              <div style={{fontSize:40,marginBottom:10}}>🔐</div>
              <div style={{fontSize:16,fontWeight:800,color:T.text,marginBottom:4}}>
                Confirmer le paiement
              </div>
              <div style={{fontSize:12,color:T.muted}}>
                Entrez votre PIN pour payer <strong>{fmtNum(total)} FCFA</strong> à <strong>{scanned?.nom}</strong>
              </div>
            </div>
            {/* Points PIN */}
            <div style={{display:"flex",justifyContent:"center",gap:16,marginBottom:32}}>
              {[0,1,2,3].map(i => (
                <div key={i} style={{width:18,height:18,borderRadius:"50%",
                  background: pin.length>i ? (pinError?"#e53e3e":T.accent) : T.border,
                  transition:"background .15s",
                  animation: pinError ? "pulse .3s" : "none"}}/>
              ))}
            </div>
            {/* Clavier */}
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,maxWidth:260,margin:"0 auto"}}>
              {["1","2","3","4","5","6","7","8","9","","0","⌫"].map((d,i) => (
                d === "" ? <div key={i}/> :
                <button key={i} onClick={() => d==="⌫" ? setPin(p=>p.slice(0,-1)) : handlePin(d)}
                  className="btn-press"
                  style={{height:58,borderRadius:16,border:`1.5px solid ${T.border}`,
                    background: d==="⌫" ? T.surface2 : T.surface,
                    color:T.text,fontSize:20,fontWeight:700,cursor:"pointer"}}>
                  {d}
                </button>
              ))}
            </div>
            <div style={{textAlign:"center",marginTop:16,fontSize:11,color:T.muted}}>PIN démo : 1234</div>
          </div>
        )}

        {/* STEP: SUCCESS */}
        {step === "success" && (
          <div className="fadeIn" style={{textAlign:"center",paddingTop:20,paddingBottom:20}}>
            <div style={{fontSize:64,marginBottom:16,animation:"bounce 1s ease infinite"}}>✅</div>
            <div style={{fontSize:18,fontWeight:900,color:T.text,marginBottom:8}}>
              Paiement réussi !
            </div>
            <div style={{fontSize:14,color:T.muted,fontWeight:500,marginBottom:20}}>
              {fmtNum(total)} FCFA payés à<br/>
              <strong style={{color:T.text}}>{scanned?.nom}</strong>
            </div>
            <div style={{display:"inline-flex",alignItems:"center",gap:8,
              padding:"10px 20px",borderRadius:30,
              background:`${T.accent}22`,border:`1.5px solid ${T.accent}44`}}>
              <OpImg name={opActif} size={20}/>
              <span style={{fontSize:12,fontWeight:700,color:T.accent}}>via {opActif}</span>
            </div>
          </div>
        )}
      </div>
      <style>{`@keyframes scanLine { 0%{top:20%} 50%{top:80%} 100%{top:20%} }`}</style>
    </div>
  );
}

// ── HOME SCREEN ───────────────────────────────────────────────────────────────
function Home({onSend, onHisto, onProfil, onNotifs}) {
  const {theme:T} = useTheme();
  const {user, opSoldes, opActif, setOpActif, contacts, notifs, soldeVisible, setSoldeVisible, taux, toggleFavori, simulateReception} = useApp();
  const [showQR, setShowQR] = useState(false);
  const [showQROp, setShowQROp] = useState(null); // opérateur dont on affiche le QR
  const [showScanPay, setShowScanPay] = useState(false);
  const [showTaux, setShowTaux] = useState(false);
  const [showAllContacts, setShowAllContacts] = useState(false);
  const [showSimDemo, setShowSimDemo] = useState(false);
  const paysCodes = user?.pays?.code;
  const myPays = PAYS.find(p => p.code === paysCodes) || PAYS[0];
  const ops = myPays.ops;
  const solde = opSoldes[opActif] ?? 0;
  const nbUnlu = notifs.filter(n => !n.lu).length;
  const favoris = contacts.filter(c => c.favori);
  const displayContacts = showAllContacts ? contacts : (favoris.length ? favoris : contacts.slice(0,5));

  const demoSenders = [
    {name:"Pierre Martin",    mnt:85000,  op: ops[0]||"MTN"},
    {name:"Cécile Nguyen",    mnt:150000, op: ops[0]||"MTN"},
    {name:"Thomas Beaumont",  mnt:42500,  op: ops[1]||"Orange"},
    {name:"Isabelle Moreau",  mnt:320000, op: ops[0]||"MTN"},
  ];

  return (
    <div className="fadeIn" style={{flex:1, overflowY:"auto", background:T.bg}}>
      <style>{makeCss(T)}</style>
      <IncomingMoneyBanner/>
      <OfflineBanner/>

      {/* Header card */}
      <div style={{background:T.cardGrad, padding:"22px 18px 28px", position:"relative", overflow:"hidden"}}>
        {/* Décorations */}
        <div style={{position:"absolute",top:-40,right:-40,width:160,height:160,borderRadius:"50%",
          background:"rgba(255,255,255,0.05)"}}/>
        <div style={{position:"absolute",bottom:-30,left:-20,width:120,height:120,borderRadius:"50%",
          background:"rgba(255,255,255,0.04)"}}/>

        <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20, position:"relative"}}>
          <div style={{display:"flex", alignItems:"center", gap:10}}>
            <Logo h={32} dark={false}/>
          </div>
          <div style={{display:"flex", alignItems:"center", gap:10}}>
            <ThemeToggle/>
            <button onClick={onNotifs} className="btn-press"
              style={{background:"rgba(255,255,255,0.15)", border:"1.5px solid rgba(255,255,255,0.2)",
                borderRadius:12, width:40, height:40, cursor:"pointer", color:"#fff",
                fontSize:18, position:"relative", display:"flex", alignItems:"center", justifyContent:"center"}}>
              🔔
              {nbUnlu > 0 && (
                <div style={{position:"absolute", top:-4, right:-4, background:"#e53e3e",
                  color:"#fff", borderRadius:"50%", width:18, height:18,
                  fontSize:9, fontWeight:800, display:"flex", alignItems:"center", justifyContent:"center",
                  border:"2px solid #1a1a1a"}}>{nbUnlu}</div>
              )}
            </button>
          </div>
        </div>

        {/* Solde */}
        <div style={{position:"relative"}}>
          <div style={{fontSize:12, color:"rgba(255,255,255,0.65)", fontWeight:600, marginBottom:4,
            textTransform:"uppercase", letterSpacing:1}}>Solde disponible</div>
          <div style={{display:"flex", alignItems:"center", gap:10}}>
            <div style={{fontSize:32, fontWeight:900, color:"#fff", letterSpacing:-1}}>
              {soldeVisible ? `${fmtNum(solde)} FCFA` : "••••••• FCFA"}
            </div>
            <button onClick={() => setSoldeVisible(v => !v)}
              style={{background:"none", border:"none", cursor:"pointer", fontSize:18}}>
              {soldeVisible ? "👁️" : "🙈"}
            </button>
          </div>

          {/* Opérateurs + QR inline */}
          <div style={{display:"flex", gap:10, marginTop:14, alignItems:"flex-start"}}>
            {/* Colonne gauche : boutons opérateurs */}
            <div style={{display:"flex", gap:7, flexWrap:"wrap", flex:1}}>
              {ops.map(op => (
                <button key={op} onClick={() => setOpActif(op)} className="btn-press"
                  style={{display:"flex", alignItems:"center", gap:7, padding:"7px 12px",
                    borderRadius:12, cursor:"pointer",
                    background: opActif===op ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.09)",
                    border: opActif===op ? "1.5px solid rgba(255,255,255,0.55)" : "1.5px solid rgba(255,255,255,0.12)",
                    transition:"all .2s"}}>
                  <OpImg name={op} size={20}/>
                  <span style={{fontSize:11, color:"#fff", fontWeight:700}}>{op}</span>
                  {opActif===op && <div style={{width:5,height:5,borderRadius:"50%",background:"#b8ff8a"}}/>}
                </button>
              ))}
            </div>
            {/* QR code de l'opérateur actif — cliquable pour Scanner & Payer */}
            <button onClick={() => setShowScanPay(true)} className="btn-press"
              title="Appuyer pour scanner & payer"
              style={{background:"#fff", borderRadius:12, padding:6, border:"none", cursor:"pointer",
                display:"flex", flexDirection:"column", alignItems:"center", gap:3,
                boxShadow:"0 2px 12px rgba(0,0,0,0.18)", flexShrink:0}}>
              <QRCode
                text={`cashmoney|${opActif}|${user?.tel}|${user?.nom}`}
                size={72}
                color="#1a1a1a"
                bg="#fff"
              />
              <div style={{display:"flex", alignItems:"center", gap:3}}>
                <OpImg name={opActif} size={12}/>
                <span style={{fontSize:8, fontWeight:800, color:"#333"}}>{opActif}</span>
                <span style={{fontSize:8, color:"#666"}}>📷</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* KYC Banner */}
      <div style={{margin:"14px 14px 0", background:"linear-gradient(90deg,#92400e,#B45309)",
        borderRadius:14, padding:"11px 14px", display:"flex", alignItems:"center", gap:12,
        cursor:"pointer"}} className="btn-press">
        <div style={{fontSize:20}}>🛡️</div>
        <div style={{flex:1}}>
          <div style={{fontSize:12, fontWeight:800, color:"#FFF8E7"}}>Vérification KYC requise</div>
          <div style={{fontSize:10, color:"rgba(255,248,231,0.75)", marginTop:1, fontWeight:500}}>
            Débloquez jusqu'à 3 000 000 FCFA/mois
          </div>
        </div>
        <div style={{fontSize:11, color:"#FFF8E7", fontWeight:700, whiteSpace:"nowrap"}}>Vérifier →</div>
      </div>

      {/* Taux du jour compact */}
      <div style={{margin:"12px 14px 0"}}>
        <button onClick={() => setShowTaux(v => !v)} className="btn-press"
          style={{width:"100%", background:T.surface, border:`1px solid ${T.border}`,
            borderRadius:14, padding:"11px 14px", cursor:"pointer",
            display:"flex", alignItems:"center", justifyContent:"space-between"}}>
          <div style={{display:"flex", alignItems:"center", gap:8}}>
            <span style={{fontSize:16}}>💱</span>
            <div style={{textAlign:"left"}}>
              <div style={{fontSize:12, fontWeight:800, color:T.text}}>Taux du jour</div>
              <div style={{fontSize:10, color:T.muted, fontWeight:500}}>
                1 EUR ≈ {(1/parseFloat(taux.EUR)).toFixed(0)} FCFA
              </div>
            </div>
          </div>
          <div style={{fontSize:12, color:T.accent, fontWeight:700}}>
            {showTaux ? "Masquer ▲" : "Voir ▼"}
          </div>
        </button>
        {showTaux && (
          <div style={{marginTop:8}} className="fadeIn">
            <TauxWidget/>
          </div>
        )}
      </div>

      {/* Actions rapides */}
      <div style={{padding:"16px 14px 4px"}}>
        <div style={{fontSize:13, fontWeight:800, color:T.text, marginBottom:12}}>Actions rapides</div>
        <div style={{display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:10}}>
          {[
            {ic:"✈️", label:"Envoyer",   action:onSend},
            {ic:"📋", label:"Historique",action:onHisto},
            {ic:"👤", label:"Profil",    action:onProfil},
            {ic:"🔔", label:"Notifs",    action:onNotifs},
          ].map(a => (
            <button key={a.label} onClick={a.action} className="btn-press"
              style={{display:"flex", flexDirection:"column", alignItems:"center", gap:7,
                padding:"13px 6px", borderRadius:16, background:T.surface,
                border:`1.5px solid ${T.border}`, cursor:"pointer", boxShadow:T.shadow}}>
              <div style={{fontSize:22}}>{a.ic}</div>
              <div style={{fontSize:10, fontWeight:700, color:T.text2}}>{a.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* 🎬 DÉMO INVESTISSEUR : Simuler réception */}
      <div style={{padding:"12px 14px 4px"}}>
        <div style={{background:"linear-gradient(135deg, #16a34a11, #22c55e22)",
          border:"1.5px solid #22c55e44", borderRadius:16, padding:"14px 16px"}}>
          <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:showSimDemo?12:0}}>
            <div>
              <div style={{fontSize:12, fontWeight:800, color:"#16a34a"}}>📥 Simuler une réception</div>
              <div style={{fontSize:10, color:T.muted, fontWeight:500, marginTop:2}}>
                Démo — Comme si quelqu'un vous envoyait de l'argent
              </div>
            </div>
            <button onClick={() => setShowSimDemo(v => !v)} className="btn-press"
              style={{background:"#22c55e", border:"none", borderRadius:10, padding:"7px 14px",
                color:"#fff", fontSize:11, fontWeight:800, cursor:"pointer"}}>
              {showSimDemo ? "Fermer" : "Tester"}
            </button>
          </div>
          {showSimDemo && (
            <div style={{display:"flex", flexDirection:"column", gap:8}}>
              {demoSenders.map((s, i) => (
                <button key={i} onClick={() => {
                  simulateReception(s.name, s.mnt, s.op);
                  setShowSimDemo(false);
                }} className="btn-press"
                  style={{display:"flex", alignItems:"center", gap:10, background:T.surface,
                    border:`1px solid ${T.border}`, borderRadius:12, padding:"10px 12px",
                    cursor:"pointer", width:"100%", textAlign:"left"}}>
                  <div style={{width:36,height:36,borderRadius:10,background:"#22c55e22",
                    display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0}}>
                    💰
                  </div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:12,fontWeight:700,color:T.text}}>{s.name}</div>
                    <div style={{fontSize:11,color:T.muted,fontWeight:500}}>via {s.op}</div>
                  </div>
                  <div style={{fontSize:13,fontWeight:800,color:"#22c55e"}}>
                    +{fmtNum(s.mnt)} F
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Contacts / Favoris */}
      <div style={{padding:"14px 14px 4px"}}>
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12}}>
          <div style={{fontSize:13, fontWeight:800, color:T.text}}>
            {favoris.length > 0 ? "⭐ Favoris" : "Contacts récents"}
          </div>
          <button onClick={() => setShowAllContacts(v => !v)}
            style={{fontSize:11, color:T.accent, fontWeight:700, background:"none", border:"none", cursor:"pointer"}}>
            {showAllContacts ? "Moins" : "Voir tout"}
          </button>
        </div>
        <div style={{display:"flex", gap:12, overflowX:"auto", paddingBottom:6}}>
          {displayContacts.map(c => (
            <button key={c.id} onClick={() => onSend(c)} className="btn-press"
              style={{display:"flex", flexDirection:"column", alignItems:"center", gap:6,
                flexShrink:0, background:"none", border:"none", cursor:"pointer", minWidth:56, padding:0}}>
              <div style={{position:"relative"}}>
                <div style={{width:50, height:50, borderRadius:"50%",
                  background: avc(c.nom),
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:16, fontWeight:800, color:"#fff",
                  border:`2.5px solid ${c.favori ? "#F5A623" : T.border}`}}>
                  {ini(c.nom)}
                </div>
                <div style={{position:"absolute", bottom:-2, right:-2, width:18, height:18,
                  borderRadius:"50%", background:T.surface,
                  display:"flex", alignItems:"center", justifyContent:"center",
                  border:`1.5px solid ${T.border}`}}>
                  <OpImg name={c.op} size={12}/>
                </div>
                {c.favori && (
                  <div style={{position:"absolute", top:-4, right:-4}}>
                    <StarIcon filled color="#F5A623"/>
                  </div>
                )}
              </div>
              <div style={{fontSize:9, fontWeight:700, color:T.text2, textAlign:"center",
                width:52, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap"}}>
                {c.nom.split(" ")[0]}
              </div>
            </button>
          ))}
          <button onClick={() => onSend()} className="btn-press"
            style={{display:"flex", flexDirection:"column", alignItems:"center", gap:6,
              flexShrink:0, background:"none", border:"none", cursor:"pointer", minWidth:56, padding:0}}>
            <div style={{width:50, height:50, borderRadius:"50%",
              background:T.surface2, border:`2px dashed ${T.border}`,
              display:"flex", alignItems:"center", justifyContent:"center", fontSize:22}}>+</div>
            <div style={{fontSize:9, fontWeight:700, color:T.muted, textAlign:"center"}}>Nouveau</div>
          </button>
        </div>
      </div>

      {/* Transactions récentes */}
      <div style={{padding:"14px 14px 80px"}}>
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12}}>
          <div style={{fontSize:13, fontWeight:800, color:T.text}}>Transactions récentes</div>
          <button onClick={onHisto}
            style={{fontSize:11, color:T.accent, fontWeight:700, background:"none", border:"none", cursor:"pointer"}}>
            Voir tout
          </button>
        </div>
      </div>

      {/* QR Modal par opérateur */}
      {showQROp && (
        <OpQRModal
          op={showQROp}
          user={user}
          T={T}
          onClose={() => setShowQROp(null)}
          onScanPay={() => { setShowQROp(null); setShowScanPay(true); }}
        />
      )}

      {/* Scanner & Pay Modal */}
      {showScanPay && (
        <ScanPayModal
          T={T}
          user={user}
          opSoldes={opSoldes}
          opActif={opActif}
          onClose={() => setShowScanPay(false)}
          onPaySuccess={(data) => {
            // Déduire du solde opérateur actif géré dans AppProvider
            setShowScanPay(false);
          }}
        />
      )}
    </div>
  );
}

// ── SEND SCREEN ───────────────────────────────────────────────────────────────
function Send({onBack, onSuccess, preContact=null}) {
  const {theme:T} = useTheme();
  const {user, contacts, opSoldes, opActif} = useApp();
  const [step, setStep] = useState("form"); // form | confirm | pin
  const [dest, setDest] = useState(preContact?.tel || "");
  const [destNom, setDestNom] = useState(preContact?.nom || "");
  const [pays, setPays] = useState(preContact ? PAYS.find(p=>p.code===preContact.pays)||PAYS[0] : PAYS[0]);
  const [op, setOp] = useState(preContact?.op || pays.ops[0]);
  const [montant, setMontant] = useState("");
  const [showPays, setShowPays] = useState(false);
  const [showContacts, setShowContacts] = useState(false);
  const [contactSearch, setContactSearch] = useState("");
  const [msg, setMsg] = useState("");

  const mnt = parseInt(montant.replace(/\D/g,"")) || 0;
  const fee = calcFee(mnt);
  const total = mnt + fee;
  const solde = opSoldes[opActif] ?? 0;
  const insufficient = total > solde;

  const filteredContacts = contacts.filter(c =>
    c.nom.toLowerCase().includes(contactSearch.toLowerCase()) ||
    c.tel.includes(contactSearch)
  );

  const handleSelectContact = (c) => {
    setDest(c.tel);
    setDestNom(c.nom);
    const p = PAYS.find(pp => pp.code === c.pays) || PAYS[0];
    setPays(p);
    setOp(c.op);
    setShowContacts(false);
  };

  const handleConfirm = () => setStep("confirm");

  const handlePinValidate = (p) => {
    if (p === "1234" || p === "BIO_OK") {
      onSuccess({dest:destNom||dest, pays, op, mnt, fee, total});
      return true;
    }
    return false;
  };

  if (step === "pin") return (
    <PinScreen
      title="Confirmez avec votre PIN"
      onValidate={handlePinValidate}
      onBack={() => setStep("confirm")}
      canBio
    />
  );

  if (step === "confirm") return (
    <div className="fadeIn" style={{flex:1, overflowY:"auto", background:T.bg, minHeight:"100vh"}}>
      <style>{makeCss(T)}</style>
      <div style={{padding:"14px 16px", background:T.surface, borderBottom:`1px solid ${T.border}`,
        display:"flex", alignItems:"center", gap:8}}>
        <button onClick={() => setStep("form")} style={{background:"none",border:"none",cursor:"pointer",
          color:T.text, display:"flex", alignItems:"center", gap:4, fontWeight:700, fontSize:15}}>
          <ChevL/> Retour
        </button>
        <div style={{flex:1, textAlign:"center", fontSize:16, fontWeight:800, color:T.text}}>
          Confirmation
        </div>
        <div style={{width:60}}/>
      </div>

      <div style={{padding:"20px 16px"}}>
        {/* Récapitulatif */}
        <div style={{background:T.surface, borderRadius:20, overflow:"hidden",
          boxShadow:T.shadow, marginBottom:16}}>
          {/* Destinataire */}
          <div style={{padding:"18px 18px 14px", borderBottom:`1px solid ${T.border}`}}>
            <div style={{fontSize:11, color:T.muted, fontWeight:700, marginBottom:8,
              textTransform:"uppercase", letterSpacing:0.5}}>Destinataire</div>
            <div style={{display:"flex", alignItems:"center", gap:12}}>
              <div style={{width:44, height:44, borderRadius:"50%", background:avc(destNom||dest),
                display:"flex", alignItems:"center", justifyContent:"center",
                fontSize:16, fontWeight:800, color:"#fff", flexShrink:0}}>
                {ini(destNom||dest)}
              </div>
              <div>
                <div style={{fontSize:15, fontWeight:800, color:T.text}}>{destNom||dest}</div>
                <div style={{fontSize:12, color:T.muted, fontWeight:500, marginTop:2}}>
                  {dest} · {pays.flag} {pays.nom}
                </div>
                <div style={{display:"flex", alignItems:"center", gap:5, marginTop:4}}>
                  <OpImg name={op} size={16}/>
                  <span style={{fontSize:11, color:T.text2, fontWeight:600}}>{op}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Montants */}
          {[
            ["Montant envoyé", `${fmtNum(mnt)} FCFA`],
            [`Frais (${getTranche(mnt)?.label || "—"})`, `${fmtNum(fee)} FCFA`],
            ["Total débité", `${fmtNum(total)} FCFA`],
            ["Opérateur source", `${opActif}`],
          ].map(([l,v], i) => (
            <div key={l} style={{
              display:"flex", justifyContent:"space-between", padding:"12px 18px",
              borderBottom: i<3 ? `1px solid ${T.border}` : "none",
              background: l.includes("Total") ? T.green1 : "transparent"
            }}>
              <span style={{fontSize:13, color:T.muted, fontWeight:500}}>{l}</span>
              <span style={{fontSize:13, fontWeight:l.includes("Total")?800:700, color:T.text}}>{v}</span>
            </div>
          ))}
        </div>

        {msg.trim() && (
          <div style={{background:T.surface, borderRadius:14, padding:"12px 15px",
            marginBottom:16, boxShadow:T.shadow, border:`1px solid ${T.border}`}}>
            <div style={{fontSize:11, color:T.muted, fontWeight:700, marginBottom:4}}>Message</div>
            <div style={{fontSize:13, color:T.text, fontWeight:500}}>{msg}</div>
          </div>
        )}

        <button onClick={() => setStep("pin")} className="btn-press"
          style={{width:"100%", padding:16, borderRadius:18, background:T.accent,
            border:"none", color:"#fff", fontSize:15, fontWeight:800, cursor:"pointer",
            boxShadow:`0 6px 24px ${T.accent}55`, marginBottom:10}}>
          🔐 Confirmer avec PIN
        </button>
        <button onClick={() => setStep("form")} className="btn-press"
          style={{width:"100%", padding:14, borderRadius:18, background:"none",
            border:`1.5px solid ${T.border}`, color:T.text2, fontSize:14,
            fontWeight:700, cursor:"pointer"}}>
          Modifier
        </button>
      </div>
    </div>
  );

  return (
    <div className="fadeIn" style={{flex:1, overflowY:"auto", background:T.bg, minHeight:"100vh"}}>
      <style>{makeCss(T)}</style>
      <OfflineBanner/>
      <div style={{padding:"14px 16px", background:T.surface, borderBottom:`1px solid ${T.border}`,
        display:"flex", alignItems:"center", gap:8, position:"sticky", top:0, zIndex:10}}>
        <button onClick={onBack} style={{background:"none",border:"none",cursor:"pointer",
          color:T.text, display:"flex", alignItems:"center", gap:4, fontWeight:700, fontSize:15}}>
          <ChevL/> Retour
        </button>
        <div style={{flex:1, textAlign:"center", fontSize:16, fontWeight:800, color:T.text}}>
          ✈️ Envoyer de l'argent
        </div>
        <div style={{width:60}}/>
      </div>

      <div style={{padding:"16px 16px 80px"}}>
        {/* Destinataire */}
        <div style={{marginBottom:14}}>
          <div style={{fontSize:11, color:T.text2, fontWeight:700, marginBottom:6,
            textTransform:"uppercase", letterSpacing:0.5}}>Destinataire</div>
          <div style={{display:"flex", gap:8}}>
            <input
              placeholder="Nom ou numéro..." value={dest}
              onChange={e => {setDest(e.target.value); setDestNom("");}}
              style={{flex:1, padding:"13px 14px", borderRadius:12, fontSize:14,
                background:T.inputBg, border:`1.5px solid ${T.border}`, color:T.text, fontWeight:600}}
            />
            <button onClick={() => setShowContacts(true)} className="btn-press"
              style={{padding:"0 14px", borderRadius:12, background:T.surface2,
                border:`1.5px solid ${T.border}`, cursor:"pointer", fontSize:18}}>
              👥
            </button>
          </div>
          {destNom && (
            <div style={{marginTop:6, display:"flex", alignItems:"center", gap:8,
              padding:"7px 12px", background:T.green1, borderRadius:10,
              border:`1px solid ${T.border}`}}>
              <div style={{width:24, height:24, borderRadius:"50%", background:avc(destNom),
                display:"flex", alignItems:"center", justifyContent:"center",
                fontSize:10, fontWeight:800, color:"#fff"}}>{ini(destNom)}</div>
              <span style={{fontSize:12, fontWeight:700, color:T.accentDk}}>{destNom}</span>
            </div>
          )}
        </div>

        {/* Pays destination */}
        <div style={{marginBottom:14}}>
          <div style={{fontSize:11, color:T.text2, fontWeight:700, marginBottom:6,
            textTransform:"uppercase", letterSpacing:0.5}}>Pays de destination</div>
          <button onClick={() => setShowPays(true)} className="btn-press"
            style={{width:"100%", padding:"12px 15px", borderRadius:12,
              background:T.inputBg, border:`1.5px solid ${T.border}`,
              display:"flex", alignItems:"center", justifyContent:"space-between", cursor:"pointer"}}>
            <div style={{display:"flex", alignItems:"center", gap:10}}>
              <span style={{fontSize:22}}>{pays.flag}</span>
              <div style={{textAlign:"left"}}>
                <div style={{fontSize:13, fontWeight:700, color:T.text}}>{pays.nom}</div>
                <div style={{fontSize:11, color:T.muted}}>{pays.devise}</div>
              </div>
            </div>
            <ChevR/>
          </button>
        </div>

        {/* Opérateur */}
        <div style={{marginBottom:14}}>
          <div style={{fontSize:11, color:T.text2, fontWeight:700, marginBottom:8,
            textTransform:"uppercase", letterSpacing:0.5}}>Réseau mobile</div>
          <div style={{display:"flex", gap:8, flexWrap:"wrap"}}>
            {pays.ops.map(o => (
              <button key={o} onClick={() => setOp(o)} className="btn-press"
                style={{display:"flex", alignItems:"center", gap:8, padding:"9px 14px",
                  borderRadius:12, cursor:"pointer",
                  background: op===o ? `${T.accent}18` : T.surface,
                  border: `1.5px solid ${op===o ? T.accent : T.border}`,
                  transition:"all .15s"}}>
                <OpImg name={o} size={22}/>
                <span style={{fontSize:12, fontWeight:700, color: op===o ? T.accent : T.text}}>{o}</span>
                {op===o && <div style={{width:6,height:6,borderRadius:"50%",background:T.accent}}/>}
              </button>
            ))}
          </div>
        </div>

        {/* Montant */}
        <div style={{marginBottom:6}}>
          <div style={{fontSize:11, color:T.text2, fontWeight:700, marginBottom:6,
            textTransform:"uppercase", letterSpacing:0.5}}>Montant (FCFA)</div>
          <div style={{position:"relative"}}>
            <input
              type="text" placeholder="Ex : 50 000" value={montant}
              onChange={e => {
                const raw = e.target.value.replace(/\D/g,"");
                setMontant(raw ? fmtNum(parseInt(raw)) : "");
              }}
              style={{width:"100%", padding:"15px 70px 15px 15px", borderRadius:14,
                fontSize:20, fontWeight:800, background:T.inputBg,
                border:`1.5px solid ${insufficient ? T.danger : T.border}`, color:T.text}}
            />
            <div style={{position:"absolute", right:14, top:"50%", transform:"translateY(-50%)",
              fontSize:12, color:T.muted, fontWeight:700}}>FCFA</div>
          </div>
          {insufficient && mnt > 0 && (
            <div style={{fontSize:11, color:T.danger, fontWeight:600, marginTop:4}}>
              ⚠️ Solde insuffisant. Disponible : {fmtNum(solde)} FCFA
            </div>
          )}

          {/* Montants rapides */}
          <div style={{display:"flex", gap:7, marginTop:8, flexWrap:"wrap"}}>
            {[5000,10000,25000,50000,100000].map(v => (
              <button key={v} onClick={() => setMontant(fmtNum(v))} className="btn-press"
                style={{padding:"5px 10px", borderRadius:10, fontSize:11, fontWeight:700,
                  background: mnt===v ? T.accent : T.pillBg,
                  border:`1.5px solid ${mnt===v ? T.accent : T.border}`,
                  color: mnt===v ? "#fff" : T.text2, cursor:"pointer"}}>
                {fmtNum(v)}
              </button>
            ))}
          </div>
        </div>

        {/* Fee Simulator */}
        <FeeSimulator montant={mnt}/>

        {/* Message optionnel */}
        <div style={{marginTop:14}}>
          <div style={{fontSize:11, color:T.text2, fontWeight:700, marginBottom:6,
            textTransform:"uppercase", letterSpacing:0.5}}>Message (optionnel)</div>
          <input placeholder="Ajouter un message..." value={msg}
            onChange={e => setMsg(e.target.value)}
            style={{width:"100%", padding:"11px 14px", borderRadius:12, fontSize:13,
              background:T.inputBg, border:`1.5px solid ${T.border}`, color:T.text, fontWeight:500}}
          />
        </div>

        <button
          onClick={handleConfirm}
          disabled={!dest || mnt < 200 || insufficient}
          className="btn-press"
          style={{width:"100%", marginTop:18, padding:16, borderRadius:18,
            background: (!dest || mnt < 200 || insufficient) ? T.border : T.accent,
            border:"none", color:"#fff", fontSize:15, fontWeight:800,
            cursor: (!dest || mnt < 200 || insufficient) ? "default" : "pointer",
            boxShadow: (!dest || mnt < 200 || insufficient) ? "none" : `0 6px 24px ${T.accent}55`,
            transition:"all .2s"}}>
          Continuer → Confirmer
        </button>
      </div>

      {/* Modal sélection pays */}
      {showPays && (
        <div onClick={() => setShowPays(false)}
          style={{position:"fixed", inset:0, background:T.overlay, zIndex:60,
            display:"flex", flexDirection:"column", justifyContent:"flex-end"}}>
          <div onClick={e => e.stopPropagation()} className="slideUp"
            style={{background:T.surface, borderRadius:"24px 24px 0 0",
              maxHeight:"70vh", overflowY:"auto", padding:"20px 0 0"}}>
            <div style={{textAlign:"center", padding:"0 20px 14px",
              borderBottom:`1px solid ${T.border}`, fontSize:16, fontWeight:800, color:T.text}}>
              Pays de destination
            </div>
            {PAYS.map(p => (
              <button key={p.code} onClick={() => {setPays(p); setOp(p.ops[0]); setShowPays(false);}}
                className="btn-press"
                style={{width:"100%", padding:"13px 20px", background:"none", border:"none",
                  cursor:"pointer", display:"flex", alignItems:"center", gap:14,
                  borderBottom:`1px solid ${T.border}`}}>
                <span style={{fontSize:24}}>{p.flag}</span>
                <div style={{flex:1, textAlign:"left"}}>
                  <div style={{fontSize:14, fontWeight:700, color:T.text}}>{p.nom}</div>
                  <div style={{fontSize:11, color:T.muted}}>{p.devise} · {p.ops.join(", ")}</div>
                </div>
                {p.code === pays.code && (
                  <div style={{width:20, height:20, borderRadius:"50%", background:T.accent,
                    display:"flex", alignItems:"center", justifyContent:"center"}}>
                    <Check size={10}/>
                  </div>
                )}
              </button>
            ))}
            <div style={{height:24}}/>
          </div>
        </div>
      )}

      {/* Modal contacts */}
      {showContacts && (
        <div onClick={() => setShowContacts(false)}
          style={{position:"fixed", inset:0, background:T.overlay, zIndex:60,
            display:"flex", flexDirection:"column", justifyContent:"flex-end"}}>
          <div onClick={e => e.stopPropagation()} className="slideUp"
            style={{background:T.surface, borderRadius:"24px 24px 0 0",
              maxHeight:"80vh", display:"flex", flexDirection:"column"}}>
            <div style={{padding:"18px 16px 12px", borderBottom:`1px solid ${T.border}`}}>
              <div style={{fontSize:16, fontWeight:800, color:T.text, textAlign:"center", marginBottom:12}}>
                Sélectionner un contact
              </div>
              <input
                autoFocus placeholder="Rechercher..." value={contactSearch}
                onChange={e => setContactSearch(e.target.value)}
                style={{width:"100%", padding:"10px 14px", borderRadius:12, fontSize:14,
                  background:T.inputBg, border:`1.5px solid ${T.border}`, color:T.text}}
              />
            </div>
            <div style={{overflowY:"auto", flex:1}}>
              {filteredContacts.map(c => (
                <button key={c.id} onClick={() => handleSelectContact(c)}
                  className="btn-press"
                  style={{width:"100%", padding:"12px 16px", background:"none", border:"none",
                    cursor:"pointer", display:"flex", alignItems:"center", gap:12,
                    borderBottom:`1px solid ${T.border}`}}>
                  <div style={{width:40, height:40, borderRadius:"50%", background:avc(c.nom),
                    display:"flex", alignItems:"center", justifyContent:"center",
                    fontSize:14, fontWeight:800, color:"#fff", flexShrink:0}}>
                    {ini(c.nom)}
                  </div>
                  <div style={{flex:1, textAlign:"left"}}>
                    <div style={{display:"flex", alignItems:"center", gap:6}}>
                      <span style={{fontSize:13, fontWeight:700, color:T.text}}>{c.nom}</span>
                      {c.favori && <StarIcon filled color="#F5A623"/>}
                    </div>
                    <div style={{fontSize:11, color:T.muted, marginTop:1}}>{c.tel}</div>
                  </div>
                  <div style={{display:"flex", flexDirection:"column", alignItems:"flex-end", gap:4}}>
                    <div style={{fontSize:10}}>{PAYS.find(p=>p.code===c.pays)?.flag}</div>
                    <OpImg name={c.op} size={18}/>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── SUCCESS SCREEN ────────────────────────────────────────────────────────────
function Success({data, onHome, onNewSend}) {
  const {theme:T} = useTheme();
  const [copied, setCopied] = useState(false);
  const ref = `CM${Date.now().toString(36).toUpperCase()}`;

  const handleShare = () => {
    const txt = `Transfert Cash Money\nDest: ${data.dest}\nMontant: ${fmtNum(data.mnt)} FCFA\nRéf: ${ref}\nDate: ${fmtDate()}`;
    if (navigator.share) {
      navigator.share({title:"Reçu Cash Money", text:txt}).catch(()=>{});
    } else {
      navigator.clipboard?.writeText(txt).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  return (
    <div className="fadeIn" style={{flex:1, display:"flex", flexDirection:"column",
      alignItems:"center", background:T.bg, minHeight:"100vh", padding:"0 20px 40px",
      overflowY:"auto"}}>
      <style>{makeCss(T)}</style>
      {/* Checkmark animé */}
      <div style={{marginTop:50, marginBottom:24}}>
        <div style={{width:90, height:90, borderRadius:"50%",
          background:`linear-gradient(135deg, ${T.accent}, ${T.accentDk})`,
          display:"flex", alignItems:"center", justifyContent:"center",
          boxShadow:`0 8px 32px ${T.accent}55`,
          animation:"pulse 2s ease infinite"}}>
          <Check color="#fff" size={40}/>
        </div>
      </div>

      <div style={{fontSize:24, fontWeight:900, color:T.text, marginBottom:6}}>
        Envoi réussi ! 🎉
      </div>
      <div style={{fontSize:14, color:T.muted, fontWeight:500, marginBottom:28, textAlign:"center"}}>
        Votre transfert est en cours de traitement
      </div>

      {/* Reçu */}
      <div style={{width:"100%", maxWidth:360, background:T.surface,
        borderRadius:24, overflow:"hidden", boxShadow:T.shadow,
        border:`1px solid ${T.border}`, marginBottom:20}}>
        {/* Header reçu */}
        <div style={{background:T.cardGrad, padding:"18px 20px", textAlign:"center"}}>
          <Logo h={28} dark={false}/>
          <div style={{fontSize:12, color:"rgba(255,255,255,0.7)", marginTop:6,
            fontWeight:600, letterSpacing:1}}>REÇU DE TRANSFERT</div>
        </div>

        {/* Body reçu */}
        <div style={{padding:"16px 20px"}}>
          <div style={{textAlign:"center", marginBottom:16}}>
            <div style={{fontSize:30, fontWeight:900, color:T.accent}}>
              {fmtNum(data.mnt)} FCFA
            </div>
            <div style={{fontSize:12, color:T.muted, fontWeight:500, marginTop:2}}>
              envoyés à {data.dest}
            </div>
          </div>

          {[
            ["Destinataire", data.dest],
            ["Pays", `${data.pays?.flag} ${data.pays?.nom}`],
            ["Opérateur", data.op],
            ["Frais", `${fmtNum(data.fee)} FCFA`],
            ["Total débité", `${fmtNum(data.total)} FCFA`],
            ["Référence", ref],
            ["Date", fmtDate()],
            ["Statut", "✅ Confirmé"],
          ].map(([l,v]) => (
            <div key={l} style={{display:"flex", justifyContent:"space-between",
              padding:"8px 0", borderBottom:`1px solid ${T.border}`,
              fontSize:12}}>
              <span style={{color:T.muted, fontWeight:500}}>{l}</span>
              <span style={{color:T.text, fontWeight:700}}>{v}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div style={{width:"100%", maxWidth:360, display:"flex", flexDirection:"column", gap:10}}>
        <button onClick={handleShare} className="btn-press"
          style={{padding:14, borderRadius:16, background:T.surface,
            border:`1.5px solid ${T.border}`, color:T.text, fontSize:14,
            fontWeight:700, cursor:"pointer",
            display:"flex", alignItems:"center", justifyContent:"center", gap:8}}>
          {copied ? "✅ Copié !" : "📤 Partager le reçu"}
        </button>
        <button onClick={onNewSend} className="btn-press"
          style={{padding:14, borderRadius:16, background:T.surface2,
            border:`1.5px solid ${T.border}`, color:T.text2, fontSize:14,
            fontWeight:700, cursor:"pointer"}}>
          Nouveau transfert
        </button>
        <button onClick={onHome} className="btn-press"
          style={{padding:15, borderRadius:16, background:T.accent,
            border:"none", color:"#fff", fontSize:15, fontWeight:800,
            cursor:"pointer", boxShadow:`0 6px 20px ${T.accent}44`}}>
          Retour à l'accueil
        </button>
      </div>
    </div>
  );
}

// ── MODAL DÉTAIL TRANSACTION ──────────────────────────────────────────────────
function TxDetail({t, onClose}) {
  const {theme:T} = useTheme();
  if (!t) return null;
  const isRecu  = t.type === "reception";
  const accent  = isRecu ? "#22c55e" : T.accent;
  const label   = isRecu ? t.from : t.dest;
  const typeLabel = isRecu ? "Transfert reçu" : t.ok ? "Transfert envoyé" : "En attente";
  const typeIcon  = isRecu ? "📥" : t.ok ? "📤" : "⏳";
  const fee = isRecu ? 0 : Math.round(t.mnt * 0.025);

  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.55)",
      zIndex:9999,display:"flex",alignItems:"flex-end",justifyContent:"center"}}
      onClick={onClose}>
      <div onClick={e=>e.stopPropagation()}
        style={{background:T.surface, borderRadius:"24px 24px 0 0", padding:"24px 20px 36px",
          width:"100%", maxWidth:400, boxShadow:"0 -8px 40px rgba(0,0,0,0.2)"}}>
        {/* Handle */}
        <div style={{width:40,height:4,borderRadius:2,background:T.border,margin:"0 auto 20px"}}/>

        {/* Icone + statut */}
        <div style={{textAlign:"center", marginBottom:20}}>
          <div style={{width:64,height:64,borderRadius:20,background:`${accent}22`,
            display:"flex",alignItems:"center",justifyContent:"center",
            fontSize:28,margin:"0 auto 12px"}}>
            {typeIcon}
          </div>
          <div style={{fontSize:22,fontWeight:900,color:accent}}>
            {isRecu ? "+" : "-"}{fmtNum(t.mnt)} {t.dev}
          </div>
          <div style={{fontSize:13,color:T.muted,fontWeight:600,marginTop:4}}>{typeLabel}</div>
        </div>

        {/* Détails */}
        <div style={{background:T.bg,borderRadius:16,padding:"14px 16px",marginBottom:16}}>
          {[
            {k: isRecu ? "De" : "Destinataire", v: label},
            {k:"Opérateur", v:`${t.flag} ${t.op}`},
            {k:"Date",      v:t.date},
            {k:"Devise",    v:t.dev},
            isRecu ? null : {k:"Frais Cash Money", v:`${fmtNum(fee)} F`},
            {k:"Référence", v:`#CM${t.id}${t.date.replace(/\//g,"")}`},
          ].filter(Boolean).map(row => (
            <div key={row.k} style={{display:"flex",justifyContent:"space-between",
              padding:"7px 0",borderBottom:`1px solid ${T.border}`}}>
              <span style={{fontSize:12,color:T.muted,fontWeight:600}}>{row.k}</span>
              <span style={{fontSize:12,color:T.text,fontWeight:700}}>{row.v}</span>
            </div>
          ))}
        </div>

        {/* Statut badge */}
        <div style={{display:"flex",justifyContent:"center",marginBottom:20}}>
          <div style={{padding:"8px 22px",borderRadius:20,background:`${accent}18`,
            color:accent,fontWeight:700,fontSize:13}}>
            {isRecu ? "✅ Reçu avec succès" : t.ok ? "✅ Transaction réussie" : "⏳ En cours de traitement"}
          </div>
        </div>

        <button onClick={onClose} style={{width:"100%",padding:"14px",borderRadius:14,
          background:accent,border:"none",color:"#fff",fontSize:15,fontWeight:800,cursor:"pointer"}}>
          Fermer
        </button>
      </div>
    </div>
  );
}

// ── HISTORIQUE ────────────────────────────────────────────────────────────────
function Histo({onBack}) {
  const {theme:T} = useTheme();
  const {histo} = useApp();
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedTx, setSelectedTx] = useState(null);

  const filtered = histo.filter(t => {
    if (filter === "envoi"    && t.type !== "envoi")     return false;
    if (filter === "recus"    && t.type !== "reception") return false;
    if (filter === "pending"  && (t.type === "reception" || t.ok)) return false;
    if (search) {
      const q = search.toLowerCase();
      const name = (t.type === "reception" ? t.from : t.dest) || "";
      if (!name.toLowerCase().includes(q)) return false;
    }
    return true;
  });

  const total_envoye = histo.filter(t=>t.type==="envoi" && t.ok).reduce((s,t)=>s+t.mnt, 0);
  const total_recu   = histo.filter(t=>t.type==="reception").reduce((s,t)=>s+t.mnt, 0);

  return (
    <div className="fadeIn" style={{flex:1, overflowY:"auto", background:T.bg, minHeight:"100vh"}}>
      <style>{makeCss(T)}</style>
      <OfflineBanner/>
      {selectedTx && <TxDetail t={selectedTx} onClose={() => setSelectedTx(null)}/>}

      <div style={{padding:"14px 16px 10px", background:T.surface,
        borderBottom:`1px solid ${T.border}`, position:"sticky", top:0, zIndex:10}}>
        <div style={{display:"flex", alignItems:"center", gap:8, marginBottom:12}}>
          <button onClick={onBack} style={{background:"none",border:"none",cursor:"pointer",
            color:T.text, display:"flex", alignItems:"center", gap:4, fontWeight:700, fontSize:15}}>
            <ChevL/> Retour
          </button>
          <div style={{flex:1, textAlign:"center", fontSize:16, fontWeight:800, color:T.text}}>
            Historique
          </div>
          <div style={{width:60}}/>
        </div>

        {/* Recherche */}
        <input placeholder="Rechercher un contact..." value={search}
          onChange={e => setSearch(e.target.value)}
          style={{width:"100%", padding:"9px 14px", borderRadius:12, fontSize:13,
            background:T.inputBg, border:`1.5px solid ${T.border}`, color:T.text,
            marginBottom:10, boxSizing:"border-box"}}
        />

        {/* Filtres */}
        <div style={{display:"flex", gap:6, flexWrap:"wrap"}}>
          {[["all","Tout 📋"],["envoi","Envoyés 📤"],["recus","Reçus 📥"],["pending","En attente ⏳"]].map(([v,l]) => (
            <button key={v} onClick={() => setFilter(v)}
              className="btn-press"
              style={{padding:"6px 12px", borderRadius:20, fontSize:11, fontWeight:700,
                background: filter===v ? (v==="recus"?"#22c55e":T.accent) : T.pillBg,
                border: `1.5px solid ${filter===v ? (v==="recus"?"#22c55e":T.accent) : T.border}`,
                color: filter===v ? "#fff" : T.text2, cursor:"pointer"}}>
              {l}
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div style={{padding:"12px 14px 0"}}>
        <div style={{background:T.surface, borderRadius:16, padding:"14px 16px",
          boxShadow:T.shadow, border:`1px solid ${T.border}`, marginBottom:14,
          display:"flex", justifyContent:"space-around"}}>
          {[
            {label:"Envoyé",      value:`${fmtNum(total_envoye)} F`, ic:"📤", color:T.accent},
            {label:"Reçu",        value:`${fmtNum(total_recu)} F`,   ic:"📥", color:"#22c55e"},
            {label:"Opérations",  value:histo.length,                ic:"📋", color:T.text},
          ].map(s => (
            <div key={s.label} style={{textAlign:"center"}}>
              <div style={{fontSize:18, marginBottom:4}}>{s.ic}</div>
              <div style={{fontSize:14, fontWeight:900, color:s.color}}>{s.value}</div>
              <div style={{fontSize:10, color:T.muted, fontWeight:500, marginTop:1}}>{s.label}</div>
            </div>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div style={{textAlign:"center", padding:"40px 20px", color:T.muted}}>
            <div style={{fontSize:40, marginBottom:12}}>📭</div>
            <div style={{fontSize:14, fontWeight:700}}>Aucune transaction</div>
          </div>
        ) : (
          filtered.map(t => <TxRow key={t.id} t={t} onPress={setSelectedTx}/>)
        )}
      </div>
      <div style={{height:32}}/>
    </div>
  );
}

// ── PROFIL ────────────────────────────────────────────────────────────────────
function Profil({onBack, onLogout}) {
  const {theme:T, toggleTheme} = useTheme();
  const {user, histo, opSoldes} = useApp();
  const totalEnvoye = histo.filter(t=>t.type==="envoi" && t.ok).reduce((s,t)=>s+t.mnt,0);
  const totalRecu   = histo.filter(t=>t.type==="reception").reduce((s,t)=>s+t.mnt,0);
  const totalSoldes = Object.values(opSoldes).reduce((a,b)=>a+b,0);

  const menus = [
    {ic:"🔐", titre:"Sécurité & PIN",        desc:"Modifier le code PIN, biométrie"},
    {ic:"📱", titre:"Mes comptes mobiles",    desc:"Gérer les opérateurs liés"},
    {ic:"🌍", titre:"Pays & Langue",          desc:"Changer la région"},
    {ic:"💳", titre:"Limites de transfert",   desc:"KYC et plafonds"},
    {ic:"🔔", titre:"Notifications",          desc:"Préférences d'alertes"},
    {ic:"❓", titre:"Aide & Support",         desc:"FAQ, Contact"},
  ];

  return (
    <div className="fadeIn" style={{flex:1, overflowY:"auto", background:T.bg, minHeight:"100vh"}}>
      <style>{makeCss(T)}</style>
      <OfflineBanner/>
      <div style={{padding:"14px 16px", background:T.surface,
        borderBottom:`1px solid ${T.border}`, display:"flex", alignItems:"center",
        gap:8, position:"sticky", top:0, zIndex:10}}>
        <button onClick={onBack} style={{background:"none",border:"none",cursor:"pointer",
          color:T.text, display:"flex", alignItems:"center", gap:4, fontWeight:700, fontSize:15}}>
          <ChevL/> Retour
        </button>
        <div style={{flex:1, textAlign:"center", fontSize:16, fontWeight:800, color:T.text}}>Profil</div>
        <ThemeToggle/>
      </div>

      {/* Card profil */}
      <div style={{background:T.cardGrad, padding:"28px 20px 24px", textAlign:"center", position:"relative"}}>
        <div style={{position:"absolute",top:-30,right:-30,width:120,height:120,borderRadius:"50%",
          background:"rgba(255,255,255,0.05)"}}/>
        <div style={{width:72, height:72, borderRadius:"50%",
          background:"rgba(255,255,255,0.2)",
          display:"flex", alignItems:"center", justifyContent:"center",
          fontSize:28, fontWeight:900, color:"#fff",
          margin:"0 auto 12px", border:"3px solid rgba(255,255,255,0.4)"}}>
          {ini(user?.tel || "CM")}
        </div>
        <div style={{fontSize:18, fontWeight:900, color:"#fff", marginBottom:4}}>
          Compte Cash Money
        </div>
        <div style={{fontSize:13, color:"rgba(255,255,255,0.75)", fontWeight:500, marginBottom:14}}>
          {user?.tel || "—"}
        </div>
        <div style={{display:"inline-flex", alignItems:"center", gap:6, padding:"5px 14px",
          background:"rgba(255,255,255,0.15)", borderRadius:20,
          border:"1px solid rgba(255,255,255,0.25)"}}>
          <div style={{width:8, height:8, borderRadius:"50%", background:"#7FFF00"}}/>
          <span style={{fontSize:11, color:"#fff", fontWeight:700}}>Compte actif · KYC requis</span>
        </div>
      </div>

      {/* Stats */}
      <div style={{margin:"14px 14px 0"}}>
        <div style={{background:T.surface, borderRadius:18, padding:"14px 16px",
          boxShadow:T.shadow, border:`1px solid ${T.border}`,
          display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8}}>
          {[
            {label:"Envoyé",  value:`${(totalEnvoye/1000).toFixed(0)}k F`, ic:"📤", color:T.accent},
            {label:"Reçu",    value:`${(totalRecu/1000).toFixed(0)}k F`,   ic:"📥", color:"#22c55e"},
            {label:"Solde",   value:`${(totalSoldes/1000).toFixed(0)}k F`, ic:"💰", color:T.text},
          ].map(s => (
            <div key={s.label} style={{textAlign:"center", padding:"8px 4px",
              background:T.surface2, borderRadius:12, border:`1px solid ${T.border}`}}>
              <div style={{fontSize:18, marginBottom:3}}>{s.ic}</div>
              <div style={{fontSize:14, fontWeight:900, color:s.color||T.text}}>{s.value}</div>
              <div style={{fontSize:9, color:T.muted, fontWeight:500, marginTop:2}}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Menus */}
      <div style={{margin:"14px 14px 0"}}>
        <div style={{background:T.surface, borderRadius:18, overflow:"hidden",
          boxShadow:T.shadow, border:`1px solid ${T.border}`}}>
          {menus.map((m, i) => (
            <div key={m.titre}
              style={{display:"flex", alignItems:"center", gap:14, padding:"14px 16px",
                borderBottom: i < menus.length-1 ? `1px solid ${T.border}` : "none",
                cursor:"pointer"}}
              className="btn-press">
              <div style={{width:40, height:40, borderRadius:12,
                background:T.surface2, display:"flex", alignItems:"center",
                justifyContent:"center", fontSize:18, border:`1px solid ${T.border}`,
                flexShrink:0}}>{m.ic}</div>
              <div style={{flex:1}}>
                <div style={{fontSize:13, fontWeight:700, color:T.text}}>{m.titre}</div>
                <div style={{fontSize:11, color:T.muted, fontWeight:500, marginTop:1}}>{m.desc}</div>
              </div>
              <ChevR/>
            </div>
          ))}
        </div>
      </div>

      {/* Mode sombre toggle */}
      <div style={{margin:"12px 14px 0"}}>
        <div style={{background:T.surface, borderRadius:16, padding:"14px 16px",
          boxShadow:T.shadow, border:`1px solid ${T.border}`,
          display:"flex", alignItems:"center", justifyContent:"space-between"}}>
          <div style={{display:"flex", alignItems:"center", gap:10}}>
            <div style={{fontSize:20}}>{T.name==="dark" ? "🌙" : "☀️"}</div>
            <div>
              <div style={{fontSize:13, fontWeight:700, color:T.text}}>Mode d'affichage</div>
              <div style={{fontSize:11, color:T.muted, fontWeight:500}}>
                {T.name==="dark" ? "Mode sombre activé" : "Mode clair activé"}
              </div>
            </div>
          </div>
          <button onClick={toggleTheme} className="btn-press"
            style={{width:50, height:28, borderRadius:14,
              background: T.name==="dark" ? T.accent : T.border,
              border:"none", cursor:"pointer", position:"relative", transition:"background .2s"}}>
            <div style={{position:"absolute", top:3, left: T.name==="dark" ? 24 : 3,
              width:22, height:22, borderRadius:"50%", background:"#fff",
              transition:"left .2s", boxShadow:"0 2px 6px rgba(0,0,0,.3)"}}/>
          </button>
        </div>
      </div>

      {/* Déconnexion */}
      <div style={{margin:"12px 14px 40px"}}>
        <button onClick={onLogout} className="btn-press"
          style={{width:"100%", padding:14, borderRadius:16,
            background:`${T.danger}18`, border:`1.5px solid ${T.danger}55`,
            color:T.danger, fontSize:14, fontWeight:800, cursor:"pointer",
            display:"flex", alignItems:"center", justifyContent:"center", gap:8}}>
          🚪 Se déconnecter
        </button>
      </div>
    </div>
  );
}

// ── NAV BAR ───────────────────────────────────────────────────────────────────
function NavBar({screen, onNav}) {
  const {theme:T} = useTheme();
  const {notifs} = useApp();
  const nbUnlu = notifs.filter(n => !n.lu).length;
  const items = [
    {id:"home",   ic:"🏠", label:"Accueil"},
    {id:"send",   ic:"✈️", label:"Envoyer"},
    {id:"histo",  ic:"📋", label:"Historique"},
    {id:"profil", ic:"👤", label:"Profil"},
  ];
  const idx = items.findIndex(it => it.id === screen);
  const prevScreen = idx > 0 ? items[idx-1].id : null;
  const nextScreen = idx < items.length-1 ? items[idx+1].id : null;

  return (
    <div style={{background:T.navBg, borderTop:`1px solid ${T.border}`,
      display:"flex", alignItems:"center", padding:"8px 0 calc(8px + env(safe-area-inset-bottom,0px))",
      boxShadow:"0 -4px 20px rgba(0,0,0,.06)", position:"sticky", bottom:0, zIndex:20}}>
      {/* Chevron gauche */}
      <button onClick={() => prevScreen && onNav(prevScreen)}
        style={{background:"none", border:"none", cursor: prevScreen?"pointer":"default",
          padding:"0 10px", opacity: prevScreen ? 1 : 0.2, color:T.muted, flexShrink:0}}>
        <ChevL/>
      </button>

      {/* Onglets */}
      {items.map(it => {
        const active = screen === it.id;
        return (
          <button key={it.id} onClick={() => onNav(it.id)}
            className="btn-press"
            style={{flex:1, display:"flex", flexDirection:"column", alignItems:"center",
              gap:3, background:"none", border:"none", cursor:"pointer", padding:"4px 0",
              position:"relative"}}>
            <div style={{fontSize:20, transition:"transform .2s",
              transform: active ? "scale(1.2)" : "scale(1)"}}>{it.ic}</div>
            <div style={{fontSize:9, fontWeight:active?800:500,
              color: active ? T.accent : T.muted, transition:"color .2s"}}>
              {it.label}
            </div>
            {active && (
              <div style={{position:"absolute", bottom:-2, left:"50%",
                transform:"translateX(-50%)", width:20, height:3,
                borderRadius:2, background:T.accent}}/>
            )}
            {it.id === "home" && nbUnlu > 0 && (
              <div style={{position:"absolute", top:0, right:"20%",
                background:"#e53e3e", color:"#fff", borderRadius:"50%",
                width:14, height:14, fontSize:8, fontWeight:800,
                display:"flex", alignItems:"center", justifyContent:"center"}}>
                {nbUnlu}
              </div>
            )}
          </button>
        );
      })}

      {/* Chevron droit */}
      <button onClick={() => nextScreen && onNav(nextScreen)}
        style={{background:"none", border:"none", cursor: nextScreen?"pointer":"default",
          padding:"0 10px", opacity: nextScreen ? 1 : 0.2, color:T.muted, flexShrink:0}}>
        <ChevR/>
      </button>
    </div>
  );
}

// ── PROVIDERS ─────────────────────────────────────────────────────────────────
function ThemeProvider({children}) {
  const [themeName, setThemeName] = useState("light");
  const theme = THEMES[themeName];
  const toggleTheme = () => setThemeName(n => n === "light" ? "dark" : "light");
  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
}

function AppProvider({children}) {
  const [user, setUser]               = useState(null);
  const [contacts, setContacts]       = useState(CONTACTS_INIT);
  const [histo, setHisto]             = useState(HISTO_INIT);
  const [notifs, setNotifs]           = useState(NOTIFS_INIT);
  const [opSoldes, setOpSoldes]       = useState(OP_SOLDES_INIT);
  const [opActif, setOpActif]         = useState("MTN");
  const [soldeVisible, setSoldeVisible] = useState(true);
  const [isOnline, setIsOnline]       = useState(true);
  const [taux, setTaux]               = useState(generateTaux());
  const [taux_update, setTauxUpdate]  = useState(new Date().toLocaleTimeString("fr-FR",{hour:"2-digit",minute:"2-digit"}));
  const [incomingTx, setIncomingTx]   = useState(null);

  useEffect(() => {
    const handleOnline  = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener("online",  handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online",  handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Rafraîchir taux toutes les 5 min
  useEffect(() => {
    const interval = setInterval(() => {
      setTaux(generateTaux());
      setTauxUpdate(new Date().toLocaleTimeString("fr-FR",{hour:"2-digit",minute:"2-digit"}));
    }, 300000);
    return () => clearInterval(interval);
  }, []);

  const login = (u) => { setUser(u); setOpActif(PAYS.find(p=>p.code===u.pays?.code)?.ops[0] || "MTN"); };
  const logout = () => setUser(null);

  const addTransaction = (tx) => {
    const newTx = {
      id: Date.now(),
      type:"envoi",
      dest: tx.dest, from: null, flag: tx.pays?.flag||"🌍",
      mnt: tx.mnt, recu: tx.mnt, dev: tx.pays?.devise||"XAF",
      op: tx.op, date: fmtDate(), ok: true
    };
    setHisto(h => [newTx, ...h]);
    setOpSoldes(s => ({...s, [opActif]: Math.max(0, (s[opActif]||0) - tx.total)}));
    setNotifs(n => [{
      id: Date.now(), ic:"✅",
      titre:"Transfert confirmé",
      msg:`${fmtNum(tx.mnt)} FCFA envoyés à ${tx.dest} via ${tx.op}`,
      heure:"À l'instant", lu:false
    }, ...n]);
  };

  const simulateReception = (from, mnt, op) => {
    const flags = {"🇫🇷":true,"🇧🇪":true,"🇨🇭":true};
    const newTx = {
      id: Date.now(),
      type:"reception",
      dest:"Vous", from,
      flag: Object.keys(flags)[Math.floor(Math.random()*3)],
      mnt, recu:mnt, dev:"XAF",
      op, date: fmtDate(), ok:true
    };
    setHisto(h => [newTx, ...h]);
    setOpSoldes(s => ({...s, [op]: (s[op]||0) + mnt}));
    setNotifs(n => [{
      id: Date.now(), ic:"💰",
      titre:"Argent reçu ! 🎉",
      msg:`${from} vous a envoyé ${fmtNum(mnt)} XAF via ${op}`,
      heure:"À l'instant", lu:false
    }, ...n]);
    setIncomingTx({from, mnt, op});
    setTimeout(() => setIncomingTx(null), 5000);
  };

  const toggleFavori = (id) => {
    setContacts(cs => cs.map(c => c.id===id ? {...c, favori:!c.favori} : c));
  };

  const markAllNotifs = () => setNotifs(n => n.map(nn => ({...nn, lu:true})));

  return (
    <AppContext.Provider value={{
      user, login, logout,
      contacts, setContacts, toggleFavori,
      histo, setHisto, addTransaction, simulateReception,
      notifs, setNotifs, markAllNotifs,
      opSoldes, setOpSoldes,
      opActif, setOpActif,
      soldeVisible, setSoldeVisible,
      isOnline, taux, taux_update,
      incomingTx, setIncomingTx,
    }}>
      {children}
    </AppContext.Provider>
  );
}

// ── APP PRINCIPAL ─────────────────────────────────────────────────────────────
function AppInner() {
  const {theme:T} = useTheme();
  const {user, login, logout, addTransaction, notifs, markAllNotifs} = useApp();
  const [appReady, setAppReady]   = useState(false);
  const [screen, setScreen]       = useState("splash");
  const [sendContact, setSendContact] = useState(null);
  const [txSuccess, setTxSuccess] = useState(null);

  if (!appReady) return <Splash onDone={() => { setAppReady(true); setScreen(user ? "home" : "auth"); }}/>;

  if (!user) return <Auth onLogin={(u) => { login(u); setScreen("home"); }}/>;

  const handleSend = (contact=null) => {
    setSendContact(contact||null);
    setScreen("send");
  };

  const handleSuccess = (data) => {
    addTransaction(data);
    setTxSuccess(data);
    setScreen("success");
  };

  const handleHome = () => {
    setTxSuccess(null);
    setSendContact(null);
    setScreen("home");
  };

  const showNav = ["home","histo","profil"].includes(screen);

  return (
    <div style={{
      display:"flex", flexDirection:"column",
      height:"100dvh", maxWidth:430,
      margin:"0 auto", background:T.bg,
      overflow:"hidden", position:"relative",
      fontFamily:"'Plus Jakarta Sans', system-ui, sans-serif",
    }}>
      <style>{makeCss(T)}</style>

      <div style={{flex:1, overflowY:"auto", display:"flex", flexDirection:"column"}}>
        {screen === "home" && (
          <Home
            onSend={handleSend}
            onHisto={() => setScreen("histo")}
            onProfil={() => setScreen("profil")}
            onNotifs={() => setScreen("notifs")}
          />
        )}
        {screen === "send" && (
          <Send
            onBack={handleHome}
            onSuccess={handleSuccess}
            preContact={sendContact}
          />
        )}
        {screen === "success" && (
          <Success
            data={txSuccess}
            onHome={handleHome}
            onNewSend={() => { setTxSuccess(null); setScreen("send"); }}
          />
        )}
        {screen === "histo" && <Histo onBack={handleHome}/>}
        {screen === "profil" && (
          <Profil
            onBack={handleHome}
            onLogout={() => { logout(); setScreen("auth"); setAppReady(false); }}
          />
        )}
        {screen === "notifs" && (
          <Notifications
            notifs={notifs}
            onBack={handleHome}
            onMarkAll={markAllNotifs}
          />
        )}
      </div>

      {showNav && <NavBar screen={screen} onNav={setScreen}/>}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppProvider>
        <AppInner/>
      </AppProvider>
    </ThemeProvider>
  );
}
