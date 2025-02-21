
let before_dakuten_split = true;
let after_dakuten_integrate = true;
let before_kogaki_conv = true;

/**@type {Set<string>[]} */
const custom_char_sets = [];

function init () {
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
  });
  let my_ja_h = new Set(ja_h_set);
  add_rule().value = Array.from(my_ja_h).join(",");
  let my_ja_k = new Set(ja_k_set);
  add_rule().value = Array.from(my_ja_k).join(",");
  let my_en_l = new Set(en_l_set);
  add_rule().value = Array.from(my_en_l).join(",");
  let my_en_u = new Set(en_u_set);
  add_rule().value = Array.from(my_en_u).join(",");
  input_char_set_default.checked = true;
  rule_disable();
}

/**@type {HTMLInputElement} */
const input_before_dakuten_split = document.getElementById("before_dakuten_split");
/**@type {HTMLInputElement} */
const input_after_dakuten_integrate = document.getElementById("after_dakuten_integrate");
/**@type {HTMLInputElement} */
const input_before_kogaki_conv = document.getElementById("before_kogaki_conv");
/**@type {HTMLInputElement} */
const input_char_set_default = document.getElementById("char_set_default");
input_char_set_default.addEventListener("change", rule_disable);
/**@type {HTMLInputElement} */
const input_char_set_custom = document.getElementById("char_set_custom");
input_char_set_custom.addEventListener("change", rule_disable);

const div_custom_set = document.getElementById("custom_set");
const div_last_rule_set = document.getElementById("last_rule_set");
/**@type {HTMLInputElement} */
const input_add_rule = document.getElementById("add_rule");
input_add_rule.addEventListener("click", add_rule);

/**
 * @returns {HTMLInputElement} 
 */
function add_rule () {
  let div_char_set = document.createElement("div");
  div_char_set.classList.add("char_set");
  let input_delete_rule = document.createElement("input");
  input_delete_rule.type = "button";
  input_delete_rule.value = "×";
  input_delete_rule.classList.add("delete_rule");
  input_delete_rule.addEventListener("click", input_delete_rule_listener);
  let input_rule = document.createElement("input");
  input_rule.type = "text";
  input_rule.value = "";
  input_rule.classList.add("rule");
  input_rule.addEventListener("input", input_rule_listener);
  div_char_set.appendChild(input_delete_rule);
  div_char_set.appendChild(input_rule);
  div_custom_set.insertBefore(div_char_set, div_last_rule_set);
  return input_rule;
}

/**
 * 
 * @param {MouseEvent} event 
 */
function input_delete_rule_listener (event) {
  /**@type {HTMLDivElement} */
  let div_char_set = event.currentTarget.parentElement;
  div_custom_set.removeChild(div_char_set);
}

function input_rule_listener (event) {

}

function rule_disable () {
  if (input_char_set_custom.checked) {
    Array.from(div_custom_set.getElementsByTagName("input")).forEach(elem => {
      elem.disabled = false;
    });
  }else{
    Array.from(div_custom_set.getElementsByTagName("input")).forEach(elem => {
      elem.disabled = true;
    });
  }
}


/**
 * DOM を参照してルールをセットする
 */
function set_rule () {
  before_dakuten_split = input_before_dakuten_split.checked;
  after_dakuten_integrate = input_after_dakuten_integrate.checked;
  before_kogaki_conv = input_before_kogaki_conv.checked;
  custom_char_sets.length = 0
  if (input_char_set_custom.checked) {
    Array.from(div_custom_set.children).forEach(elem => {
      if (elem.lastChild.type === "text") {
        let char_set = new Set(elem.lastChild.value.split(","));
        if (char_set.has("")) char_set.delete("");
        custom_char_sets.push(char_set);
      }
    });
  }
}


/**@type {HTMLInputElement} */
const input_plain_text = document.getElementById("plain_text");
/**@type {HTMLInputElement} */
const input_caesar_num = document.getElementById("caesar_num");
/**@type {HTMLInputElement} */
const input_caesar_exe = document.getElementById("caesar_exe");
const div_caesar_result = document.getElementById("caesar_result");


input_caesar_exe.addEventListener("click", function (event) {
  set_rule();
  let text = input_plain_text.value;
  if (text === "") text = "QEB NRFZH YOLTK CLU GRJMP LSBO QEB IXWV ALD";
  if (before_kogaki_conv) {
    text = kogaki_conv(text);
  }
  if (before_dakuten_split) {
    text = dakutenn_split(text);
  }
  let num = Number(input_caesar_num.value);
  num = Math.floor(num);
  let char_sets = default_char_sets;
  if (custom_char_sets.length > 0) {
    char_sets = custom_char_sets;
  }
  /**@type {number[]} */
  let applied_rule = [];
  caesar(text, 0, char_sets, applied_rule);
  let lcm = lcmA(applied_rule.filter(elem => (elem !== -1)).map(elem => char_sets[elem].size));
  let max = 0;
  for (let i = 0; i < char_sets.length; i++) {
    if (max < char_sets[i].size) max = char_sets[i].size;
  }
  /**@type {{num: number,str: string,eval: number}[]} */
  let results = [];
  for (let i = 0; i < lcm; i++) { // 範囲は要検討
    let str = caesar(text, i, char_sets);
    if (after_dakuten_integrate) {
      str = dakutenn_integrate(str);
    }
    results.push({num: i, str: str, eval: text_evaluation(str)});
  }
  let threshold = 0;
  let max_suitable_count = 10;
  /**@type {{num: number,str: string,eval: number}[]} */
  let suitable_result = [];
  if (Number.isNaN(num) || num === 0) {
    suitable_result = results.filter(elem => (elem.eval > threshold));
    suitable_result.sort((a, b) => (b.eval - a.eval));
    if (suitable_result.length > max_suitable_count) {
      let new_suitable = [];
      do {
        let target_eval = suitable_result[0].eval;
        if (new_suitable.length + suitable_result.filter(elem => (elem.eval === target_eval)).length > max_suitable_count) {
          break;
        }
        let i = 0;
        do {
          if (suitable_result[0].eval === target_eval) {
            new_suitable.push(suitable_result.shift());
          }else{
            break;
          }
          i++;
        } while (true);
      } while (true);
      suitable_result = new_suitable;
    }
  }else{
    suitable_result = results.filter(elem => (elem.num === num));
    if (suitable_result.length === 0) {
      let str = caesar(text, num, char_sets);
      if (after_dakuten_integrate) {
        str = dakutenn_integrate(str);
      }
      suitable_result.push({num: num, str: str, eval: text_evaluation(str)});
    }
  }
  
  Array.from(div_caesar_result.children).forEach(elem => div_caesar_result.removeChild(elem));
  let row = 1;
  let div_label;
  if (suitable_result.length > 0) {
    div_label = document.createElement("div");
    div_label.innerText = "結果";
    div_label.classList.add("result_header");
    div_label.style.gridArea = row + "/1/" + (row+1) + "/4";
    div_caesar_result.appendChild(div_label);
    row++;
  }
  for (let i = 0; i < suitable_result.length; i++) {
    add_result_field(row, suitable_result[i]);
    row++;
  }
  div_label = document.createElement("div");
  div_label.innerText = "すべての結果";
  div_label.classList.add("result_header");
  div_label.style.gridArea = row + "/1/" + (row+1) + "/4";
  //div_label.style.position = "sticky";
  //div_label.style.top = "0";
  div_caesar_result.appendChild(div_label);
  row++;
  for (let i = 0; i < results.length; i++) {
    add_result_field(row, results[i]);
    row++;
  }
  row--;
  div_caesar_result.style.gridTemplateRows = `repeat(${row}, 1.5lh)`;
  div_caesar_result.scrollTo(0,0);
});

/**
 * 
 * @param {number} row 
 * @param {{num: number,str: string,eval: number}} result 
 */
function add_result_field (row, result) {
  let div_numlabel = document.createElement("div");
  div_numlabel.classList.add("number_label", "left");
  div_numlabel.style.gridRow = String(row);
  div_numlabel.innerText = add_pm(result.num);
  /**@type {HTMLInputElement} */
  // let input_result_text = document.createElement("input");
  // input_result_text.classList.add("result_text");
  // input_result_text.style.gridRow = String(row);
  // input_result_text.value = result.str;
  // input_result_text.readOnly = true;
  let div_result_text = document.createElement("div");
  div_result_text.classList.add("result_text");
  div_result_text.style.gridRow = String(row);
  div_result_text.innerText = result.str;
  div_result_text.addEventListener("contextmenu", div_result_text_listener);

  let div_numlabel2 = document.createElement("div");
  div_numlabel2.classList.add("number_label", "right");
  div_numlabel2.style.gridRow = String(row);
  div_numlabel2.innerText = format_number(result.eval);
  div_caesar_result.appendChild(div_numlabel);
  // div_caesar_result.appendChild(input_result_text);
  div_caesar_result.appendChild(div_result_text);
  div_caesar_result.appendChild(div_numlabel2);
}

/**
 * 
 * @param {MouseEvent} event 
 */
function div_result_text_listener (event) {
  /**@type {HTMLDivElement} */
  let div_result_text = event.currentTarget;
  let textNode = div_result_text.childNodes[0];
  let selection = window.getSelection();
  let range = document.createRange();
  range.setStart(textNode, 0);
  range.setEnd(textNode, textNode.length);
  if (selection.rangeCount > 0) selection.removeAllRanges();
  selection.addRange(range);
}


function format_number (number) {
  if (Math.abs(number) >= 1000) return String(Math.floor(number));
  if (Math.abs(number) >= 100) return String(Math.floor(number * 10) / 10);
  if (Math.abs(number) >= 10) return String(Math.floor(number * 100) / 100);
  return String(Math.floor(number * 1000) / 1000);
}

function add_pm (number) {
  if (number > 0) {
    return "+" + String(number);
  }else if (number <= 0) {
    return String(number);
  }
}

/**
 * 最小公倍数を返す
 * @param {number[]} arr 
 */
function lcmA (arr) {
  if (arr.length === 0) return 1;
  //if (arr.length === 1) return arr[0];
  let x = arr.pop();
  return lcm(lcmA(arr), x);
}

/**
 * 
 * @param {number} x
 * @param {number} y 
 */
function lcm (x, y) {
  if (x < y) {
    let z = x; x = y; y = z;
  }
  return x * y / gcd(x, y);
}

/**
 * x > y にすること
 * @param {number} x 
 * @param {number} y 
 */
function gcd (x, y) {
  if (y === 0) {
    return x;
  }else{
    return gcd(y, x % y);
  }
}


init();
