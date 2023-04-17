const { useEffect, useRef } = require("react");

const timeout = 500;
function useHandleSubmit(getter, handler, search) {
  const initialized = useRef();

  useEffect(() => {
    if (initialized.current) {
      initialized.current = true;
    }
    if (!search) {
      getter();
    } else if (search) {
      const timer = setTimeout(() => {
        handler();
      }, timeout);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [getter, handler, search]);
}

export default useHandleSubmit;
