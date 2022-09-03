declare module "mic" {
  import { EventEmitter } from "events";

  interface IReturn {
    start(): void;
    stop(): void;
    pause(): void;
    resume(): void;
    getAudioStream(): EventEmitter;
  }
  interface IParam {
    rate: string; // String(SAMPLE_RATE)
    channels: string; // "1"
    debug: boolean; // false
    device: string; // "default"
  }
  type mymodule = (_param: IParam) => IReturn;

  const MyModule: mymodule;

  export default MyModule;
}
