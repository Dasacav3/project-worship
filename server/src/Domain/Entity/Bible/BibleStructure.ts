export enum BibleDivisionType {
  OLT = 'OLT',
  NVT = 'NVT',
}

export interface IBibleStructure {
  id: number;
  book: string;
  chapters: number;
  type: BibleDivisionType;
}

export const BibleStructure: IBibleStructure[] = [
  {
    id: 1,
    book: 'Genesis',
    chapters: 50,
    type: BibleDivisionType.OLT
  },
  {
    id: 2,
    book: 'Éxodo',
    chapters: 40,
    type: BibleDivisionType.OLT
  },
  {
    id: 3,
    book: 'Levítico',
    chapters: 27,
    type: BibleDivisionType.OLT
  },
  {
    id: 4,
    book: 'Números',
    chapters: 36,
    type: BibleDivisionType.OLT
  },
  {
    id: 5,
    book: 'Deuteronomio',
    chapters: 34,
    type: BibleDivisionType.OLT
  },
  {
    id: 6,
    book: 'Josué',
    chapters: 24,
    type: BibleDivisionType.OLT
  },
  {
    id: 7,
    book: 'Jueces',
    chapters: 21,
    type: BibleDivisionType.OLT
  },
  {
    id: 8,
    book: 'Rut',
    chapters: 4,
    type: BibleDivisionType.OLT
  },
  {
    id: 9,
    book: '1 Samuel',
    chapters: 31,
    type: BibleDivisionType.OLT
  },
  {
    id: 10,
    book: '2 Samuel',
    chapters: 24,
    type: BibleDivisionType.OLT
  },
  {
    id: 11,
    book: '1 Reyes',
    chapters: 22,
    type: BibleDivisionType.OLT
  },
  {
    id: 12,
    book: '2 Reyes',
    chapters: 25,
    type: BibleDivisionType.OLT
  },
  {
    id: 13,
    book: '1 Crónicas',
    chapters: 29,
    type: BibleDivisionType.OLT
  },
  {
    id: 14,
    book: '2 Crónicas',
    chapters: 36,
    type: BibleDivisionType.OLT
  },
  {
    id: 15,
    book: 'Esdras',
    chapters: 10,
    type: BibleDivisionType.OLT
  },
  {
    id: 16,
    book: 'Nehemías',
    chapters: 13,
    type: BibleDivisionType.OLT
  },
  {
    id: 17,
    book: 'Ester',
    chapters: 10,
    type: BibleDivisionType.OLT
  },
  {
    id: 18,
    book: 'Job',
    chapters: 42,
    type: BibleDivisionType.OLT
  },
  {
    id: 19,
    book: 'Salmos',
    chapters: 150,
    type: BibleDivisionType.OLT
  },
  {
    id: 20,
    book: 'Proverbios',
    chapters: 31,
    type: BibleDivisionType.OLT
  },
  {
    id: 21,
    book: 'Eclesiastés',
    chapters: 12,
    type: BibleDivisionType.OLT
  },
  {
    id: 22,
    book: 'Cantares',
    chapters: 8,
    type: BibleDivisionType.OLT
  },
  {
    id: 23,
    book: 'Isaías',
    chapters: 66,
    type: BibleDivisionType.OLT
  },
  {
    id: 24,
    book: 'Jeremías',
    chapters: 52,
    type: BibleDivisionType.OLT
  },
  {
    id: 25,
    book: 'Lamentaciones',
    chapters: 5,
    type: BibleDivisionType.OLT
  },
  {
    id: 26,
    book: 'Ezequiel',
    chapters: 48,
    type: BibleDivisionType.OLT
  },
  {
    id: 27,
    book: 'Daniel',
    chapters: 12,
    type: BibleDivisionType.OLT
  },
  {
    id: 28,
    book: 'Oseas',
    chapters: 14,
    type: BibleDivisionType.OLT
  },
  {
    id: 29,
    book: 'Joel',
    chapters: 3,
    type: BibleDivisionType.OLT
  },
  {
    id: 30,
    book: 'Amós',
    chapters: 9,
    type: BibleDivisionType.OLT
  },
  {
    id: 31,
    book: 'Abdías',
    chapters: 1,
    type: BibleDivisionType.OLT
  },
  {
    id: 32,
    book: 'Jonás',
    chapters: 4,
    type: BibleDivisionType.OLT
  },
  {
    id: 33,
    book: 'Miqueas',
    chapters: 7,
    type: BibleDivisionType.OLT
  },
  {
    id: 34,
    book: 'Nahúm',
    chapters: 3,
    type: BibleDivisionType.OLT
  },
  {
    id: 35,
    book: 'Habacuc',
    chapters: 3,
    type: BibleDivisionType.OLT
  },
  {
    id: 36,
    book: 'Sofonías',
    chapters: 3,
    type: BibleDivisionType.OLT
  },
  {
    id: 37,
    book: 'Hageo',
    chapters: 2,
    type: BibleDivisionType.OLT
  },
  {
    id: 38,
    book: 'Zacarías',
    chapters: 14,
    type: BibleDivisionType.OLT
  },
  {
    id: 39,
    book: 'Malaquías',
    chapters: 4,
    type: BibleDivisionType.OLT
  },
  {
    id: 40,
    book: 'Mateo',
    chapters: 28,
    type: BibleDivisionType.NVT
  },
  {
    id: 41,
    book: 'Marcos',
    chapters: 16,
    type: BibleDivisionType.NVT
  },
  {
    id: 42,
    book: 'Lucas',
    chapters: 24,
    type: BibleDivisionType.NVT
  },
  {
    id: 43,
    book: 'Juan',
    chapters: 21,
    type: BibleDivisionType.NVT
  },
  {
    id: 44,
    book: 'Hechos',
    chapters: 28,
    type: BibleDivisionType.NVT
  },
  {
    id: 45,
    book: 'Romanos',
    chapters: 16,
    type: BibleDivisionType.NVT
  },
  {
    id: 46,
    book: '1 Corintios',
    chapters: 16,
    type: BibleDivisionType.NVT
  },
  {
    id: 47,
    book: '2 Corintios',
    chapters: 13,
    type: BibleDivisionType.NVT
  },
  {
    id: 48,
    book: 'Gálatas',
    chapters: 6,
    type: BibleDivisionType.NVT
  },
  {
    id: 49,
    book: 'Efesios',
    chapters: 6,
    type: BibleDivisionType.NVT
  },
  {
    id: 50,
    book: 'Filipenses',
    chapters: 4,
    type: BibleDivisionType.NVT
  },
  {
    id: 51,
    book: 'Colosenses',
    chapters: 4,
    type: BibleDivisionType.NVT
  },
  {
    id: 52,
    book: '1 Tesalonicenses',
    chapters: 5,
    type: BibleDivisionType.NVT
  },
  {
    id: 53,
    book: '2 Tesalonicenses',
    chapters: 3,
    type: BibleDivisionType.NVT
  },
  {
    id: 54,
    book: '1 Timoteo',
    chapters: 6,
    type: BibleDivisionType.NVT
  },
  {
    id: 55,
    book: '2 Timoteo',
    chapters: 4,
    type: BibleDivisionType.NVT
  },
  {
    id: 56,
    book: 'Tito',
    chapters: 3,
    type: BibleDivisionType.NVT
  },
  {
    id: 57,
    book: 'Filemón',
    chapters: 1,
    type: BibleDivisionType.NVT
  },
  {
    id: 58,
    book: 'Hebreos',
    chapters: 13,
    type: BibleDivisionType.NVT
  },
  {
    id: 59,
    book: 'Santiago',
    chapters: 5,
    type: BibleDivisionType.NVT
  },
  {
    id: 60,
    book: '1 Pedro',
    chapters: 5,
    type: BibleDivisionType.NVT
  },
  {
    id: 61,
    book: '2 Pedro',
    chapters: 3,
    type: BibleDivisionType.NVT
  },
  {
    id: 62,
    book: '1 Juan',
    chapters: 5,
    type: BibleDivisionType.NVT
  },
  {
    id: 63,
    book: '2 Juan',
    chapters: 1,
    type: BibleDivisionType.NVT
  },
  {
    id: 64,
    book: '3 Juan',
    chapters: 1,
    type: BibleDivisionType.NVT
  },
  {
    id: 65,
    book: 'Judas',
    chapters: 1,
    type: BibleDivisionType.NVT
  },
  {
    id: 66,
    book: 'Apocalipsis',
    chapters: 22,
    type: BibleDivisionType.NVT
  }
];
