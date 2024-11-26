import type { ConfigurableNavigator } from '@vueuse/core'
import type { MaybeRef } from 'vue'
import { useSupported } from '@vueuse/core'
import { tryOnScopeDispose } from '@vueuse/shared'
import { defu } from 'defu'
import { computed, ref, shallowRef, toValue, watch } from 'vue'

export { MediaRecorderPlugin } from './plugin'

interface UseMediaRecorderOptions extends ConfigurableNavigator {
  /**
   * The constraints parameter is a MediaStreamConstraints object specifying the types of media to request, along with any requirements for each type.
   */
  constraints?: MaybeRef<MediaStreamConstraints>
  /**
   * Options to pass to the MediaRecorder constructor.
   */
  mediaRecorderOptions?: MaybeRef<MediaRecorderOptions>
}

const defaultOptions: UseMediaRecorderOptions = {
  constraints: { audio: false, video: false },
  mediaRecorderOptions: {},
}

export function useMediaRecorder(options: UseMediaRecorderOptions = {}) {
  const data = ref<Blob[]>([])
  const mediaRecorder = shallowRef<MediaRecorder>()
  const stream = shallowRef<MediaStream>()

  const isMimeTypeSupported = computed(() => {
    return toValue(options.mediaRecorderOptions)?.mimeType ? MediaRecorder.isTypeSupported(toValue(options.mediaRecorderOptions)?.mimeType ?? '') : true
  })
  const isSupported = useSupported(() => {
    return !!navigator?.mediaDevices?.getUserMedia && isMimeTypeSupported.value
  })

  const state = shallowRef<RecordingState | undefined>(undefined)

  const mimeType = shallowRef<string | undefined>(undefined)

  const updateStates = () => {
    state.value = mediaRecorder.value?.state
  }

  const {
    mediaRecorderOptions,
    constraints,
  } = defu(options, defaultOptions)

  const start = async (timeslice: number | undefined = undefined) => {
    if (state.value === 'recording')
      return // todo warning?
    stream.value = await navigator!.mediaDevices.getUserMedia(toValue(constraints))
    mediaRecorder.value = new MediaRecorder(stream.value, toValue(mediaRecorderOptions))
    data.value = []
    mediaRecorder.value?.start(timeslice)
    updateStates()
  }

  const reset = () => {
    stream.value?.getTracks().forEach(t => t.stop())
    stream.value = undefined
    mediaRecorder.value?.stop()
  }

  const stop = () => {
    if (!state.value || state.value === 'inactive')
      return // todo warning?
    reset()
    updateStates()
  }

  const pause = () => {
    if (state.value !== 'recording')
      return // todo warning?
    mediaRecorder.value?.pause()
    updateStates()
  }

  const resume = () => {
    if (state.value !== 'paused')
      return // todo warning?
    mediaRecorder.value?.resume()
    updateStates()
  }

  watch(() => mediaRecorder.value, (newMediaRecorder) => {
    if (!newMediaRecorder)
      return
    newMediaRecorder.ondataavailable = (e) => {
      const blob = e.data
      if (blob.type !== mimeType.value) {
        mimeType.value = blob.type ?? mediaRecorder.value?.mimeType
      }
      data.value.push(e.data)
    }
  }, { immediate: true })

  tryOnScopeDispose(() => {
    reset()
  })

  return {
    start,
    pause,
    resume,
    stop,
    data,
    stream,
    state,
    isSupported,
    isMimeTypeSupported,
    mimeType: computed(()=> mimeType.value),
    mediaRecorder: computed(() => mediaRecorder.value),
  }
}

export type UseMediaRecorderReturn = ReturnType<typeof useMediaRecorder>
