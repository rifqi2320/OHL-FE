import { createContext, useContext } from "react";

type AuthContext = {
  user: {
    username: string;
  };
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
};

const context = createContext<AuthContext>({
  user: {
    username: "",
  },
  token: null,
  login: async () => {
    return undefined;
  },
});

export default context;

export const useAuth = () => {
  return useContext(context);
};
