import React, { useEffect, useState } from "react";

import { ToastContainer } from "react-bootstrap";

import Header from "./components/navbar/Header";
import CardList from "./components/card/CardList";
import Cart from "./components/cart/Cart";
import ToastMessage from "./components/navbar/ToastMessage";
import ItemData from "../ItemData";

const LOCAL_STORAGE_CART_KEY = "cart";

function getKey(key) {
  return JSON.parse(localStorage.getItem(key) || "[]");
}

function setKey(key, value) {
  return localStorage.setItem(key, value);
}

function getStorageCart() {
  return getKey(LOCAL_STORAGE_CART_KEY);
}

function setStorageCart(cart) {
  return setKey(LOCAL_STORAGE_CART_KEY, cart);
}

let id = 0;
const getId = () => {
  return id++;
};

const getToast = (toastTitle) => {
  return {
    id: getId(),
    toastTitle,
  };
};

const initialState = [...ItemData];
function App() {
  const [cartItems, setCartItems] = useState(getStorageCart());
  const [toasts, setToasts] = useState([]);
  const [products, setProducts] = useState(ItemData);
  const [sort, setSort] = useState(false);

  const setTitleSort = () => {
    setSort(!sort);
    let $products;
    if (!sort) {
      $products = [...products].sort((a, b) => {
        if (a.cardTitle < b.cardTitle) {
          return -1;
        }
        if (a.cardTitle > b.cardTitle) {
          return 1;
        }
        return 0;
      });
      setProducts($products);
    } else {
      $products = [...products].sort((a, b) => {
        if (a.cardTitle < b.cardTitle) {
          return 1;
        }
        if (a.cardTitle > b.cardTitle) {
          return -1;
        }
        return 0;
      });

      setProducts($products);
    }
  };

  const setPriceSort = () => {
    setSort(!sort);
    let $products;
    if (!sort) {
      $products = [...products].sort((a, b) => {
        if (a.itemPrice < b.itemPrice) {
          return -1;
        }
        if (a.itemPrice > b.itemPrice) {
          return 1;
        }
        return 0;
      });
      setProducts($products);
    } else {
      $products = [...products].sort((a, b) => {
        if (a.itemPrice < b.itemPrice) {
          return 1;
        }
        if (a.itemPrice > b.itemPrice) {
          return -1;
        }
        return 0;
      });

      setProducts($products);
    }
  };

  const clearSort = () => {
    return setProducts(initialState);
  };

  const addToCart = (itemData) => {
    const toast = getToast(itemData.cardTitle);
    setCartItems((cartItems) => {
      const productInCart = cartItems.find((item) => item.id === itemData.id);

      if (productInCart) {
        return cartItems.map((item) =>
          item.id === itemData.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...cartItems, { ...itemData, quantity: 1 }];
      }
    });
    setToasts((t) => [...t, toast]);
  };

  useEffect(() => {
    setStorageCart(JSON.stringify(cartItems));
  }, [cartItems]);

  const clearCart = () => {
    return setCartItems([]);
  };

  const remove = (toasts) => {
    setToasts((toast) => {
      const _toasts = [...toast];
      const index = _toasts.findIndex((t) => t.id === toasts.id);
      if (index !== -1) {
        _toasts.splice(index, 1);
      }
      return _toasts;
    });
  };

  return (
    <>
      <Header
        clearSort={clearSort}
        sort={sort}
        setTitleSort={setTitleSort}
        setPriceSort={setPriceSort}
      />
      <div className="row">
        <div className="col-md-8 py-2">
          <CardList data={products} onAdd={addToCart} />
        </div>
        <div className="col-md-4 py-2">
          <Cart cart={cartItems} onClick={clearCart} />
        </div>
      </div>
      <div>
        <ToastContainer position="top-end" className="p-3">
          {toasts.map((toast) => {
            return (
              <ToastMessage onClose={remove} toast={toast} key={toast.id} />
            );
          })}
        </ToastContainer>
      </div>
    </>
  );
}

export default App;
