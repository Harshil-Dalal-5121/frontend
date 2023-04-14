const { useEffect, useRef, useState } = require("react");

const timeout = 500;
function useHandleSubmit(getter, handler, search) {
  const [loading, setLoading] = useState(false);

  const initialized = useRef();

  useEffect(() => {
    if (initialized.current) {
      initialized.current = true;
    }
    (async () => {
      if (!search || search === "") {
        setLoading(true);
        await getter();
        setLoading(false);
      } else {
        const timer = setTimeout(() => {
          handler();
        }, timeout);
        return () => {
          clearTimeout(timer);
        };
      }
    })();
  }, [getter, handler, search]);
  return { loading };
}

export default useHandleSubmit;
