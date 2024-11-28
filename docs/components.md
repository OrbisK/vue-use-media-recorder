---
outline: deep
---

# API

## Props

### `constraints`

- Type: `MediaStreamConstraints`
- Required: `true`

The constraints parameter is a MediaStreamConstraints object specifying the types of media to request, along with any
requirements for each type.

### `mediaRecorderOptions`

- Type: `MediaRecorderOptions`
- Default: `{}`

Options to pass to the MediaRecorder constructor. [See MDN](https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder/MediaRecorder#options)

## Events

```ts
defineEmits<{
  start: [ev: Event]
  stop: [ev: Event]
  pause: [ev: Event]
  resume: [ev: Event]
  error: [ev: Event]
}>()
```

Analog to the MediaRecorder events (`onstart`, `onpause`,...).

### `@start`

Emitted when the MediaRecorder starts recording.

### `@pause`

Emitted when the MediaRecorder pauses recording.

### `@resume`

Emitted when the MediaRecorder resumes recording.

### `@stop`

Emitted when the MediaRecorder stops recording.

### `@error`

Emitted when an error occurs.

## Slots

### `default`

The default slot is used to render the component's content.

#### slopProps

##### `data`

- Type: `Ref<Blob[]>`
- Initial value: `ref([])`

An array of Blobs that are created by the MediaRecorder. The Blobs are created when the MediaRecorder is stopped. Or
when the timeslice is set and the timeslice is reached.

##### `stream`

- Type: `ShallowRef<MediaStream | undefined>`
- Initial value: `shallowRef()`

##### `state`

- Type: `ShallowRef<MediaRecorderState | undefined>`
- Initial value: `shallowRef()`

The current state of the MediaRecorder. The state can be one of the following:

- `undefined` - The MediaRecorder is not initialized.
- `'inactive'` - The MediaRecorder is not recording.
- `'recording'` - The MediaRecorder is recording data.
- `'paused'` - The MediaRecorder is paused.

##### `mimeType`

- Type: `ComputedRef<string | undefined>`
- Initial value: `computed(()=>{})`

The mimeType of the MediaRecorder. The mimeType is set when the MediaRecorder is initialized and the stream is
available. You can also set the mimeType manually via [`mediaRecorderOptions.mimeType`](#mediarecorderoptions).

::: warning
If you set the mimeType manually (not recommended), make sure that the mimeType is supported by the browser. You can
check if the mimeType
is supported via [`isMimeTypeSupported`](#ismimetypesupported).
:::

##### `isMimeTypeSupported`

- Type: `ComputedRef<boolean>`

If you set the mimeType manually, you can check if the mimeType is supported by the browser via this computed ref.

##### `isSupported`

- Type: `ComputedRef<boolean>`

If the MediaRecorder API (and the selected MIME type) is supported by the browser.

##### `mediaRecorder`

- Type: `ComputedRef<MediaRecorder | undefined>`
- Initial value: `computed(()=>{})`

The MediaRecorder instance. The MediaRecorder is created when the stream is available.

##### `start`

- Type: `(timeslice: number | undefined) => Promise<void>`
- MDN: [MediaRecorder.start()](https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder/start)

Creates the stream and the MediaRecorder instance. The stream is created with the constraints object. The MediaRecorder
is created with the stream and the mediaRecorderOptions object.

##### `pause`

- Type: `() => void`
- MDN: [MediaRecorder.pause()](https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder/pause)

##### `resume`

- Type: `() => void`
- MDN: [MediaRecorder.resume()](https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder/resume)

##### `stop`

- Type: `() => void`
- MDN: [MediaRecorder.stop()](https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder/stop)

## Methods

`UseMediaRecorder` does expose the following methods:

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

### Usage

```vue
<script setup>
import { ref } from 'vue'
const mr = ref() // or template ref

mr.value.start()
</script>

<template>
  <UseMediaRecorder ref="mr" />
</template>
```
