/**
 * @typedef {object} ChemicalElement
 * @property {number} id
 * @property {string} symbol
 * @property {string} text
 * @property {string} link
 */


const elements = [
  {
    id: 1,
    symbol: "H",
    text: "水素",
    link: "https://ja.wikipedia.org/wiki/%E6%B0%B4%E7%B4%A0"
  },
  {
    id: 2,
    symbol: "He",
    text: "ヘリウム",
    link: "https://ja.wikipedia.org/wiki/%E3%83%98%E3%83%AA%E3%82%A6%E3%83%A0"
  },
  {
    id: 3,
    symbol: "Li",
    text: "リチウム",
    link: "https://ja.wikipedia.org/wiki/%E3%83%AA%E3%83%81%E3%82%A6%E3%83%A0"
  },
  {
    id: 4,
    symbol: "Be",
    text: "ベリリウム",
    link: "https://ja.wikipedia.org/wiki/%E3%83%99%E3%83%AA%E3%83%AA%E3%82%A6%E3%83%A0"
  },
  {
    id: 5,
    symbol: "B",
    text: "ホウ素",
    link: "https://ja.wikipedia.org/wiki/%E3%83%9B%E3%82%A6%E7%B4%A0"
  },
  {
    id: 6,
    symbol: "C",
    text: "炭素",
    link: "https://ja.wikipedia.org/wiki/%E7%82%AD%E7%B4%A0"
  },
  {
    id: 7,
    symbol: "N",
    text: "窒素",
    link: "https://ja.wikipedia.org/wiki/%E7%AA%92%E7%B4%A0"
  },
  {
    id: 8,
    symbol: "O",
    text: "酸素",
    link: "https://ja.wikipedia.org/wiki/%E9%85%B8%E7%B4%A0"
  },
  {
    id: 9,
    symbol: "F",
    text: "フッ素",
    link: "https://ja.wikipedia.org/wiki/%E3%83%95%E3%83%83%E7%B4%A0"
  },
  {
    id: 10,
    symbol: "Ne",
    text: "ネオン",
    link: "https://ja.wikipedia.org/wiki/%E3%83%8D%E3%82%AA%E3%83%B3"
  },
  {
    id: 11,
    symbol: "Na",
    text: "ナトリウム",
    link: "https://ja.wikipedia.org/wiki/%E3%83%8A%E3%83%88%E3%83%AA%E3%82%A6%E3%83%A0"
  },
  {
    id: 12,
    symbol: "Mg",
    text: "マグネシウム",
    link: "https://ja.wikipedia.org/wiki/%E3%83%9E%E3%82%B0%E3%83%8D%E3%82%B7%E3%82%A6%E3%83%A0"
  },
  {
    id: 13,
    symbol: "Al",
    text: "アルミニウム",
    link: "https://ja.wikipedia.org/wiki/%E3%82%A2%E3%83%AB%E3%83%9F%E3%83%8B%E3%82%A6%E3%83%A0"
  },
  {
    id: 14,
    symbol: "Si",
    text: "ケイ素",
    link: "https://ja.wikipedia.org/wiki/%E3%82%B1%E3%82%A4%E7%B4%A0"
  },
  {
    id: 15,
    symbol: "P",
    text: "リン",
    link: "https://ja.wikipedia.org/wiki/%E3%83%AA%E3%83%B3"
  },
  {
    id: 16,
    symbol: "S",
    text: "硫黄",
    link: "https://ja.wikipedia.org/wiki/%E7%A1%AB%E9%BB%84"
  },
  {
    id: 17,
    symbol: "Cl",
    text: "塩素",
    link: "https://ja.wikipedia.org/wiki/%E5%A1%A9%E7%B4%A0"
  },
  {
    id: 18,
    symbol: "Ar",
    text: "アルゴン",
    link: "https://ja.wikipedia.org/wiki/%E3%82%A2%E3%83%AB%E3%82%B4%E3%83%B3"
  },
  {
    id: 19,
    symbol: "K",
    text: "カリウム",
    link: "https://ja.wikipedia.org/wiki/%E3%82%AB%E3%83%AA%E3%82%A6%E3%83%A0"
  },
  {
    id: 20,
    symbol: "Ca",
    text: "カルシウム",
    link: "https://ja.wikipedia.org/wiki/%E3%82%AB%E3%83%AB%E3%82%B7%E3%82%A6%E3%83%A0"
  },
  {
    id: 21,
    symbol: "Sc",
    text: "スカンジウム",
    link: "https://ja.wikipedia.org/wiki/%E3%82%B9%E3%82%AB%E3%83%B3%E3%82%B8%E3%82%A6%E3%83%A0"
  },
  {
    id: 22,
    symbol: "Ti",
    text: "チタン",
    link: "https://ja.wikipedia.org/wiki/%E3%83%81%E3%82%BF%E3%83%B3"
  },
  {
    id: 23,
    symbol: "V",
    text: "バナジウム",
    link: "https://ja.wikipedia.org/wiki/%E3%83%90%E3%83%8A%E3%82%B8%E3%82%A6%E3%83%A0"
  },
  {
    id: 24,
    symbol: "Cr",
    text: "クロム",
    link: "https://ja.wikipedia.org/wiki/%E3%82%AF%E3%83%AD%E3%83%A0"
  },
  {
    id: 25,
    symbol: "Mn",
    text: "マンガン",
    link: "https://ja.wikipedia.org/wiki/%E3%83%9E%E3%83%B3%E3%82%AC%E3%83%B3"
  },
  {
    id: 26,
    symbol: "Fe",
    text: "鉄",
    link: "https://ja.wikipedia.org/wiki/%E9%89%84"
  },
  {
    id: 27,
    symbol: "Co",
    text: "コバルト",
    link: "https://ja.wikipedia.org/wiki/%E3%82%B3%E3%83%90%E3%83%AB%E3%83%88"
  },
  {
    id: 28,
    symbol: "Ni",
    text: "ニッケル",
    link: "https://ja.wikipedia.org/wiki/%E3%83%8B%E3%83%83%E3%82%B1%E3%83%AB"
  },
  {
    id: 29,
    symbol: "Cu",
    text: "銅",
    link: "https://ja.wikipedia.org/wiki/%E9%8A%85"
  },
  {
    id: 30,
    symbol: "Zn",
    text: "亜鉛",
    link: "https://ja.wikipedia.org/wiki/%E4%BA%9C%E9%89%9B"
  },
  {
    id: 31,
    symbol: "Ga",
    text: "ガリウム",
    link: "https://ja.wikipedia.org/wiki/%E3%82%AC%E3%83%AA%E3%82%A6%E3%83%A0"
  },
  {
    id: 32,
    symbol: "Ge",
    text: "ゲルマニウム",
    link: "https://ja.wikipedia.org/wiki/%E3%82%B2%E3%83%AB%E3%83%9E%E3%83%8B%E3%82%A6%E3%83%A0"
  },
  {
    id: 33,
    symbol: "As",
    text: "ヒ素",
    link: "https://ja.wikipedia.org/wiki/%E3%83%92%E7%B4%A0"
  },
  {
    id: 34,
    symbol: "Se",
    text: "セレン",
    link: "https://ja.wikipedia.org/wiki/%E3%82%BB%E3%83%AC%E3%83%B3"
  },
  {
    id: 35,
    symbol: "Br",
    text: "臭素",
    link: "https://ja.wikipedia.org/wiki/%E8%87%AD%E7%B4%A0"
  },
  {
    id: 36,
    symbol: "Kr",
    text: "クリプトン",
    link: "https://ja.wikipedia.org/wiki/%E3%82%AF%E3%83%AA%E3%83%97%E3%83%88%E3%83%B3"
  },
  {
    id: 37,
    symbol: "Rb",
    text: "ルビジウム",
    link: "https://ja.wikipedia.org/wiki/%E3%83%AB%E3%83%93%E3%82%B8%E3%82%A6%E3%83%A0"
  },
  {
    id: 38,
    symbol: "Sr",
    text: "ストロンチウム",
    link: "https://ja.wikipedia.org/wiki/%E3%82%B9%E3%83%88%E3%83%AD%E3%83%B3%E3%83%81%E3%82%A6%E3%83%A0"
  },
  {
    id: 39,
    symbol: "Y",
    text: "イットリウム",
    link: "https://ja.wikipedia.org/wiki/%E3%82%A4%E3%83%83%E3%83%88%E3%83%AA%E3%82%A6%E3%83%A0"
  },
  {
    id: 40,
    symbol: "Zr",
    text: "ジルコニウム",
    link: "https://ja.wikipedia.org/wiki/%E3%82%B8%E3%83%AB%E3%82%B3%E3%83%8B%E3%82%A6%E3%83%A0"
  },
  {
    id: 41,
    symbol: "Nb",
    text: "ニオブ",
    link: "https://ja.wikipedia.org/wiki/%E3%83%8B%E3%82%AA%E3%83%96"
  },
  {
    id: 42,
    symbol: "Mo",
    text: "モリブデン",
    link: "https://ja.wikipedia.org/wiki/%E3%83%A2%E3%83%AA%E3%83%96%E3%83%87%E3%83%B3"
  },
  {
    id: 43,
    symbol: "Tc",
    text: "テクネチウム",
    link: "https://ja.wikipedia.org/wiki/%E3%83%86%E3%82%AF%E3%83%8D%E3%83%81%E3%82%A6%E3%83%A0"
  },
  {
    id: 44,
    symbol: "Ru",
    text: "ルテニウム",
    link: "https://ja.wikipedia.org/wiki/%E3%83%AB%E3%83%86%E3%83%8B%E3%82%A6%E3%83%A0"
  },
  {
    id: 45,
    symbol: "Rh",
    text: "ロジウム",
    link: "https://ja.wikipedia.org/wiki/%E3%83%AD%E3%82%B8%E3%82%A6%E3%83%A0"
  },
  {
    id: 46,
    symbol: "Pd",
    text: "パラジウム",
    link: "https://ja.wikipedia.org/wiki/%E3%83%91%E3%83%A9%E3%82%B8%E3%82%A6%E3%83%A0"
  },
  {
    id: 47,
    symbol: "Ag",
    text: "銀",
    link: "https://ja.wikipedia.org/wiki/%E9%8A%80"
  },
  {
    id: 48,
    symbol: "Cd",
    text: "カドミウム",
    link: "https://ja.wikipedia.org/wiki/%E3%82%AB%E3%83%89%E3%83%9F%E3%82%A6%E3%83%A0"
  },
  {
    id: 49,
    symbol: "In",
    text: "インジウム",
    link: "https://ja.wikipedia.org/wiki/%E3%82%A4%E3%83%B3%E3%82%B8%E3%82%A6%E3%83%A0"
  },
  {
    id: 50,
    symbol: "Sn",
    text: "スズ",
    link: "https://ja.wikipedia.org/wiki/%E3%82%B9%E3%82%BA"
  },
  {
    id: 51,
    symbol: "Sb",
    text: "アンチモン",
    link: "https://ja.wikipedia.org/wiki/%E3%82%A2%E3%83%B3%E3%83%81%E3%83%A2%E3%83%B3"
  },
  {
    id: 52,
    symbol: "Te",
    text: "テルル",
    link: "https://ja.wikipedia.org/wiki/%E3%83%86%E3%83%AB%E3%83%AB"
  },
  {
    id: 53,
    symbol: "I",
    text: "ヨウ素",
    link: "https://ja.wikipedia.org/wiki/%E3%83%A8%E3%82%A6%E7%B4%A0"
  },
  {
    id: 54,
    symbol: "Xe",
    text: "キセノン",
    link: "https://ja.wikipedia.org/wiki/%E3%82%AD%E3%82%BB%E3%83%8E%E3%83%B3"
  },
  {
    id: 55,
    symbol: "Cs",
    text: "セシウム",
    link: "https://ja.wikipedia.org/wiki/%E3%82%BB%E3%82%B7%E3%82%A6%E3%83%A0"
  },
  {
    id: 56,
    symbol: "Ba",
    text: "バリウム",
    link: "https://ja.wikipedia.org/wiki/%E3%83%90%E3%83%AA%E3%82%A6%E3%83%A0"
  },
  {
    id: 57,
    symbol: "La",
    text: "ランタン",
    link: "https://ja.wikipedia.org/wiki/%E3%83%A9%E3%83%B3%E3%82%BF%E3%83%B3"
  },
  {
    id: 58,
    symbol: "Ce",
    text: "セリウム",
    link: "https://ja.wikipedia.org/wiki/%E3%82%BB%E3%83%AA%E3%82%A6%E3%83%A0"
  },
  {
    id: 59,
    symbol: "Pr",
    text: "プラセオジム",
    link: "https://ja.wikipedia.org/wiki/%E3%83%97%E3%83%A9%E3%82%BB%E3%82%AA%E3%82%B8%E3%83%A0"
  },
  {
    id: 60,
    symbol: "Nd",
    text: "ネオジム",
    link: "https://ja.wikipedia.org/wiki/%E3%83%8D%E3%82%AA%E3%82%B8%E3%83%A0"
  },
  {
    id: 61,
    symbol: "Pm",
    text: "プロメチウム",
    link: "https://ja.wikipedia.org/wiki/%E3%83%97%E3%83%AD%E3%83%A1%E3%83%81%E3%82%A6%E3%83%A0"
  },
  {
    id: 62,
    symbol: "Sm",
    text: "セマリウム",
    link: "https://ja.wikipedia.org/wiki/%E3%82%B5%E3%83%9E%E3%83%AA%E3%82%A6%E3%83%A0"
  },
  {
    id: 63,
    symbol: "Eu",
    text: "ユウロピウム",
    link: "https://ja.wikipedia.org/wiki/%E3%83%A6%E3%82%A6%E3%83%AD%E3%83%94%E3%82%A6%E3%83%A0"
  },
  {
    id: 64,
    symbol: "Gd",
    text: "ガドリニウム",
    link: "https://ja.wikipedia.org/wiki/%E3%82%AC%E3%83%89%E3%83%AA%E3%83%8B%E3%82%A6%E3%83%A0"
  },
  {
    id: 65,
    symbol: "Tb",
    text: "テルビウム",
    link: "https://ja.wikipedia.org/wiki/%E3%83%86%E3%83%AB%E3%83%93%E3%82%A6%E3%83%A0"
  },
  {
    id: 66,
    symbol: "Dy",
    text: "ジスプロシウム",
    link: "https://ja.wikipedia.org/wiki/%E3%82%B8%E3%82%B9%E3%83%97%E3%83%AD%E3%82%B7%E3%82%A6%E3%83%A0"
  },
  {
    id: 67,
    symbol: "Ho",
    text: "ホルミウム",
    link: "https://ja.wikipedia.org/wiki/%E3%83%9B%E3%83%AB%E3%83%9F%E3%82%A6%E3%83%A0"
  },
  {
    id: 68,
    symbol: "Er",
    text: "エルビウム",
    link: "https://ja.wikipedia.org/wiki/%E3%82%A8%E3%83%AB%E3%83%93%E3%82%A6%E3%83%A0"
  },
  {
    id: 69,
    symbol: "Tm",
    text: "ツリウム",
    link: "https://ja.wikipedia.org/wiki/%E3%83%84%E3%83%AA%E3%82%A6%E3%83%A0"
  },
  {
    id: 70,
    symbol: "Yb",
    text: "イッテルビウム",
    link: "https://ja.wikipedia.org/wiki/%E3%82%A4%E3%83%83%E3%83%86%E3%83%AB%E3%83%93%E3%82%A6%E3%83%A0"
  },
  {
    id: 71,
    symbol: "Lu",
    text: "ルテチウム",
    link: "https://ja.wikipedia.org/wiki/%E3%83%AB%E3%83%86%E3%83%81%E3%82%A6%E3%83%A0"
  },
  {
    id: 72,
    symbol: "Hf",
    text: "ハフニウム",
    link: "https://ja.wikipedia.org/wiki/%E3%83%8F%E3%83%95%E3%83%8B%E3%82%A6%E3%83%A0"
  },
  {
    id: 73,
    symbol: "Ta",
    text: "タンタル",
    link: "https://ja.wikipedia.org/wiki/%E3%82%BF%E3%83%B3%E3%82%BF%E3%83%AB"
  },
  {
    id: 74,
    symbol: "W",
    text: "タングステン",
    link: "https://ja.wikipedia.org/wiki/%E3%82%BF%E3%83%B3%E3%82%B0%E3%82%B9%E3%83%86%E3%83%B3"
  },
  {
    id: 75,
    symbol: "Re",
    text: "レニウム",
    link: "https://ja.wikipedia.org/wiki/%E3%83%AC%E3%83%8B%E3%82%A6%E3%83%A0"
  },
  {
    id: 76,
    symbol: "Os",
    text: "オスミウム",
    link: "https://ja.wikipedia.org/wiki/%E3%82%AA%E3%82%B9%E3%83%9F%E3%82%A6%E3%83%A0"
  },
  {
    id: 77,
    symbol: "Ir",
    text: "イリジウム",
    link: "https://ja.wikipedia.org/wiki/%E3%82%A4%E3%83%AA%E3%82%B8%E3%82%A6%E3%83%A0"
  },
  {
    id: 78,
    symbol: "Pt",
    text: "白金",
    link: "https://ja.wikipedia.org/wiki/%E7%99%BD%E9%87%91"
  },
  {
    id: 79,
    symbol: "Au",
    text: "金",
    link: "https://ja.wikipedia.org/wiki/%E9%87%91"
  },
  {
    id: 80,
    symbol: "Hg",
    text: "水銀",
    link: "https://ja.wikipedia.org/wiki/%E6%B0%B4%E9%8A%80"
  },
  {
    id: 81,
    symbol: "Tl",
    text: "タリウム",
    link: "https://ja.wikipedia.org/wiki/%E3%82%BF%E3%83%AA%E3%82%A6%E3%83%A0"
  },
  {
    id: 82,
    symbol: "Pb",
    text: "鉛",
    link: "https://ja.wikipedia.org/wiki/%E9%89%9B"
  },
  {
    id: 83,
    symbol: "Bi",
    text: "ビスマス",
    link: "https://ja.wikipedia.org/wiki/%E3%83%93%E3%82%B9%E3%83%9E%E3%82%B9"
  },
  {
    id: 84,
    symbol: "Po",
    text: "ポロニウム",
    link: "https://ja.wikipedia.org/wiki/%E3%83%9D%E3%83%AD%E3%83%8B%E3%82%A6%E3%83%A0"
  },
  {
    id: 85,
    symbol: "At",
    text: "アスタチン",
    link: "https://ja.wikipedia.org/wiki/%E3%82%A2%E3%82%B9%E3%82%BF%E3%83%81%E3%83%B3"
  },
  {
    id: 86,
    symbol: "Rn",
    text: "ラドン",
    link: "https://ja.wikipedia.org/wiki/%E3%83%A9%E3%83%89%E3%83%B3"
  },
  {
    id: 87,
    symbol: "Fr",
    text: "フランシウム",
    link: "https://ja.wikipedia.org/wiki/%E3%83%95%E3%83%A9%E3%83%B3%E3%82%B7%E3%82%A6%E3%83%A0"
  },
  {
    id: 88,
    symbol: "Ra",
    text: "ラジウム",
    link: "https://ja.wikipedia.org/wiki/%E3%83%A9%E3%82%B8%E3%82%A6%E3%83%A0"
  },
  {
    id: 89,
    symbol: "Ac",
    text: "アクチニウム",
    link: "https://ja.wikipedia.org/wiki/%E3%82%A2%E3%82%AF%E3%83%81%E3%83%8B%E3%82%A6%E3%83%A0"
  },
  {
    id: 90,
    symbol: "Th",
    text: "トリウム",
    link: "https://ja.wikipedia.org/wiki/%E3%83%88%E3%83%AA%E3%82%A6%E3%83%A0"
  },
  {
    id: 91,
    symbol: "Pa",
    text: "プロトアクチニウム",
    link: "https://ja.wikipedia.org/wiki/%E3%83%97%E3%83%AD%E3%83%88%E3%82%A2%E3%82%AF%E3%83%81%E3%83%8B%E3%82%A6%E3%83%A0"
  },
  {
    id: 92,
    symbol: "U",
    text: "ウラン",
    link: "https://ja.wikipedia.org/wiki/%E3%82%A6%E3%83%A9%E3%83%B3"
  },
  {
    id: 93,
    symbol: "Np",
    text: "ネプツニウム",
    link: "https://ja.wikipedia.org/wiki/%E3%83%8D%E3%83%97%E3%83%84%E3%83%8B%E3%82%A6%E3%83%A0"
  },
  {
    id: 94,
    symbol: "Pu",
    text: "プルトニウム",
    link: "https://ja.wikipedia.org/wiki/%E3%83%97%E3%83%AB%E3%83%88%E3%83%8B%E3%82%A6%E3%83%A0"
  },
  {
    id: 95,
    symbol: "Am",
    text: "アメリシウム",
    link: "https://ja.wikipedia.org/wiki/%E3%82%A2%E3%83%A1%E3%83%AA%E3%82%B7%E3%82%A6%E3%83%A0"
  },
  {
    id: 96,
    symbol: "Cm",
    text: "キュリウム",
    link: "https://ja.wikipedia.org/wiki/%E3%82%AD%E3%83%A5%E3%83%AA%E3%82%A6%E3%83%A0"
  },
  {
    id: 97,
    symbol: "Bk",
    text: "バークリウム",
    link: "https://ja.wikipedia.org/wiki/%E3%83%90%E3%83%BC%E3%82%AF%E3%83%AA%E3%82%A6%E3%83%A0"
  },
  {
    id: 98,
    symbol: "Cf",
    text: "カリホルニウム",
    link: "https://ja.wikipedia.org/wiki/%E3%82%AB%E3%83%AA%E3%83%9B%E3%83%AB%E3%83%8B%E3%82%A6%E3%83%A0"
  },
  {
    id: 99,
    symbol: "Es",
    text: "アインスタイニウム",
    link: "https://ja.wikipedia.org/wiki/%E3%82%A2%E3%82%A4%E3%83%B3%E3%82%B9%E3%82%BF%E3%82%A4%E3%83%8B%E3%82%A6%E3%83%A0"
  },
  {
    id: 100,
    symbol: "Fm",
    text: "フェルミウム",
    link: "https://ja.wikipedia.org/wiki/%E3%83%95%E3%82%A7%E3%83%AB%E3%83%9F%E3%82%A6%E3%83%A0"
  },
  {
    id: 101,
    symbol: "Md",
    text: "メンデレビウム",
    link: "https://ja.wikipedia.org/wiki/%E3%83%A1%E3%83%B3%E3%83%87%E3%83%AC%E3%83%93%E3%82%A6%E3%83%A0"
  },
  {
    id: 102,
    symbol: "No",
    text: "ノーベリウム",
    link: "https://ja.wikipedia.org/wiki/%E3%83%8E%E3%83%BC%E3%83%99%E3%83%AA%E3%82%A6%E3%83%A0"
  },
  {
    id: 103,
    symbol: "Lr",
    text: "ローレンシウム",
    link: "https://ja.wikipedia.org/wiki/%E3%83%AD%E3%83%BC%E3%83%AC%E3%83%B3%E3%82%B7%E3%82%A6%E3%83%A0"
  },
  {
    id: 104,
    symbol: "Rf",
    text: "ラザホージウム",
    link: "https://ja.wikipedia.org/wiki/%E3%83%A9%E3%82%B6%E3%83%9B%E3%83%BC%E3%82%B8%E3%82%A6%E3%83%A0"
  },
  {
    id: 105,
    symbol: "Db",
    text: "ドブニウム",
    link: "https://ja.wikipedia.org/wiki/%E3%83%89%E3%83%96%E3%83%8B%E3%82%A6%E3%83%A0"
  },
  {
    id: 106,
    symbol: "Sg",
    text: "シーボーギウム",
    link: "https://ja.wikipedia.org/wiki/%E3%82%B7%E3%83%BC%E3%83%9C%E3%83%BC%E3%82%AE%E3%82%A6%E3%83%A0"
  },
  {
    id: 107,
    symbol: "Bh",
    text: "ボーリウム",
    link: "https://ja.wikipedia.org/wiki/%E3%83%9C%E3%83%BC%E3%83%AA%E3%82%A6%E3%83%A0"
  },
  {
    id: 108,
    symbol: "Hs",
    text: "ハッシウム",
    link: "https://ja.wikipedia.org/wiki/%E3%83%8F%E3%83%83%E3%82%B7%E3%82%A6%E3%83%A0"
  },
  {
    id: 109,
    symbol: "Mt",
    text: "マイトネリウム",
    link: "https://ja.wikipedia.org/wiki/%E3%83%9E%E3%82%A4%E3%83%88%E3%83%8D%E3%83%AA%E3%82%A6%E3%83%A0"
  },
  {
    id: 110,
    symbol: "Ds",
    text: "ダームスタチウム",
    link: "https://ja.wikipedia.org/wiki/%E3%83%80%E3%83%BC%E3%83%A0%E3%82%B9%E3%82%BF%E3%83%81%E3%82%A6%E3%83%A0"
  },
  {
    id: 111,
    symbol: "Rg",
    text: "レントゲニウム",
    link: "https://ja.wikipedia.org/wiki/%E3%83%AC%E3%83%B3%E3%83%88%E3%82%B2%E3%83%8B%E3%82%A6%E3%83%A0"
  },
  {
    id: 112,
    symbol: "Cn",
    text: "コペルニシウム",
    link: "https://ja.wikipedia.org/wiki/%E3%82%B3%E3%83%9A%E3%83%AB%E3%83%8B%E3%82%B7%E3%82%A6%E3%83%A0"
  },
  {
    id: 113,
    symbol: "Nh",
    text: "ニホニウム",
    link: "https://ja.wikipedia.org/wiki/%E3%83%8B%E3%83%9B%E3%83%8B%E3%82%A6%E3%83%A0"
  },
  {
    id: 114,
    symbol: "Fl",
    text: "フレロビウム",
    link: "https://ja.wikipedia.org/wiki/%E3%83%95%E3%83%AC%E3%83%AD%E3%83%93%E3%82%A6%E3%83%A0"
  },
  {
    id: 115,
    symbol: "Mc",
    text: "モスコビウム",
    link: "https://ja.wikipedia.org/wiki/%E3%83%A2%E3%82%B9%E3%82%B3%E3%83%93%E3%82%A6%E3%83%A0"
  },
  {
    id: 116,
    symbol: "Lv",
    text: "リバモリウム",
    link: "https://ja.wikipedia.org/wiki/%E3%83%AA%E3%83%90%E3%83%A2%E3%83%AA%E3%82%A6%E3%83%A0"
  },
  {
    id: 117,
    symbol: "Ts",
    text: "テネシン",
    link: "https://ja.wikipedia.org/wiki/%E3%83%86%E3%83%8D%E3%82%B7%E3%83%B3"
  },
  {
    id: 118,
    symbol: "Og",
    text: "オガネソン",
    link: "https://ja.wikipedia.org/wiki/%E3%82%AA%E3%82%AC%E3%83%8D%E3%82%BD%E3%83%B3"
  }
]



/**
 * 
 * @param {String} alphabet 
 */
function search (alphabet) {
  alphabet = alphabet.toLowerCase();
  return elements.find((elem) => (elem.symbol.toLowerCase() === alphabet));
}

/**
 * 
 * @param {string} alphabet 
 * @returns {ChemicalElement[][]|undefined}
 */
function search_words (alphabet) {
  if (alphabet === "") return [[]];
  let one = search(alphabet.slice(0, 1));
  let two = search(alphabet.slice(0, 2));
  if (alphabet.length === 1) two = undefined;
  let results1 = undefined;
  let results2 = undefined;
  if (one !== undefined) {
    results1 = search_words(alphabet.slice(1));
    if (results1 !== undefined) {
      results1.forEach(elem => elem.unshift(one));
    }
  }
  if (two !== undefined) {
    results2 = search_words(alphabet.slice(2));
    if (results2 !== undefined) {
      results2.forEach(elem => elem.unshift(two));
    }
  }
  if (results1 === undefined) {
    if (results2 === undefined) {
      return undefined;
    }else{
      return results2;
    }
  }else{
    if (results2 === undefined) {
      return results1;
    }else{
      return results1.concat(results2);
    }
  }
}

function search_wordsB(alphabet) {
  let result = search_words(alphabet);
  if (result === undefined) return "該当なし";
  result = result.map(elem => (elem = elem.map(elem2 => (elem2.symbol + "(" + elem2.text + ")")).join(" "))).join("\n");
  return result;
}

// document.getElementById("btn").addEventListener("click", function (event) {
//   document.getElementById("result").innerText = search_wordsB(document.getElementById("text").value);
  
// });

/**@type {HTMLInputElement} */
const input_decompose_text = document.getElementById("decompose_text");
/**@type {HTMLInputElement} */
const input_decompose = document.getElementById("decompose");
const span_decompose_message = document.getElementById("decompose_message");
const div_decompose_result = document.getElementById("decompose_result");
const span_decompose_result_text = document.getElementById("decompose_result_text");



input_decompose.addEventListener("click", function (event) {
  let text = input_decompose_text.value;
  if (text === "") return;
  span_decompose_message.innerText = "処理中…";
  Array.from(div_decompose_result.children).forEach(function (value) {
    div_decompose_result.removeChild(value);
  });
  div_decompose_result.style.gridTemplateRows = "";
  div_decompose_result.style.gridTemplateColumns = "";
  let result = search_words(text); // 時間かかる
  if (result === undefined) {
    span_decompose_result_text.innerText = "該当なし";
  }else{
    let row_num = result.length;
    let col_num = 1;
    for (let i = 0; i < row_num; i++) {
      if (result[i].length > col_num) col_num = result[i].length;
    }
    div_decompose_result.style.gridTemplateRows = `repeat(${row_num}, var(--cell-height))`;
    div_decompose_result.style.gridTemplateColumns = `repeat(${col_num}, var(--cell-width))`;
    for (let i = 0; i < row_num; i++) {
      for (let j = 0; j < result[i].length; j++) {
        let element = result[i][j];
        let element_cell = document.createElement("div");
        element_cell.classList.add("element_cell");
        element_cell.style.gridArea = (i+1) + "/" + (j+1);
        let div_id = document.createElement("div");
        div_id.classList.add("id");
        div_id.innerText = String(element.id);
        let div_symbol = document.createElement("div");
        div_symbol.classList.add("symbol");
        div_symbol.innerText = String(element.symbol);
        let div_text = document.createElement("div");
        div_text.classList.add("text");
        div_text.innerText = String(element.text);
        if (element.text.length === 7) {
          div_text.style.fontSize = "calc(var(--cell-text-font-size) * 0.85)";
        }else if (element.text.length === 8) {
          div_text.style.fontSize = "calc(var(--cell-text-font-size) * 0.75)";
        }else if (element.text.length === 9) {
          div_text.style.fontSize = "calc(var(--cell-text-font-size) * 0.65)";
        }
        element_cell.appendChild(div_id);
        element_cell.appendChild(div_symbol);
        element_cell.appendChild(div_text);
        element_cell.addEventListener("click", function (event) {
          select_chemical_element(element.id);
        });
        div_decompose_result.appendChild(element_cell);
      }
    }
    span_decompose_result_text.innerText = row_num + "件の該当";
  }
  span_decompose_message.innerText = "";
});

const input_table_size_range = document.getElementById("table_size_range");
const input_table_size_number = document.getElementById("table_size_number");

input_table_size_range.addEventListener("input", function (event) {
  input_table_size_number.value = input_table_size_range.value;
  change_cell_unit(input_table_size_range.value);
});
input_table_size_number.addEventListener("change", function (event) {
  input_table_size_range.value = input_table_size_number.value;
  change_cell_unit(input_table_size_number.value);
});


const div_table_body = document.getElementById("table_body");

function init () {
  Array.from(div_table_body.getElementsByClassName("element_cell")).forEach(function (value) {
    let id = Number(value.id.slice(1));
    let element = elements.find((value) => (value.id === id));
    if (element !== undefined) {
      let div_id = document.createElement("div");
      div_id.classList.add("id");
      div_id.innerText = String(element.id);
      let div_symbol = document.createElement("div");
      div_symbol.classList.add("symbol");
      div_symbol.innerText = String(element.symbol);
      let div_text = document.createElement("div");
      div_text.classList.add("text");
      div_text.innerText = String(element.text);
      if (element.text.length === 7) {
        div_text.style.fontSize = "calc(var(--cell-text-font-size) * 0.85)";
      }else if (element.text.length === 8) {
        div_text.style.fontSize = "calc(var(--cell-text-font-size) * 0.75)";
      }else if (element.text.length === 9) {
        div_text.style.fontSize = "calc(var(--cell-text-font-size) * 0.65)";
      }
      value.appendChild(div_id);
      value.appendChild(div_symbol);
      value.appendChild(div_text);
      value.addEventListener("click", function (event) {
        select_chemical_element(element.id);
      });
    }
  });

  Array.from(document.getElementsByClassName("oc_button")).forEach(function (value) {
    value.addEventListener("click", function (event) {
      /**@type {HTMLDivElement} */
      let div_oc_button = event.currentTarget;
      let div_section = div_oc_button.parentElement.parentElement; 
      if (div_section.classList.contains("close")) {
        div_section.classList.add("open");
        div_section.classList.remove("close");
      }else{
        div_section.classList.remove("open");
        div_section.classList.add("close");
      }
    });
  })
}


function change_cell_unit (unit) {
  document.documentElement.style.setProperty("--cell-size-unit", String(unit));
}

/**@type {HTMLDivElement} */
const div_side_area = document.getElementById("side_area");
const div_side_close = document.getElementById("side_close");

function side_show () {
  div_side_area.classList.add("show");
  div_side_area.classList.remove("hide");
}
function side_hide () {
  div_side_area.classList.remove("show");
  div_side_area.classList.add("hide");
}

div_side_close.addEventListener("click", side_hide);


const span_detail_id =  document.getElementById("detail_id");
const span_detail_symbol = document.getElementById("detail_symbol");
const span_detail_text = document.getElementById("detail_text");
const span_detail_link = document.getElementById("detail_link");

function select_chemical_element (id) {
  let elem = elements.find(value => (value.id === id));
  if (elem === undefined) return;
  span_detail_id.innerText = elem.id;
  span_detail_symbol.innerText = elem.symbol;
  span_detail_text.innerText = elem.text;
  span_detail_link.innerHTML = `<a href="${elem.link}">リンク</a>`;
  side_show();
}


init();


