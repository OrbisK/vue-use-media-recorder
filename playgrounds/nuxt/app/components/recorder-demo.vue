<script setup lang="ts">
const audio = ref()
const video = ref()
const { start, stop, pause, resume, data, state, isMimeTypeSupported, isSupported, mimeType } = useMediaRecorder({
  constraints: {
    audio: true,
    video: false,
  },
})
function handleStop() {
  stop()
  const blob = new Blob(data.value)
  const blobVideo = new Blob(data.value)
  audio.value.src = URL.createObjectURL(blob)
  video.value.src = URL.createObjectURL(blobVideo)
  data.value = []
}
</script>

<template>
  <div>
    <button @click="start()">
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
  </div>
</template>
