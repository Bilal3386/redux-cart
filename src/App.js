import { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { uiAction } from "./store/ui-slice";
import Notification from "./components/UI/Notification";

let initial = true;
function App() {
  const cartShow = useSelector((state) => state.ui.isShown);
  const notification = useSelector((state) => state.ui.notification);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    const sendData = async () => {
      dispatch(
        uiAction.setNotification({
          status: "pending",
          title: "Sending...",
          message: "sending cart data!",
        })
      );
      const response = await fetch(
        "https://redux-cart-7f464-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );
      if (!response.ok) {
        throw new Error("Something went wrong...");
      }

      dispatch(
        uiAction.setNotification({
          status: "success",
          title: "Success...",
          message: "sending cart data successfully!",
        })
      );
    };
    if (initial) {
      initial = false;
      return;
    }
    sendData().catch((error) =>
      dispatch(
        uiAction.setNotification({
          status: "error",
          title: "Error...",
          message: "sending cart data failed!",
        })
      )
    );
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
