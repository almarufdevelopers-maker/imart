import { useEffect, useState } from "react";
import appimage from "./assets/1.webp";
import shotSurahs from "./assets/shot-surahs.webp";
import shotReading from "./assets/shot-reading.webp";
import shotStreak from "./assets/shot-streak.webp";

const PLAY_URL = "https://play.google.com/store/apps/details?id=com.jamia26.myquranapp";
const APP_NAME = "MyQuran App";

const GREEN = "#0f3226";
const GREEN2 = "#1c4a3a";
const GREEN3 = "#2a6650";
const GOLD = "#f5d90a";
const DARK_BG = "#06120e"; 
const PAPER = "#fbfaf6";
const INK = "#2a3b33";
const MUTED = "#556b60"; 

const features = [
  ["📖", "Read the Quran in 10 languages", "English, French, Spanish, Indonesian, Turkish, Urdu, Bengali, Chinese, Russian and Swedish. Switch with one tap."],
  ["🎧", "Quran audio, verse by verse", "Listen to 16 reciters including Sudais, Alafasy and Abdul Basit. Autoplay, skip ayahs and change reciter mid-surah."],
  ["📚", "Tafsir Ibn Kathir offline", "The complete tafsir for all 114 surahs, ayah by ayah, with no internet needed."],
  ["🔥", "Daily Quran reading streak", "Track your current streak, longest streak and total days read. Gentle reminders work offline."],
  ["🔖", "Bookmarks and private reflections", "Save any verse with its Arabic text, translation and date. Write notes that stay on your phone."],
  ["🔍", "Search the Quran offline", "Search by surah name, jump to surah:ayah, or find any word across the translation."],
];

const stats = [["10", "languages"], ["16", "reciters"], ["114", "surahs with tafsir"]];

const shots = [
  [shotSurahs, "Find any surah fast", "Search by name, ayah or word."],
  [shotReading, "Read and listen", "Arabic, translation, audio and tafsir for every ayah."],
  [shotStreak, "Keep your streak", "Track your reading and get daily reminders."],
];

const trust = ["Free to download", "No ads", "No subscriptions", "Works offline"];

const languages = ["English", "French", "Spanish", "Indonesian", "Turkish", "Urdu", "Bengali", "Chinese", "Russian", "Swedish"];

const reciters = [
  "Abdurrahman As-Sudais", "Mishary Rashid Alafasy", "Abdul Basit (Murattal)", "Abdul Basit (Mujawwad)",
  "Saad Al-Ghamdi", "Saood Ash-Shuraym", "Yasser Ad-Dussary", "Abdullah Basfar",
  "Ali Jaber", "Hudhaify", "Salaah Bukhatir", "Abdul Samad",
];

const audience = [
  "Anyone starting their journey with the Quran",
  "Huffaz and students reviewing memorization",
  "Students of tafsir and translation",
  "Parents teaching children at home",
  "New Muslims learning in their own language",
  "Daily readers building a habit",
];

const faqs = [
  ["What is MyQuran App?", "MyQuran App is a free Quran app for Android with translation in 10 languages, verse-by-verse audio by 16 reciters, offline Tafsir Ibn Kathir, bookmarks, reflections and a daily reading streak."],
  ["Is MyQuran App free? Are there ads?", "MyQuran App is free to download and use, with no ads and no subscriptions. Optional in-app purchases are available if you want to support the developers."],
  ["Does the Quran app work offline?", "Yes. You can read the Quran, Tafsir Ibn Kathir, bookmarks and reflections without internet. Only audio recitation needs a connection."],
  ["Which languages does the Quran translation support?", "English, French, Spanish, Indonesian, Turkish, Urdu, Bengali, Chinese, Russian and Swedish. The app opens in your device language and you can change it in Settings."],
  ["Which reciters are in the app?", "16 reciters including Abdurrahman As-Sudais, Mishary Rashid Alafasy, Abdul Basit (Murattal and Mujawwad), Saad Al-Ghamdi and Saood Ash-Shuraym, with translated recitations in English, Persian and Urdu."],
  ["Is MyQuran App available on iPhone?", "Not yet. MyQuran App is available on Android 7.0 and up through Google Play. The download is about 118 MB because the Quran text and tafsir are stored offline."],
];

const track = (place) => {
  try {
    if (typeof window !== "undefined" && window.gtag) window.gtag("event", "download_click", { location: place });
  } catch (e) {
    /* analytics must never break the page */
  }
};

const css = `
.mq *{box-sizing:border-box}
.mq a:focus-visible,.mq button:focus-visible{outline:3px solid ${GOLD};outline-offset:3px}
.mq-wrap{max-width:1100px;margin:0 auto;width:100%;padding:0 clamp(16px,4vw,48px)}
.mq-badge{transition:transform .2s ease,border-color .2s ease}
.mq-badge:hover{transform:translateY(-2px);border-color:#fff}
.mq-hero{display:grid;gap:clamp(20px,5vw,64px);align-items:center;grid-template-columns:1fr}
.mq-grid{display:grid;gap:18px;grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr))}
.mq-two{display:grid;gap:32px;grid-template-columns:repeat(auto-fit,minmax(min(100%,320px),1fr))}
/* Desktop/tablet: three phones in a row */
.mq-row{display:none}
/* Mobile: overlapping fan of three phones, all visible at once */
.mq-fan{display:flex;justify-content:center;align-items:center;padding:8px 0 4px;overflow:hidden}
.mq-ph{flex:none;background:#0a1a14;border:2px solid ${GREEN3};padding:5px;border-radius:26px;box-shadow:0 18px 38px rgba(0,0,0,.28)}
.mq-ph img{display:block;width:100%;height:auto;border-radius:21px}
.mq-ph.side{width:min(30vw,150px);margin:0 calc(-1 * min(7vw,36px));position:relative;z-index:1}
.mq-ph.side.l{transform:translateY(22px) rotate(-7deg)}
.mq-ph.side.r{transform:translateY(22px) rotate(7deg)}
.mq-ph.mid{width:min(42vw,210px);position:relative;z-index:2;border-radius:30px;border-color:${GOLD};box-shadow:0 26px 50px rgba(0,0,0,.38)}
.mq-ph.mid img{border-radius:25px}
.mq-ph.side img{filter:brightness(.88)}
.mq-notes{list-style:none;margin:34px auto 0;padding:0 clamp(16px,4vw,48px);max-width:460px;display:grid;gap:10px}
.mq-notes li{display:block;background:#0a1a14;border-radius:16px;padding:12px 16px;border:1px solid rgba(255,255,255,.1);border-left:4px solid ${GOLD};text-align:left}
.mq-notes b{display:block;font-size:16px;color:#fff}
.mq-notes span{font-size:14px;color:#9eb8ab}
.mq-bar{display:flex}
@media (min-width:640px){.mq-hero{grid-template-columns:1.1fr .9fr}}
@media (min-width:860px){
  .mq-fan,.mq-notes{display:none}
  .mq-row{display:flex;justify-content:center;gap:clamp(24px,4vw,56px)}
  .mq-shot{flex:1 1 0;max-width:300px;margin:0;text-align:center}
  .mq-bar{display:none}
}
@media (max-width:639px){
  .mq-hero-text{text-align:center}
  .mq-hero-text .mq-trust{justify-content:center}
  .mq-hero-text .mq-cta{display:flex;justify-content:center}
  .mq-chip{margin-left:auto;margin-right:auto}
}
@media (prefers-reduced-motion:reduce){.mq *{transition:none!important;scroll-behavior:auto!important}}
`;

function PlayLogo({ size = 30 }) {
  return (
    <svg width={size} height={size} viewBox="30 0 480 512" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path fill="#00A0FF" d="M48.2 28.5c-3.1 3.3-4.9 8.4-4.9 15v424.9c0 6.6 1.8 11.7 4.9 15l.8.8L287.7 245v-5.8L49 27.7l-.8.8z" />
      <path fill="#FFE000" d="M367.2 325.6l-79.5-79.6v-5.8l79.5-79.6 1.8 1 94.2 53.5c26.9 15.3 26.9 40.3 0 55.6l-94.2 53.5-1.8 1z" />
      <path fill="#FF3A44" d="M369 324.6L287.7 243 48.2 482.5c8.9 9.4 23.5 10.5 40 1.2L369 324.6z" />
      <path fill="#00F076" d="M369 161.4L88.2 2.3c-16.5-9.3-31.1-8.2-40 1.2L287.7 243 369 161.4z" />
    </svg>
  );
}

function PlayBadge({ place }) {
  return (
    <a
      className="mq-badge"
      href={PLAY_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Download MyQuran App on Google Play"
      onClick={() => track(place)}
      style={{
        display: "inline-flex", alignItems: "center", gap: 12, textDecoration: "none", color: "#fff",
        background: "#000", border: "1.5px solid #a6a6a6", borderRadius: 14, padding: "10px 24px 10px 18px",
        minHeight: 60, boxShadow: "0 10px 30px rgba(0,0,0,.35)", width: "100%", maxWidth: 300, justifyContent: "center",
      }}
    >
      <PlayLogo />
      <span style={{ display: "flex", flexDirection: "column", lineHeight: 1, textAlign: "left" }}>
        <small style={{ fontSize: 11, letterSpacing: ".6px", fontWeight: 500, opacity: 0.9 }}>Get it on</small>
        <strong style={{ fontSize: 25, fontWeight: 600, letterSpacing: "-.3px", marginTop: 3 }}>Google Play</strong>
      </span>
    </a>
  );
}

function PhoneMockup() {
  return (
    <div style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "flex-end", width: "100%", minHeight: 260 }}>
      <div style={{ position: "absolute", width: "80%", height: "70%", top: "10%", borderRadius: "50%", background: "rgba(245,217,10,.18)", filter: "blur(70px)" }} />
      <div
        style={{
          position: "relative", width: "min(250px, 62vw)", background: "#0a1a14", borderRadius: "36px 36px 0 0",
          padding: "9px 9px 0", border: "2px solid rgba(255,255,255,.18)", borderBottom: 0, boxShadow: "0 30px 70px rgba(0,0,0,.45)",
        }}
      >
        <img
          src={shotReading}
          alt="MyQuran App reading screen with Arabic Quran text, translation and verse-by-verse audio"
          width="540" height="1170" loading="eager" fetchPriority="high"
          style={{ display: "block", width: "100%", height: "auto", borderRadius: "28px 28px 0 0" }}
        />
      </div>
    </div>
  );
}

function Screenshots({ h2Style }) {
  const [left, mid, right] = [shots[0], shots[1], shots[2]];
  return (
    <section id="screenshots" aria-labelledby="screenshots-title" style={{ padding: "clamp(40px,7vw,90px) 0", background: DARK_BG }}>
      <div className="mq-wrap">
        <h2 id="screenshots-title" style={h2Style}>See MyQuran App in action</h2>
      </div>

      {/* Mobile: fanned phones + short notes */}
      <div className="mq-fan" role="img" aria-label="Three MyQuran App screens: surah search, reading with audio, and reading streak">
        <div className="mq-ph side l"><img src={left[0]} alt="" width="540" height="1170" loading="lazy" /></div>
        <div className="mq-ph mid"><img src={mid[0]} alt="" width="540" height="1170" loading="lazy" /></div>
        <div className="mq-ph side r"><img src={right[0]} alt="" width="540" height="1170" loading="lazy" /></div>
      </div>
      <ul className="mq-notes">
        {shots.map(([, title, text]) => (
          <li key={title}><b>{title}</b><span>{text}</span></li>
        ))}
      </ul>

      {/* Desktop and tablet: three phones side by side */}
      <div className="mq-wrap">
        <div className="mq-row">
          {shots.map(([src, title, text]) => (
            <figure key={title} className="mq-shot">
              <div style={{ background: "#0a1a14", borderRadius: 32, padding: 6, boxShadow: "0 18px 40px rgba(0,0,0,.25)", border: "2px solid " + GREEN3 }}>
                <img src={src} alt={`${title}: MyQuran App Quran app screenshot`} loading="lazy" width="540" height="1170" style={{ display: "block", width: "100%", height: "auto", borderRadius: 26 }} />
              </div>
              <figcaption style={{ marginTop: 16 }}>
                <b style={{ display: "block", fontSize: 17, color: "#fff" }}>{title}</b>
                <span style={{ fontSize: 14.5, color: "#9eb8ab" }}>{text}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Homepage() {
  const [showBar, setShowBar] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowBar(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Full meta tags, Open Graph and JSON-LD live in index.html so crawlers (WhatsApp, Facebook, Google) see them.
  useEffect(() => {
    document.documentElement.lang = "en";
    document.title = "MyQuran App: Free Quran App with Translation, Audio & Tafsir";
    
    // Force the mobile system status bar to be green
    let metaThemeColor = document.querySelector("meta[name='theme-color']");
    if (!metaThemeColor) {
      metaThemeColor = document.createElement("meta");
      metaThemeColor.name = "theme-color";
      document.head.appendChild(metaThemeColor);
    }
    metaThemeColor.setAttribute("content", GREEN);
  }, []);

  // Styles for white background sections
  const h2DarkStyle = {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: "clamp(24px, 5.5vw, 38px)",
    lineHeight: 1.2,
    letterSpacing: "-.5px",
    margin: "0 0 clamp(20px, 4vw, 36px)",
    textAlign: "center",
    color: GREEN, // Dark text for white background
  };
  
  const h2LeftDark = { ...h2DarkStyle, textAlign: "left", fontSize: "clamp(22px, 4.5vw, 30px)", margin: "0 0 12px" };

  const whiteCardStyle = {
    background: "#fff", 
    borderRadius: 22, 
    padding: "clamp(18px, 4vw, 26px)",
    border: "1px solid rgba(15,50,38,.07)", 
    boxShadow: "0 6px 24px rgba(15,50,38,.05)",
  };
  
  const sectionPad = { padding: "clamp(40px, 7vw, 80px) 0" };
  const listStyle = { listStyle: "none", padding: 0, margin: 0, display: "flex", flexWrap: "wrap", gap: "8px 18px", color: INK, fontSize: 14.5 };
  const tick = <span style={{ color: GREEN3, fontWeight: 800 }} aria-hidden="true">✓</span>;

  return (
    <div className="mq" style={{ fontFamily: "system-ui, -apple-system, sans-serif", color: INK, background: PAPER, lineHeight: 1.65, width: "100%", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{css}</style>

      {/* HERO (Green Background) */}
      <header
        style={{
          position: "relative", color: "#fff", overflow: "hidden", padding: "clamp(32px, 7vw, 90px) 0 0",
          background: "radial-gradient(900px 500px at 85% 20%, rgba(245,217,10,.14), transparent 60%), linear-gradient(135deg, " + GREEN + " 0%, " + GREEN2 + " 100%)",
        }}
      >
        <div className="mq-wrap mq-hero">
          <div className="mq-hero-text" style={{ paddingBottom: "clamp(8px, 4vw, 80px)" }}>
            <div
              className="mq-chip"
              style={{ display: "flex", width: "fit-content", alignItems: "center", gap: 10, padding: "6px 16px 6px 6px", borderRadius: 999, background: "rgba(255,255,255,.1)", border: "1px solid rgba(255,255,255,.14)", fontWeight: 600, fontSize: 15, marginBottom: 20 }}
            >
              <img src={appimage} alt="MyQuran App icon" width="32" height="32" style={{ width: 32, height: 32, borderRadius: 10, objectFit: "cover" }} />
              <span>{APP_NAME}</span>
            </div>
            <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: "clamp(30px, 7.5vw, 58px)", lineHeight: 1.1, letterSpacing: "-1px", margin: "0 0 16px" }}>
              Free Quran app with translation, audio and offline tafsir
            </h1>
            <p style={{ fontSize: "clamp(16px, 4vw, 20px)", color: "#d6e4dc", maxWidth: "30em", margin: "0 auto 28px 0" }}>
              {APP_NAME} lets you read the Quran in 10 languages, listen to 16 reciters and study Tafsir Ibn Kathir offline. No ads. No subscriptions.
            </p>
            <div className="mq-cta"><PlayBadge place="hero" /></div>
            <p style={{ margin: "10px 0 0", fontSize: 13.5, color: "#b9cdc3" }}>Android 7.0 and up · iPhone version not available yet</p>
            <ul className="mq-trust" style={{ listStyle: "none", padding: 0, margin: "20px 0 0", display: "flex", flexWrap: "wrap", gap: "8px 18px", fontSize: 14.5, color: "#cfe0d6" }}>
              {trust.map((t) => (
                <li key={t}><span style={{ color: GOLD, fontWeight: 800 }} aria-hidden="true">✓</span> {t}</li>
              ))}
            </ul>
          </div>
          <PhoneMockup />
        </div>
      </header>

      <main>
        {/* STATS (Transition strip) */}
        <section aria-label="MyQuran App at a glance" style={{ background: GREEN2, borderTop: "1px solid rgba(255,255,255,.06)", padding: "26px 0", borderBottom: "1px solid rgba(255,255,255,.05)" }}>
          <div className="mq-wrap" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, textAlign: "center" }}>
            {stats.map(([n, label]) => (
              <div key={label}>
                <b style={{ display: "block", fontFamily: "'Playfair Display', serif", fontSize: "clamp(26px, 6vw, 42px)", color: GOLD, lineHeight: 1.1 }}>{n}</b>
                <span style={{ fontSize: "clamp(12px, 3vw, 15px)", color: "#b9cdc3" }}>{label}</span>
              </div>
            ))}
          </div>
        </section>

        <Screenshots h2Style={{ ...h2DarkStyle, color: "#fff" }} />

        {/* FEATURES (White Background) */}
        <section id="features" aria-labelledby="features-title" style={{ ...sectionPad, background: "#fff" }}>
          <div className="mq-wrap">
            <h2 id="features-title" style={h2DarkStyle}>Everything you need to read the Quran every day</h2>
            <div className="mq-grid">
              {features.map(([icon, title, text]) => (
                <article key={title} style={whiteCardStyle}>
                  <div aria-hidden="true" style={{ width: 52, height: 52, borderRadius: 16, display: "grid", placeItems: "center", fontSize: 26, background: "linear-gradient(135deg, " + GREEN + ", " + GREEN3 + ")", marginBottom: 16 }}>{icon}</div>
                  <h3 style={{ margin: "0 0 8px", fontSize: "clamp(17px, 4vw, 20px)", color: GREEN2, fontWeight: 700 }}>{title}</h3>
                  <p style={{ margin: 0, color: MUTED, fontSize: "clamp(14px, 3.5vw, 16px)" }}>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* LANGUAGES + RECITERS (White Background) */}
        <section id="languages" aria-labelledby="lang-title" style={{ paddingBottom: "clamp(40px, 7vw, 80px)", background: "#fff" }}>
          <div className="mq-wrap mq-two">
            <div>
              <h2 id="lang-title" style={h2LeftDark}>Quran translation in 10 languages</h2>
              <p style={{ color: MUTED, margin: "0 0 14px" }}>
                Read the Quran in English, Urdu, Indonesian, Bengali and more. The app opens in your device language and you can switch anytime in Settings.
              </p>
              <ul style={listStyle}>{languages.map((l) => <li key={l}>{tick} {l}</li>)}</ul>
            </div>
            <div>
              <h2 style={h2LeftDark}>Quran audio by 16 reciters</h2>
              <p style={{ color: MUTED, margin: "0 0 14px" }}>
                Continuous autoplay, skip between ayahs and switch reciters mid-surah. Translated recitations are also available in English, Persian and Urdu. Reciters include:
              </p>
              <ul style={listStyle}>{reciters.map((r) => <li key={r}>{tick} {r}</li>)}</ul>
            </div>
          </div>
        </section>

        {/* WHO IT'S FOR (White Background) */}
        <section id="who" aria-labelledby="who-title" style={{ paddingBottom: "clamp(40px, 7vw, 80px)", background: "#fff" }}>
          <div className="mq-wrap" style={{ maxWidth: 820 }}>
            <h2 id="who-title" style={h2DarkStyle}>Made for every reader of the Quran</h2>
            <ul style={{ ...listStyle, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))", gap: 12, fontSize: 16 }}>
              {audience.map((a) => <li key={a} style={{ ...whiteCardStyle, padding: "14px 18px" }}>{tick} {a}</li>)}
            </ul>
          </div>
        </section>

        {/* FAQ (White Background) */}
        <section id="faq" aria-labelledby="faq-title" style={{ paddingBottom: "clamp(40px, 7vw, 80px)", background: "#fff" }}>
          <div className="mq-wrap" style={{ maxWidth: 820 }}>
            <h2 id="faq-title" style={h2DarkStyle}>Frequently asked questions</h2>
            <div style={{ display: "grid", gap: 12 }}>
              {faqs.map(([q, a]) => (
                <details key={q} style={{ ...whiteCardStyle, padding: "16px 20px" }}>
                  <summary style={{ cursor: "pointer", fontWeight: 700, color: GREEN2, fontSize: "clamp(16px, 4vw, 18px)" }}>{q}</summary>
                  <p style={{ margin: "10px 0 0", color: MUTED, fontSize: "clamp(14px, 3.5vw, 16px)" }}>{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA (Green Background) */}
        <section id="download" aria-labelledby="cta-title" style={{ background: "linear-gradient(135deg, " + GREEN2 + ", " + GREEN + ")", color: "#fff", padding: "clamp(44px, 8vw, 90px) 0", textAlign: "center" }}>
          <div className="mq-wrap" style={{ maxWidth: 720, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <img src={appimage} alt="" width="84" height="84" loading="lazy" style={{ width: 84, height: 84, borderRadius: 26, objectFit: "cover", marginBottom: 22, boxShadow: "0 16px 34px rgba(0,0,0,.35)", border: "3px solid rgba(255,255,255,.15)" }} />
            <h2 id="cta-title" style={{ ...h2DarkStyle, color: "#fff", marginBottom: 12 }}>Make the Quran part of your every day</h2>
            <p style={{ margin: "0 0 28px", color: "#cfe0d6", fontSize: "clamp(16px, 4vw, 18px)" }}>Download {APP_NAME} free on Google Play.</p>
            <PlayBadge place="cta" />
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer style={{ background: GREEN, color: "#a9bcb3", textAlign: "center", fontSize: 15, padding: "32px 0 96px", borderTop: "1px solid rgba(255,255,255,.05)" }}>
        <div className="mq-wrap">
          <p style={{ margin: "0 0 8px" }}>{APP_NAME} by almarufdevelopers</p>
          <p style={{ margin: 0, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12 }}>
            <a href="mailto:almarufdevelopers@gmail.com" style={{ color: "#fff", textDecoration: "none", fontWeight: 500 }}>almarufdevelopers@gmail.com</a>
            <span aria-hidden="true">|</span>
            <a href="/privacy" style={{ color: "#fff", textDecoration: "none", fontWeight: 500 }}>Privacy policy</a>
          </p>
        </div>
      </footer>

      {/* STICKY INSTALL BAR (mobile only) */}
      <div
        className="mq-bar"
        aria-hidden={!showBar}
        style={{
          alignItems: "center", gap: 12, position: "fixed", left: 12, right: 12,
          bottom: "calc(12px + env(safe-area-inset-bottom, 0px))", zIndex: 50, background: "rgba(15,50,38,.96)", color: "#fff",
          padding: "10px 12px", borderRadius: 20, border: "1px solid rgba(255,255,255,.14)", boxShadow: "0 12px 34px rgba(0,0,0,.4)",
          transform: showBar ? "none" : "translateY(160%)", transition: "transform .3s ease",
        }}
      >
        <img src={appimage} alt="" width="42" height="42" loading="lazy" style={{ width: 42, height: 42, borderRadius: 12, objectFit: "cover", flex: "none" }} />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", lineHeight: 1.2, minWidth: 0 }}>
          <b style={{ fontSize: 15 }}>{APP_NAME}</b>
          <small style={{ color: "#b9cdc3", fontSize: 12.5 }}>Free Quran app · No ads</small>
        </div>
        <a
          href={PLAY_URL} target="_blank" rel="noopener noreferrer" tabIndex={showBar ? 0 : -1} onClick={() => track("sticky")}
          style={{ display: "inline-flex", alignItems: "center", gap: 8, background: GOLD, color: GREEN, fontWeight: 800, fontSize: 16, textDecoration: "none", padding: "12px 18px", borderRadius: 14, minHeight: 44 }}
        >
          <PlayLogo size={18} /> Install
        </a>
      </div>
    </div>
  );
}

export default Homepage;