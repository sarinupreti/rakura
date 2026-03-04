interface Props {
  locale: string;
}

export function OriginMap({ locale }: Props) {
  const isEn = locale === "en";

  return (
    <div className="relative w-full max-w-3xl mx-auto select-none">
      <svg
        viewBox="0 0 900 340"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full"
        aria-label={isEn ? "Nepal origin map showing Ilam and Jhapa tea regions" : "แผนที่เนปาล แสดงพื้นที่ชาอิลัมและฌาปา"}
      >
        {/* ── Nepal body (simplified polygon) ── */}
        <path
          d="M 55 270 L 65 230 L 90 200 L 130 185 L 160 170 L 200 175 L 240 160 L 290 165 L 330 150 L 370 155 L 410 140 L 455 145 L 490 130 L 540 140 L 580 125 L 630 138 L 670 120 L 715 132 L 750 118 L 790 130 L 820 122 L 840 280 L 55 280 Z"
          fill="#2d5a27"
          fillOpacity="0.12"
          stroke="#4a7c59"
          strokeWidth="1.5"
        />

        {/* ── Himalayan mountain peaks along north ── */}
        {/* Dhaulagiri region */}
        <polygon points="175,158 185,130 195,158" fill="white" fillOpacity="0.6" />
        <polygon points="190,158 202,118 214,158" fill="white" fillOpacity="0.8" />
        <polygon points="208,158 218,134 228,158" fill="white" fillOpacity="0.5" />
        {/* Annapurna region */}
        <polygon points="320,142 332,108 344,142" fill="white" fillOpacity="0.7" />
        <polygon points="338,142 350,120 362,142" fill="white" fillOpacity="0.5" />
        {/* Manaslu region */}
        <polygon points="430,130 442,98 454,130" fill="white" fillOpacity="0.6" />
        {/* Langtang region */}
        <polygon points="500,125 514,92 528,125" fill="white" fillOpacity="0.7" />
        <polygon points="520,125 530,105 540,125" fill="white" fillOpacity="0.5" />
        {/* Everest region */}
        <polygon points="650,115 666,78 682,115" fill="white" fillOpacity="0.9" />
        <polygon points="640,115 652,98 664,115" fill="white" fillOpacity="0.6" />
        <polygon points="678,115 688,95 698,115" fill="white" fillOpacity="0.6" />
        {/* Kanchenjunga */}
        <polygon points="770,112 782,88 794,112" fill="white" fillOpacity="0.8" />

        {/* ── Terai (plains) band along south ── */}
        <rect x="55" y="258" width="785" height="22" fill="#c9a52a" fillOpacity="0.12" rx="0" />

        {/* ── Kathmandu valley marker ── */}
        <circle cx="455" cy="195" r="5" fill="#c9a52a" fillOpacity="0.5" />
        <circle cx="455" cy="195" r="2.5" fill="#c9a52a" />
        <text x="462" y="191" fontSize="9" fill="#c9a52a" fontFamily="serif" opacity="0.7">
          {isEn ? "Kathmandu" : "กาฐมาณฑุ"}
        </text>

        {/* ── ILAM region (highlands, ~x=750, y=160) ── */}
        {/* Green glow */}
        <circle cx="762" cy="175" r="32" fill="#4a7c59" fillOpacity="0.18" />
        <circle cx="762" cy="175" r="18" fill="#4a7c59" fillOpacity="0.3" />
        {/* Tea leaf icon */}
        <ellipse cx="762" cy="172" rx="9" ry="13" fill="#4a7c59" fillOpacity="0.8" transform="rotate(-25 762 172)" />
        <ellipse cx="762" cy="172" rx="4" ry="9" fill="white" fillOpacity="0.15" transform="rotate(-25 762 172)" />
        <line x1="762" y1="160" x2="762" y2="185" stroke="white" strokeWidth="0.8" opacity="0.4" transform="rotate(-25 762 172.5)" />
        {/* Label */}
        <text x="762" y="202" fontSize="10.5" fill="#4a7c59" fontFamily="sans-serif" fontWeight="700" textAnchor="middle">
          ILAM
        </text>
        <text x="762" y="215" fontSize="8.5" fill="#4a7c59" fontFamily="sans-serif" opacity="0.8" textAnchor="middle">
          {isEn ? "Highland Gardens" : "ไร่ชาบนภูเขา"}
        </text>
        {/* Elevation label */}
        <text x="762" y="226" fontSize="7.5" fill="#4a7c59" fontFamily="sans-serif" opacity="0.6" textAnchor="middle">
          {isEn ? "1,500–2,000m" : "1,500–2,000 ม."}
        </text>

        {/* ── JHAPA region (plains, ~x=820, y=255) ── */}
        {/* Gold glow */}
        <circle cx="820" cy="258" r="26" fill="#c9a52a" fillOpacity="0.18" />
        <circle cx="820" cy="258" r="14" fill="#c9a52a" fillOpacity="0.3" />
        {/* Factory icon */}
        <rect x="813" y="250" width="14" height="10" fill="#c9a52a" fillOpacity="0.8" rx="0.5" />
        <rect x="811" y="246" width="4" height="12" fill="#c9a52a" fillOpacity="0.6" />
        <rect x="819" y="248" width="3" height="10" fill="#c9a52a" fillOpacity="0.6" />
        <rect x="825" y="247" width="3" height="11" fill="#c9a52a" fillOpacity="0.6" />
        {/* Label */}
        <text x="820" y="280" fontSize="10.5" fill="#c9a52a" fontFamily="sans-serif" fontWeight="700" textAnchor="middle">
          JHAPA
        </text>
        <text x="820" y="292" fontSize="8.5" fill="#c9a52a" fontFamily="sans-serif" opacity="0.8" textAnchor="middle">
          {isEn ? "CTC Processing" : "โรงงาน CTC"}
        </text>

        {/* ── Connector line between Ilam and Jhapa ── */}
        <line
          x1="762" y1="190"
          x2="815" y2="248"
          stroke="#c9a52a"
          strokeWidth="1"
          strokeDasharray="4 3"
          opacity="0.4"
        />

        {/* ── Legend ── */}
        <rect x="60" y="290" width="8" height="8" fill="#4a7c59" fillOpacity="0.8" rx="1" />
        <text x="74" y="298" fontSize="8.5" fill="#4a7c59" fontFamily="sans-serif">
          {isEn ? "Orthodox Tea Gardens" : "ไร่ชา"}
        </text>
        <rect x="170" y="290" width="8" height="8" fill="#c9a52a" fillOpacity="0.8" rx="1" />
        <text x="184" y="298" fontSize="8.5" fill="#c9a52a" fontFamily="sans-serif">
          {isEn ? "CTC Factory" : "โรงงาน CTC"}
        </text>

        {/* ── Country label ── */}
        <text x="180" y="215" fontSize="11" fill="#1a1512" fontFamily="serif" fontStyle="italic" opacity="0.3" letterSpacing="3">
          NEPAL
        </text>

        {/* ── Established label ── */}
        <text x="455" y="240" fontSize="8" fill="#1a1512" fontFamily="sans-serif" opacity="0.25" textAnchor="middle" letterSpacing="1">
          {isEn ? "Est. 1873 · First tea plantations" : "ปลูกชาครั้งแรก ปี 2416"}
        </text>
      </svg>

      {/* Card overlay callouts */}
      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="border border-[#4a7c59]/30 bg-[#4a7c59]/5 p-4 rounded-sm">
          <p className="text-xs font-semibold tracking-widest uppercase text-[#4a7c59] mb-1">
            {isEn ? "Ilam · Orthodox" : "อิลัม · ออร์โธด็อกซ์"}
          </p>
          <p className="text-xs text-rakura-muted leading-relaxed">
            {isEn
              ? "Nepal's first private orthodox factory. High-altitude gardens producing our Collection and Classic teas."
              : "โรงงานออร์โธด็อกซ์เอกชนแห่งแรกของเนปาล ไร่ชาบนที่สูง ผลิตชาคอลเลกชันและคลาสสิก"}
          </p>
        </div>
        <div className="border border-rakura-gold/30 bg-rakura-gold/5 p-4 rounded-sm">
          <p className="text-xs font-semibold tracking-widest uppercase text-rakura-gold mb-1">
            {isEn ? "Jhapa · CTC" : "ฌาปา · CTC"}
          </p>
          <p className="text-xs text-rakura-muted leading-relaxed">
            {isEn
              ? "Eastern Terai plains. CTC production facility for robust breakfast and everyday teas."
              : "ที่ราบตะวันออก โรงงาน CTC สำหรับชาเช้าและชาประจำวัน"}
          </p>
        </div>
      </div>
    </div>
  );
}
