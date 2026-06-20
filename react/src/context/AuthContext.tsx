import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import { ENDPOINT } from "../shared/services/APIURL";
import { apiService, type APIResponse } from "../shared/services/genericService";
import { notify } from "../shared/utils/toast";
import { errorMessages, successMessages } from "../shared/utils/toastMessage";

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
      const response = await apiService.get<APIResponse>(ENDPOINT.ME);
      if (response && response?.data) {
        setUser(response.data);
      }
    } catch {
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
      await apiService.post(ENDPOINT.LOGOUT, '');
      setUser(null);
      notify.success(successMessages.LOGOUT)
    } catch (error) {
      notify.error(errorMessages.loginFailed)
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
