import { useEffect, useState } from "react";

const LIMIT = 10;
const TOTAL = 100;

const api = {
  fetchItems: async ({ limit = LIMIT, offset = 0 } = {}) => ({
    data: Array.from({ length: limit }, (_, i) => ` Item-${offset + (i + 1)}`),
    total: TOTAL,
  }),
};
console.log(api);

function App() {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  const prev = () => {
    setPage((page) => (page - 1 <= 1 ? 1 : page - 1));
  };

  const next = () => {
    setPage((page) => page + 1);
  };

  useEffect(() => {
    api.fetchItems({ offset: (page - 1) * LIMIT }).then(({ data, total }) => {
      setItems(data);
      setTotal(total);
    });
  }, [page]);

  return (
    <>
      <p>Total Items : {total}</p>
      <p>Page : {page}</p>
      {items.map((i) => (
        <p key={i}>{i}</p>
      ))}
      <button onClick={prev} disabled={page === 1}>
        Previous
      </button>
      <button onClick={next} disabled={page * LIMIT >= total}>
        Next
      </button>
    </>
  );
}

export default App;
