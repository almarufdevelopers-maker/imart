import { useEffect, useMemo, useState } from "react";

// ====== EDIT THESE ======
const STORE = "iMart";
const WHATSAPP = "254724821735"; // 0724821735 in international format
const EMAIL = "abdihakimiibrahim47@gmail.com";

// Sample catalogue with online images
const PRODUCTS = [
  { id: 1, name: "Quran, Uthmani Script", cat: "Quran", price: 1800, img: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=600&auto=format&fit=crop&q=80", tint: "#dfeee6", desc: "Clear Arabic text, hardcover, easy on the eyes." },
  { id: 2, name: "Quran with English Translation", cat: "Quran", price: 2400, img: "https://images.unsplash.com/photo-1585036156171-384164a8c675?w=600&auto=format&fit=crop&q=80", tint: "#e6ecf5", desc: "Arabic and English side by side." },
  { id: 3, name: "Tajweed Quran, Colour Coded", cat: "Quran", price: 2600, img: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=600&auto=format&fit=crop&q=80", tint: "#f5e8e1", desc: "Colour-coded rules to help your recitation." },
  { id: 4, name: "Pocket Quran", cat: "Quran", price: 900, img: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=600&auto=format&fit=crop&q=80", tint: "#e4efdc", desc: "Small enough for your bag or jacket." },
  { id: 5, name: "Fortress of the Muslim", cat: "Islamic Books", price: 500, img: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80", tint: "#e1ebf3", desc: "Daily duas from the Quran and Sunnah." },
  { id: 6, name: "Stories of the Prophets", cat: "Islamic Books", price: 1500, img: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&auto=format&fit=crop&q=80", tint: "#f4ecd9", desc: "The lives of the prophets, told simply." },
  { id: 7, name: "Seerah of the Prophet ﷺ", cat: "Islamic Books", price: 1700, img: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=600&auto=format&fit=crop&q=80", tint: "#e9e4f3", desc: "A readable account of the Prophet's life." },
  { id: 8, name: "Riyad as-Salihin", cat: "Hadith", price: 2200, img: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=600&auto=format&fit=crop&q=80", tint: "#f6e6d3", desc: "Hadith on character, worship and daily life." },
  { id: 9, name: "Forty Hadith of an-Nawawi", cat: "Hadith", price: 600, img: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600&auto=format&fit=crop&q=80", tint: "#f3dede", desc: "The classic collection with short explanations." },
  { id: 10, name: "Sahih al-Bukhari, Summarised", cat: "Hadith", price: 3200, img: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=600&auto=format&fit=crop&q=80", tint: "#e0eeee", desc: "A shortened edition for everyday reading." },
  { id: 11, name: "Padded Prayer Mat", cat: "Accessories", price: 1200, img: "https://images.unsplash.com/photo-1590076215667-875d7abdd0e8?w=600&auto=format&fit=crop&q=80", tint: "#dfeee6", desc: "Soft, easy to fold, with a compass-free design." },
  { id: 12, name: "Tasbih, 99 Beads", cat: "Accessories", price: 350, img: "https://images.unsplash.com/photo-1584285405429-136bf988919c?w=600&auto=format&fit=crop&q=80", tint: "#f4ecd9", desc: "Smooth beads on a strong cord." },
  { id: 13, name: "Wooden Quran Stand", cat: "Accessories", price: 1400, img: "https://images.unsplash.com/photo-1590076215667-875d7abdd0e8?w=600&auto=format&fit=crop&q=80", tint: "#f1e4d6", desc: "Folds flat, holds large and small books." },
  { id: 14, name: "Miswak Pack of 5", cat: "Accessories", price: 250, img: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=600&auto=format&fit=crop&q=80", tint: "#e4efdc", desc: "Natural, individually wrapped." },
];
const CATS = ["All", "Quran", "Islamic Books", "Hadith", "Accessories"];

const C = {
  green: "#12372a", green2: "#1f5a43", cream: "#f7f1e6", card: "#fffdf8",
  gold: "#c8962e", ink: "#23302a", muted: "#667569", line: "#e6dccb",
};
const money = (n) => "KSh " + n.toLocaleString("en-KE");
const serif = "'Playfair Display', Georgia, serif";

function useWidth() {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 390);
  useEffect(() => {
    const f = () => setW(window.innerWidth);
    window.addEventListener("resize", f);
    return () => window.removeEventListener("resize", f);
  }, []);
  return w;
}

function Stepper({ q, onMinus, onPlus, big }) {
  const b = { width: big ? 44 : 40, height: big ? 44 : 40, border: "1px solid " + C.line, background: "#fff", borderRadius: 12, fontSize: 20, fontWeight: 700, color: C.green, cursor: "pointer" };
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
      <button aria-label="Remove one" onClick={onMinus} style={b}>−</button>
      <b style={{ minWidth: 24, textAlign: "center", color: C.ink }}>{q}</b>
      <button aria-label="Add one" onClick={onPlus} style={b}>+</button>
    </div>
  );
}

export default function IMart() {
  const w = useWidth();
  const phone = w < 640;
  const cols = w < 520 ? 2 : w < 900 ? 3 : 4;

  const [cat, setCat] = useState("All");
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState({}); // id -> qty
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState("cart"); // cart | details
  const [form, setForm] = useState({ name: "", phone: "", place: "", note: "" });

  useEffect(() => {
    document.title = "iMart | Quran, Islamic Books, Hadith & Accessories";
    document.documentElement.lang = "en";
  }, []);

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PRODUCTS.filter((p) => (cat === "All" || p.cat === cat) && (!q || (p.name + " " + p.desc).toLowerCase().includes(q)));
  }, [cat, query]);

  const lines = PRODUCTS.filter((p) => cart[p.id]).map((p) => ({ ...p, qty: cart[p.id] }));
  const count = lines.reduce((s, l) => s + l.qty, 0);
  const total = lines.reduce((s, l) => s + l.qty * l.price, 0);

  const add = (id) => setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 }));
  const sub = (id) => setCart((c) => {
    const n = { ...c };
    if (n[id] > 1) n[id] -= 1; else delete n[id];
    return n;
  });

  const closeCart = () => { setOpen(false); setStep("cart"); };
  const ready = form.name.trim() && form.phone.trim() && form.place.trim();

  const placeOrder = () => {
    const rows = lines.map((l) => `• ${l.qty} x ${l.name} (${money(l.price * l.qty)})`).join("\n");
    const msg = `Hello ${STORE}, I would like to order:\n${rows}\n\nTotal: ${money(total)}\n\nName: ${form.name}\nPhone: ${form.phone}\nDelivery area: ${form.place}${form.note ? "\nNote: " + form.note : ""}`;
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
  };

  const input = { width: "100%", boxSizing: "border-box", padding: "13px 14px", fontSize: 16, border: "1px solid " + C.line, borderRadius: 12, background: "#fff", color: C.ink, fontFamily: "inherit", outline: "none" };
  const pad = phone ? 16 : 32;

  return (
    <div style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif", background: C.cream, color: C.ink, minHeight: "100vh", lineHeight: 1.5, paddingBottom: phone && count ? 90 : 0 }}>
      {/* HEADER */}
      <header style={{ position: "sticky", top: 0, zIndex: 20, background: C.green, color: "#fff", padding: `12px ${pad}px 0`, boxShadow: "0 4px 18px rgba(0,0,0,.18)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ fontFamily: serif, fontSize: 26, fontWeight: 700, letterSpacing: "-.5px", flex: 1 }}>
              <span style={{ color: C.gold }}>i</span>Mart
            </div>
            {!phone && (
              <input aria-label="Search products" placeholder="Search Qurans, books, accessories" value={query} onChange={(e) => setQuery(e.target.value)} style={{ ...input, maxWidth: 360, background: "rgba(255,255,255,.95)" }} />
            )}
            <button onClick={() => setOpen(true)} aria-label={`Open cart, ${count} items`} style={{ position: "relative", height: 44, padding: "0 16px", borderRadius: 14, border: "1px solid rgba(255,255,255,.25)", background: "rgba(255,255,255,.1)", color: "#fff", fontSize: 15, fontWeight: 600, cursor: "pointer" }}>
              🛒 Cart
              {count > 0 && <span style={{ position: "absolute", top: -6, right: -6, minWidth: 22, height: 22, borderRadius: 11, background: C.gold, color: C.green, fontSize: 12, fontWeight: 800, display: "grid", placeItems: "center", padding: "0 5px" }}>{count}</span>}
            </button>
          </div>
          {phone && (
            <input aria-label="Search products" placeholder="Search Qurans, books, accessories" value={query} onChange={(e) => setQuery(e.target.value)} style={{ ...input, marginTop: 10 }} />
          )}
          <nav aria-label="Categories" style={{ display: "flex", gap: 8, overflowX: "auto", padding: "12px 0", scrollbarWidth: "none" }}>
            {CATS.map((c) => (
              <button key={c} onClick={() => setCat(c)} style={{ flex: "none", height: 38, padding: "0 16px", borderRadius: 999, border: "1px solid " + (cat === c ? C.gold : "rgba(255,255,255,.22)"), background: cat === c ? C.gold : "transparent", color: cat === c ? C.green : "#fff", fontWeight: 600, fontSize: 14, cursor: "pointer", whiteSpace: "nowrap" }}>{c}</button>
            ))}
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section style={{ background: `linear-gradient(135deg, ${C.green}, ${C.green2})`, color: "#fff", padding: `${phone ? 28 : 56}px ${pad}px` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: phone ? "center" : "left" }}>
          <h1 style={{ fontFamily: serif, fontSize: phone ? 28 : 46, lineHeight: 1.12, margin: "0 0 10px", letterSpacing: "-.5px" }}>Quran, Islamic books and everyday essentials</h1>
          <p style={{ margin: 0, fontSize: phone ? 15 : 18, color: "#d3e3da", maxWidth: 560 }}>Browse, add to your cart and send your order on WhatsApp. We confirm it with you directly.</p>
        </div>
      </section>

      {/* PRODUCTS */}
      <main style={{ maxWidth: 1100, margin: "0 auto", padding: `${phone ? 22 : 40}px ${pad}px 48px` }}>
        <h2 style={{ fontFamily: serif, fontSize: phone ? 22 : 28, margin: "0 0 16px", color: C.green }}>{cat === "All" ? "All products" : cat} <span style={{ fontSize: 14, fontFamily: "inherit", color: C.muted, fontWeight: 400 }}>({list.length})</span></h2>
        {list.length === 0 && <p style={{ color: C.muted }}>No products match your search. Try another word or category.</p>}
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`, gap: phone ? 12 : 20 }}>
          {list.map((p) => (
            <article key={p.id} style={{ background: C.card, border: "1px solid " + C.line, borderRadius: 18, overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: "0 4px 16px rgba(18,55,42,.06)" }}>
              <div style={{ background: p.tint, height: phone ? 112 : 150, position: "relative", overflow: "hidden" }}>
                <img
                  src={p.img}
                  alt={p.name}
                  loading="lazy"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
                <span style={{ position: "absolute", left: 10, top: 10, fontSize: 11, fontWeight: 700, color: C.green2, background: "rgba(255,255,255,.85)", padding: "3px 9px", borderRadius: 999 }}>{p.cat}</span>
              </div>
              <div style={{ padding: phone ? 12 : 16, display: "flex", flexDirection: "column", gap: 6, flex: 1 }}>
                <h3 style={{ margin: 0, fontSize: phone ? 14.5 : 16, lineHeight: 1.3, color: C.green }}>{p.name}</h3>
                <p style={{ margin: 0, fontSize: 13, color: C.muted, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{p.desc}</p>
                <div style={{ marginTop: "auto", paddingTop: 8 }}>
                  <b style={{ display: "block", fontSize: phone ? 16 : 18, marginBottom: 10, color: C.ink }}>{money(p.price)}</b>
                  {cart[p.id] ? (
                    <Stepper q={cart[p.id]} onMinus={() => sub(p.id)} onPlus={() => add(p.id)} />
                  ) : (
                    <button onClick={() => add(p.id)} style={{ width: "100%", height: 44, borderRadius: 12, border: 0, background: C.green, color: "#fff", fontWeight: 700, fontSize: 15, cursor: "pointer" }}>Add to cart</button>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>

      {/* FOOTER */}
      <footer style={{ background: C.green, color: "#b9cdc3", padding: `28px ${pad}px 36px`, textAlign: "center", fontSize: 14 }}>
        <div style={{ fontFamily: serif, fontSize: 22, color: "#fff", marginBottom: 6 }}><span style={{ color: C.gold }}>i</span>Mart</div>
        <p style={{ margin: "0 0 6px" }}>Order on WhatsApp: <a href={`https://wa.me/${WHATSAPP}`} style={{ color: "#fff" }}>+{WHATSAPP}</a></p>
        <p style={{ margin: 0 }}><a href={`mailto:${EMAIL}`} style={{ color: "#fff" }}>{EMAIL}</a></p>
      </footer>

      {/* FLOATING CART BAR (phones) */}
      {phone && count > 0 && !open && (
        <button onClick={() => setOpen(true)} style={{ position: "fixed", left: 12, right: 12, bottom: "calc(12px + env(safe-area-inset-bottom, 0px))", zIndex: 30, height: 58, borderRadius: 18, border: 0, background: C.gold, color: C.green, fontSize: 16, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px", boxShadow: "0 12px 30px rgba(0,0,0,.3)", cursor: "pointer" }}>
          <span>🛒 View cart · {count} {count === 1 ? "item" : "items"}</span>
          <span>{money(total)}</span>
        </button>
      )}

      {/* CART PANEL */}
      {open && (
        <div style={{ position: "fixed", inset: 0, zIndex: 40 }}>
          <div onClick={closeCart} style={{ position: "absolute", inset: 0, background: "rgba(8,20,15,.55)" }} />
          <aside role="dialog" aria-label="Your cart" style={{ position: "absolute", background: C.card, display: "flex", flexDirection: "column", ...(phone ? { left: 0, right: 0, bottom: 0, maxHeight: "90vh", borderRadius: "22px 22px 0 0" } : { top: 0, right: 0, bottom: 0, width: 420 }) }}>
            <div style={{ display: "flex", alignItems: "center", padding: "16px 20px", borderBottom: "1px solid " + C.line }}>
              <h2 style={{ margin: 0, flex: 1, fontFamily: serif, fontSize: 22, color: C.green }}>{step === "cart" ? "Your cart" : "Delivery details"}</h2>
              <button onClick={closeCart} aria-label="Close cart" style={{ width: 40, height: 40, borderRadius: 12, border: "1px solid " + C.line, background: "#fff", fontSize: 18, cursor: "pointer" }}>✕</button>
            </div>

            <div style={{ overflowY: "auto", padding: 20, flex: 1 }}>
              {lines.length === 0 ? (
                <p style={{ color: C.muted, textAlign: "center", margin: "30px 0" }}>Your cart is empty. Add something from the shop.</p>
              ) : step === "cart" ? (
                <div style={{ display: "grid", gap: 14 }}>
                  {lines.map((l) => (
                    <div key={l.id} style={{ display: "flex", gap: 12, alignItems: "center" }}>
                      <div style={{ width: 56, height: 56, borderRadius: 14, overflow: "hidden", flex: "none" }}>
                        <img src={l.img} alt={l.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontWeight: 700, fontSize: 14.5, color: C.green, lineHeight: 1.3 }}>{l.name}</div>
                        <div style={{ fontSize: 13, color: C.muted }}>{money(l.price)} each</div>
                      </div>
                      <div style={{ width: 128, flex: "none" }}><Stepper q={l.qty} onMinus={() => sub(l.id)} onPlus={() => add(l.id)} /></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ display: "grid", gap: 12 }}>
                  <input style={input} placeholder="Full name" autoComplete="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                  <input style={input} placeholder="Phone number" inputMode="tel" autoComplete="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                  <input style={input} placeholder="Delivery area (town, estate)" value={form.place} onChange={(e) => setForm({ ...form, place: e.target.value })} />
                  <textarea style={{ ...input, minHeight: 80, resize: "vertical" }} placeholder="Note (optional)" value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} />
                  <p style={{ margin: 0, fontSize: 13, color: C.muted }}>Your order opens in WhatsApp. We reply to confirm the total, delivery and payment.</p>
                </div>
              )}
            </div>

            {lines.length > 0 && (
              <div style={{ padding: "14px 20px calc(16px + env(safe-area-inset-bottom, 0px))", borderTop: "1px solid " + C.line, background: "#fff" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12, fontSize: 17 }}>
                  <span style={{ color: C.muted }}>Subtotal</span><b>{money(total)}</b>
                </div>
                {step === "cart" ? (
                  <button onClick={() => setStep("details")} style={{ width: "100%", height: 52, borderRadius: 14, border: 0, background: C.green, color: "#fff", fontSize: 16, fontWeight: 700, cursor: "pointer" }}>Continue</button>
                ) : (
                  <div style={{ display: "flex", gap: 10 }}>
                    <button onClick={() => setStep("cart")} style={{ height: 52, padding: "0 18px", borderRadius: 14, border: "1px solid " + C.line, background: "#fff", color: C.green, fontWeight: 700, cursor: "pointer" }}>Back</button>
                    <button disabled={!ready} onClick={placeOrder} style={{ flex: 1, height: 52, borderRadius: 14, border: 0, background: ready ? "#1f9d55" : "#b9c4bd", color: "#fff", fontSize: 16, fontWeight: 700, cursor: ready ? "pointer" : "not-allowed" }}>Send order on WhatsApp</button>
                  </div>
                )}
              </div>
            )}
          </aside>
        </div>
      )}
    </div>
  );
}