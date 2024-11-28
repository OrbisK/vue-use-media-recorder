---
outline: deep
---

# Usage

## `useMediaRecorder`

```vue
<script setup>
import { useMediaRecorder } from '@orbisk/vue-use-media-recorder'

const {
  data,
  stream,
  start,
  pause,
  resume,
  stop,
  state,
  isSupported,
  isMimeTypeSupported,
  mimeType,
  mediaRecorder,
} = useMediaRecorder({ constraints: { audio: true, video: true } })

start()
</script>
```

## `useMediaRecorder` options

```ts
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
```

```ts
const defaultOptions: UseMediaRecorderOptions = {
  constraints: { audio: false, video: false },
  mediaRecorderOptions: {},
}
```

### `constraints`

Type: `constraints?: MaybeRef<MediaStreamConstraints>`

The `constraints` object is passed to the `navigator.mediaDevices.getUserMedia` method. It is used to specify the media
types and settings for the stream.

::: warning
By default, the constraints object is `{audio: false, video: false}`. You should set at least one of the properties to
`true` to get a stream/data.
:::

### `mediaRecorderOptions`

Type: `mediaRecorderOptions?: MaybeRef<MediaRecorderOptions>`

[See MDN](https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder/MediaRecorder#options)

```ts
interface MediaRecorderOptions {
  audioBitsPerSecond?: number
  bitsPerSecond?: number
  mimeType?: string
  videoBitsPerSecond?: number
}
```

## `useMediaRecorder` values

### `data`

- Type: `Ref<Blob[]>`
- Initial value: `ref([])`

An array of Blobs that are created by the MediaRecorder. The Blobs are created when the MediaRecorder is stopped. Or
when the timeslice is set and the timeslice is reached.

### `stream`

- Type: `ShallowRef<MediaStream | undefined>`
- Initial value: `shallowRef()`

### `state`

- Type: `ShallowRef<MediaRecorderState | undefined>`
- Initial value: `shallowRef()`

The current state of the MediaRecorder. The state can be one of the following:

- `undefined` - The MediaRecorder is not initialized.
- `'inactive'` - The MediaRecorder is not recording.
- `'recording'` - The MediaRecorder is recording data.
- `'paused'` - The MediaRecorder is paused.

### `mimeType`

- Type: `ComputedRef<string | undefined>`
- Initial value: `computed(()=>{})`

The mimeType of the MediaRecorder. The mimeType is set when the MediaRecorder is initialized and the stream is
available. You can also set the mimeType manually via [`mediaRecorderOptions.mimeType`](#mediarecorderoptions).

::: warning
If you set the mimeType manually (not recommended), make sure that the mimeType is supported by the browser. You can
check if the mimeType
is supported via [`isMimeTypeSupported`](#ismimetypesupported).
:::

### `isMimeTypeSupported`

- Type: `ComputedRef<boolean>`

If you set the mimeType manually, you can check if the mimeType is supported by the browser via this computed ref.

### `isSupported`

- Type: `ComputedRef<boolean>`

If the MediaRecorder API (and the selected MIME type) is supported by the browser.

### `mediaRecorder`

- Type: `ComputedRef<MediaRecorder | undefined>`
- Initial value: `computed(()=>{})`

The MediaRecorder instance. The MediaRecorder is created when the stream is available.

## `useMediaRecorder` methods

### `start(timeslice: number | undefined): Promise<void>`

- MDN: [MediaRecorder.start()](https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder/start)

Creates the stream and the MediaRecorder instance. The stream is created with the constraints object. The MediaRecorder
is created with the stream and the mediaRecorderOptions object.

### `pause(): void`

- MDN: [MediaRecorder.pause()](https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder/pause)

### `resume(): void`

- MDN: [MediaRecorder.resume()](https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder/resume)

### `stop(): void`

- MDN: [MediaRecorder.stop()](https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder/stop)
