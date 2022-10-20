import { useSelector } from 'react-redux';
import classes from './CartButton.module.css';

const CartButton = (props) => {
  const quantity =  useSelector(state => state.cart.totalQuantity)
  return (
    <button onClick={props.onClick} className={classes.button}>
      <span>My Cart</span>
      <span className={classes.badge}>{quantity}</span>
    </button>
  );
};

export default CartButton;
