import { ipcRenderer } from "electron/renderer";
import { useState } from "react";

export const Writer = ({ defaultValue = "" }: { defaultValue?: string }) => {
  const [text, setText] = useState(defaultValue);
  const send = async () => {
    await ipcRenderer.invoke("my-invokable-ipc", text);
  };
  return (
    <div>
      <h1>Writer</h1>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <textarea value={text} readOnly></textarea>
      <button onClick={send}>Send</button>
    </div>
  );
};
