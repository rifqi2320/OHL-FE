import OHLBEAPI, { OHLBEAPIType } from "@/api/ohl-be";
import { createContext, useContext } from "react";

type APIContext = {
  api: OHLBEAPIType;
  APIUrl: string | null;
  setAPIUrl: (url: string) => void;
};

const context = createContext<APIContext>({
  api: OHLBEAPI,
  APIUrl: null,
  setAPIUrl: () => {
    return undefined;
  },
});

export default context;

export const useAPI = () => {
  return useContext(context);
};
