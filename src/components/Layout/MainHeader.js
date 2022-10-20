import { useDispatch } from "react-redux";
import { uiAction } from "../../store/ui-slice";
import CartButton from "../Cart/CartButton";
import classes from "./MainHeader.module.css";

const MainHeader = (props) => {
  const dispatch = useDispatch();

  const cartHandler = () => {
    dispatch(uiAction.onCartShown());
  };
  return (
    <header className={classes.header}>
      <h1>ReduxCart</h1>
      <nav>
        <ul>
          <li>
            <CartButton onClick={cartHandler} />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;
