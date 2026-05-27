import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import { apiService } from "../shared/services/genericService";

export const ROLES = {
  ADMIN: "admin",
  USER: "user",
} as const;

export type UserRole = (typeof ROLES)[keyof typeof ROLES];

export type IUser = {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
};

type AuthContextType = {
  user: IUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  login: (user: IUser) => void;
  logout: () => Promise<void>;
  fetchUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchUser = async () => {
    try {
      setIsLoading(true);
      const response = await apiService.get<any>("/me");
      if (response && response?.user) {
        setUser(response.user);
      }
    } catch (error) {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = (userData: IUser) => {
    setUser(userData)
  }

  const logout = async () => {
    try {
      // await apiService.post('/logout', '');
      setUser(null);
    } catch (error) {
      console.error("Logout failed", error);
    }
  }

  useEffect(() => {
    fetchUser()
  }, []);

  const value = useMemo(() => ({ user, isAuthenticated: !!user, isLoading, login, logout, fetchUser }), [user, isLoading])

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
