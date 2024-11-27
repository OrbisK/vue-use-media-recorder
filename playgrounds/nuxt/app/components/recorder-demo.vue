<script setup lang="ts">
const audio = ref()
const video = ref()

const onStop = ()=>{
  console.log("onstop")
}
const { start, stop, pause, resume, data, state, isMimeTypeSupported, isSupported, mimeType } = useMediaRecorder({
  constraints: {
    audio: true,
    video: false,
  },
  onStop,
})
function handleStop() {
  console.log('stop')
  stop()
  const blob = new Blob(data.value)
  const blobVideo = new Blob(data.value)
  audio.value.src = URL.createObjectURL(blob)
  video.value.src = URL.createObjectURL(blobVideo)
}
</script>

<template>
  <div>
    <button @click="start">
      start
    </button>
    <button @click="pause">
      pause
    </button>
    <button @click="resume">
      resume
    </button>
    <button @click="handleStop">
      stop
    </button>
    <audio ref="audio" controls />
    <video ref="video" controls />
    <pre>state: {{ state }}</pre>
    <pre>supported: {{ isSupported }}</pre>
    <pre>mime type: {{ mimeType }}</pre>
    <pre>mime supported: {{ isMimeTypeSupported }}</pre>
    <pre>data length: {{ data?.length}}</pre>
  </div>
</template>
