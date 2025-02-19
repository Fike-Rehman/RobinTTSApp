import { useEffect, useState } from "react";
import { getTestMessage } from "./services/api";

function App() {
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const fetchMessage = async () => {
      const data = await getTestMessage();
      if (data) {
        setMessage(data);
      }
    };
    fetchMessage();
  }, []);

  return (
    <div>
      <h1>React + .NET API Communication Test</h1>
      <p>Backend says: {message || "Loading..."}</p>
    </div>
  );
}

export default App;
