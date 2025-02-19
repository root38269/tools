/**@type {AudioContext} */
let audio_ctx;
/**@type {MediaStreamAudioSourceNode} */
let media_steram;
/**@type {AnalyserNode} */
let analyser;
/**@type {number} */
let bufferLength;
/**@type {Float32Array} */
let freq_dataArray;
/**@type {Float32Array} */
let wav_dataArray;
/**@type {MediaStream} */
let stream;


function audio_init2 () {
  audio_ctx = audio_context;
  analyser = audio_ctx.createAnalyser();
  //analyser.fftSize = 8192;
  analyser.smoothingTimeConstant = 0.5;
  bufferLength = analyser.frequencyBinCount;
  freq_dataArray = new Float32Array(bufferLength);
  wav_dataArray = new Float32Array(bufferLength);

  master_gain.connect(analyser); // test(); の代わり

}


function recording_start () {
  navigator.mediaDevices
  .getUserMedia({audio: true, video: false})
  .then((stream) => {
    media_steram = audio_ctx.createMediaStreamSource(stream);
    media_steram.connect(analyser);
    span_input_message.innerText = "マイクの音声を読み取っています";
    /* ストリームを使用 */
  })
  .catch((err) => {
    console.log(err);
    span_input_message.innerText = "マイクへのアクセスが許可されていません";
    /* エラーを処理 */
  });

}

function recording_stop () {
  if (stream !== undefined) {
    stream.getTracks().forEach(track => track.stop());
    span_input_message.innerText = "音声の読み取りを中断しました";
  }
}

const input_input_start = document.getElementById("input_start");
const input_input_stop = document.getElementById("input_stop");
const input_input_result = document.getElementById("inpu_result");
const span_input_message = document.getElementById("input_message");

input_input_start.addEventListener("click", function (event) {
  recording_start();
  drawing = true;
  draw();
});

input_input_stop.addEventListener("click", function (event) {
  recording_stop();
  drawing = false;
})


//Create 2D canvas
const canvas = document.getElementById("canvas");
canvas.width = document.body.parentElement.getBoundingClientRect().width;
canvas.height = document.body.parentElement.getBoundingClientRect().height;
const canvasCtx = canvas.getContext("2d");
canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

const span_peak_label = document.getElementById("peak_label");

let drawing = true;

function draw() {
  if (drawing === false) return;
  //Schedule next redraw
  requestAnimationFrame(draw);

  //Get spectrum data
  analyser.getFloatFrequencyData(freq_dataArray);
  analyser.getFloatTimeDomainData(wav_dataArray);

  //Draw black background
  canvasCtx.fillStyle = "rgb(0, 0, 0)";
  canvasCtx.fillRect(0, 0, canvas.width, canvas.height);
  canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

  //Draw spectrum
  const barWidth = (canvas.width / bufferLength) * 2.5;
  let posX = 0;
  let first = {index: 0, value: -Infinity};
  let second = {index: 0, value: -Infinity};
  let vol_peak = 0;
  
  for (let i = 0; i < bufferLength; i++) {
    if (first.value < freq_dataArray[i]) {
      second.index = first.index;
      second.value = first.value;
      first.index = i;
      first.value = freq_dataArray[i];
    }else if (second.value < freq_dataArray[i]) {
      second.index = i;
      second.value = freq_dataArray[i];
    }
    if (vol_peak > Math.abs(wav_dataArray[i])) vol_peak = Math.abs(wav_dataArray[i]);

    const barHeight = (freq_dataArray[i] + 140) * 2;
    canvasCtx.fillStyle =
      "rgb(" + Math.floor(barHeight + 100) + " ,50 ,50)";
    canvasCtx.fillRect(
      posX,
      canvas.height - barHeight / 2,
      barWidth,
      barHeight / 2,
    );
    posX += barWidth + 1;
  }
  span_peak_label.innerText = Math.floor(first.index / bufferLength * audio_ctx.sampleRate / 2) + "Hz, " + Math.floor(second.index / bufferLength * audio_ctx.sampleRate / 2) + "Hz";
}
