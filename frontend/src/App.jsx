import { useState } from "react";
import "./App.css";

function App() {
  const [cart, setCart] = useState([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const products = [
    {
      id: 1,
      name: "Wireless Mouse",
      price: 599,
      image: "https://via.placeholder.com/200",
    },
    {
      id: 2,
      name: "Mechanical Keyboard",
      price: 2499,
      image: "https://via.placeholder.com/200",
    },
    {
      id: 3,
      name: "Laptop Stand",
      price: 899,
      image: "https://via.placeholder.com/200",
    },
    {
      id: 4,
      name: "USB-C Hub",
      price: 1299,
      image: "https://via.placeholder.com/200",
    },
  ];

  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);

      if (existing) {
        // increase quantity
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item,
        );
      }

      // add new item
      return [...prevCart, { ...product, qty: 1 }];
    });
  };

  const handleRemoveFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const increaseQty = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item,
      ),
    );
  };
  const decreaseQty = (id) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => (item.id === id ? { ...item, qty: item.qty - 1 } : item))
        .filter((item) => item.qty > 0),
    );
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="app">
      <h1 className="title">
        Mini Store ({cart.reduce((sum, item) => sum + item.qty, 0)})
      </h1>

      <div className="products">
        {products.map((product) => (
          <div key={product.id} className="card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>₹{product.price}</p>
            <button
              className="add-btn"
              onClick={() => handleAddToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* 🛒 CART SECTION */}
      <div className="cart-section">
        <h2>🛍️ Cart</h2>

        {cart.length === 0 ? (
          <p className="empty-text">Your cart is empty. Start adding products!</p>
        ) : (
          <>
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <div>
                  <strong>{item.name}</strong>
                  <div className="qty-controls">
                    <button onClick={() => decreaseQty(item.id)}>-</button>
                    <span>{item.qty}</span>
                    <button onClick={() => increaseQty(item.id)}>+</button>
                  </div>

                  <p>₹{item.price * item.qty}</p>
                </div>

                <button
                  className="remove-btn"
                  onClick={() => handleRemoveFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            ))}

            <h3 className="total">Total: ₹{totalPrice}</h3>
            <button
              className="checkout-btn"
              disabled={cart.length === 0}
              onClick={() => setShowCheckout(true)}
            >
              Proceed to Checkout
            </button>

            {/* 💳 CHECKOUT MODAL */}
            {showCheckout && !orderPlaced && (
              <div className="checkout-modal">
                <div className="checkout-box">
                  <h2>Checkout</h2>

                  <input placeholder="Full Name" />
                  <input placeholder="Address" />
                  <input placeholder="Phone Number" />

                  <button
                    className="place-order-btn"
                    onClick={() => {
                      setOrderPlaced(true);
                      setCart([]);
                    }}
                  >
                    Place Order
                  </button>

                  <button
                    className="close-btn"
                    onClick={() => setShowCheckout(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
            {orderPlaced && (
              <div className="checkout-modal">
                <div className="checkout-box">
                  <h2>🎉 Order Placed Successfully!</h2>
                  <button
                    className="place-order-btn"
                    onClick={() => {
                      setOrderPlaced(false);
                      setShowCheckout(false);
                    }}
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
