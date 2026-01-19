// @/types/global.d.ts
import { Message } from '@/utils/message'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $message: typeof Message
  }
}
