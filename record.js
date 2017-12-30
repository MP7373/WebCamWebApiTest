const video = document.getElementById('vd')
const btn = document.getElementById('btn')

let chunks = []
const saveRecordingChunk = event => {
  chunks.push(event.data)
}

const saveRecording = event => {
  let recordingBlob = new Blob(chunks, {
    type: 'video/webm',
  })
  let finishedRecording = URL.createObjectURL(recordingBlob)
  video.src = finishedRecording
  video.autoplay = true
  video.loop = false
  video.controls = true
  chunks = []
}

btn1.onclick = () => {
  record()
}

function record() {
  navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true,
  }).then(stream => {
    let recording = new MediaRecorder(stream)
    recording.ondataavailable = saveRecordingChunk
    recording.onstop = saveRecording
    recording.start()
    
    btn2.onclick = () => {
      recording.stop()
      stream.getTracks().map((track) => track.stop())
    }
  })
}
