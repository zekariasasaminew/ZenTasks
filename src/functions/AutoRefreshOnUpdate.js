import { useEffect } from "react";

const CURRENT_VERSION = "1.2.4";

const AutoRefreshOnUpdate = () => {
  useEffect(() => {
    const checkVersion = async () => {
      try {
        const res = await fetch("/version.json", { cache: "no-store" });
        const data = await res.json();

        if (data.version !== CURRENT_VERSION) {
          window.location.reload(true); // Force refresh
        }
      } catch (error) {
        console.error("Version check failed", error);
      }
    };

    const interval = setInterval(checkVersion, 10000); // every 10 seconds

    return () => clearInterval(interval);
  }, []);

  return null;
};

export default AutoRefreshOnUpdate;
