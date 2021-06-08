import { useEffect, useState } from "react";

function useRewrite(phraseArray) {
  const [phrase, setPhrase] = useState(phraseArray[0]);
  const [hydrating, setHydrating] = useState(false);
  const [phraseList, setPhraseList] = useState(phraseArray);
  const [position, setPosition] = useState(0);
  const [pauseTime, setPauseTime] = useState(100);

  function reduceString(str) {
    if (str.length === 0) {
      setHydrating(true);
      setPosition((position + 1) % phraseList.length);
      return "";
    }
    return str.slice(0, str.length - 1);
  }

  function hydrateString(str) {
    if (str.length === phraseList[position].length) {
      setHydrating(false);
      setPauseTime(100);
      return str;
    } else if (str.length > phraseList[position].length - 2) {
      setPauseTime(2000);
    }
    return phraseList[position].slice(0, str.length + 1);
  }

  useEffect(() => {
    let timeout;
    console.log(hydrating, phrase, pauseTime);
    if (!hydrating) {
      timeout = setTimeout(() => setPhrase(reduceString(phrase)), pauseTime);
    } else if (hydrating) {
      timeout = setTimeout(() => setPhrase(hydrateString(phrase)), pauseTime);
    }
    return () => clearTimeout(timeout);
  });

  return phrase;
}

export default useRewrite;
