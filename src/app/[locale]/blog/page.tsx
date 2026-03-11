import type { Locale } from "@/lib/i18n";
import { AnimateOnView } from "@/components/AnimateOnView";
import Link from "next/link";

const articles = [
  {
    slug: "himalayan-vs-darjeeling",
    categoryEn: "Tea Education",
    categoryTh: "ความรู้เรื่องชา",
    titleEn: "Why Nepal Tea Rivals — And Often Beats — Darjeeling",
    titleTh: "ทำไมชาเนปาลเทียบชั้นและมักดีกว่า Darjeeling",
    excerptEn: "Both grown in the same Himalayan foothills, Nepal's finest teas share terroir with Darjeeling but have developed a distinct, complex character all their own.",
    excerptTh: "ทั้งสองปลูกในพื้นที่เชิงเขาหิมาลัยเดียวกัน ชาชั้นเลิศของเนปาลมีสภาพแวดล้อมเดียวกับ Darjeeling แต่พัฒนาเอกลักษณ์และความซับซ้อนที่แตกต่างออกไป",
    readTimeEn: "5 min read",
    readTimeTh: "อ่าน 5 นาที",
    dateEn: "March 2026",
    dateTh: "มีนาคม 2569",
    emoji: "🏔️",
    color: "bg-amber-50 border-amber-200",
  },
  {
    slug: "five-teas-for-better-sleep",
    categoryEn: "Wellness",
    categoryTh: "สุขภาพ",
    titleEn: "5 Himalayan Teas for Better Sleep",
    titleTh: "ชาหิมาลัย 5 ชนิดเพื่อการนอนหลับที่ดีขึ้น",
    excerptEn: "The right evening tea can significantly improve sleep quality. Here are Rakura's best caffeine-free options for winding down.",
    excerptTh: "ชายามเย็นที่เหมาะสมช่วยปรับปรุงคุณภาพการนอนหลับได้อย่างมาก นี่คือตัวเลือกไม่มีคาเฟอีนที่ดีที่สุดของ Rakura",
    readTimeEn: "4 min read",
    readTimeTh: "อ่าน 4 นาที",
    dateEn: "February 2026",
    dateTh: "กุมภาพันธ์ 2569",
    emoji: "🌙",
    color: "bg-indigo-50 border-indigo-200",
  },
  {
    slug: "brewing-guide-for-beginners",
    categoryEn: "How To",
    categoryTh: "วิธีทำ",
    titleEn: "The Beginner's Guide to Brewing the Perfect Cup",
    titleTh: "คู่มือผู้เริ่มต้นในการชงชาที่สมบูรณ์แบบ",
    excerptEn: "Temperature, steep time, water quality — three variables that make or break a cup of tea. A simple guide for anyone starting their tea journey.",
    excerptTh: "อุณหภูมิ เวลาชง คุณภาพน้ำ สามตัวแปรที่กำหนดความสำเร็จของชา คู่มือง่ายๆ สำหรับผู้เริ่มต้น",
    readTimeEn: "6 min read",
    readTimeTh: "อ่าน 6 นาที",
    dateEn: "January 2026",
    dateTh: "มกราคม 2569",
    emoji: "🫖",
    color: "bg-stone-50 border-stone-200",
  },
  {
    slug: "golden-tips-what-are-they",
    categoryEn: "Tea Education",
    categoryTh: "ความรู้เรื่องชา",
    titleEn: "Golden Tips: What Are They and Why Are They So Rare?",
    titleTh: "Golden Tips คืออะไรและทำไมถึงหายาก?",
    excerptEn: "Only the very finest, youngest tea buds produce these golden, downy tips — a hallmark of the highest grade teas Nepal can produce.",
    excerptTh: "เฉพาะตาชาที่อ่อนที่สุดเท่านั้นที่ผลิต Golden Tips นุ่มสีทอง เครื่องหมายของชาคุณภาพสูงสุดที่เนปาลผลิตได้",
    readTimeEn: "4 min read",
    readTimeTh: "อ่าน 4 นาที",
    dateEn: "December 2025",
    dateTh: "ธันวาคม 2568",
    emoji: "✨",
    color: "bg-yellow-50 border-yellow-200",
  },
  {
    slug: "plastic-free-teabag-revolution",
    categoryEn: "Sustainability",
    categoryTh: "ความยั่งยืน",
    titleEn: "The Problem With Nylon Teabags (And What We Did About It)",
    titleTh: "ปัญหาของซองชาไนลอน และสิ่งที่เราทำเพื่อแก้ไข",
    excerptEn: "Most teabags contain plastic. At Rakura, we helped pioneer a 100% compostable teabag alternative — and why it matters for your health and the planet.",
    excerptTh: "ซองชาส่วนใหญ่มีพลาสติก ที่ Rakura เราช่วยบุกเบิกซองชาย่อยสลาย 100% และทำไมมันสำคัญต่อสุขภาพและโลก",
    readTimeEn: "7 min read",
    readTimeTh: "อ่าน 7 นาที",
    dateEn: "November 2025",
    dateTh: "พฤศจิกายน 2568",
    emoji: "🌿",
    color: "bg-emerald-50 border-emerald-200",
  },
  {
    slug: "tea-for-hotels-and-spas",
    categoryEn: "Hospitality",
    categoryTh: "การบริการ",
    titleEn: "How Premium Tea Elevates the Hotel Guest Experience",
    titleTh: "ชาพรีเมียมยกระดับประสบการณ์แขกโรงแรมได้อย่างไร",
    excerptEn: "From in-room amenities to spa menus, the tea you offer says a great deal about your property's standards. Here's why hospitality leaders are choosing Himalayan.",
    excerptTh: "จากชาในห้องพักถึงเมนูสปา ชาที่คุณเสนอบอกอะไรหลายอย่างเกี่ยวกับมาตรฐานของคุณ นี่คือเหตุผลที่ผู้นำด้านการบริการเลือกหิมาลัย",
    readTimeEn: "5 min read",
    readTimeTh: "อ่าน 5 นาที",
    dateEn: "October 2025",
    dateTh: "ตุลาคม 2568",
    emoji: "🏨",
    color: "bg-rose-50 border-rose-200",
  },
];

export default function BlogPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  const isEn = locale === "en";

  return (
    <div className="bg-background min-h-screen">
      {/* Hero */}
      <section className="bg-rakura-dark py-16 sm:py-24 px-4 text-center">
        <AnimateOnView animation="fade-in-up">
          <p className="eyebrow text-rakura-gold mb-4">{isEn ? "Stories & Guides" : "เรื่องราวและคู่มือ"}</p>
          <h1
            className="font-display font-bold text-white leading-tight mb-4"
            style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)" }}
          >
            {isEn ? "The Tea Journal" : "วารสารชา"}
          </h1>
          <p className="text-white/70 max-w-md mx-auto">
            {isEn
              ? "Education, inspiration and stories from the world of Himalayan tea."
              : "ความรู้ แรงบันดาลใจ และเรื่องราวจากโลกของชาหิมาลัย"}
          </p>
        </AnimateOnView>
      </section>

      {/* Articles grid */}
      <section className="py-16 sm:py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, i) => (
              <AnimateOnView key={article.slug} animation="fade-in-up" delay={i * 60}>
                <article className={`border rounded-sm overflow-hidden ${article.color} group hover:shadow-soft transition-shadow duration-300`}>
                  {/* Top colour strip */}
                  <div className="px-6 pt-6 pb-0">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-semibold tracking-widest uppercase text-rakura-gold">
                        {isEn ? article.categoryEn : article.categoryTh}
                      </span>
                      <span className="text-xs text-rakura-muted">
                        {isEn ? article.readTimeEn : article.readTimeTh}
                      </span>
                    </div>
                    <div className="text-4xl mb-4">{article.emoji}</div>
                    <h2 className="font-display font-bold text-foreground text-lg leading-snug mb-3 group-hover:text-rakura-gold transition-colors">
                      {isEn ? article.titleEn : article.titleTh}
                    </h2>
                    <p className="text-rakura-muted text-sm leading-relaxed">
                      {isEn ? article.excerptEn : article.excerptTh}
                    </p>
                  </div>
                  <div className="px-6 pb-6 pt-5 flex items-center justify-between">
                    <span className="text-xs text-rakura-muted">
                      {isEn ? article.dateEn : article.dateTh}
                    </span>
                    <span className="text-xs font-semibold text-rakura-gold tracking-wide flex items-center gap-1">
                      {isEn ? "Read →" : "อ่านต่อ →"}
                    </span>
                  </div>
                </article>
              </AnimateOnView>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="bg-rakura-dark py-16 sm:py-20 px-4 text-center">
        <AnimateOnView animation="fade-in-up">
          <p className="eyebrow text-rakura-gold mb-4">{isEn ? "Stay in the Know" : "ติดตามข่าวสาร"}</p>
          <h2 className="font-display font-bold text-white text-2xl sm:text-3xl mb-4">
            {isEn ? "Love Reading About Tea?" : "ชอบอ่านเรื่องราวเกี่ยวกับชา?"}
          </h2>
          <p className="text-white/65 max-w-md mx-auto mb-8 text-sm">
            {isEn
              ? "Get in touch and we'll add you to our tea community updates."
              : "ติดต่อเราและเราจะเพิ่มคุณในการอัปเดตชุมชนชา"}
          </p>
          <Link
            href={`/${locale}#contact`}
            className="inline-flex items-center gap-2 bg-rakura-gold text-rakura-dark font-semibold text-sm tracking-wider uppercase px-8 py-3.5 hover:bg-rakura-gold-light transition-colors"
          >
            {isEn ? "Get in Touch" : "ติดต่อเรา"}
          </Link>
        </AnimateOnView>
      </section>
    </div>
  );
}
