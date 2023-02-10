import { useState } from 'react';
import reactLogo from '../assets/img/react.svg';
import kovLogo from '../assets/img/kov.svg';
import { ReactComponent as HeartIcon } from '../assets/img/heart.svg';

import './Home.scss';

function Home() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <div>
        <img src={kovLogo} className="logo" alt="KOV logo" />
        <img src={reactLogo} className="logo react" alt="React logo" />
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <div>
          <HeartIcon
            className={`heart ${count > 0 ? 'filled' : 'empty'}`}
            alt="Heart icon"
            onClick={() => setCount((value) => value + 1)}
          />
          <span className="count">{count}</span>
        </div>
      </div>
    </div>
  );
}

export default Home;
