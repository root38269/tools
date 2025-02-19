
const AudioContext = window.AudioContext || window.webkitAudioContext;

const audioContext = new AudioContext();
const master_gain = new GainNode(audioContext);
master_gain.gain.value = 0.1;

document.addEventListener("click", user_init);
document.addEventListener("keydown", user_init);
document.addEventListener("mousedown", user_init);

/**@type {[OscillatorNode]} */
const oscs = [];
/**@type {[GainNode]} */
const envs = [];
const osc_num = 10;
let current_osc_index = 0;
function audio_init () {
  for (let i = 0; i < osc_num; i++) {
    let my_osc = new OscillatorNode(audioContext);
    my_osc.frequency = 440;
    my_osc.type = "sine";
    oscs.push(my_osc);
    let my_env = new GainNode(audioContext);
    my_env.gain.value = 0;
    envs.push(my_env);
    my_osc.connect(my_env).connect(master_gain);
  }
  master_gain.connect(audioContext.destination);
  console.log("init finished!");
}

let initial = true;
/**
 * 自動再生ポリシーのため、再生はユーザーの行ったイベント後に行う
 */
function user_init () {
  if (initial) {
    for (let i = 0; i < osc_num; i++) {
      oscs[i].start();
    }
    initial = false;
    console.log("user init finished!");
  }
}

function beep_start () {
  current_osc_index++;
  if (current_osc_index >= osc_num) current_osc_index = 0;
  let my_env = envs[current_osc_index];
  my_env.gain.setValueAtTime(0.00001, audioContext.currentTime);
  my_env.gain.exponentialRampToValueAtTime(1, audioContext.currentTime + 0.015);
}

function beep_end () {
  let my_env = envs[current_osc_index];
  my_env.gain.setValueAtTime(1, audioContext.currentTime);
  my_env.gain.setTargetAtTime(0.00001, audioContext.currentTime, 0.09);
}

audio_init();

//============↑音声系↑================


const textarea_input_text1 = document.getElementById("input_text1");
const textarea_input_text2 = document.getElementById("input_text2");
const textarea_output_text = document.getElementById("output_text");
const select_input_lang = document.getElementById("input_lang");
const select_output_lang = document.getElementById("output_lang");
const input_morse_dot = document.getElementById("morse_dot");
const input_morse_dash = document.getElementById("morse_dash");
const input_morse_char_split = document.getElementById("morse_char_split");
const input_morse_word_split = document.getElementById("morse_word_split");
const input_play = document.getElementById("play");
const input_volume = document.getElementById("volume");
const span_volume_label = document.getElementById("volume_label");
const input_input_morse = document.getElementById("input_morse");

textarea_input_text1.addEventListener("input", convert);
textarea_input_text2.addEventListener("input", function (event) {
  textarea_input_text1.value = "";
  convert2();
});
textarea_input_text1.addEventListener("focus", function (event) {
  input_input_morse.checked = false;
  toggle_input();
});
textarea_input_text2.addEventListener("focus", function (event) {
  input_input_morse.checked = false;
  toggle_input();
});
select_input_lang.addEventListener("input", function (event) {
  /**@type {Language} */
  let new_lang = select_input_lang.value;
  select_output_lang.value = new_lang;
  if (new_lang === "hebr" || new_lang === "arab") {
    textarea_input_text1.classList.add("right2left");
    textarea_output_text.classList.add("right2left");
  }else{
    textarea_input_text1.classList.remove("right2left");
    textarea_output_text.classList.remove("right2left");
  }
  show_dafault_message();
});
select_output_lang.addEventListener("input", function (event) {
  /**@type {Language} */
  let new_lang = select_output_lang.value;
  if (new_lang === "hebr" || new_lang === "arab") {
    textarea_output_text.classList.add("right2left");
  }else{
    textarea_output_text.classList.remove("right2left");
  }
  convert2();
});
input_morse_dot.addEventListener("change", convert);
input_morse_dash.addEventListener("change", convert);
input_morse_char_split.addEventListener("change", convert);
input_morse_word_split.addEventListener("change", convert);
let playing = false;
input_play.addEventListener("click", function (event) {
  if (playing) {
    clearTimeout(play_timeout);
    input_play.value = "再生";
    playing = false;
  }else{
    play_morse(main_morse2.export(), function () {
      input_play.value = "再生";
      playing = false;
    });
    input_play.value = "停止";
    playing = true;
  }
});
input_volume.addEventListener("input", function (event) {
  span_volume_label.innerText = input_volume.value;
  master_gain.gain.value = Number(input_volume.value) / 100;
});
input_input_morse.addEventListener("input", toggle_input);

let morse_input_mode = false;
function toggle_input () {
  if (input_input_morse.checked) {
    main_morse_receiver.reset();
    textarea_input_text2.value = "";
    morse_input_mode = true;
  }else{
    morse_input_mode = false;
  }
}

let main_morse_receiver = new MorseReceiver();
document.addEventListener("keydown", function(event) {
  if (event.key === "Shift") {
    if (morse_input_mode) {
      main_morse_receiver.input_start();
      beep_start();
    }
  }
});
document.addEventListener("keyup", function (event) {
  if (event.key === "Shift") {
    if (morse_input_mode) {
      main_morse_receiver.input_end();
      beep_end();
      setTimeout(() => {
        convert_receiver();
      }, 0);
    }
  }
});


const main_morse1 = new Morse();
const main_morse2 = new Morse();

function convert () {
  main_morse1.set_lang(select_input_lang.value);
  main_morse1.fromString(textarea_input_text1.value);
  let my_morse_code = main_morse1.toCode(input_morse_dot.value, input_morse_dash.value, input_morse_char_split.value, input_morse_word_split.value);
  textarea_input_text2.value = my_morse_code;
  main_morse2.set_lang(select_output_lang.value);
  main_morse2.fromCode(my_morse_code, input_morse_dot.value, input_morse_dash.value, input_morse_char_split.value, input_morse_word_split.value);
  textarea_output_text.value = main_morse2.toString();
}

function convert2 () {
  let my_morse_code = textarea_input_text2.value;
  main_morse2.set_lang(select_output_lang.value);
  main_morse2.fromCode(my_morse_code, input_morse_dot.value, input_morse_dash.value, input_morse_char_split.value, input_morse_word_split.value);
  textarea_output_text.value = main_morse2.toString();
}

function convert_receiver () {
  main_morse1.import(main_morse_receiver.export());
  let my_morse_code = main_morse1.toCode(input_morse_dot.value, input_morse_dash.value, input_morse_char_split.value, input_morse_word_split.value);
  textarea_input_text2.value = my_morse_code;
  main_morse2.set_lang(select_output_lang.value);
  main_morse2.fromCode(my_morse_code, input_morse_dot.value, input_morse_dash.value, input_morse_char_split.value, input_morse_word_split.value);
  textarea_output_text.value = main_morse2.toString();
}

let play_timeout = undefined;
/**
 * 
 * @param {[[["・"|"－"]]]} data 
 * @param {Function} ended
 */
function play_morse (data, ended) {
  let input_times = [];
  let interval_times = [];
  let my_data = data.map(function (elem) {
    elem = elem.map(function (elem2) {
      elem2 = elem2.map(function (elem3) {
        if (elem3 === "・") return "100";
        if (elem3 === "－") return "300";
      });
      return elem2.join(",100,");
    })
    return elem.join(",300,");
  }).join(",700,").split(",").map(elem => Number(elem));
  //console.log(my_data);
  let play_flag = false;
  const play = function () {
    let my_interval1 = my_data.shift() * 0.7;
    let my_interval2 = my_data.shift() * 0.7;
    if (isNaN(my_interval1)) {
      ended();
      return;
    }
    beep_start();
    play_flag = true;
    setTimeout(() => {
      beep_end();
      play_flag = false;
    }, my_interval1);
    if (isNaN(my_interval2)) {
      ended();
      return;
    }
    play_timeout = setTimeout(play, my_interval1 + my_interval2);
  }
  play();
}

const default_message = new Map();
default_message.set("en", "This is morse code");
default_message.set("ja", "これはわぶんモールスしんごうです、 アルファベットはかっこ（alphabet）でかこみます");
default_message.set("el", "αυτός είναι ο κώδικας Μορς");
default_message.set("cyri", "это азбука Морзе");
default_message.set("hebr", "זה קוד מורס");
default_message.set("arab", "هذا هو مورس");

function show_dafault_message () {
  if (textarea_input_text1.value === "") {
    textarea_input_text1.value = default_message.get(select_input_lang.value);
  }else{
    let arr = Array.from(default_message.values());
    for (let i = 0; i < arr.length; i++) {
      if (textarea_input_text1.value === arr[i]) {
        textarea_input_text1.value = default_message.get(select_input_lang.value);
        break;
      }
    }
  }
  convert();
}

function display_init () {  
  input_input_morse.checked = false;
  show_dafault_message();
}

display_init();

const div_table_wrap = document.getElementById("table_wrap");
const select_table = document.getElementById("select_table");

select_table.addEventListener("change", select_table_listener);

function select_table_listener (event) {
  let lang = select_table.value;
  let old_table = div_table_wrap.getElementsByClassName("show")[0];
  let new_table = document.getElementById("table_" + lang);
  old_table.classList.add("hide");
  old_table.classList.remove("show");
  new_table.classList.add("show");
  new_table.classList.remove("hide");
}
select_table_listener();

