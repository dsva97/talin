// declare module "vosk" {
//   export class Model {
//     constructor(MODEL_PATH: string);
//   }

//   interface WordResult {
//     conf: number;
//     start: number;
//     end: number;
//     word: string;
//   }
//   interface RecognitionResults {
//     result: WordResult[];
//     text: string;
//   }
//   interface PartialResults {
//     partial: string;
//   }
//   class SpeakerModel {

//   }
//   interface SpeakerRecognizerParam {
//     speakerModel: typeof SpeakerModel;
//   }
//   type FinalResult<T> = T extends SpeakerRecognizerParam ? SpeakerResults & RecognitionResults : RecognitionResults
//   export class Recognizer {
//     constructor(param: { model: Model; sampleRate: number });
//     acceptWaveform(buffer: Buffer): boolean;
//     result(): RecognitionResults;
//     partialResult(): PartialResults;
//     finalResult(): FinalResult;
//     free(): void;
//   }
//   const result: {
//     setLogLevel: (n: number) => void;
//     Model: typeof Model;
//     Recognizer: typeof Recognizer;
//   };
//   export default result;
// }
