import { useDispatch } from 'react-redux';
import { cartAction } from '../../store/cart-slice';
import classes from './CartItem.module.css';

const CartItem = (props) => {
  const dispatch = useDispatch()
  const { id,  title, quantity, total, price } = props.item;
 const removeItemHandler =() => {
  console.log(id)
  dispatch(cartAction.removeItems(id))
 }

 const quantityItemHandler = () => 
 {
  dispatch(cartAction.increasingQuantity(id))
 }
  return (
    <li id={id}className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${total.toFixed(2)}{' '}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={removeItemHandler} >-</button>
          <button onClick={quantityItemHandler}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
