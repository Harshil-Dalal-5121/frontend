const { useEffect, useState } = require("react");

function useFetchRecord(id, fetcher, setter, api, fields) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      (async () => {
        setLoading(true);
        const response = await fetcher(api, fields);

        if (response) {
          const data = response.data.data[0];
          setter(data);
        }
        setLoading(false);
      })();
    }
  }, [id, fetcher, setter, api, fields]);

  return { loading };
}

export default useFetchRecord;
