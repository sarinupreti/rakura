"use client";

import { useState } from "react";
import Link from "next/link";

interface Props {
  locale: string;
}

const TURNOVER_DAYS = [1, 2, 3, 4, 5, 7]; // days between linen/towel/amenity changes

/**
 * Interactive hotel amenity calculator.
 * Estimates monthly tea bag requirement based on rooms, occupancy, bags per turn,
 * and average turnover days — then recommends the right Rakura SKU(s).
 */
export function AmenityCalculator({ locale }: Props) {
  const isEn = locale === "en";

  const [rooms, setRooms] = useState(50);
  const [occupancy, setOccupancy] = useState(70);
  const [bagsPerTurn, setBagsPerTurn] = useState(4);
  const [turnoverDays, setTurnoverDays] = useState(2);

  // Monthly calculation
  const turnsPerMonth = 30 / turnoverDays;
  const occupiedRooms = (rooms * occupancy) / 100;
  const bagsPerMonth = Math.round(occupiedRooms * bagsPerTurn * turnsPerMonth);
  const boxesPerMonth = Math.ceil(bagsPerMonth / 50); // Collections come in 50-bag boxes

  // Recommend SKU based on monthly volume
  const recommendation =
    bagsPerMonth > 2000
      ? {
          skuEn: "Classic Range (100-bag boxes)",
          skuTh: "ชาคลาสสิก (100 ซอง)",
          noteEn: "High-volume format. Best unit economics for large properties.",
          noteTh: "รูปแบบปริมาณสูง เหมาะที่สุดสำหรับที่พักขนาดใหญ่",
        }
      : {
          skuEn: "Himalayan Collection (50-bag boxes)",
          skuTh: "ชาคอลเลกชันหิมาลัย (50 ซอง)",
          noteEn:
            "4 premium varieties in a single elegant box. Perfect guest experience.",
          noteTh:
            "ชาพรีเมียม 4 สายพันธุ์ในกล่องสวยงาม ประสบการณ์แขกที่ยอดเยี่ยม",
        };

  const inputClass =
    "w-full bg-background border border-foreground/20 text-foreground text-sm px-3 py-2 focus:outline-none focus:border-rakura-gold transition-colors";
  const labelClass =
    "block text-[10px] font-semibold tracking-widest uppercase text-rakura-muted mb-1.5";

  return (
    <section className="py-20 sm:py-28 px-4 bg-stone-50 dark:bg-stone-950 border-y border-stone-200 dark:border-white/10">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="eyebrow mb-3">
            {isEn ? "B2B Planning Tool" : "เครื่องมือวางแผน B2B"}
          </p>
          <h2 className="font-display font-bold text-foreground text-2xl sm:text-3xl mb-3">
            {isEn
              ? "Amenity Calculator"
              : "คำนวณปริมาณชาสำหรับที่พัก"}
          </h2>
          <p className="text-rakura-muted text-sm max-w-md mx-auto">
            {isEn
              ? "Estimate your monthly tea bag requirement and find the right Rakura SKU."
              : "ประมาณปริมาณซองชาต่อเดือนและค้นหา SKU ที่เหมาะสมสำหรับคุณ"}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Inputs — left col (3/5) */}
          <div className="lg:col-span-3 bg-background border border-stone-200 dark:border-white/10 p-6 sm:p-8">
            <p className="text-xs font-semibold tracking-widest uppercase text-rakura-gold mb-6">
              {isEn ? "Property Details" : "รายละเอียดที่พัก"}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Rooms */}
              <div>
                <label className={labelClass}>
                  {isEn ? "Total Rooms" : "จำนวนห้องทั้งหมด"}
                </label>
                <input
                  type="number"
                  min={1}
                  max={5000}
                  value={rooms}
                  onChange={(e) =>
                    setRooms(Math.max(1, Number(e.target.value)))
                  }
                  className={inputClass}
                />
                <p className="text-[10px] text-stone-400 dark:text-white/40 mt-1">
                  {isEn ? "Keys / sellable rooms" : "จำนวนห้องขาย"}
                </p>
              </div>

              {/* Occupancy */}
              <div>
                <label className={labelClass}>
                  {isEn
                    ? `Average Occupancy — ${occupancy}%`
                    : `อัตราการเข้าพักเฉลี่ย — ${occupancy}%`}
                </label>
                <input
                  type="range"
                  min={10}
                  max={100}
                  step={5}
                  value={occupancy}
                  onChange={(e) => setOccupancy(Number(e.target.value))}
                  className="w-full accent-rakura-gold cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-stone-400 dark:text-white/40 mt-1">
                  <span>10%</span>
                  <span>100%</span>
                </div>
              </div>

              {/* Bags per room turn */}
              <div>
                <label className={labelClass}>
                  {isEn
                    ? `Tea Bags Per Room Turn — ${bagsPerTurn}`
                    : `ซองชาต่อการเปลี่ยนห้อง — ${bagsPerTurn}`}
                </label>
                <input
                  type="range"
                  min={1}
                  max={8}
                  step={1}
                  value={bagsPerTurn}
                  onChange={(e) => setBagsPerTurn(Number(e.target.value))}
                  className="w-full accent-rakura-gold cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-stone-400 dark:text-white/40 mt-1">
                  <span>1</span>
                  <span>8</span>
                </div>
                <p className="text-[10px] text-stone-400 dark:text-white/40 mt-1">
                  {isEn
                    ? "Collections box = 4 varieties × bags each"
                    : "กล่องคอลเลกชัน = 4 สายพันธุ์ × ซองต่อชนิด"}
                </p>
              </div>

              {/* Turnover days */}
              <div>
                <label className={labelClass}>
                  {isEn
                    ? "Room Turnover Every"
                    : "เปลี่ยนห้องทุก"}
                </label>
                <select
                  value={turnoverDays}
                  onChange={(e) => setTurnoverDays(Number(e.target.value))}
                  className={inputClass}
                >
                  {TURNOVER_DAYS.map((d) => (
                    <option key={d} value={d}>
                      {isEn
                        ? `${d} day${d > 1 ? "s" : ""}`
                        : `${d} วัน`}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Results — right col (2/5) */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {/* Monthly estimate */}
            <div className="bg-rakura-dark text-white p-6 sm:p-8 flex-1">
              <p className="text-[10px] font-semibold tracking-widest uppercase text-rakura-gold mb-6">
                {isEn ? "Monthly Estimate" : "ประมาณการต่อเดือน"}
              </p>

              <div className="space-y-5">
                <div>
                  <p className="text-5xl font-display font-bold text-white leading-none">
                    {bagsPerMonth.toLocaleString()}
                  </p>
                  <p className="text-xs text-white/60 mt-1 tracking-wide">
                    {isEn ? "tea bags / month" : "ซองชาต่อเดือน"}
                  </p>
                </div>

                <div className="border-t border-white/10 pt-5 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60 text-xs">
                      {isEn ? "Occupied rooms/day" : "ห้องที่มีแขกต่อวัน"}
                    </span>
                    <span className="font-semibold text-white text-xs">
                      ~{Math.round(occupiedRooms)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60 text-xs">
                      {isEn ? "Turns per month" : "รอบต่อเดือน"}
                    </span>
                    <span className="font-semibold text-white text-xs">
                      {turnsPerMonth.toFixed(1)}
                    </span>
                  </div>
                  <div className="flex justify-between border-t border-white/10 pt-3">
                    <span className="text-white/60 text-xs">
                      {isEn
                        ? "Collection boxes (50 bags)"
                        : "กล่องคอลเลกชัน (50 ซอง)"}
                    </span>
                    <span className="font-bold text-rakura-gold text-sm">
                      {boxesPerMonth}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recommendation */}
            <div className="bg-background border border-rakura-gold/40 p-5">
              <p className="text-[10px] font-semibold tracking-widest uppercase text-rakura-gold mb-3">
                {isEn ? "Recommended SKU" : "SKU ที่แนะนำ"}
              </p>
              <p className="font-semibold text-foreground text-sm mb-1">
                {isEn ? recommendation.skuEn : recommendation.skuTh}
              </p>
              <p className="text-xs text-rakura-muted leading-relaxed mb-4">
                {isEn ? recommendation.noteEn : recommendation.noteTh}
              </p>
              <Link
                href={`/${locale}#contact`}
                className="inline-flex items-center justify-center w-full bg-rakura-gold text-rakura-dark font-semibold text-xs tracking-wider uppercase py-2.5 px-4 hover:bg-rakura-gold-light transition-colors duration-200"
              >
                {isEn
                  ? "Request a Quote →"
                  : "ขอใบเสนอราคา →"}
              </Link>
            </div>
          </div>
        </div>

        <p className="text-center text-[10px] text-stone-400 dark:text-white/30 mt-6">
          {isEn
            ? "* Estimates based on your inputs. Final pricing and MOQ provided by our Thailand team."
            : "* ประมาณการตามข้อมูลที่คุณกรอก ราคาและ MOQ จริงแจ้งโดยทีมไทยของเรา"}
        </p>
      </div>
    </section>
  );
}
