/**@type {AudioContext} */
let audio_context;
/**@type {GainNode} */
let master_gain;
/**@type {[{str: string,low: OscillatorNode,high: OscillatorNode,gain: GainNode,low_freq: number,high_freq: number}]} */
let DTMFosci = [];

let DTMF_symbols = ["1","2","3","4","5","6","7","8","9","*","0","#","A","B","C","D"];


document.addEventListener("mousedown", audio_init, true);
document.addEventListener("keydown", audio_init, true);

function audio_init () {
  if (audio_context !== undefined) return;
  audio_context = new AudioContext();
  master_gain = audio_context.createGain();
  master_gain.gain.value = 0.1;
  master_gain.connect(audio_context.destination);
  DTMFosci.push({str: "1", low: undefined, high: undefined, gain: undefined, low_freq: 697, high_freq: 1209});
  DTMFosci.push({str: "2", low: undefined, high: undefined, gain: undefined, low_freq: 697, high_freq: 1336});
  DTMFosci.push({str: "3", low: undefined, high: undefined, gain: undefined, low_freq: 697, high_freq: 1447});
  DTMFosci.push({str: "A", low: undefined, high: undefined, gain: undefined, low_freq: 697, high_freq: 1633});
  DTMFosci.push({str: "4", low: undefined, high: undefined, gain: undefined, low_freq: 770, high_freq: 1209});
  DTMFosci.push({str: "5", low: undefined, high: undefined, gain: undefined, low_freq: 770, high_freq: 1336});
  DTMFosci.push({str: "6", low: undefined, high: undefined, gain: undefined, low_freq: 770, high_freq: 1447});
  DTMFosci.push({str: "B", low: undefined, high: undefined, gain: undefined, low_freq: 770, high_freq: 1633});
  DTMFosci.push({str: "7", low: undefined, high: undefined, gain: undefined, low_freq: 852, high_freq: 1209});
  DTMFosci.push({str: "8", low: undefined, high: undefined, gain: undefined, low_freq: 852, high_freq: 1336});
  DTMFosci.push({str: "9", low: undefined, high: undefined, gain: undefined, low_freq: 852, high_freq: 1447});
  DTMFosci.push({str: "C", low: undefined, high: undefined, gain: undefined, low_freq: 852, high_freq: 1633});
  DTMFosci.push({str: "*", low: undefined, high: undefined, gain: undefined, low_freq: 941, high_freq: 1209});
  DTMFosci.push({str: "0", low: undefined, high: undefined, gain: undefined, low_freq: 941, high_freq: 1336});
  DTMFosci.push({str: "#", low: undefined, high: undefined, gain: undefined, low_freq: 941, high_freq: 1447});
  DTMFosci.push({str: "D", low: undefined, high: undefined, gain: undefined, low_freq: 941, high_freq: 1633});
  
  DTMF_symbols.forEach(elem => create_DTMF_source(elem));

  console.log("audio init!");
  audio_init2();
  
}


function create_DTMF_source (str) {
  let obj = DTMFosci.find((elem) => (elem.str === str));
  if (obj === undefined) return;
  let low_osci = audio_context.createOscillator();
  let high_osci = audio_context.createOscillator();
  let my_gain = audio_context.createGain();
  low_osci.frequency.setValueAtTime(obj.low_freq, audio_context.currentTime);
  high_osci.frequency.setValueAtTime(obj.high_freq, audio_context.currentTime);
  my_gain.gain.value = 0;
  low_osci.connect(my_gain);
  high_osci.connect(my_gain);
  my_gain.connect(master_gain);
  obj.low = low_osci;
  obj.high = high_osci;
  obj.gain = my_gain;
}

function start_DTMF (str) {
  let obj = DTMFosci.find((elem) => (elem.str === str));
  if (obj === undefined) return;
  obj.high.start(audio_context.currentTime);
  obj.low.start(audio_context.currentTime);
  obj.gain.gain.setValueAtTime(0.0001, audio_context.currentTime); // 必要不可欠
  obj.gain.gain.exponentialRampToValueAtTime(1, audio_context.currentTime + 0.015);
}

function stop_DTMF (str) {
  let obj = DTMFosci.find((elem) => (elem.str === str));
  if (obj === undefined) return;
  obj.high.stop(audio_context.currentTime + 0.3);
  obj.low.stop(audio_context.currentTime + 0.3);
  obj.gain.gain.setTargetAtTime(0, audio_context.currentTime, 0.03);
  create_DTMF_source(str);
}

function play_DTMF (str, millisecond = 200) {
  let obj = DTMFosci.find((elem) => (elem.str === str));
  if (obj === undefined) return;
  obj.high.start(audio_context.currentTime);
  obj.low.start(audio_context.currentTime);
  obj.gain.gain.setValueAtTime(0.0001, audio_context.currentTime); // 必要不可欠
  obj.gain.gain.exponentialRampToValueAtTime(1, audio_context.currentTime + 0.015);
  obj.high.stop(audio_context.currentTime + millisecond/1000 + 0.3);
  obj.low.stop(audio_context.currentTime + millisecond/1000 + 0.3);
  obj.gain.gain.setTargetAtTime(0, audio_context.currentTime + millisecond/1000, 0.03);
  create_DTMF_source(str);
}

/**
 * 
 * @param {string} str 
 * @param {number} time 
 * @param {number} interval 
 */
function play_DTMFs (str, time = 200, interval = 50) {
  let arr = str.split("");
  let start_time = 0;
  for (let i = 0; i < arr.length; i++) {
    if (DTMF_symbols.indexOf(arr[i]) !== -1) {
      start_time += time + interval;
    }else{
      start_time += interval;
    }
    if (i === 0) {
      start_time = 0;
    }
    setTimeout(() => {
      play_DTMF(arr[i], time);
    }, start_time);
  }
}

//const div_phone_button1 = document.getElementById("phone_button1");
const div_phone = document.getElementById("phone");

// div_phone_button1.addEventListener("mousedown", function (event) {
//   console.log("mousedown");
//   start_DTMF("1");
// });

// document.addEventListener("mouseup", function (event) {
//   console.log("mouseup");
//   stop_DTMF();
// });

document.addEventListener("keydown", function (event) {
  if (event.repeat) return;
  switch (event.key) {
    case "1":case "2":case "3":case "4":case "5":case "6":case "7":case "8":case "9":case "0":case "*":
      document.getElementById("phone_button" + event.key).classList.add("playing");
      start_DTMF(event.key);
      break;
    case ".":
      document.getElementById("phone_button#").classList.add("playing");
      start_DTMF("#");
  }
  
});
document.addEventListener("keyup", function (event) {
  switch (event.key) {
    case "1":case "2":case "3":case "4":case "5":case "6":case "7":case "8":case "9":case "0":case "*":
      document.getElementById("phone_button" + event.key).classList.remove("playing");
      stop_DTMF(event.key);
      break;
    case ".":
      document.getElementById("phone_button#").classList.remove("playing");
      stop_DTMF("#");
  }
});

function init () {
  for (let i = 0; i < 12; i++) {
    elem = DTMF_symbols[i];
    let div_cell = document.createElement("div");
    div_cell.classList.add("phone_button_cell");
    let div_button = document.createElement("div");
    div_button.classList.add("phone_button");
    div_button.id = "phone_button" + elem;
    div_button.DTMF_symbol = elem;
    div_button.addEventListener("click", phone_button_listener);
    let span_label = document.createElement("span");
    span_label.classList.add("phone_button_label");
    span_label.innerText = elem;
    div_button.appendChild(span_label);
    div_cell.appendChild(div_button);
    div_phone.appendChild(div_cell);
  }
}

/**
 * 
 * @param {MouseEvent} event 
 */
function phone_button_listener (event) {
  /**@type {HTMLDivElement} */
  let target_elem = event.currentTarget;
  let str = target_elem.DTMF_symbol;
  //console.log("mousedown " + str);
  document.getElementById("phone_button" + str).classList.add("playing");
  setTimeout(() => {
    document.getElementById("phone_button" + str).classList.remove("playing");
  }, 200);
  play_DTMF(str, 200);
}


const input_phone_number_play = document.getElementById("phone_number_play");
const input_phone_number = document.getElementById("phone_number");
const input_play_time = document.getElementById("play_time");
const input_play_interval = document.getElementById("play_interval");

input_phone_number_play.addEventListener("click", function (event) {
  play_DTMFs(input_phone_number.value, Number(input_play_time.value), Number(input_play_interval.value));
});



init();
