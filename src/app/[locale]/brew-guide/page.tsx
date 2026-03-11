import type { Locale } from "@/lib/i18n";
import { AnimateOnView } from "@/components/AnimateOnView";
import Link from "next/link";

const brewGuides = [
  {
    category: "collections",
    nameEn: "Collections",
    nameTh: "คอลเลกชัน",
    emoji: "🏔️",
    temp: "90–95°C",
    tempTh: "90–95°C",
    time: "3–4 min",
    timeTh: "3–4 นาที",
    amount: "1 bag / 200ml",
    amountTh: "1 ซอง / 200ml",
    resteepeEn: "2–3×",
    resteepTh: "2–3 ครั้ง",
    tipsEn: "Use freshly boiled water cooled slightly. Don't squeeze the bag. First steep is best — subsequent ones are lighter and sweeter.",
    tipsTh: "ใช้น้ำเดือดแล้วพักให้เย็ดลงเล็กน้อย อย่าบีบซอง การชงครั้งแรกดีที่สุด ครั้งต่อๆ มาจะมีรสเบาและหวานกว่า",
    colorFrom: "from-amber-50",
    colorTo: "to-amber-100/30",
    accent: "text-amber-700",
    border: "border-amber-200",
  },
  {
    category: "classic",
    nameEn: "Classic & Single Origin",
    nameTh: "คลาสสิกและชาเดี่ยว",
    emoji: "🫖",
    temp: "90–95°C",
    tempTh: "90–95°C",
    time: "3–4 min",
    timeTh: "3–4 นาที",
    amount: "1 bag / 200ml",
    amountTh: "1 ซอง / 200ml",
    resteepeEn: "1–2×",
    resteepTh: "1–2 ครั้ง",
    tipsEn: "Excellent with milk and sugar. For iced tea, brew double strength then pour over ice. Try with a slice of lemon.",
    tipsTh: "เยี่ยมกับนมและน้ำตาล สำหรับชาเย็น ชงเข้มข้นสองเท่าแล้วเทลงบนน้ำแข็ง ลองกับมะนาวแผ่น",
    colorFrom: "from-stone-50",
    colorTo: "to-stone-100/30",
    accent: "text-stone-700",
    border: "border-stone-200",
  },
  {
    category: "superHerbs",
    nameEn: "Super Herbs",
    nameTh: "ซูเปอร์เฮิร์บ",
    emoji: "🌿",
    temp: "95–100°C",
    tempTh: "95–100°C",
    time: "5–7 min",
    timeTh: "5–7 นาที",
    amount: "1 bag / 250ml",
    amountTh: "1 ซอง / 250ml",
    resteepeEn: "1×",
    resteepTh: "1 ครั้ง",
    tipsEn: "Herbal blends need fuller boiling water and longer steep to release the healing compounds. Cover while steeping to keep the volatile oils in.",
    tipsTh: "ชาสมุนไพรต้องการน้ำเดือดเต็มที่และชงนานขึ้นเพื่อปลดปล่อยสารสำคัญ ปิดฝาระหว่างชงเพื่อกักเก็บน้ำมันระเหย",
    colorFrom: "from-emerald-50",
    colorTo: "to-emerald-100/30",
    accent: "text-emerald-700",
    border: "border-emerald-200",
  },
  {
    category: "selections",
    nameEn: "Selections",
    nameTh: "ชุดชา",
    emoji: "🌱",
    temp: "85–90°C",
    tempTh: "85–90°C",
    time: "2–3 min",
    timeTh: "2–3 นาที",
    amount: "1 bag / 200ml",
    amountTh: "1 ซอง / 200ml",
    resteepeEn: "2–4×",
    resteepTh: "2–4 ครั้ง",
    tipsEn: "Green and white teas are delicate — never use boiling water or they turn bitter. Short, multiple steeps reveal different flavour layers.",
    tipsTh: "ชาเขียวและชาขาวบอบบาง อย่าใช้น้ำเดือดหรือจะขม การชงสั้นหลายครั้งเผยรสชาติที่แตกต่าง",
    colorFrom: "from-teal-50",
    colorTo: "to-teal-100/30",
    accent: "text-teal-700",
    border: "border-teal-200",
  },
  {
    category: "looseLeaf",
    nameEn: "Loose Leaf",
    nameTh: "ใบชาแบบหลวม",
    emoji: "🍃",
    temp: "90–95°C",
    tempTh: "90–95°C",
    time: "3–4 min",
    timeTh: "3–4 นาที",
    amount: "2–3g / 200ml",
    amountTh: "2–3g / 200ml",
    resteepeEn: "3–5×",
    resteepTh: "3–5 ครั้ง",
    tipsEn: "Use a gaiwan or infuser. Measure 2–3g per 200ml — adjust to taste. The third steep often reveals the tea's most complex notes.",
    tipsTh: "ใช้ไกวันหรือที่กรองชา วัด 2–3g ต่อ 200ml ปรับตามรสชาติ การชงครั้งที่สามมักเผยรสชาติที่ซับซ้อนที่สุด",
    colorFrom: "from-lime-50",
    colorTo: "to-lime-100/30",
    accent: "text-lime-700",
    border: "border-lime-200",
  },
];

const generalTips = [
  {
    icon: "💧",
    titleEn: "Water Quality Matters",
    titleTh: "คุณภาพน้ำสำคัญ",
    descEn: "Filtered or spring water makes a noticeable difference. Avoid distilled water — it strips flavour.",
    descTh: "น้ำกรองหรือน้ำพุสร้างความแตกต่างที่ชัดเจน หลีกเลี่ยงน้ำกลั่น เพราะจะทำให้รสชาติหายไป",
  },
  {
    icon: "🌡️",
    titleEn: "Temperature is Everything",
    titleTh: "อุณหภูมิคือทุกสิ่ง",
    descEn: "Too hot burns green tea. Too cool and black tea under-extracts. A kitchen thermometer pays for itself quickly.",
    descTh: "ร้อนเกินไปทำให้ชาเขียวขม เย็นเกินไปชาดำจะออกรสไม่เต็มที่ เทอร์โมมิเตอร์ในครัวคุ้มค่าเสมอ",
  },
  {
    icon: "⏱️",
    titleEn: "Don't Over-Steep",
    titleTh: "อย่าชงนานเกินไป",
    descEn: "Over-steeping releases excessive tannins, causing bitterness. Start with the minimum time and adjust upward.",
    descTh: "การชงนานเกินไปจะปลดปล่อยแทนนินมากเกินไปทำให้ขม เริ่มจากเวลาน้อยที่สุดและปรับเพิ่ม",
  },
  {
    icon: "🍶",
    titleEn: "Pre-warm Your Cup",
    titleTh: "อุ่นถ้วยก่อน",
    descEn: "Pour a splash of hot water into your cup, swirl, then discard. A warm cup keeps tea at the right temperature longer.",
    descTh: "เทน้ำร้อนเล็กน้อยลงในถ้วย หมุน แล้วทิ้ง ถ้วยอุ่นจะรักษาอุณหภูมิชาได้นานขึ้น",
  },
];

export default function BrewGuidePage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  const isEn = locale === "en";

  return (
    <div className="bg-background min-h-screen">
      {/* Hero */}
      <section className="bg-rakura-dark py-20 sm:py-28 px-4 text-center">
        <AnimateOnView animation="fade-in-up">
          <p className="eyebrow text-rakura-gold mb-4">{isEn ? "Master Your Brew" : "เชี่ยวชาญการชงชา"}</p>
          <h1
            className="font-display font-bold text-white leading-tight mb-4"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            {isEn ? "The Complete Brew Guide" : "คู่มือการชงชาฉบับสมบูรณ์"}
          </h1>
          <p className="text-white/70 max-w-lg mx-auto text-base sm:text-lg">
            {isEn
              ? "Perfect brewing unlocks the full potential of every Rakura tea. Follow these guides for an exceptional cup every time."
              : "การชงที่สมบูรณ์แบบช่วยปลดล็อกศักยภาพเต็มที่ของชา Rakura ทุกชนิด ทำตามคู่มือนี้เพื่อชาที่ดีเยี่ยมทุกครั้ง"}
          </p>
        </AnimateOnView>
      </section>

      {/* Brew guides */}
      <section className="py-16 sm:py-24 px-4">
        <div className="max-w-5xl mx-auto space-y-8">
          {brewGuides.map((guide, i) => (
            <AnimateOnView key={guide.category} animation="fade-in-up" delay={i * 60}>
              <div className={`border ${guide.border} rounded-sm overflow-hidden bg-gradient-to-br ${guide.colorFrom} ${guide.colorTo}`}>
                <div className="p-6 sm:p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <span className="text-3xl">{guide.emoji}</span>
                    <div>
                      <h2 className="font-display font-bold text-foreground text-xl sm:text-2xl">
                        {isEn ? guide.nameEn : guide.nameTh}
                      </h2>
                      <p className={`text-xs tracking-widest uppercase font-semibold mt-1 ${guide.accent}`}>
                        {isEn ? guide.category : guide.nameTh}
                      </p>
                    </div>
                  </div>

                  {/* Brew params */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                    {[
                      { labelEn: "Temperature", labelTh: "อุณหภูมิ", val: guide.temp, icon: "🌡️" },
                      { labelEn: "Steep Time", labelTh: "เวลาชง", val: isEn ? guide.time : guide.timeTh, icon: "⏱️" },
                      { labelEn: "Amount", labelTh: "ปริมาณ", val: isEn ? guide.amount : guide.amountTh, icon: "⚖️" },
                      { labelEn: "Re-steeps", labelTh: "ชงซ้ำ", val: isEn ? guide.resteepeEn : guide.resteepTh, icon: "🔄" },
                    ].map(({ labelEn, labelTh, val, icon }) => (
                      <div key={labelEn} className="bg-white/70 rounded-sm p-3 text-center">
                        <span className="text-lg block mb-1">{icon}</span>
                        <p className="font-semibold text-foreground text-sm">{val}</p>
                        <p className="text-xs text-rakura-muted mt-0.5">{isEn ? labelEn : labelTh}</p>
                      </div>
                    ))}
                  </div>

                  {/* Tips */}
                  <div className="border-l-2 border-rakura-gold pl-4">
                    <p className="text-xs font-semibold tracking-widest uppercase text-rakura-gold mb-1">
                      {isEn ? "Pro Tip" : "เคล็ดลับ"}
                    </p>
                    <p className="text-rakura-muted text-sm leading-relaxed">
                      {isEn ? guide.tipsEn : guide.tipsTh}
                    </p>
                  </div>
                </div>
              </div>
            </AnimateOnView>
          ))}
        </div>
      </section>

      {/* General tips */}
      <section className="bg-rakura-dark py-16 sm:py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <AnimateOnView animation="fade-in-up">
            <div className="text-center mb-12">
              <p className="eyebrow text-rakura-gold mb-3">{isEn ? "Universal Principles" : "หลักการทั่วไป"}</p>
              <h2 className="font-display font-bold text-white text-2xl sm:text-3xl">
                {isEn ? "Four Rules for a Perfect Cup" : "สี่กฎสำหรับชาที่สมบูรณ์แบบ"}
              </h2>
            </div>
          </AnimateOnView>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {generalTips.map((tip, i) => (
              <AnimateOnView key={i} animation="fade-in-up" delay={i * 70}>
                <div className="flex gap-4 bg-white/5 p-6 border border-white/10 hover:border-rakura-gold/40 transition-colors">
                  <span className="text-2xl shrink-0">{tip.icon}</span>
                  <div>
                    <h3 className="font-semibold text-white text-base mb-2">
                      {isEn ? tip.titleEn : tip.titleTh}
                    </h3>
                    <p className="text-white/60 text-sm leading-relaxed">
                      {isEn ? tip.descEn : tip.descTh}
                    </p>
                  </div>
                </div>
              </AnimateOnView>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 px-4 bg-background border-t border-stone-200 text-center">
        <AnimateOnView animation="fade-in-up">
          <h2 className="font-display font-bold text-foreground text-2xl sm:text-3xl mb-4">
            {isEn ? "Ready to Try?" : "พร้อมที่จะลอง?"}
          </h2>
          <p className="text-rakura-muted mb-8 max-w-md mx-auto text-sm">
            {isEn ? "Browse the full Rakura range and find your perfect tea." : "เลือกดูชา Rakura ทั้งหมดและค้นหาชาที่สมบูรณ์แบบสำหรับคุณ"}
          </p>
          <Link
            href={`/${locale}#products`}
            className="inline-flex items-center gap-2 bg-rakura-gold text-rakura-dark font-semibold text-sm tracking-wider uppercase px-8 py-3.5 hover:bg-rakura-gold-light transition-colors"
          >
            {isEn ? "Shop Rakura Teas" : "เลือกซื้อชา Rakura"}
          </Link>
        </AnimateOnView>
      </section>
    </div>
  );
}
