import { KanjiResponse } from "@/lib/kanjiApi";

export default function KanjiCard({
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
}: KanjiResponse) {
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

      {/* Sub-Card Inferior */}
      <div className="sub-card grid sm:grid-cols-2 gap-6 text-white">
        <div>
          <h3 className="text-sm font-semibold tracking-wide uppercase opacity-80">
            Meanings
          </h3>
          <p className="meta mt-1">{meanings.length ? meanings.join(", ") : "—"}</p>
        </div>

        <div>
          <h3 className="text-sm font-semibold tracking-wide uppercase opacity-80">
            JLPT
          </h3>
          <p className="meta mt-1">{jlpt ?? "—"}</p>
        </div>

        <div>
          <h3 className="text-sm font-semibold tracking-wide uppercase opacity-80">
            Kun Readings
          </h3>
          <p className="meta mt-1">{kun_readings.length ? kun_readings.join(", ") : "—"}</p>
        </div>

        <div>
          <h3 className="text-sm font-semibold tracking-wide uppercase opacity-80">
            On Readings
          </h3>
          <p className="meta mt-1">{on_readings.length ? on_readings.join(", ") : "—"}</p>
        </div>

        <div>
          <h3 className="text-sm font-semibold tracking-wide uppercase opacity-80">
            Name Readings
          </h3>
          <p className="meta mt-1">{name_readings.length ? name_readings.join(", ") : "—"}</p>
        </div>

        <div>
          <h3 className="text-sm font-semibold tracking-wide uppercase opacity-80">
            Stroke Count
          </h3>
          <p className="meta mt-1">{stroke_count ?? "—"}</p>
        </div>

        <div>
          <h3 className="text-sm font-semibold tracking-wide uppercase opacity-80">
            Unicode
          </h3>
          <p className="meta mt-1">{unicode}</p>
        </div>

        <div>
          <h3 className="text-sm font-semibold tracking-wide uppercase opacity-80">
            Grade
          </h3>
          <p className="meta mt-1">{grade ?? "—"}</p>
        </div>

        <div className="sm:col-span-2">
          <h3 className="text-sm font-semibold tracking-wide uppercase opacity-80">
            Heising
          </h3>
          <p className="meta mt-1">{heising ?? "—"}</p>
        </div>

        <div>
          <h3 className="text-sm font-semibold tracking-wide uppercase opacity-80">
            Frequency (Mainichi Shinbun)
          </h3>
          <p className="meta mt-1">{freq_mainichi_shinbun ?? "—"}</p>
        </div>

        <div>
          <h3 className="text-sm font-semibold tracking-wide uppercase opacity-80">
            CJK Compatibility Variants
          </h3>
          <p className="meta mt-1">
            {unihan_cjk_compatibility_variants ?? "—"}
          </p>
        </div>

        <div className="sm:col-span-2">
          <h3 className="text-sm font-semibold tracking-wide uppercase opacity-80">
            Notes
          </h3>
          <p className="meta mt-1">{notes.length ? notes.join(", ") : "—"}</p>
        </div>
      </div>
    </div>
  );
}
