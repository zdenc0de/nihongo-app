import { KanjiResponse } from "@/lib/kanjiApi";
import KanjiDetailItem from "./KanjiDetailItem";

interface KanjiCardProps {
  kanjiData: KanjiResponse;
}

export default function KanjiCard({ kanjiData }: KanjiCardProps) {
  const {
    kanji,
    meanings,
    kun_readings,
    on_readings,
    name_readings,
    jlpt,
    stroke_count,
    unicode,
    grade,
    heising,
    freq_mainichi_shinbun,
    unihan_cjk_compatibility_variants,
    notes,
  } = kanjiData;

  const mainKun = kun_readings.length > 0 ? kun_readings[0] : "";

  return (
    <div className="card w-full max-w-[720px] mx-auto space-y-8">
      {/* Sub-Card Superior */}
      <div className="sub-card text-center text-white">
        {mainKun && (
          <p className="text-2xl font-medium text-white mb-3">{mainKun}</p>
        )}
        <div className="kanji-display">{kanji}</div>
      </div>

      <div className="sub-card grid sm:grid-cols-2 gap-6 text-white">
        <KanjiDetailItem label="Meanings" value={meanings} />
        <KanjiDetailItem label="JLPT" value={jlpt} />
        <KanjiDetailItem label="Kun Readings" value={kun_readings} />
        <KanjiDetailItem label="On Readings" value={on_readings} />
        <KanjiDetailItem label="Name Readings" value={name_readings} />
        <KanjiDetailItem label="Stroke Count" value={stroke_count} />
        <KanjiDetailItem label="Unicode" value={unicode} />
        <KanjiDetailItem label="Grade" value={grade} />
        <KanjiDetailItem
          label="Heising"
          value={heising}
          className="sm:col-span-2"
        />
        <KanjiDetailItem
          label="Frequency (Mainichi Shinbun)"
          value={freq_mainichi_shinbun}
        />
        <KanjiDetailItem
          label="CJK Compatibility Variants"
          value={unihan_cjk_compatibility_variants}
        />
        <KanjiDetailItem
          label="Notes"
          value={notes}
          className="sm:col-span-2"
        />
      </div>
    </div>
  );
}