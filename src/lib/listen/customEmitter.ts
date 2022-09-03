import { EventEmitter } from "stream";

export class ListenEmitter extends EventEmitter {
  ons(eventNames: string[], eventHandler: (...args: any[]) => void) {
    for (const eventName of eventNames) {
      this.on(eventName, eventHandler);
    }
  }
  offs(eventNames: string[], eventHandler: (...args: any[]) => void) {
    for (const eventName of eventNames) {
      this.off(eventName, eventHandler);
    }
  }
}
