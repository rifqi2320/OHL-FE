import { LoadingSpinner } from "@/components";
import { AuthContext } from "@/contexts";
import { useAPI } from "@/contexts";
import { User } from "@/types/models";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [token, setToken] = useState<string>();
  const [user, setUser] = useState<User>({
    username: "",
  });
  const location = useLocation();
  const navigate = useNavigate();
  const { api } = useAPI();

  const login = async (username: string, password: string) => {
    const token = await api.login(username, password);
    setToken(token);
    navigate("/barang");
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(undefined);
    setUser({
      username: "",
    });
    navigate("/login");
  };

  useEffect(() => {
    if (location.pathname === "/config") {
      setIsLoading(false);
      return;
    }
    // token check
    if (token) {
      localStorage.setItem("token", token);
    } else {
      setToken(localStorage.getItem("token") || undefined);
    }

    // don't check token on login page
    if (location.pathname === "/login") {
      // if token exists, redirect to home
      if (token) {
        navigate("/barang");
        setIsLoading(false);
        return;
      }
      setIsLoading(false);
    } else {
      // if token doesn't exist, redirect to login
      if (!token) {
        navigate("/login");
        return;
      }
      // send token to backend to get user data
      api
        .self(token)
        .then((user: User) => {
          // set user data
          setUser(user);
          setIsLoading(false);
        })
        .catch((err) => {
          if (err.response.status === 401) {
            localStorage.removeItem("token");
            navigate("/login");
          }
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, location.pathname]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <AuthContext.Provider
      value={{
        user: user,
        token: null,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
