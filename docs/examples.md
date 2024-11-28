---
outline: deep
---

# Examples

::: warning
Due to a [bug in WebKit (Safari)](https://bugs.webkit.org/show_bug.cgi?id=198015), the `<audio>` source blob does only
work if you set an explicit `type` attribute. This is not a problem with the composable, but with the browser itself.
:::

## Basic Example

This is a basic example of how to use the `<script setup>` syntax in a Vue component.

<script setup>
import BasicExample from './basic-example.vue'
import TimesliceExample from './timeslice-example.vue'
</script>

<BasicExample />

### Code

<<< @/basic-example.vue

## Set timeslice

You can control the timeslice of the data Blob creation. See [
`MediaRecorder.start(timeslice)`](https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder/start#syntax) for more
information. The default value is `undefined` (this means that the timeslice is not set -> `data.value` will be set when
stopping).

<TimesliceExample />

<<< @/timeslice-example.vue {40}
