type Props = {
  kanji: string;
  meanings?: string[];
  kun?: string[];
  on?: string[];
  jlpt?: number | null;
};

export default function KanjiCard({ kanji, meanings = [], kun = [], on = [], jlpt }: Props) {
  return (
    <div className="card w-full max-w-[720px] mx-auto">
      <div className="hr-accent mb-6" />
      <div className="kanji-display mb-6">{kanji}</div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <h3 className="text-sm font-semibold tracking-wide uppercase opacity-80">Meanings</h3>
          <p className="meta mt-1">{meanings.length ? meanings.join(", ") : "—"}</p>
        </div>
        <div>
          <h3 className="text-sm font-semibold tracking-wide uppercase opacity-80">JLPT</h3>
          <p className="meta mt-1">{jlpt ?? "—"}</p>
        </div>
        <div>
          <h3 className="text-sm font-semibold tracking-wide uppercase opacity-80">Kun</h3>
          <p className="meta mt-1">{kun.length ? kun.join(", ") : "—"}</p>
        </div>
        <div>
          <h3 className="text-sm font-semibold tracking-wide uppercase opacity-80">On</h3>
          <p className="meta mt-1">{on.length ? on.join(", ") : "—"}</p>
        </div>
      </div>
    </div>
  );
}
