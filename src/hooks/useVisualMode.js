import {useState} from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial])

  const transition = (mode, replace = false) => {

    if (replace) {
      history.pop();
    }

    setMode(mode)
    setHistory([...history, mode])

  }

  const back = () => {

    if (history.length < 2) {
      return;
    }

    history.pop()
    setMode(history[history.length - 1])
    setHistory([...history])

  }

  return { mode, transition, back };
}