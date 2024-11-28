import { UseMediaRecorder } from '@orbisk/vue-use-media-recorder'
import { shallowMount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { h } from 'vue'

describe('useMediaRecorder component', () => {
  it('should render', async () => {
    const mediaRecorder = shallowMount(UseMediaRecorder)
    expect(mediaRecorder.exists()).toBe(true)
  })

  it('should warn if `constraints` is not provided properly', async () => {
    const warnMock = vi.fn()
    vi.stubGlobal('console', { warn: warnMock })
    const _mediaRecorder = shallowMount(UseMediaRecorder)

    expect(warnMock.mock.calls).toMatchInlineSnapshot(`
      [
        [
          "[Vue warn]: Missing required prop: "constraints"",
          "
      ",
          " at <UseMediaRecorder",
          "ref="VTU_COMPONENT"",
          ">",
          "
      ",
          " at <VTUROOT>",
        ],
      ]
    `)
  })

  it('should render default slot', async () => {
    const mediaRecorder = shallowMount(UseMediaRecorder, {
      slots: {
        default: 'Hello World',
      },
    })
    expect(mediaRecorder.text()).toMatchInlineSnapshot(`"Hello World"`)
  })

  it('slot props should be initially correct', async () => {
    const mediaRecorder = await shallowMount(UseMediaRecorder, {
      props: {
        constraints: { audio: true },
      },
      slots: {
        default: props => JSON.stringify(props),
      },
    })

    expect(mediaRecorder.text()).toMatchInlineSnapshot(`"{"data":[],"isSupported":true,"isMimeTypeSupported":true}"`)
  })

  it('should emit start and stop', async () => {
    const mediaRecorder = await shallowMount(UseMediaRecorder, {
      props: {
        constraints: { audio: true },
      },
    })
    await mediaRecorder.vm.start()
    await vi.waitFor(() => {
      // check if start emits an event from type Event with trusted true
      expect(mediaRecorder.emitted().start).toHaveLength(1)
      expect(mediaRecorder.emitted().start[0]).toMatchObject([{ isTrusted: true }])
    })
    await mediaRecorder.vm.stop()
    await vi.waitFor(() => {
      // check if stop emits an event from type Event with trusted true
      expect(mediaRecorder.emitted().stop).toHaveLength(1)
      expect(mediaRecorder.emitted().stop[0]).toMatchObject([{ isTrusted: true }])
    })
  })

  it('should emit pause and resume', async () => {
    const mediaRecorder = await shallowMount(UseMediaRecorder, {
      props: {
        constraints: { audio: true },
      },
    })
    await mediaRecorder.vm.start()
    mediaRecorder.vm.pause()
    await vi.waitFor(() => {
      // check if start emits an event from type Event with trusted true
      expect(mediaRecorder.emitted().pause).toHaveLength(1)
      expect(mediaRecorder.emitted().pause[0]).toMatchObject([{ isTrusted: true }])
    })
    mediaRecorder.vm.resume()
    await vi.waitFor(() => {
      // check if start emits an event from type Event with trusted true
      expect(mediaRecorder.emitted().resume).toHaveLength(1)
      expect(mediaRecorder.emitted().resume[0]).toMatchObject([{ isTrusted: true }])
    })
  })

  it.todo('should emit error', async () => {
    // const mediaRecorder = await shallowMount(UseMediaRecorder, {
    //   props: {
    //     constraints: { audio: true }
    //   }
    // })
    // await mediaRecorder.vm.start()
    // await vi.waitFor(() => {
    //   // check if start emits an event from type Event with trusted true
    //   expect(mediaRecorder.emitted().error).toHaveLength(1)
    //   expect(mediaRecorder.emitted().error[0]).toMatchObject([{ isTrusted: true }])
    // })
  })

  it('should have a mimeType after start', async () => {
    const mediaRecorder = await shallowMount(UseMediaRecorder, {
      props: {
        constraints: { audio: true },
      },
    })
    expect(mediaRecorder.vm.mimeType).toBeUndefined()
    await mediaRecorder.vm.start()
    await vi.waitFor(() => {
      expect(mediaRecorder.vm.mimeType).toBeDefined()
    })
  })

  it('should be initially supported', async () => {
    const mediaRecorder = await shallowMount(UseMediaRecorder, {
      props: {
        constraints: { audio: true },
      },
      slots: {
        default: props => JSON.stringify(props.isSupported),
      },
    })

    await vi.waitFor(() => {
      expect(mediaRecorder.text()).toMatchInlineSnapshot(`"true"`)
    })
  })

  it('should initially support mimetype', async () => {
    const mediaRecorder = await shallowMount(UseMediaRecorder, {
      props: {
        constraints: { audio: true },
      },
      slots: {
        default: props => JSON.stringify(props.isMimeTypeSupported) + JSON.stringify(props.isSupported),
      },
    })

    expect(mediaRecorder.text()).toMatchInlineSnapshot(`"truetrue"`)
  })

  it('should not support unsupported mime type', async () => {
    const mediaRecorder = await shallowMount(UseMediaRecorder, {
      props: { constraints: { audio: true, video: true }, mediaRecorderOptions: { mimeType: 'video/does-not-exist' } },
      slots: {
        default: props => JSON.stringify(props.isMimeTypeSupported) + JSON.stringify(props.isSupported),
      },
    })
    expect(mediaRecorder.text()).toMatchInlineSnapshot(`"falsefalse"`)
  })

  it('should be able to start, pause, resume and stop recording from slot props', async () => {
    const mediaRecorder = await shallowMount(UseMediaRecorder, {
      props: {
        constraints: { audio: true },
      },
      slots: {
        default: props => h('div', {}, [
          h('button', { onClick: () => props.start(), id: 'start' }),
          h('button', { onClick: () => props.pause(), id: 'pause' }),
          h('button', { onClick: () => props.resume(), id: 'resume' }),
          h('button', { onClick: () => props.stop(), id: 'stop' }),
        ]),
      },
    })

    const startButton = mediaRecorder.get('#start')
    const pauseButton = mediaRecorder.get('#pause')
    const resumeButton = mediaRecorder.get('#resume')
    const stopButton = mediaRecorder.get('#stop')

    await startButton.trigger('click')
    await vi.waitFor(() => {
      expect(mediaRecorder.emitted().start).toHaveLength(1)
    })
    await pauseButton.trigger('click')
    await vi.waitFor(() => {
      expect(mediaRecorder.emitted().pause).toHaveLength(1)
    })
    await resumeButton.trigger('click')
    await vi.waitFor(() => {
      expect(mediaRecorder.emitted().resume).toHaveLength(1)
    })
    await stopButton.trigger('click')
    await vi.waitFor(() => {
      expect(mediaRecorder.emitted().stop).toHaveLength(1)
    })
  })
})
