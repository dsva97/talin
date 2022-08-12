import say from "say";

type Callback = (error: Error, voices: string[]) => void;
type CustomSay = typeof say & {
  getInstalledVoices: (callback: Callback) => void;
};

export const speak = (text: string) => {
  const customSay = say as unknown as CustomSay;
  customSay.getInstalledVoices((error: any, voices: string[]) => {
    if (error) {
      console.error(error);
    } else {
      say.speak(text, voices[0], 1, (_error: any) => {
        if (_error) {
          console.error(_error);
        } else {
          console.log("success");
        }
      });
    }
  });
};
