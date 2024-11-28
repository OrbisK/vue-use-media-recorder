<script setup lang="ts">
// import { UseMediaRecorder} from '@orbisk/vue-use-media-recorder' // TODO: why?

// function handleStop() {
//   stop()
//   const blob = new Blob(data.value)
//   const blobVideo = new Blob(data.value)
//   audio.value.src = URL.createObjectURL(blob)
//   video.value.src = URL.createObjectURL(blobVideo)
// }

const stopped = ref(false)
</script>

<template>
  <UseMediaRecorder :constraints="{ audio: true }" @stop="stopped = true" @start="stopped = false">
    <template #default="slotProps">
      <button @click="() => slotProps.start()">
        start
      </button>
      <button @click="slotProps.pause">
        pause
      </button>
      <button @click="slotProps.resume">
        resume
      </button>
      <button @click="slotProps.stop">
        stop
      </button>
      <audio controls>
        <source v-if="stopped" :src="URL.createObjectURL(new Blob(slotProps.data))">
      </audio>
      <pre>state: {{ slotProps.state }}</pre>
      <pre>supported: {{ slotProps.isSupported }}</pre>
      <pre>mime type: {{ slotProps.mimeType }}</pre>
      <pre>mime supported: {{ slotProps.isMimeTypeSupported }}</pre>
      <pre>data length: {{ slotProps.data?.length }}</pre>
    </template>
  </UseMediaRecorder>
</template>
