import { useEffect, useState } from "react";

import { Switch } from "./components/ui/switch";

function App() {
  const [switchIsOn, setSwitchIsOn] = useState(false);

  useEffect(() => {
    // Adiciona ou remove a classe 'dark' no <html>
    const html = document.documentElement;
    if (switchIsOn) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, [switchIsOn]);
  return (
    <>
      <div className="m-6 flex justify-between">
        TASKED
        <div>
          <Switch
            id="dark-light"
            checked={switchIsOn}
            onCheckedChange={setSwitchIsOn}
          />
        </div>
      </div>
    </>
  );
}

export default App;
