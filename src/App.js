import { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";
import {addItem} from './store/cart-slice'
let initial = true;
function App() {
  const cartShow = useSelector((state) => state.ui.isShown);
  const notification = useSelector((state) => state.ui.notification);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
   if(initial)
   {
    initial = false
    return
   }
   dispatch(addItem(cart))
  }, [cart, dispatch]);

  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {cartShow && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
