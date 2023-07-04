import { LoadingSpinner } from "@/components";
import { AuthContext } from "@/contexts";
import { useAPI } from "@/contexts";
import { User } from "@/types/models";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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
    navigate("/");
  };

  useEffect(() => {
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
        navigate("/");
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
  }, [token, location.pathname, navigate, api]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <AuthContext.Provider
      value={{
        user: user,
        token: null,
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
