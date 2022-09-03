import vosk from "vosk";
import fs from "fs";
import mic from "mic";
import { MODEL_VOICE_RECOGNITION_PATH } from "../../config";
import { ListenEmitter } from "./customEmitter";

const fullRecognition = new ListenEmitter();
const partialRecognition = new ListenEmitter();

const MODEL_PATH = MODEL_VOICE_RECOGNITION_PATH;
const SAMPLE_RATE = 16000;

if (!fs.existsSync(MODEL_PATH)) {
  console.log(
    "Please download the model from https://alphacephei.com/vosk/models and unpack as " +
      MODEL_PATH +
      " in the current folder."
  );
  process.exit();
}

vosk.setLogLevel(0);
const model = new vosk.Model(MODEL_PATH);
const rec = new vosk.Recognizer({ model: model, sampleRate: SAMPLE_RATE });

const micInstance = mic({
  rate: String(SAMPLE_RATE),
  channels: "1",
  debug: false,
  device: "default",
});

const micInputStream = micInstance.getAudioStream();
micInstance.start();

export const getListener = (COMMAND = "comando") => {
  micInputStream.on("data", (data) => {
    let text = "";
    let emitter;

    if (rec.acceptWaveform(data)) {
      text = rec.result().text;
      emitter = fullRecognition;
      console.log("FUll");
    } else {
      text = rec.partialResult().partial;
      emitter = partialRecognition;
      console.log("Partial");
    }

    const words = text.split(" ");
    const isCommand = words.shift() === COMMAND;

    console.log(text, isCommand);

    if (isCommand) {
      let command = "";
      console.log(words.length);

      while (words.length) {
        const whichCommand = command.length
          ? command + "-" + String(words.shift())
          : String(words.shift());
        const phrase = words.length ? words.join(" ") : "";
        console.log("whichCommand->", whichCommand);
        console.log("phrase->", phrase);

        emitter.emit(whichCommand, phrase);
      }
    }
  });

  micInputStream.on("audioProcessExitComplete", function () {
    console.log("Cleaning up");
    console.log(rec.finalResult());
    rec.free();
    model.free();
  });

  process.on("SIGINT", function () {
    console.log("\nStopping");
    micInstance.stop();
  });

  const result = {
    listenFull: fullRecognition,
    listenPartial: partialRecognition,
  };

  return result;
};
