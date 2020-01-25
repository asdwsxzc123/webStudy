import React, { useState, useRef, useEffect, useCallback } from "react";
function useCounter(count) {
  const size = useSize();
  return (
    <h1>
      {count},{size.width}
    </h1>
  );
}

// 自定义hooks,需要使用use做前缀
function useCount(defaultCount) {
  const [count, setCount] = useState(defaultCount);
  // 2. 同步不同数据之间需要共享的数据
  let it = useRef();

  useEffect(() => {
    it.current = setInterval(() => {
      setCount(count => count + 1);
    }, 1000);
  }, []);
  useEffect(() => {
    if (count >= 10) {
      clearInterval(it.current);
    }
  });
  return [count, setCount];
}
function useSize() {
  const [size, setSize] = useState({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight
  });
  const onResize = useCallback(() => {
    setSize({
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    });
  });
  useEffect(() => {
    window.addEventListener("resize", onResize, false);
    return () => {
      window.removeEventListener("resize", onResize, false);
    };
  }, []);
  return size;
}
function App() {
  const [count, setCount] = useCount(0);
  const Counter = useCounter(count);
  const size = useSize();
  return (
    <div className="App">
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        点击({count}),{size.width}/{size.height}
      </button>
      {Counter}
    </div>
  );
}

export default App;
