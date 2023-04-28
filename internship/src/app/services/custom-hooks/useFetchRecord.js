const { useEffect, useState } = require("react");

function useFetchRecord(id, fetcher, setter) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      (async () => {
        setLoading(true);
        const response = await fetcher({ id });

        if (response) {
          const data = response.data.data[0];
          setter(data);
        }
        setLoading(false);
      })();
    }
  }, [id, fetcher, setter]);

  return { loading };
}

export default useFetchRecord;
