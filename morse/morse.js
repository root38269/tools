/**
 * @typedef Language
 * @type {"en"|"ja"|"el"|"cyri"|"hebr"|"arab"}
 */

function rnorm(){
  return Math.sqrt(-2 * Math.log(1 - Math.random())) * Math.cos(2 * Math.PI * Math.random());
}

function array_deep_copy (arr) {
  if (Array.isArray(arr)) {
    let x = [];
    for (let i = 0; i < arr.length; i++) {
      x.push(array_deep_copy(arr[i]));
    }
    return x;
  }else{
    return arr;
  }
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& は一致した部分文字列全体を意味します
}

/**
 * モールス信号を受信するオブジェクト
 */
class MorseReceiver {
  #input_flag = false;
  #time_stamps = [];
  #inputs = [];
  /**@type {["・"|"－"]} */
  #codes = [];
  /**@type {[[["・"|"－"]]]} */
  #words = [];
  #analyzing_flag = false;

  /**
   * 入力開始時に実行する
   */
  input_start () {
    if (!this.#input_flag) {
      let current_time = new Date().getTime();
      this.#time_stamps.push(current_time);
      this.#input_flag = true;
    }
  }
  /**
   * 入力終了時に実行する
   */
  input_end () {
    if (this.#input_flag) {
      let current_time = new Date().getTime();
      this.#inputs.push(current_time - this.#time_stamps[this.#time_stamps.length - 1]);
      this.#time_stamps.push(current_time);
      this.#input_flag = false;
    }
  }
  /**
   * 入力中なら入力終了し、そうでなければ入力開始する
   */
  input_toggle () {
    if (this.#input_flag) {
      this.input_end();
    }else{
      this.input_start();
    }
  }
  /**
   * 受信した情報をリセットする
   */
  reset () {
    this.#time_stamps = [];
    this.#inputs = [];
    this.#codes = [];
    this.#words = [];
    this.#input_flag = false;
  }
  /**
   * 入力情報を解析する。クラス外で使う必要はない。
   */
  analyze_code () {
    if (this.#time_stamps.length < 4) return;
    if (this.#analyzing_flag) return;
    this.#analyzing_flag = true;
    this.#codes = [];
    this.#words = [];
    let presult = this.#predict_dot_dash_time(this.#inputs);
    let threshold = presult[2];
    for (let i = 0; i < this.#inputs.length; i++) {
      if (this.#inputs[i] < threshold) {
        this.#codes.push("・");
      }else{
        this.#codes.push("－");
      }
    }
    let threshold2 = presult[1] + (presult[1] - threshold);
    if (threshold2 < presult[1] * 5/3) threshold2 = presult[1] * 5/3
    let current_word = [];
    let current_character = [];
    let next_interval;
    for (let i = 0; i < this.#codes.length; i++) {
      current_character.push(this.#codes[i]);
      next_interval = this.#time_stamps[i * 2 + 2] - this.#time_stamps[i * 2 + 1];
      if (next_interval >= threshold) {
        current_word.push(current_character);
        current_character = [];
      }
      if (next_interval >= threshold2) {
        this.#words.push(current_word);
        current_word = [];
      }
    }
    current_word.push(current_character);
    this.#words.push(current_word);
    this.#analyzing_flag = false;
  }
  /**
   * 受信した情報をエクスポートする。Morse オブジェクトにインポートして使う。
   * @returns {[[["・"|"－"]]]}
   */
  export () {
    this.analyze_code();
    return array_deep_copy(this.#words);
  }

  /**
   * をれぞれの配列の分散の和を返す
   * @param {[number]} arr1 
   * @param {[number]} arr2 
   */
  #sum_of_variance (arr1, arr2) {
    let x = 0;
    let average1;
    let average2;
    if (arr1.length > 0) {
      average1 = arr1.reduce((sum, elem) => (sum + elem)) / arr1.length;
      for (let i = 0; i < arr1.length; i++) {
        x += Math.pow(arr1[i] - average1, 2);
      }
    }
    if (arr2.length > 0) {
      average2 = arr2.reduce((sum, elem) => (sum + elem)) / arr2.length;
      for (let i = 0; i < arr2.length; i++) {
        x += Math.pow(arr2[i] - average2, 2);
      }
    }
    return x;
  }

  /**
   * 入力時間の配列から短点と長点の時間を予測する。
   * @param {[number]} inputs 
   * @returns {[number]}
   */
  #predict_dot_dash_time (inputs) {
    let my_inputs = [];
    for (let i = 0; i < inputs.length; i++) {
      my_inputs.push(inputs[i]);
    }
    my_inputs.sort((a, b) => (a - b));
    let v = [];
    for (let i = 0; i < my_inputs.length; i++) {
      v.push(i);
    }
    v = v.map(elem => this.#sum_of_variance(my_inputs.slice(0, elem), my_inputs.slice(elem, my_inputs.length)));
    let min = v[0];
    let min_index = 0;
    for (let i = 0; i < v.length; i++) {
      if (min > v[i]) {
        min = v[i];
        min_index = i;
      }
    }
    let arr1 = my_inputs.slice(0, min_index);
    let arr2 = my_inputs.slice(min_index, my_inputs.length);
    let threshold = (arr1[arr1.length - 1] + arr2[0]) / 2;
    let small_pred = arr1.reduce((sum, elem) => (sum + elem)) / arr1.length;
    let big_pred = arr2.reduce((sum, elem) => (sum + elem)) / arr2.length;
    return [small_pred, big_pred, threshold];
  }

}

class Morse {
  /**@type {Language} */
  #lang = "en";
  /**@type {[[["・"|"－"]]]} */
  #words = [];
  /**
   * モールス信号を処理するオブジェクト
   * @param {Language} lang 
   */
  constructor (lang = "en") {
    this.set_lang(lang);
  }
  /**
   * 言語を設定する。
   * @param {Language} lang 
   */
  set_lang (lang) {
    switch (lang) {
      case "en": case "ja": case "el": case "cyri": case "hebr": case "arab":
        this.#lang = lang;
        break;
    }
  }
  /**
   * リセットする
   */
  reset () {
    this.#words = [];
  }
  /**
   * 文字列を読み込む
   * @param {string} string 
   */
  fromString (string) {
    let my_words = string.split(" ");
    let ja_alph_flag = false;
    let lang = this.#lang;
    my_words = my_words.map(function (elem) {
      elem = Morse.modify_string(lang, elem).split("");
      elem = elem.map(function (elem2) {
        if (lang === "ja") {
          if (ja_alph_flag) {
            if (elem2 === "）") {
              ja_alph_flag = false;
              return Morse.char2code("ja", elem2).split("");
            }else{
              return Morse.char2code("en", elem2).split("");
            }
          }else{
            if (elem2 === "（") {
              ja_alph_flag = true;
            }
            return Morse.char2code("ja", elem2).split("");
          }
        }else{
          return Morse.char2code(lang, elem2).split("");
        }
      });
      return elem;
    });
    this.#words = my_words;
  }
  /**
   * モールス符号を読み込む
   * @param {string} code 
   * @param {string} dot 
   * @param {string} dash 
   * @param {string} char_split 
   * @param {string} word_split 
   */
  fromCode (code, dot = "・", dash = "－", char_split = ", ", word_split = "; ") {
    let my_words = code.split(word_split);
    my_words = my_words.map(elem => elem.split(char_split));
    for (let i = 0; i < my_words.length; i++) {
      for (let j = 0; j < my_words[i].length; j++) {
        my_words[i][j] = Morse.standardizate_code(my_words[i][j], dot, dash).split("");
      }
    }
    this.#words = my_words;
  }
  /**
   * データをインポートする
   * @param {[[["・"|"－"]]]} data 
   */
  import (data) {
    this.#words = array_deep_copy(data);
  }
  /**
   * 文字列として出力する
   * @returns {string}
   */
  toString () {
    let my_words = [];
    let lang = this.#lang;
    if (this.#lang === "ja") {
      my_words = this.#words.map(function (elem) {
        return elem.map(function (elem2) {
          return elem2.join("");
        });
      });
      let alph_flag = false;
      for (let i = 0; i < my_words.length; i++) {
        for (let j = 0; j < my_words[i].length; j++) {
          if (alph_flag) {
            if (my_words[i][j] === "・－・・－・") {
              alph_flag = false;
              my_words[i][j] = "）";
            }else{
              my_words[i][j] = Morse.code2char("en", my_words[i][j]);
            }
          }else{
            my_words[i][j] = Morse.code2char("ja", my_words[i][j]);
            if (my_words[i][j] === "（") {
              alph_flag = true;
            }
          }
        }
      }
      return my_words.map(function (elem) {
        return elem.join("");
      }).join(" ");
    }else{
      my_words = this.#words.map(function (elem) {
        elem = elem.map(function (elem2) {
          elem2 = elem2.join("");
          return Morse.code2char(lang, elem2);
        });
        return elem.join("");
      });
      return my_words.join(" ");
    }
  }
  /**
   * モールス符号として出力する
   * @param {string} dot 
   * @param {string} dash 
   * @param {string} char_split 
   * @param {string} word_split 
   * @returns {string}
   */
  toCode (dot = "・", dash = "－", char_split = ", ", word_split = "; ") {
    let result = "";
    let my_words = this.#words;
    for (let i = 0; i < my_words.length; i++) {
      for (let j = 0; j < my_words[i].length; j++) {
        result = result + my_words[i][j].join("").replace(/・/g, dot).replace(/－/g, dash);
        result = result + char_split;
      }
      result = result.slice(0, -1 * char_split.length);
      result = result + word_split;
    }
    return result.slice(0, -1 * word_split.length);
  }
  /**
   * データをエクスポートする
   * @returns {[[["・"|"－"]]]}
   */
  export () {
    return array_deep_copy(this.#words);
  }



  static #code_table_en = {
    chars: [
      "A","B","C","D","E","F","G",
      "H","I","J","K","L","M","N",
      "O","P","Q","R","S","T","U",
      "V","W","X","Y","Z",
      "1","2","3","4","5",
      "6","7","8","9","0",
      ".",",",":","?","_",
      "+","-","×","^","/",
      "@","(",")","\"","'",
      "Ä","Æ","Ą","À","Å",
      "Ç","Ĉ","Ć","Č",
      "Š","Ĥ","Ð","È","Ę",
      "É","Đ","Ę","Ĝ","Ĥ",
      "Ĵ","Ñ","Ń",
      "Ö","Ø","Ó","Ś","Ŝ",
      "ß","Þ","Ü","Ŭ",
      "Ź","Ž","Ż"
    ],
    codes: [
      "・－","－・・・","－・－・","－・・","・","・・－・","－－・",
      "・・・・","・・","・－－－","－・－","・－・・","－－","－・",
      "－－－","・－－・","－－・－","・－・","・・・","－","・・－",
      "・・・－","・－－","－・・－","－・－－","－－・・",
      "・－－－－","・・－－－","・・・－－","・・・・－","・・・・・",
      "－・・・・","－－・・・","－－－・・","－－－－・","－－－－－",
      "・－・－・－","－－・・－－","－－－・・・","・・－－・・","・・－－・－",
      "・－・－・","－・・・・－","－・・－","・・・・・・","－・・－・",
      "・－－・－・","－・－－・","－・－－・－","・－・・－・","・－－－－・",
      "・－・－","・－・－","・－・－","・－－・－","・－－・－",
      "－・－・・","－・－・・","－・－・・","・－－・",
      "－－－－","－－－－","・・－－・","・－・・－","・－・・－",
      "・・－・・","・・－・・","・・－・・","－－・－・","－・－－・",
      "・－－－・","－－・－－","－－・－－",
      "－－－・","－－－・","－－－・","・・・－・・・","・・・－・",
      "・・・－－・・","・－－・・","・・－－","・・－－",
      "－－・・－・","・－－","－－・・－"
    ]
  }
  static #code_table_ja = {
    chars: [
      "イ","ロ","ハ","ニ","ホ","ヘ","ト",
      "チ","リ","ヌ","ル","ヲ",
      "ワ","カ","ヨ","タ","レ","ソ",
      "ツ","ネ","ナ","ラ","ム",
      "ウ","ヰ","ノ","オ","ク","ヤ","マ",
      "ケ","フ","コ","エ","テ",
      "ア","サ","キ","ユ","メ","ミ","シ",
      "ヱ","ヒ","モ","セ","ス",
      "ン","゛","゜",
      "1","2","3","4","5",
      "6","7","8","9","0",
      "ー","、","」","（","）",
    ],
    codes: [
      "・－","・－・－","－・・・","－・－・","－・・","・","・・－・・",
      "・・－・","－－・","・・・・","－・－－・","・－－－",
      "－・－","・－・・","－－","－・","－－－","－－－・",
      "・－－・","－－・－","・－・","・・・","－",
      "・・－","・－・・－","・・－－","・－・・・","・・・－","・－－","－・・－",
      "－・－－","－－・・","－－－－","－・－－－","・－・－－",
      "－－・－－","－・－・－","－・－・・","－・・－－","－・・・－","・・－・－","－－・－・",
      "・－－・・","－－・・－","－・・－・","・－－－・","－－－・－",
      "・－・－・","・・","・・－－・",
      "・－－－－","・・－－－","・・・－－","・・・・－","・・・・・",
      "－・・・・","－－・・・","－－－・・","－－－－・","－－－－－",
      "・－－・－","・－・－・－","・－・－・・","－・－－・－","・－・・－・",
    ]
  };
  static #code_table_el = {
    chars: [
      "Α","Β","Γ","Δ","Ε",
      "Ζ","Η","Θ","Ι","Κ",
      "Λ","Μ","Ν","Ξ","Ο",
      "Π","Ρ","Σ","Τ","Υ",
      "Φ","Χ","Ψ","Ω",
      "1","2","3","4","5",
      "6","7","8","9","0",
      ".",",",":","?","_",
      "+","-","×","^","/",
      "@","(",")","\"","'"
    ],
    codes: [
      "・－","－・・・","－－・","－・・","・",
      "－－・・","・・・・","－・－・","・・","－・－",
      "・－・・","－－","－・","－・・－","－－－",
      "・－－・","・－・","・・・","－","－・－－",
      "・・－・","－－－－","－－・－","・－－",
      "・－－－－","・・－－－","・・・－－","・・・・－","・・・・・",
      "－・・・・","－－・・・","－－－・・","－－－－・","－－－－－",
      "・－・－・－","－－・・－－","－－－・・・","・・－－・・","・・－－・－",
      "・－・－・","－・・・・－","－・・－","・・・・・・","－・・－・",
      "・－－・－・","－・－－・","－・－－・－","・－・・－・","・－－－－・"
    ]
  };
  static #code_table_cyri = {
    chars: [
      "А","Б","В","Г","Ѓ","Ґ",
      "Д","Е","Ё","Ж","З",
      "И","І","Й","Ј","К","Ќ",
      "Л","М","Н","О","Ӧ",
      "П","Р","С","Т","У",
      "Ф","Х","Ц","Ч","Ш",
      "Щ","Ъ","Ь","Ы","Ь",
      "Э","Є","Ю","Я","Ђ",
      "Ї","Љ","Њ","Ћ",
      "1","2","3","4","5",
      "6","7","8","9","0",
      ".",",",":","?","_",
      "+","-","×","^","/",
      "@","(",")","\"","'"
    ],
    codes: [
      "・－","－・・・","・－－","－－・","－－・","－－・",
      "－・・","・","・","・・・－","－－・・",
      "・・","・・","・－－－","・－－－","－・－","－・－",
      "・－・・","－－","－・","－－－","－－－",
      "・－－・","・－・","・・・","－","・・－",
      "・・－・","・・・・","－・－・","－－－・","－－－－",
      "－－・－","－・・－","－・・－","－・－－","－・－－",
      "・・－・・","・・－・・","・・－－","・－・－","－・・－－",
      "・－－－・","・－－－・","－－・－－","－・－・・",
      "・－－－－","・・－－－","・・・－－","・・・・－","・・・・・",
      "－・・・・","－－・・・","－－－・・","－－－－・","－－－－－",
      "・－・－・－","－－・・－－","－－－・・・","・・－－・・","・・－－・－",
      "・－・－・","－・・・・－","－・・－","・・・・・・","－・・－・",
      "・－－・－・","－・－－・","－・－－・－","・－・・－・","・－－－－・"
    ]
  };
  static #code_table_hebr = {
    chars : [
      "א","ב","ג","ד","ה",
      "ו","ז","ח","ט","י",
      "כ","ל","מ","נ","ס",
      "ע","פ","צ","ק","ר",
      "ש","ת",
      "1","2","3","4","5",
      "6","7","8","9","0",
      ".",",",":","?","_",
      "+","-","×","^","/",
      "@","(",")","\"","'"
    ],
    codes : [
      "・－","－・・・","－－・","－・・","－－－",
      "・","－－・・","・・・・","・・－","・・",
      "－・－","・－・・","－－","－・","－・－・",
      "・－－－","・－－・","・－－","－－・－","・－・",
      "・・・","－",
      "・－－－－","・・－－－","・・・－－","・・・・－","・・・・・",
      "－・・・・","－－・・・","－－－・・","－－－－・","－－－－－",
      "・－・－・－","－－・・－－","－－－・・・","・・－－・・","・・－－・－",
      "・－・－・","－・・・・－","－・・－","・・・・・・","－・・－・",
      "・－－・－・","－・－－・","－・－－・－","・－・・－・","・－－－－・"
    ]
  };
  static #code_table_arab = {
    chars : [
      "ا","ب","ت","ث","ج",
      "ح","خ","د","ذ","ر",
      "ز","س","ش","ص","ض",
      "ط","ظ","ع","غ","ف",
      "ق","ك","ل","م","ن",
      "ه","و","ي","ﺀ",
      "1","2","3","4","5",
      "6","7","8","9","0",
      ".",",",":","?","_",
      "+","-","×","^","/",
      "@","(",")","\"","'"
    ],
    codes : [
      "・－","－・・・","－","－・－・","・－－－",
      "・・・・","－－－","－・・","－－・・","・－・",
      "－－－・","・・・","－－－－","－・・－","・・・－",
      "・・－","－・－－","・－・－","－－・","・・－・",
      "－－・－","－・－","・－・・","－－","－・",
      "・・－・・","・－－","・・","・",
      "・－－－－","・・－－－","・・・－－","・・・・－","・・・・・",
      "－・・・・","－－・・・","－－－・・","－－－－・","－－－－－",
      "・－・－・－","－－・・－－","－－－・・・","・・－－・・","・・－－・－",
      "・－・－・","－・・・・－","－・・－","・・・・・・","－・・－・",
      "・－－・－・","－・－－・","－・－－・－","・－・・－・","・－－－－・"
    ]
  };


  /**
   * @type {Map<Language, {chars: [string], codes: [string]}>}
   */
  static get CODE_TABLES () {
    let x = new Map();
    x.set("en", this.#code_table_en);
    x.set("ja", this.#code_table_ja);
    x.set("el", this.#code_table_el);
    x.set("cyri", this.#code_table_cyri);
    x.set("hebr", this.#code_table_hebr);
    x.set("arab", this.#code_table_arab);
    Object.freeze(x);
    return x;
  }

  /**
   * 指定した文字をモールス符号に変換可能な文字に変換する。
   * @param {Language} lang 
   * @param {string} string 
   */
  static modify_string (lang, string) {
    string = string.split("").map(function (char) {
      if (char.length > 1) char = char.slice(0,1);
      if (lang === "en") {
        char = char.toUpperCase();
        let zen = [
          "Ａ","Ｂ","Ｃ","Ｄ","Ｅ","Ｆ","Ｇ",
          "Ｈ","Ｉ","Ｊ","Ｋ","Ｌ","Ｍ","Ｎ",
          "Ｏ","Ｐ","Ｑ","Ｒ","Ｓ","Ｔ","Ｕ",
          "Ｖ","Ｗ","Ｘ","Ｙ","Ｚ",
          "０","１","２","３","４","５","６","７","８","９"
        ];
        let han = [
          "A","B","C","D","E","F","G",
          "H","I","J","K","L","M","N",
          "O","P","Q","R","S","T","U",
          "V","W","X","Y","Z",
          "0","1","2","3","4","5","6","7","8","9"
        ];
        let index = zen.findIndex(elem => (elem === char));
        if (index !== -1) char = han[index];
        if (Morse.CODE_TABLES.get("en").chars.findIndex(elem => (elem === char)) === -1) {
          char = "";
        }
      }else if (lang === "ja") {
        let hira = [
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
        let kata = [
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
        let daku = [
          "ガ","ギ","グ","ゲ","ゴ",
          "ザ","ジ","ズ","ゼ","ゾ",
          "ダ","ヂ","ヅ","デ","ド",
          "バ","ビ","ブ","ベ","ボ",
          "パ","ピ","プ","ペ","ポ"
        ];
        let sei = [
          "カ゛","キ゛","ク゛","ケ゛","コ゛",
          "サ゛","シ゛","ス゛","セ゛","ソ゛",
          "タ゛","チ゛","ツ゛","テ゛","ト゛",
          "ハ゛","ヒ゛","フ゛","ヘ゛","ホ゛",
          "ハ゜","ヒ゜","フ゜","ヘ゜","ホ゜"
        ];
        let you = [
          "ァ","ィ","ゥ","ェ","ォ",
          "ャ","ュ","ョ","ヮ","ッ"
        ];
        let tyoku = [
          "ア","イ","ウ","エ","オ",
          "ヤ","ユ","ヨ","ワ","ツ"
        ];
        let zen_num = ["０","１","２","３","４","５","６","７","８","９"];
        let han_num = ["0","1","2","3","4","5","6","7","8","9"];
        
        let index = -1;
        index = hira.findIndex(elem => (elem === char));
        if (index !== -1) char = kata[index];
        index = daku.findIndex(elem => (elem === char));
        if (index !== -1) char = sei[index];
        index = you.findIndex(elem => (elem === char));
        if (index !== -1) char = tyoku[index];
        index = zen_num.findIndex(elem => (elem === char));
        if (index !== -1) char = han_num[index];
        if (char.length === 1) {
          if (Morse.CODE_TABLES.get("ja").chars.findIndex(elem => (elem === char)) === -1) {
            let new_char = Morse.modify_string("en", char);
            if (Morse.CODE_TABLES.get("en").chars.findIndex(elem => (elem === new_char)) === -1) { // 和文モールスはアルファベットを使用可能
              char = "";
            }
          }
        }
      }else if (lang === "el") {
        char = char.toUpperCase().slice(0,1);
        if (char === "Ά") {
          char = "Α";
        }else if (char === "Έ") {
          char = "Ε";
        }else if (char === "Ή") {
          char = "Η";
        }else if (char === "Ό") {
          char = "Ο";
        }else if (char === "Ύ" || char === "Ϋ" || char === "ϒ" || char === "ϓ" || char === "ϔ") {
          char = "Υ";
        }else if (char === "Ώ") {
          char = "Ω";
        }else if (char === "Ί" || char === "Ϊ") {
          char = "Ι";
        }else if (char === "ϐ") {
          char = "Β";
        }else if (char === "ϑ") {
          char = "Θ";
        }else if (char === "ϕ") {
          char = "Φ";
        }else if (char === "ϖ") {
          char = "Π";
        }else if (char === "ϗ") {
          char = "Χ";
        }
        if (Morse.CODE_TABLES.get(lang).chars.findIndex(elem => (elem === char)) === -1) {
          char = "";
        }
      }else{
        char = char.toUpperCase();
        if (Morse.CODE_TABLES.get(lang).chars.findIndex(elem => (elem === char)) === -1) {
          char = "";
        }
      }
      return char;
    });
    return string.join("");
  }

  /**
   * 1文字をモールス符号に変換する
   * @param {Language} lang 
   * @param {string} char 
   * @param {string} dot 
   * @param {string} dash 
   */
  static char2code (lang, char, dot = "・", dash = "－") {
    let code_table = this.CODE_TABLES.get(lang);
    let chars = code_table.chars;
    let codes = code_table.codes;
    char = this.modify_string(lang, char);
    let target_index = chars.findIndex(elem => (elem === char));
      if (target_index !== -1) {
        return codes[target_index].replace(/・/g, dot).replace(/－/g, dash);
      }else{
        return "";
      }
  }
  /**
   * 1文字分のモールス符号を文字に変換する
   * @param {Language} lang 
   * @param {string} code 
   * @param {string} dot 
   * @param {string} dash 
   */
  static code2char (lang, code, dot = "・", dash = "－") {
    code = Morse.standardizate_code(code, dot, dash);
    let code_table = this.CODE_TABLES.get(lang);
    let chars = code_table.chars;
    let codes = code_table.codes;
    let target_index = codes.findIndex(elem => (elem === code));
    if (target_index !== -1) {
      return chars[target_index];
    }else{
      return "*";
    }
  }

  /**
   * 指定した短点と長点で構成されたモールス符号を、標準の短点と長点の符号に変換する。
   * @param {string} code 
   * @param {string} dot 
   * @param {string} dash 
   * @returns {string}
   */
  static standardizate_code (code, dot = "・", dash = "－") {
    let dot_reg = new RegExp("^" + escapeRegExp(dot));
    let dash_reg = new RegExp("^" + escapeRegExp(dash));
    if (!dot_reg.test(dash)) {
      let target_str = code;
      let new_str = "";
      do {
        if (dot_reg.test(target_str)) {
          target_str = target_str.replace(dot_reg, "");
          new_str += "・";
        }else if (dash_reg.test(target_str)) {
          target_str = target_str.replace(dash_reg, "");
          new_str += "－";
        }else{
          break;
        }
      } while (true);
      return new_str.replace(/[^・－]/g, "");
    }else{
      let target_str = code;
      let new_str = "";
      do {
        if (dash_reg.test(target_str)) {
          target_str = target_str.replace(dash_reg, "");
          new_str += "－";
        }else if (dot_reg.test(target_str)) {
          target_str = target_str.replace(dot_reg, "");
          new_str += "・";
        }else{
          break;
        }
      } while (true);
      return new_str.replace(/[^・－]/g, "");
    }
  }

}


