const { useEffect, useState } = require("react");

function useFetchRecord(id, fetcher, setter, api, fields) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      (async () => {
        setLoading(true);
        const response = await fetcher(api, fields);

        if (response) {
          setter(response.data.data[0]);
        }
        setLoading(false);
      })();
    }
  }, [id, fetcher, setter, api, fields]);

  return { loading };
}

export default useFetchRecord;
