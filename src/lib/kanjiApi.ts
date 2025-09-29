export type KanjiResponse = {
    kanji: string;
    kun_readings: string[];
    on_readings: string[];
    name_readings: string[];
    meanings: string[];
    stroke_count: number;
    unicode: string;
    grade: number | null;
    jlpt: number | null;
    heising: string | null;
    freq_mainichi_shinbun: number | null;
    unihan_cjk_compatibility_variants: string | null;
    notes: string[];
}

export async function fetchKanji(kanji: string): Promise<KanjiResponse> {
    const res = await fetch (`https://kanjiapi.dev/v1/kanji/${encodeURIComponent(kanji)}`);
    if (!res.ok) {
        throw new Error('Failed to fetch kanji data');
    }
    return res.json();
}