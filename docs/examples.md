---
outline: deep
---

# Examples

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
