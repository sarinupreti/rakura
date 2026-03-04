export type TeaType = "green" | "black" | "breakfast" | "oolong" | "masala" | "herbal" | "fruit" | "herbs";

export interface TeaBenefit {
  titleEn: string;
  titleTh: string;
  descEn: string;
  descTh: string;
  icon: string;
}

export interface TeaProfile {
  type: TeaType;
  caffeineLevel: "none" | "low" | "medium" | "high";
  caffeineEn: string;
  caffeineTh: string;
  bestTimeEn: string;
  bestTimeTh: string;
  bestTimeIcon: string;
  strength: number;      // 1–5
  antioxidants: number;  // 1–5
  sweetness: number;     // 1–5
  benefits: TeaBenefit[];
  pairingsEn: string[];
  pairingsTh: string[];
}

export const teaProfiles: Record<TeaType, TeaProfile> = {
  green: {
    type: "green",
    caffeineLevel: "medium",
    caffeineEn: "Medium caffeine",
    caffeineTh: "คาเฟอีนระดับกลาง",
    bestTimeEn: "Morning or early afternoon",
    bestTimeTh: "เช้าหรือบ่ายต้น",
    bestTimeIcon: "☀️",
    strength: 2,
    antioxidants: 5,
    sweetness: 3,
    benefits: [
      {
        titleEn: "Antioxidant Powerhouse",
        titleTh: "สารต้านอนุมูลอิสระสูง",
        descEn: "Rich in EGCG catechins that actively neutralise free radicals and protect cells.",
        descTh: "อุดมด้วย EGCG คาเทชิน ช่วยต้านอนุมูลอิสระและปกป้องเซลล์",
        icon: "🌿",
      },
      {
        titleEn: "Metabolism Boost",
        titleTh: "เร่งเมตาบอลิซึม",
        descEn: "Clinical studies link regular green tea to statistically significant reductions in BMI.",
        descTh: "การศึกษาคลินิกพบว่าช่วยลดดัชนีมวลกายอย่างมีนัยสำคัญ",
        icon: "⚡",
      },
      {
        titleEn: "Heart Health",
        titleTh: "ดีต่อหัวใจ",
        descEn: "Lowers LDL cholesterol and supports healthy blood circulation.",
        descTh: "ลดคอเลสเตอรอล LDL และส่งเสริมการไหลเวียนโลหิต",
        icon: "❤️",
      },
      {
        titleEn: "Blood Sugar Balance",
        titleTh: "สมดุลน้ำตาลในเลือด",
        descEn: "Regular consumption linked to 33% lower risk of type-2 diabetes.",
        descTh: "การดื่มสม่ำเสมอเชื่อมโยงกับความเสี่ยงโรคเบาหวานลดลง 33%",
        icon: "🩺",
      },
    ],
    pairingsEn: ["Light sushi", "Steamed dumplings", "Fresh fruit", "Jasmine rice desserts"],
    pairingsTh: ["ซูชิเบา ๆ", "ติ่มซำนึ่ง", "ผลไม้สด", "ขนมข้าวดอกมะลิ"],
  },
  black: {
    type: "black",
    caffeineLevel: "high",
    caffeineEn: "High caffeine",
    caffeineTh: "คาเฟอีนสูง",
    bestTimeEn: "Morning",
    bestTimeTh: "ตอนเช้า",
    bestTimeIcon: "🌅",
    strength: 4,
    antioxidants: 3,
    sweetness: 2,
    benefits: [
      {
        titleEn: "Sustained Energy",
        titleTh: "พลังงานต่อเนื่อง",
        descEn: "Caffeine + L-theanine improves focus up to 40% without the crash of coffee.",
        descTh: "คาเฟอีน + L-theanine เพิ่มสมาธิถึง 40% โดยไม่มีอาการอ่อนล้า",
        icon: "⚡",
      },
      {
        titleEn: "Gut Microbiome",
        titleTh: "ดูแลลำไส้",
        descEn: "Polyphenols promote beneficial gut bacteria and support healthy digestion.",
        descTh: "โพลีฟีนอลส่งเสริมแบคทีเรียดีในลำไส้และการย่อยอาหาร",
        icon: "🌱",
      },
      {
        titleEn: "Heart Health",
        titleTh: "ดีต่อหัวใจ",
        descEn: "Daily tea drinkers show 8–10% reduced risk of heart disease.",
        descTh: "ผู้ดื่มชาทุกวันมีความเสี่ยงโรคหัวใจลดลง 8–10%",
        icon: "❤️",
      },
      {
        titleEn: "Antioxidant Defence",
        titleTh: "ป้องกันการออกซิเดชัน",
        descEn: "Theaflavins and thearubigins reduce oxidative damage to DNA and lipids.",
        descTh: "ธีอะฟลาวินและธีอะรูบิจินลดความเสียหายจากออกซิเดชัน",
        icon: "🛡️",
      },
    ],
    pairingsEn: ["Scones & clotted cream", "Dark chocolate", "Aged cheese", "Toast with honey"],
    pairingsTh: ["สโคนกับครีม", "ช็อกโกแลตดำ", "ชีสบ่ม", "ขนมปังทาน้ำผึ้ง"],
  },
  breakfast: {
    type: "breakfast",
    caffeineLevel: "high",
    caffeineEn: "High caffeine",
    caffeineTh: "คาเฟอีนสูง",
    bestTimeEn: "Morning",
    bestTimeTh: "ตอนเช้า",
    bestTimeIcon: "🌅",
    strength: 4,
    antioxidants: 3,
    sweetness: 2,
    benefits: [
      {
        titleEn: "Morning Kickstart",
        titleTh: "ชาร์จพลังยามเช้า",
        descEn: "Bold caffeine with smooth L-theanine gives a clean, alert start to your day.",
        descTh: "คาเฟอีนเข้มข้นกับ L-theanine ให้ความตื่นตัวสดชื่นในยามเช้า",
        icon: "☀️",
      },
      {
        titleEn: "Gut Microbiome",
        titleTh: "ดูแลลำไส้",
        descEn: "Polyphenols promote beneficial gut bacteria and support healthy digestion.",
        descTh: "โพลีฟีนอลส่งเสริมแบคทีเรียดีและการย่อยอาหาร",
        icon: "🌱",
      },
      {
        titleEn: "Heart Health",
        titleTh: "ดีต่อหัวใจ",
        descEn: "Regular black tea consumption associated with lower cardiovascular risk.",
        descTh: "การดื่มชาดำสม่ำเสมอช่วยลดความเสี่ยงโรคหัวใจ",
        icon: "❤️",
      },
      {
        titleEn: "Antioxidant Defence",
        titleTh: "ต้านอนุมูลอิสระ",
        descEn: "Theaflavins and thearubigins neutralise free radicals and protect cells.",
        descTh: "ธีอะฟลาวินและธีอะรูบิจินต่อต้านอนุมูลอิสระ",
        icon: "🛡️",
      },
    ],
    pairingsEn: ["Full English breakfast", "Eggs & toast", "Milk & sugar", "Pastries"],
    pairingsTh: ["อาหารเช้าอังกฤษ", "ไข่และขนมปัง", "นมและน้ำตาล", "ขนมอบ"],
  },
  oolong: {
    type: "oolong",
    caffeineLevel: "medium",
    caffeineEn: "Medium caffeine",
    caffeineTh: "คาเฟอีนระดับกลาง",
    bestTimeEn: "Afternoon",
    bestTimeTh: "ตอนบ่าย",
    bestTimeIcon: "🌤️",
    strength: 3,
    antioxidants: 4,
    sweetness: 3,
    benefits: [
      {
        titleEn: "Fat Oxidation",
        titleTh: "เผาผลาญไขมัน",
        descEn: "Increases fat burning by ~20% without raising total energy expenditure.",
        descTh: "เพิ่มการเผาผลาญไขมันประมาณ 20% โดยไม่เพิ่มพลังงานที่ใช้",
        icon: "🔥",
      },
      {
        titleEn: "Cholesterol Management",
        titleTh: "ควบคุมคอเลสเตอรอล",
        descEn: "Regular intake measurably lowers total cholesterol, triglycerides, and LDL.",
        descTh: "ลดคอเลสเตอรอลรวม ไตรกลีเซอไรด์ และ LDL อย่างเห็นได้ชัด",
        icon: "💊",
      },
      {
        titleEn: "Blood Sugar Control",
        titleTh: "ควบคุมน้ำตาลในเลือด",
        descEn: "Polyphenols improve insulin sensitivity and moderate post-meal glucose spikes.",
        descTh: "โพลีฟีนอลช่วยเพิ่มความไวต่ออินซูลินและควบคุมน้ำตาลหลังอาหาร",
        icon: "🩺",
      },
      {
        titleEn: "Dual Antioxidants",
        titleTh: "สารต้านอนุมูลอิสระคู่",
        descEn: "Contains both green tea catechins and black tea theaflavins for broader protection.",
        descTh: "มีทั้งคาเทชินของชาเขียวและธีอะฟลาวินของชาดำ",
        icon: "🌿",
      },
    ],
    pairingsEn: ["Grilled fish", "Soft cheeses", "Fresh peaches", "Dim sum"],
    pairingsTh: ["ปลาย่าง", "ชีสนุ่ม", "พีชสด", "ติ่มซำ"],
  },
  masala: {
    type: "masala",
    caffeineLevel: "medium",
    caffeineEn: "Medium caffeine",
    caffeineTh: "คาเฟอีนระดับกลาง",
    bestTimeEn: "Morning or afternoon",
    bestTimeTh: "เช้าหรือบ่าย",
    bestTimeIcon: "🌤️",
    strength: 4,
    antioxidants: 4,
    sweetness: 3,
    benefits: [
      {
        titleEn: "Digestive Aid",
        titleTh: "ช่วยการย่อย",
        descEn: "Ginger and cardamom relax the digestive tract, reducing nausea and bloating.",
        descTh: "ขิงและกระวานผ่อนคลายระบบย่อย ลดคลื่นไส้และท้องอืด",
        icon: "🌱",
      },
      {
        titleEn: "Anti-Inflammatory",
        titleTh: "ต้านการอักเสบ",
        descEn: "Ginger, cinnamon, and clove collectively reduce systemic inflammation markers.",
        descTh: "ขิง อบเชย และกานพลู ร่วมกันลดการอักเสบในร่างกาย",
        icon: "🛡️",
      },
      {
        titleEn: "Blood Pressure",
        titleTh: "ลดความดันโลหิต",
        descEn: "Cardamom compounds measurably lower systolic blood pressure in studies.",
        descTh: "สารในกระวานช่วยลดความดันโลหิตซิสโตลิกได้อย่างเห็นได้ชัด",
        icon: "❤️",
      },
      {
        titleEn: "Immune Support",
        titleTh: "เสริมภูมิคุ้มกัน",
        descEn: "Spice compounds have documented antibacterial and antiviral properties.",
        descTh: "สารในเครื่องเทศมีฤทธิ์ต้านเชื้อแบคทีเรียและไวรัส",
        icon: "⚡",
      },
    ],
    pairingsEn: ["Milk (traditional chai latte)", "Cardamom cookies", "Samosas", "Spiced cakes"],
    pairingsTh: ["นม (ชาลาเต้แบบดั้งเดิม)", "คุกกี้กระวาน", "ซาโมซา", "เค้กเครื่องเทศ"],
  },
  herbal: {
    type: "herbal",
    caffeineLevel: "none",
    caffeineEn: "Caffeine-free",
    caffeineTh: "ไม่มีคาเฟอีน",
    bestTimeEn: "Evening or anytime",
    bestTimeTh: "เย็นหรือตลอดวัน",
    bestTimeIcon: "🌙",
    strength: 1,
    antioxidants: 4,
    sweetness: 4,
    benefits: [
      {
        titleEn: "Blood Pressure",
        titleTh: "ลดความดันโลหิต",
        descEn: "3 daily cups of hibiscus tea significantly lowered systolic blood pressure in trials.",
        descTh: "ดื่มชาชบา 3 แก้วต่อวัน ลดความดันซิสโตลิกได้อย่างมีนัย",
        icon: "❤️",
      },
      {
        titleEn: "Relaxation & Sleep",
        titleTh: "ผ่อนคลายและนอนหลับ",
        descEn: "Chamomile's apigenin binds brain receptors, promoting calm and reducing anxiety.",
        descTh: "อะพีเจนินในคาโมมายล์จับตัวรับในสมอง ส่งเสริมความสงบ",
        icon: "🌙",
      },
      {
        titleEn: "Cholesterol Balance",
        titleTh: "สมดุลคอเลสเตอรอล",
        descEn: "Hibiscus extract lowers LDL cholesterol and triglyceride levels.",
        descTh: "สารสกัดชบาลด LDL คอเลสเตอรอลและไตรกลีเซอไรด์",
        icon: "🩺",
      },
      {
        titleEn: "Skin & Cell Health",
        titleTh: "ผิวพรรณและเซลล์",
        descEn: "Rose and hibiscus anthocyanins elevate blood antioxidant levels within one hour.",
        descTh: "แอนโทไซยานินจากกุหลาบและชบาเพิ่มสารต้านอนุมูลอิสระภายในหนึ่งชั่วโมง",
        icon: "🌸",
      },
    ],
    pairingsEn: ["Light desserts", "Fresh berries", "Shortbread", "Evening snacks"],
    pairingsTh: ["ของหวานเบาๆ", "เบอร์รีสด", "ช็อตเบรด", "ขนมยามเย็น"],
  },
  fruit: {
    type: "fruit",
    caffeineLevel: "low",
    caffeineEn: "Low caffeine",
    caffeineTh: "คาเฟอีนต่ำ",
    bestTimeEn: "Afternoon or anytime",
    bestTimeTh: "บ่ายหรือตลอดวัน",
    bestTimeIcon: "🌤️",
    strength: 2,
    antioxidants: 5,
    sweetness: 4,
    benefits: [
      {
        titleEn: "Amplified Antioxidants",
        titleTh: "สารต้านอนุมูลอิสระสูง",
        descEn: "Tea polyphenols + fruit anthocyanins create synergistic free-radical protection.",
        descTh: "โพลีฟีนอลชา + แอนโทไซยานินผลไม้ต้านอนุมูลอิสระแบบเสริมฤทธิ์",
        icon: "🌿",
      },
      {
        titleEn: "Immune Boost",
        titleTh: "เสริมภูมิคุ้มกัน",
        descEn: "Vitamin C from rosehip and berries supports immunity alongside tea catechins.",
        descTh: "วิตามิน C จากโรสฮิปและเบอร์รีเสริมภูมิคุ้มกันร่วมกับคาเทชิน",
        icon: "⚡",
      },
      {
        titleEn: "Anti-Inflammatory",
        titleTh: "ต้านการอักเสบ",
        descEn: "Berry and blackcurrant anthocyanins actively reduce chronic inflammation.",
        descTh: "แอนโทไซยานินจากเบอร์รีและแบล็กเคอร์แรนท์ลดการอักเสบเรื้อรัง",
        icon: "🛡️",
      },
      {
        titleEn: "Natural Hydration",
        titleTh: "ให้ความชุ่มชื้น",
        descEn: "Fruit acids and natural flavours encourage higher daily fluid intake.",
        descTh: "กรดผลไม้และรสชาติธรรมชาติกระตุ้นให้ดื่มน้ำมากขึ้น",
        icon: "💧",
      },
    ],
    pairingsEn: ["Fruit tarts", "Yoghurt parfait", "Cheese boards", "Afternoon cake"],
    pairingsTh: ["ทาร์ตผลไม้", "โยเกิร์ตพาร์เฟต์", "แผ่นชีส", "เค้กยามบ่าย"],
  },
  herbs: {
    type: "herbs",
    caffeineLevel: "low",
    caffeineEn: "Low caffeine",
    caffeineTh: "คาเฟอีนต่ำ",
    bestTimeEn: "Morning or evening",
    bestTimeTh: "เช้าหรือเย็น",
    bestTimeIcon: "🌿",
    strength: 2,
    antioxidants: 4,
    sweetness: 3,
    benefits: [
      {
        titleEn: "Stress Adaptation",
        titleTh: "ปรับตัวต่อความเครียด",
        descEn: "Tulsi (holy basil) is a documented adaptogen that regulates cortisol levels.",
        descTh: "กะเพราศักดิ์สิทธิ์เป็นอะแดปโตเจนที่ช่วยควบคุมคอร์ติซอล",
        icon: "🧘",
      },
      {
        titleEn: "Digestive Comfort",
        titleTh: "ดูแลระบบย่อย",
        descEn: "Mint and lemongrass reduce bloating and support gastrointestinal motility.",
        descTh: "สะระแหน่และตะไคร้ลดท้องอืดและส่งเสริมการเคลื่อนไหวของลำไส้",
        icon: "🌱",
      },
      {
        titleEn: "Blood Sugar Regulation",
        titleTh: "ควบคุมน้ำตาล",
        descEn: "Tulsi shown to improve insulin sensitivity and moderate blood glucose.",
        descTh: "กะเพราเพิ่มความไวต่ออินซูลินและช่วยควบคุมระดับน้ำตาลในเลือด",
        icon: "🩺",
      },
      {
        titleEn: "Respiratory Support",
        titleTh: "บำรุงระบบทางเดินหายใจ",
        descEn: "Lemongrass and tulsi compounds ease nasal congestion and support airways.",
        descTh: "สารในตะไคร้และกะเพราช่วยบรรเทาอาการคัดจมูกและระบบทางเดินหายใจ",
        icon: "💨",
      },
    ],
    pairingsEn: ["Cucumber sandwiches", "Light salads", "Rice dishes", "Fresh mint desserts"],
    pairingsTh: ["แซนด์วิชแตงกวา", "สลัดเบาๆ", "อาหารข้าว", "ขนมสะระแหน่สด"],
  },
};

export function getTeaProfile(teaType?: TeaType): TeaProfile | null {
  if (!teaType) return null;
  return teaProfiles[teaType] ?? null;
}
