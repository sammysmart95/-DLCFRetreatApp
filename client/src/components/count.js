import React, { useState, useEffect } from 'react';

function Counter() {
  const [isOn, setIsOn] = useState(false);
  const [timer, setTimer] = useState(0)

  useEffect(() => {
    let interval
    if(isOn) {
      interval = setInterval(() => setTimer(timer + 1), 1000);
    }
    return () => { clearInterval(interval) }
  }, [isOn, timer]);

  return (
    <div>
      {timer}
      {!isOn && (
        <button type="button" onClick={() => setIsOn(true)}>
          Start
        </button>
      )}

      {isOn && (
        <button type="button" onClick={() => setIsOn(false)}>
          Stop
        </button>
      )}
    </div>
  );
}

export default Counter