import type { ConfigurableNavigator } from '@vueuse/core'
import type { MaybeRef } from 'vue'
import { useSupported } from '@vueuse/core'
import { tryOnScopeDispose } from '@vueuse/shared'
import { defu } from 'defu'
import { computed, ref, shallowRef, toValue, watch } from 'vue'
import { computedWithControl } from '@vueuse/core'

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
  mediaRecorderOptions: {}
}

export function useMediaRecorder(options: UseMediaRecorderOptions = {}) {
  const data = ref<Blob[]>([])
  const mediaRecorder = shallowRef<MediaRecorder>()
  const stream = shallowRef<MediaStream>()
  const result = shallowRef<Blob[]>([])

  const isMimeTypeSupported = computed(() => {
    return toValue(options.mediaRecorderOptions)?.mimeType ? MediaRecorder.isTypeSupported(toValue(options.mediaRecorderOptions)?.mimeType ?? '') : true
  })
  const isSupported = useSupported(() => {
    return !!navigator?.mediaDevices?.getUserMedia && isMimeTypeSupported.value
  })

  const state = computedWithControl<RecordingState | undefined>(()=>mediaRecorder.value,()=>{
    return mediaRecorder.value?.state
  })

  const mimeType = computedWithControl<string | undefined>(() => mediaRecorder.value, () => {
    return mediaRecorder.value?.mimeType
  })

  const updateStates = () => {
    state.trigger()
  }

  const {
    mediaRecorderOptions,
    constraints
  } = defu(options, defaultOptions)

  const start = async (timeslice: number | undefined = undefined) => {
    if (state.value === 'recording')
      return // todo warning?
    data.value = []
    stream.value = await navigator!.mediaDevices.getUserMedia(toValue(constraints))
    mediaRecorder.value = new MediaRecorder(stream.value, toValue(mediaRecorderOptions))
    mediaRecorder.value?.start(timeslice)
  }

  const stop = () => {
    if (!state.value || state.value === 'inactive')
      return // todo warning?
    mediaRecorder.value?.stop()
  }

  const pause = () => {
    if (state.value !== 'recording')
      return // todo warning?
    mediaRecorder.value?.pause()
  }

  const resume = () => {
    if (state.value !== 'paused')
      return // todo warning?
    mediaRecorder.value?.resume()
  }

  watch(() => mediaRecorder.value, (newMediaRecorder) => {
    if (!newMediaRecorder)
      return
    newMediaRecorder.ondataavailable = (e) => {
      const blob = e.data
      mimeType.trigger()
      data.value.push(e.data)
    }
    newMediaRecorder.onstop = () => {
      stream.value?.getTracks().forEach(t => t.stop())
      result.value = data.value
      updateStates()
    }
    newMediaRecorder.onpause = updateStates
    newMediaRecorder.onresume = updateStates
    newMediaRecorder.onstart = updateStates
    newMediaRecorder.onerror = updateStates
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
    mediaRecorder: computed(() => mediaRecorder.value)
  }
}

export type UseMediaRecorderReturn = ReturnType<typeof useMediaRecorder>
