"use strict;"

const ja_h_set = new Set([
  "あ","い","う","え","お","か","き","く","け","こ",
  "さ","し","す","せ","そ","た","ち","つ","て","と",
  "な","に","ぬ","ね","の","は","ひ","ふ","へ","ほ",
  "ま","み","む","め","も","や","ゆ","よ",
  "ら","り","る","れ","ろ","わ","を","ん"
]);
const ja_k_set = new Set([
  "ア","イ","ウ","エ","オ","カ","キ","ク","ケ","コ",
  "サ","シ","ス","セ","ソ","タ","チ","ツ","テ","ト",
  "ナ","ニ","ヌ","ネ","ノ","ハ","ヒ","フ","ヘ","ホ",
  "マ","ミ","ム","メ","モ","ヤ","ユ","ヨ",
  "ラ","リ","ル","レ","ロ","ワ","ヲ","ン"
]);
const en_l_set = new Set([
  "a","b","c","d","e","f","g",
  "h","i","j","k","l","m","n",
  "o","p","q","r","s","t","u",
  "v","w","x","y","z"
]);
const en_u_set = new Set([
  "A","B","C","D","E","F","G",
  "H","I","J","K","L","M","N",
  "O","P","Q","R","S","T","U",
  "V","W","X","Y","Z"
]);
const default_char_sets = [ja_h_set, ja_k_set, en_l_set, en_u_set];
Object.freeze(ja_h_set); Object.freeze(ja_k_set); 
Object.freeze(en_l_set); Object.freeze(en_u_set);
Object.freeze(default_char_sets);


/**
 * シーザー暗号で文字列をずらす。ずらし方は char_sets で指定する。
 * @param {string} text 全体の文字列
 * @param {number} num ずらす数。負数も可
 * @param {Set<string>[]} char_sets ずらす文字を順番に格納した Set オブジェクトの配列。インデックスの小さい方から優先してルールが適用される。
 * @param {number[]} applied_rule 各文字が何番目のルールで変換されたかが格納される。変換していない場合は -1 となる。
 */
function caesar (text, num, char_sets, applied_rule = []) {
  let arr = text.split("");
  let char_arr_sets = char_sets.map(elem => Array.from(elem));
  let result = [];
  applied_rule.length = 0;
  for (let i = 0; i < arr.length; i++) {
    let finded = false;
    for (let j = 0; j < char_sets.length; j++) {
      let index = char_arr_sets[j].indexOf(arr[i]);
      if (index !== -1) {
        index += num;
        index = index % char_arr_sets[j].length;
        if (index < 0) index += char_arr_sets[j].length;
        result.push(char_arr_sets[j][index]);
        applied_rule.push(j);
        finded = true;
        break;
      }
    }
    if (!finded) {
      result.push(arr[i]);
      applied_rule.push(-1);
    }
  }
  return result.join("");
}


const daku = [
  "が","ぎ","ぐ","げ","ご","ざ","じ","ず","ぜ","ぞ",
  "だ","ぢ","づ","で","ど","ば","び","ぶ","べ","ぼ","ゔ",
  "ガ","ギ","グ","ゲ","ゴ","ザ","ジ","ズ","ゼ","ゾ",
  "ダ","ヂ","ヅ","デ","ド","バ","ビ","ブ","ベ","ボ","ヴ"
];
const sei = [
  "か","き","く","け","こ","さ","し","す","せ","そ",
  "た","ち","つ","て","と","は","ひ","ふ","へ","ほ","う",
  "カ","キ","ク","ケ","コ","サ","シ","ス","セ","ソ",
  "タ","チ","ツ","テ","ト","ハ","ヒ","フ","ヘ","ホ","ウ"
];
const semi_daku = ["ぱ","ぴ","ぷ","ぺ","ぽ","パ","ピ","プ","ペ","ポ"];
const semi_sei =  ["は","ひ","ふ","へ","ほ","ハ","ヒ","フ","ヘ","ホ"];

/**
 * 濁点付きの文字を、濁点なしの文字+「゛」に変換する
 * @param {string} text
 */
function dakutenn_split (text) {
  let arr = text.split("");
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    let index = daku.indexOf(arr[i]);
    if (index === -1) {
      let index2 = semi_daku.indexOf(arr[i]);
      if (index2 === -1) {
        result.push(arr[i]);
      }else{
        result.push(semi_sei[index2] + "゜");
      }
    }else{
      result.push(sei[index] + "゛");
    }
  }
  return result.join("");
}

/**
 * ゛を統合できる場合はする
 * @param {string} text 
 */
function dakutenn_integrate (text) {
  let arr = text.split("");
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === "゛") {
      let index = sei.indexOf(arr[i-1]);
      if (index === -1) {
        result.push(arr[i]);
      }else{
        result.pop();
        result.push(daku[index]);
      }
    }else if (arr[i] === "゜") {
      let index = semi_sei.indexOf(arr[i-1]);
      if (index === -1) {
        result.push(arr[i]);
      }else{
        result.pop();
        result.push(semi_daku[index]);
      }
    }else{
      result.push(arr[i]);
    }
  }
  return result.join("");
}


const kogaki = ["ぁ","ぃ","ぅ","ぇ","ぉ","っ","ゃ","ゅ","ょ","ゎ"];
const omoji =  ["あ","い","う","え","お","つ","や","ゆ","よ","わ"];

/**
 * 小さい文字(ゃ、っ、ぁ等)を大きい文字に変換する
 * @param {string} text 
 */
function kogaki_conv (text) {
  let arr = text.split("");
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    let index = kogaki.indexOf(arr[i]);
    if (index === -1) {
      result.push(arr[i]);
    }else{
      result.push(omoji[index]);
    }
  }
  return result.join("");
}

const hira = [
  "あ","い","う","え","お",
  "か","き","く","け","こ",
  "さ","し","す","せ","そ",
  "た","ち","つ","て","と",
  "な","に","ぬ","ね","の",
  "は","ひ","ふ","へ","ほ",
  "ま","み","む","め","も",
  "や","ゆ","よ",
  "ら","り","る","れ","ろ",
  "わ","ゐ","ゑ","を","ん",
  "が","ぎ","ぐ","げ","ご",
  "ざ","じ","ず","ぜ","ぞ",
  "だ","ぢ","づ","で","ど",
  "ば","び","ぶ","べ","ぼ",
  "ぱ","ぴ","ぷ","ぺ","ぽ",
  "ぁ","ぃ","ぅ","ぇ","ぉ",
  "ゃ","ゅ","ょ","ゎ","っ"
];
const kata = [
  "ア","イ","ウ","エ","オ",
  "カ","キ","ク","ケ","コ",
  "サ","シ","ス","セ","ソ",
  "タ","チ","ツ","テ","ト",
  "ナ","ニ","ヌ","ネ","ノ",
  "ハ","ヒ","フ","ヘ","ホ",
  "マ","ミ","ム","メ","モ",
  "ヤ","ユ","ヨ",
  "ラ","リ","ル","レ","ロ",
  "ワ","ヰ","ヱ","ヲ","ン",
  "ガ","ギ","グ","ゲ","ゴ",
  "ザ","ジ","ズ","ゼ","ゾ",
  "ダ","ヂ","ヅ","デ","ド",
  "バ","ビ","ブ","ベ","ボ",
  "パ","ピ","プ","ペ","ポ",
  "ァ","ィ","ゥ","ェ","ォ",
  "ャ","ュ","ョ","ヮ","ッ"
];

function kata2hira (text) {
  let arr = text.split("");
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    let index = kata.indexOf(arr[i]);
    if (index === -1) {
      result.push(arr[i]);
    }else{
      result.push(hira[index]);
    }
  }
  return result.join("");
}

const ev_split_daku = [
  "な゛","に゛","ぬ゛","ね゛","の゛",
  "ま゛","み゛","む゛","め゛","も゛","や゛","ゆ゛","よ゛",
  "ら゛","り゛","る゛","れ゛","ろ゛","わ゛","を゛",
  "あ゜","い゜","う゜","え゜","お゜","か゜","き゜","く゜","け゜","こ゜",
  "さ゜","し゜","す゜","せ゜","そ゜","た゜","ち゜","つ゜","て゜","と゜",
  "な゜","に゜","ぬ゜","ね゜","の゜",
  "ま゜","み゜","む゜","め゜","も゜","や゜","ゆ゜","よ゜",
  "ら゜","り゜","る゜","れ゜","ろ゜","わ゜","を゜","ん゜",
  "ナ゛","ニ゛","ヌ゛","ネ゛","ノ゛",
  "マ゛","ミ゛","ム゛","メ゛","モ゛","ヤ゛","ユ゛","ヨ゛",
  "ラ゛","リ゛","ル゛","レ゛","ロ゛","ワ゛","ヲ゛",
  "ア゜","イ゜","ウ゜","エ゜","オ゜","カ゜","キ゜","ク゜","ケ゜","コ゜",
  "サ゜","シ゜","ス゜","セ゜","ソ゜","タ゜","チ゜","ツ゜","テ゜","ト゜",
  "ナ゜","ニ゜","ヌ゜","ネ゜","ノ゜",
  "マ゜","ミ゜","ム゜","メ゜","モ゜","ヤ゜","ユ゜","ヨ゜",
  "ラ゜","リ゜","ル゜","レ゜","ロ゜","ワ゜","ヲ゜","ン゜"
];
const ev_semi_split_daku = [
  "あ゛","い゛","え゛","お゛","ん゛",
  "ア゛","イ゛","エ゛","オ゛","ン゛"
];
const ev_freq_2word = [
 "TH", "HE", "IN", "ER", "AN", "RE", "ED", "ON", "ES", "ST", 
 "EN", "AT", "TO", "NT", "HA", "ND", "OU", "EA", "NG", "AS", 
 "OR", "TI", "IS", "ET", "IT", "AR", "TE", "SE", "HI", "OF"
];
const ev_freq_3word = [
  "THE", "ING", "AND", "HER", "ERE", "ENT", "THA", "NTH", 
  "WAS", "ETH", "FOR", "DTH"
];

const ev_freq_en = {
  ["a"]: 0.930,
  ["b"]: 0.119,
  ["c"]: 0.363,
  ["d"]: 0.371,
  ["e"]: 1.141,
  ["f"]: 0.202,
  ["g"]: 0.188,
  ["h"]: 0.323,
  ["i"]: 0.942,
  ["j"]: 0.017,
  ["k"]: 0.138,
  ["l"]: 0.399,
  ["m"]: 0.248,
  ["n"]: 0.748,
  ["o"]: 0.682,
  ["p"]: 0.229,
  ["q"]: 0.017,
  ["r"]: 0.661,
  ["s"]: 0.702,
  ["t"]: 0.812,
  ["u"]: 0.306,
  ["v"]: 0.131,
  ["w"]: 0.145,
  ["x"]: 0.013,
  ["y"]: 0.152,
  ["z"]: 0.006
};
const ev_freq_ja = {
  ["あ"]: 1181/8023.9,
  ["ぁ"]: 31/8023.9,
  ["い"]: 5315/8023.9,
  ["ぃ"]: 38/8023.9,
  ["う"]: 3518/8023.9,
  ["ぅ"]: 1/8023.9,
  ["え"]: 674/8023.9,
  ["ぇ"]: 24/8023.9,
  ["お"]: 1167/8023.9,
  ["ぉ"]: 14/8023.9,
  ["か"]: 2800/8023.9,
  ["が"]: 1834/8023.9,
  ["き"]: 1746/8023.9,
  ["ぎ"]: 276/8023.9,
  ["く"]: 1907/8023.9,
  ["ぐ"]: 144/8023.9,
  ["け"]: 774/8023.9,
  ["げ"]: 235/8023.9,
  ["こ"]: 1682/8023.9,
  ["ご"]: 296/8023.9,
  ["さ"]: 960/8023.9,
  ["ざ"]: 125/8023.9,
  ["し"]: 3577/8023.9,
  ["じ"]: 1168/8023.9,
  ["す"]: 1863/8023.9,
  ["ず"]: 222/8023.9,
  ["せ"]: 902/8023.9,
  ["ぜ"]: 182/8023.9,
  ["そ"]: 766/8023.9,
  ["ぞ"]: 127/8023.9,
  ["た"]: 2839/8023.9,
  ["だ"]: 929/8023.9,
  ["ち"]: 930/8023.9,
  ["ぢ"]: 16/8023.9,
  ["つ"]: 1017/8023.9,
  ["っ"]: 1549/8023.9,
  ["づ"]: 61/8023.9,
  ["て"]: 2351/8023.9,
  ["で"]: 1984/8023.9,
  ["と"]: 2769/8023.9,
  ["ど"]: 683/8023.9,
  ["な"]: 2213/8023.9,
  ["に"]: 2117/8023.9,
  ["ぬ"]: 40/8023.9,
  ["ね"]: 379/8023.9,
  ["の"]: 2685/8023.9,
  ["は"]: 1669/8023.9,
  ["ば"]: 399/8023.9,
  ["ぱ"]: 119/8023.9,
  ["ひ"]: 503/8023.9,
  ["び"]: 204/8023.9,
  ["ぴ"]: 30/8023.9,
  ["ふ"]: 370/8023.9,
  ["ぶ"]: 309/8023.9,
  ["ぷ"]: 69/8023.9,
  ["へ"]: 115/8023.9,
  ["べ"]: 259/8023.9,
  ["ぺ"]: 23/8023.9,
  ["ほ"]: 466/8023.9,
  ["ぼ"]: 126/8023.9,
  ["ぽ"]: 55/8023.9,
  ["ま"]: 1735/8023.9,
  ["み"]: 575/8023.9,
  ["む"]: 236/8023.9,
  ["め"]: 509/8023.9,
  ["も"]: 1460/8023.9,
  ["や"]: 512/8023.9,
  ["ゃ"]: 409/8023.9,
  ["ゆ"]: 140/8023.9,
  ["ゅ"]: 553/8023.9,
  ["よ"]: 680/8023.9,
  ["ょ"]: 1237/8023.9,
  ["ら"]: 1313/8023.9,
  ["り"]: 1248/8023.9,
  ["る"]: 1527/8023.9,
  ["れ"]: 1190/8023.9,
  ["ろ"]: 409/8023.9,
  ["わ"]: 688/8023.9,
  ["ゎ"]: 0/8023.9,
  ["を"]: 1108/8023.9,
  ["ん"]: 3883/8023.9
};

/**
 * 文章が自然かどうかを判断する。
 * @param {string} text 
 */
function text_evaluation (text) {
  let eval = 0;
  ev_split_daku.forEach(element => {
    let match_result = text.match(new RegExp(element, "g"));
    if (match_result !== null) {
      let my_eval = match_result.length * -10000;
      eval += my_eval;
    }
  });
  ev_semi_split_daku.forEach(element => {
    let match_result = text.match(new RegExp(element, "g"));
    if (match_result !== null) {
      let my_eval = match_result.length * -100;
      eval += my_eval;
    }
  });
  ev_freq_2word.forEach(element => {
    let match_result = text.toUpperCase().match(new RegExp(element, "g"));
    if (match_result !== null) {
      let my_eval = match_result.length * 10;
      eval += my_eval;
    }
  });
  ev_freq_3word.forEach(element => {
    let match_result = text.toUpperCase().match(new RegExp(element, "g"));
    if (match_result !== null) {
      let my_eval = match_result.length * 100;
      eval += my_eval;
    }
  });
  for (let i = 0 ; i < text.length; i++) {
    let en_eval = ev_freq_en[text[i].toLowerCase()];
    if (en_eval !== undefined) {
      eval += en_eval;
    }else{
      let ja_eval = ev_freq_ja[kata2hira(text[i])];
      if (ja_eval !== undefined) {
        eval += ja_eval;
      }
    }
  }
  return eval / text.length;
}
