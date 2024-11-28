<script setup lang="ts">
const getUrlFromData = (data: BlobPart[], type?: string) => URL.createObjectURL(new Blob(data, { type }))

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
        <source v-if="stopped" :src="getUrlFromData(slotProps.data, slotProps.mimeType)">
      </audio>
      <pre>state: {{ slotProps.state }}</pre>
      <pre>supported: {{ slotProps.isSupported }}</pre>
      <pre>mime type: {{ slotProps.mimeType }}</pre>
      <pre>mime supported: {{ slotProps.isMimeTypeSupported }}</pre>
      <pre>data length: {{ slotProps.data?.length }}</pre>
    </template>
  </UseMediaRecorder>
</template>
