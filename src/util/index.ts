import say from "say";

type Callback = (error: Error, voices: string[]) => void;
type CustomSay = typeof say & {
  getInstalledVoices: (callback: Callback) => void;
};

export const speak = (text: string) => {
  const customSay = say as unknown as CustomSay;

  try {
    customSay.getInstalledVoices((error: any, voices: string[]) => {
      console.log("voices", voices);
      if (error) {
        // console.error(error);
        say.speak(text, undefined, 1, (_error: any) => {
          if (_error) {
            console.error("_error 0", _error);
          } else {
            console.log("success");
          }
        });
      } else {
        say.speak(text, voices[0], 1, (_error: any) => {
          if (_error) {
            console.error("_error 1", _error);
          } else {
            console.log("success");
          }
        });
      }
    });
  } catch (error) {
    say.speak(text, undefined, 1, (_error: any) => {
      if (_error) {
        console.error("_error x", _error);
      } else {
        console.log("success");
      }
    });
  }
};
