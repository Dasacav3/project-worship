export enum BibleDivisionType {
  OLT = 'OLT',
  NVT = 'NVT',
}

export interface IBibleStructure {
  book: string;
  chapters: number;
  type: BibleDivisionType;
}

export const BibleStructure: IBibleStructure[] = [
  {
    book: 'Genesis',
    chapters: 50,
    type: BibleDivisionType.OLT
  },
  {
    book: 'Éxodo',
    chapters: 40,
    type: BibleDivisionType.OLT
  },
  {
    book: 'Levítico',
    chapters: 27,
    type: BibleDivisionType.OLT
  },
  {
    book: 'Números',
    chapters: 36,
    type: BibleDivisionType.OLT
  },
  {
    book: 'Deuteronomio',
    chapters: 34,
    type: BibleDivisionType.OLT
  },
  {
    book: 'Josué',
    chapters: 24,
    type: BibleDivisionType.OLT
  },
  {
    book: 'Jueces',
    chapters: 21,
    type: BibleDivisionType.OLT
  },
  {
    book: 'Rut',
    chapters: 4,
    type: BibleDivisionType.OLT
  },
  {
    book: '1 Samuel',
    chapters: 31,
    type: BibleDivisionType.OLT
  },
  {
    book: '2 Samuel',
    chapters: 24,
    type: BibleDivisionType.OLT
  },
  {
    book: '1 Reyes',
    chapters: 22,
    type: BibleDivisionType.OLT
  },
  {
    book: '2 Reyes',
    chapters: 25,
    type: BibleDivisionType.OLT
  },
  {
    book: '1 Crónicas',
    chapters: 29,
    type: BibleDivisionType.OLT
  },
  {
    book: '2 Crónicas',
    chapters: 36,
    type: BibleDivisionType.OLT
  },
  {
    book: 'Esdras',
    chapters: 10,
    type: BibleDivisionType.OLT
  },
  {
    book: 'Nehemías',
    chapters: 13,
    type: BibleDivisionType.OLT
  },
  {
    book: 'Ester',
    chapters: 10,
    type: BibleDivisionType.OLT
  },
  {
    book: 'Job',
    chapters: 42,
    type: BibleDivisionType.OLT
  },
  {
    book: 'Salmos',
    chapters: 150,
    type: BibleDivisionType.OLT
  },
  {
    book: 'Proverbios',
    chapters: 31,
    type: BibleDivisionType.OLT
  },
  {
    book: 'Eclesiastés',
    chapters: 12,
    type: BibleDivisionType.OLT
  },
  {
    book: 'Cantares',
    chapters: 8,
    type: BibleDivisionType.OLT
  },
  {
    book: 'Isaías',
    chapters: 66,
    type: BibleDivisionType.OLT
  },
  {
    book: 'Jeremías',
    chapters: 52,
    type: BibleDivisionType.OLT
  },
  {
    book: 'Lamentaciones',
    chapters: 5,
    type: BibleDivisionType.OLT
  },
  {
    book: 'Ezequiel',
    chapters: 48,
    type: BibleDivisionType.OLT
  },
  {
    book: 'Daniel',
    chapters: 12,
    type: BibleDivisionType.OLT
  },
  {
    book: 'Oseas',
    chapters: 14,
    type: BibleDivisionType.OLT
  },
  {
    book: 'Joel',
    chapters: 3,
    type: BibleDivisionType.OLT
  },
  {
    book: 'Amós',
    chapters: 9,
    type: BibleDivisionType.OLT
  },
  {
    book: 'Abdías',
    chapters: 1,
    type: BibleDivisionType.OLT
  },
  {
    book: 'Jonás',
    chapters: 4,
    type: BibleDivisionType.OLT
  },
  {
    book: 'Miqueas',
    chapters: 7,
    type: BibleDivisionType.OLT
  },
  {
    book: 'Nahúm',
    chapters: 3,
    type: BibleDivisionType.OLT
  },
  {
    book: 'Habacuc',
    chapters: 3,
    type: BibleDivisionType.OLT
  },
  {
    book: 'Sofonías',
    chapters: 3,
    type: BibleDivisionType.OLT
  },
  {
    book: 'Hageo',
    chapters: 2,
    type: BibleDivisionType.OLT
  },
  {
    book: 'Zacarías',
    chapters: 14,
    type: BibleDivisionType.OLT
  },
  {
    book: 'Malaquías',
    chapters: 4,
    type: BibleDivisionType.OLT
  },
  {
    book: 'Mateo',
    chapters: 28,
    type: BibleDivisionType.NVT
  },
  {
    book: 'Marcos',
    chapters: 16,
    type: BibleDivisionType.NVT
  },
  {
    book: 'Lucas',
    chapters: 24,
    type: BibleDivisionType.NVT
  },
  {
    book: 'Juan',
    chapters: 21,
    type: BibleDivisionType.NVT
  },
  {
    book: 'Hechos',
    chapters: 28,
    type: BibleDivisionType.NVT
  },
  {
    book: 'Romanos',
    chapters: 16,
    type: BibleDivisionType.NVT
  },
  {
    book: '1 Corintios',
    chapters: 16,
    type: BibleDivisionType.NVT
  },
  {
    book: '2 Corintios',
    chapters: 13,
    type: BibleDivisionType.NVT
  },
  {
    book: 'Gálatas',
    chapters: 6,
    type: BibleDivisionType.NVT
  },
  {
    book: 'Efesios',
    chapters: 6,
    type: BibleDivisionType.NVT
  },
  {
    book: 'Filipenses',
    chapters: 4,
    type: BibleDivisionType.NVT
  },
  {
    book: 'Colosenses',
    chapters: 4,
    type: BibleDivisionType.NVT
  },
  {
    book: '1 Tesalonicenses',
    chapters: 5,
    type: BibleDivisionType.NVT
  },
  {
    book: '2 Tesalonicenses',
    chapters: 3,
    type: BibleDivisionType.NVT
  },
  {
    book: '1 Timoteo',
    chapters: 6,
    type: BibleDivisionType.NVT
  },
  {
    book: '2 Timoteo',
    chapters: 4,
    type: BibleDivisionType.NVT
  },
  {
    book: 'Tito',
    chapters: 3,
    type: BibleDivisionType.NVT
  },
  {
    book: 'Filemón',
    chapters: 1,
    type: BibleDivisionType.NVT
  },
  {
    book: 'Hebreos',
    chapters: 13,
    type: BibleDivisionType.NVT
  },
  {
    book: 'Santiago',
    chapters: 5,
    type: BibleDivisionType.NVT
  },
  {
    book: '1 Pedro',
    chapters: 5,
    type: BibleDivisionType.NVT
  },
  {
    book: '2 Pedro',
    chapters: 3,
    type: BibleDivisionType.NVT
  },
  {
    book: '1 Juan',
    chapters: 5,
    type: BibleDivisionType.NVT
  },
  {
    book: '2 Juan',
    chapters: 1,
    type: BibleDivisionType.NVT
  },
  {
    book: '3 Juan',
    chapters: 1,
    type: BibleDivisionType.NVT
  },
  {
    book: 'Judas',
    chapters: 1,
    type: BibleDivisionType.NVT
  },
  {
    book: 'Apocalipsis',
    chapters: 22,
    type: BibleDivisionType.NVT
  }
];
