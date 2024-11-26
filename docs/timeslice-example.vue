<script setup>
import { useMediaRecorder } from '@orbisk/vue-use-media-recorder'
import { computed, ref } from 'vue'

const {
  data,
  start,
  stop,
  pause,
  resume,
  state,
} = useMediaRecorder({ constraints: { audio: true, video: true } })

const timeslice = ref(1000)

const length = computed(() => {
  return data.value.length ?? 0
})

const startBtnText = computed(() => {
  switch (state.value) {
    case 'recording':
      return 'Pause'
    case 'paused':
      return 'Resume'
    default:
      return 'Start'
  }
})

function handleStartClick() {
  switch (state.value) {
    case 'recording':
      pause()
      break
    case 'paused':
      resume()
      break
    default:
      start(timeslice.value)
  }
}

const audio = computed(() => {
  if (!data.value?.length || state.value !== 'inactive')
    return
  const blob = new Blob(data.value)
  return URL.createObjectURL(blob)
})
</script>

<template>
  <div style="display: flex; flex-direction: column">
    <label for="timeslice">
      Timeslice (ms):
      <input id="timeslice" type="number" v-model="timeslice"/>
    </label>
    <button style="border-radius: 5px; background-color: greenyellow; color: black" @click="handleStartClick">
      {{ startBtnText }}
    </button>
    <button style="border-radius: 5px; background-color: orangered; color: white" @click="stop">
      Stop
    </button>
    <pre>state: {{ state ? state : 'undefined (no interaction)' }}</pre>
    <pre>recorded data (array length): {{ length }}</pre>
    <audio v-if="audio" controls>
      <source :src="audio">
    </audio>
  </div>
</template>
