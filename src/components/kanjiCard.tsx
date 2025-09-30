type Props = {
  kanji: string;
  meanings?: string[];
  kun?: string[];
  on?: string[];
  jlpt?: number | null;
};

export default function KanjiCard({
  kanji,
  meanings = [],
  kun = [],
  on = [],
  jlpt,
}: Props) {
  const mainKun = kun.length > 0 ? kun[0] : "";

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
          <p className="meta mt-1">
            {meanings.length ? meanings.join(", ") : "—"}
          </p>
        </div>
        <div>
          <h3 className="text-sm font-semibold tracking-wide uppercase opacity-80">
            JLPT
          </h3>
          <p className="meta mt-1">{jlpt ?? "—"}</p>
        </div>
        <div>
          <h3 className="text-sm font-semibold tracking-wide uppercase opacity-80">
            Kun
          </h3>
          <p className="meta mt-1">{kun.length ? kun.join(", ") : "—"}</p>
        </div>
        <div>
          <h3 className="text-sm font-semibold tracking-wide uppercase opacity-80">
            On
          </h3>
          <p className="meta mt-1">{on.length ? on.join(", ") : "—"}</p>
        </div>
      </div>
    </div>
  );
}

