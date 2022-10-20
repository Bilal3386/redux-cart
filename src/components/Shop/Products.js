import ProductItem from "./ProductItem";
import classes from "./Products.module.css";
const DUMMY_DATA = [
  {
    id: "p1",
    price: 10,
    title: "My First Book",
    quantity: 1,
    description: "The First book i ever wrote",
  },
  {
    id: "p2",
    price: 5,
    title: "My Second Book",
    quantity: 1,
    description: "The second book i ever wrote",
  },
];
const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_DATA.map(item => (
          <ProductItem
          key={item.id}
          id = {item.id}
          title={item.title}
          price={item.price}
          description={item.description}
          quantity= {item.quantity}
        />
        ))}
      </ul>
    </section>
  );
};

export default Products;
