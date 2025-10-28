const grammar = [
  {
    id: "n4-kara-made",
    structure: "〜から〜まで",
    meaning: "desde... hasta...",
    usage: "Marca rango de tiempo o lugar",
    examples: [
      {
        jp: "学校から家まで歩きます。",
        romaji: "gakkō kara ie made arukimasu",
        es: "Camino de la escuela a casa.",
      },
      {
        jp: "試験は１０時から１２時までです。",
        romaji: "shiken wa 10-ji kara 12-ji made desu.",
        es: "El examen es desde las 10 hasta las 12.",
      },
    ],
    tags: ["rango", "tiempo", "lugar", "n4"],
  },
  {
    id: "n4-nakereba-narimasen",
    structure: "～なければなりません",
    meaning: "tener que...",
    usage:
      "Verbo (forma NAI, sin い) + ければなりません. Expresa necesidad u obligación.",
    examples: [
      {
        jp: "薬を飲まなければなりません。",
        romaji: "kusuri o nomanakereba narimasen.",
        es: "Tengo que tomar la medicina.",
      },
      {
        jp: "明日、学校へ行かなければなりません。",
        romaji: "ashita, gakkō e ikanakereba narimasen.",
        es: "Mañana debo ir a la escuela.",
      },
    ],
    tags: ["obligación", "n4"],
  },
];

export default grammar;
