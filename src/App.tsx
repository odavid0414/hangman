import { useEffect } from "react";
import { smokeTestWords } from "./services/firebase/smokeTest";

function App() {

  useEffect(() => {
    smokeTestWords();
  }, []);
  return (
    <>
      Hello World
    </>
  )
}

export default App
