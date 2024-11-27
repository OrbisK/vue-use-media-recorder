import { describe, expect, it, vi } from 'vitest'
import { useMediaRecorder } from '../src'

describe('useMediaRecorder', () => {
  it('state should be initially undefined', () => {
    const {
      state,
    } = useMediaRecorder({ constraints: { audio: true } })
    expect(state.value).toMatchInlineSnapshot(`undefined`)
  })

  it('state should be correct after complete workflow', async () => {
    const {
      state,
      start,
      pause,
      stop,
      resume,
    } = useMediaRecorder({ constraints: { audio: true } })
    await start()
    await vi.waitFor(() => {
      expect(state.value).toBe("recording")
    })
    pause()
    await vi.waitFor(() => {
      expect(state.value).toBe("paused")
    })
    resume()
    await vi.waitFor(() => {
      expect(state.value).toBe("recording")
    })
    stop()
    await vi.waitFor(() => {
      expect(state.value).toBe("inactive")
    })
  })

  it('data should update when recording', async () => {
    const {
      start,
      data,
    } = useMediaRecorder({ constraints: { audio: true } })
    data.value = []
    expect(data.value?.length).toBe(0)
    await start(10)
    await new Promise(resolve => setTimeout(resolve, 100))
    expect(data.value?.length).toBeGreaterThan(0)
  })

  it('stream should be defined and active after start', async () => {
    const {
      stream,
      start,
    } = useMediaRecorder({ constraints: { audio: true } })
    expect(stream.value).toBeUndefined()
    expect(stream.value?.active).toBeUndefined()
    await start()
    expect(stream.value).toBeDefined()
    expect(stream.value?.active).toBe(true)
  })

  it('stream should not be active after stop', async () => {
    const {
      stream,
      start,
      stop,
    } = useMediaRecorder({ constraints: { audio: true } })
    await start()
    expect(stream.value?.active).toMatchInlineSnapshot(`true`)
    stop()
    await vi.waitFor(() => {
      expect(stream.value?.active).toBe(false)
    })
  })

  it.skip('stream should be undefined after pause', async () => {
    const {
      stream,
      start,
      pause,
    } = useMediaRecorder({ constraints: { audio: true } })
    await start()
    await pause()
    expect(stream.value).toBeDefined()
  })

  it('stream should be defined after resume', async () => {
    const {
      stream,
      start,
      pause,
      resume,
    } = useMediaRecorder({ constraints: { audio: true } })
    await start()
    pause()
    resume()
    expect(stream.value).toBeDefined()
  })

  it('mime type should be defined after recording', async () => {
    const {
      start,
      mimeType,
    } = useMediaRecorder({ constraints: { audio: true } })
    expect(mimeType.value).toBeUndefined()
    await start()
    await vi.waitFor(() => {
      expect(mimeType.value).toBeDefined()
    })
  })

  it('should be supported', () => {
    const {
      isSupported,
    } = useMediaRecorder({ constraints: { audio: true } })
    expect(isSupported.value).toBe(true)
  })

  it('should not support unsupported mime type', () => {
    const {
      isSupported,
      isMimeTypeSupported,
    } = useMediaRecorder({ constraints: { audio: true, video: true }, mediaRecorderOptions: { mimeType: 'video/does-not-exist' } })
    expect(isSupported.value).toBe(false)
    expect(isMimeTypeSupported.value).toBe(false)
  })

  it('should be possible to stop recording when paused', async () => {
    const {
      start,
      pause,
      stop,
      state,
      stream
    } = useMediaRecorder({ constraints: { audio: true } })

    await start()
    await vi.waitFor(() => {
      expect(state.value).toBe('recording')
    })
    pause()
    await vi.waitFor(() => {
      expect(state.value).toBe('paused')
    })
    await stop()
    await vi.waitFor(() => {
      expect(state.value).toBe('inactive')
      expect(stream.value?.active).toBe(false)
    })
  })

  it('data should exist when stopping from pause', async () => {
    const {
      start,
      pause,
      stop,
      data,
    } = useMediaRecorder({ constraints: { audio: true } })

    expect(data.value).toHaveLength(0)
    await start()
    pause()
    stop()
    await vi.waitFor(() => {
      expect(data.value.length).toBeGreaterThan(0)
    })
  })

  it('should call all lifecycle hooks', async () => {
    const onStop = vi.fn()
    const onStart = vi.fn()
    const onPause = vi.fn()
    const onResume = vi.fn()

    const {
      start,
      pause,
      resume,
      stop,
    } = useMediaRecorder({ constraints: { audio: true }, onStop, onStart, onPause, onResume })

    await start()
    await vi.waitFor(() => {
      expect(onStart).toHaveBeenCalledTimes(1)
    })
    pause()
    await vi.waitFor(() => {
      expect(onPause).toHaveBeenCalledTimes(1)
    })
    resume()
    await vi.waitFor(() => {
      expect(onResume).toHaveBeenCalledTimes(1)
    })
    stop()
    await vi.waitFor( () => {
      expect(onStop).toHaveBeenCalledTimes(1)
    })
  })
})
