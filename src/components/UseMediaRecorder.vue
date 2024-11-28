<script setup lang="ts">
import { useMediaRecorder } from '@orbisk/vue-use-media-recorder'

const props = defineProps({
  constraints: {
    type: Object,
    required: true,
    validator(value: any): boolean {
      if (!value?.audio && !value?.video) {
        console.error('constraints must have at least one of audio or video')
        return false
      }
      return true
    },
  },
  mediaRecorderOptions: {
    type: Object,
    default: () => ({}),
  },
})

const emit = defineEmits<{
  start: [ev: Event]
  stop: [ev: Event]
  pause: [ev: Event]
  resume: [ev: Event]
  error: [ev: Event]
}>()

const onStart = (...args: [Event]) => emit('start', ...args)
const onStop = (...args: [Event]) => emit('stop', ...args)
const onPause = (...args: [Event]) => emit('pause', ...args)
const onResume = (...args: [Event]) => emit('resume', ...args)
const onError = (...args: [Event]) => emit('error', ...args)

const {
  data,
  stream,
  mimeType,
  isSupported,
  isMimeTypeSupported,
  mediaRecorder,
  start,
  pause,
  resume,
  stop,
  state,

} = useMediaRecorder({ constraints: props.constraints, mediaRecorderOptions: props.mediaRecorderOptions, onStart, onResume, onPause, onStop, onError })

defineExpose({
  start,
  stop,
  resume,
  pause,
})
</script>

<template>
  <slot
    :data="data" :stream="stream" :mime-type="mimeType" :media-recorder="mediaRecorder" :is-supported="isSupported"
    :is-mime-type-supported="isMimeTypeSupported" :state="state" :start="start" :stop="stop" :pause="pause" :resume="resume"
  />
</template>
