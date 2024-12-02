import type { ConfigurableNavigator } from '@vueuse/core'
import type { MaybeRefOrGetter } from 'vue'
import { computedWithControl, useSupported } from '@vueuse/core'
import { tryOnScopeDispose } from '@vueuse/shared'
import { defu } from 'defu'
import { computed, ref, shallowRef, toValue } from 'vue'

interface UseMediaRecorderOptions extends ConfigurableNavigator {
  /**
   * The constraints parameter is a MediaStreamConstraints object specifying the types of media to request, along with any requirements for each type.
   */
  constraints?: MaybeRefOrGetter<MediaStreamConstraints>
  /**
   * Options to pass to the MediaRecorder constructor.
   */
  mediaRecorderOptions?: MaybeRefOrGetter<MediaRecorderOptions>
  /**
   * Callback when recording starts.
   */
  onStart?: (ev: Event) => any
  /**
   * Callback when recording pauses.
   */
  onPause?: (ev: Event) => any
  /**
   * Callback when recording resumes.
   */
  onResume?: (ev: Event) => any
  /**
   * Callback when recording stops.
   */
  onStop?: (ev: Event) => any
  /**
   * Callback when an error occurs.
   */
  onError?: (ev: Event) => any
}

const defaultOptions: UseMediaRecorderOptions = {
  constraints: { audio: false, video: false },
  mediaRecorderOptions: {},
  onStart: () => {
  },
  onPause: () => {
  },
  onResume: () => {
  },
  onStop: () => {
  },
  onError: () => {
  },
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

  const state = computedWithControl<RecordingState | undefined, MediaRecorder | undefined>(() => mediaRecorder.value, () => {
    return mediaRecorder.value?.state
  })

  const mimeType = computedWithControl<string | undefined, MediaRecorder | undefined>(() => mediaRecorder.value, () => {
    return mediaRecorder.value?.mimeType
  })

  const {
    mediaRecorderOptions,
    constraints,
  } = defu(options, defaultOptions)

  const setupMediaRecorder = (newMediaRecorder: MediaRecorder) => {
    newMediaRecorder.ondataavailable = (e) => {
      mimeType.trigger()
      data.value.push(e.data)
    }
    newMediaRecorder.onstop = (...args) => {
      stream.value?.getTracks().forEach(t => t.stop())
      // result.value = data.value
      state.trigger()
      mimeType.trigger()
      options.onStop?.(...args)
    }
    newMediaRecorder.onpause = (...args) => {
      state.trigger()
      mimeType.trigger()
      options.onPause?.(...args)
    }
    newMediaRecorder.onresume = (...args) => {
      state.trigger()
      mimeType.trigger()
      options.onResume?.(...args)
    }
    newMediaRecorder.onstart = (...args) => {
      state.trigger()
      mimeType.trigger()
      options.onStart?.(...args)
    }
    newMediaRecorder.onerror = (...args) => {
      state.trigger()
      mimeType.trigger()
      options.onError?.(...args)
    }
  }

  const start = async (timeslice: number | undefined = undefined) => {
    if (state.value === 'recording')
      return // todo warning?
    data.value = []
    stream.value = await navigator!.mediaDevices.getUserMedia(toValue(constraints))
    const mr = new MediaRecorder(stream.value, toValue(mediaRecorderOptions))
    setupMediaRecorder(mr)
    mediaRecorder.value = mr
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

  tryOnScopeDispose(() => {
    mediaRecorder.value?.stop()
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
    mimeType: computed(() => mimeType.value),
    mediaRecorder: computed(() => mediaRecorder.value),
  }
}

export type UseMediaRecorderReturn = ReturnType<typeof useMediaRecorder>
