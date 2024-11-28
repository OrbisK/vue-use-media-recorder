import type { App } from 'vue'
import type { MediaRecorderPluginOptions } from '@orbisk/vue-use-media-recorder'
import { UseMediaRecorder } from '@orbisk/vue-use-media-recorder'

export const MediaRecorderPlugin = {
  install(app: App, _options?: MediaRecorderPluginOptions) {
    // app.provide(EXAMPLE, options?.example)

    // Add auto imports

    app.component('UseMediaRecorder', UseMediaRecorder)
  },
}

export default MediaRecorderPlugin
