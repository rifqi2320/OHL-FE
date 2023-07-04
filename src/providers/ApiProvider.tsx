import OHLBEAPI, { api as OHLBEAxios } from "@/api/ohl-be";
import { LoadingSpinner } from "@/components";
import { APIContext } from "@/contexts/";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

interface APIProviderProps {
  children: React.ReactNode;
}

export default function APIProvider({ children }: APIProviderProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [APIUrl, setAPIUrl] = useState<string | null>(searchParams.get("api"));

  useEffect(() => {
    if (APIUrl) {
      OHLBEAxios.defaults.baseURL = APIUrl;
      setSearchParams({ api: APIUrl });
    }
    if (location.pathname !== "/config" && !APIUrl) {
      navigate("/config");
    }
  }, [APIUrl, location.pathname, navigate, setSearchParams]);

  if (location.pathname !== "/config" && !APIUrl) {
    return <LoadingSpinner />;
  }

  return (
    <APIContext.Provider
      value={{
        api: OHLBEAPI,
        APIUrl,
        setAPIUrl,
      }}
    >
      {children}
    </APIContext.Provider>
  );
}
