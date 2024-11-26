---
outline: deep
---

# Usage

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
  } = useMediaRecorder({constraints: {audio: true, video: true}})
  
  start()
</script>
```

