import { useDispatch, useSelector } from "react-redux";
import { homeActions } from "../store/home/homeState";
import selectCount from "../store/home/homeSelectors";
import reactLogo from "../assets/img/react.svg";
import kovLogo from "../assets/img/kov.svg";
import { ReactComponent as HeartIcon } from "../assets/img/heart.svg";

import "./Home.scss";

function Home() {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();

  return (
    <div className="App">
      <div>
        <img src={kovLogo} className="logo" alt="KOV logo" />
        <img src={reactLogo} className="logo react" alt="React logo" />
      </div>
      <h1>Vite + React + Redux</h1>
      <div className="card">
        <div>
          <HeartIcon
            className={`heart ${count > 0 ? "filled" : "empty"}`}
            alt="Heart icon"
            onClick={() => dispatch(homeActions.increaseCount(count + 1))}
          />
          <span className="count">{count}</span>
        </div>
      </div>
    </div>
  );
}

export default Home;
