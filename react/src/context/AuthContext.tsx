import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import { useNavigate } from "react-router-dom";
import { apiService, type APIResponse } from "../services/genericService";
import { ENDPOINT } from "../shared/constants/api_urls";
import { ROUTES } from "../shared/constants/routePaths";
import { notify } from "../shared/utils/toast";

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
  const navigate = useNavigate()

  const fetchUser = async () => {
    try {
      setIsLoading(true);
      const response = await apiService.get<APIResponse<IUser>>(ENDPOINT.ME);
      if (response && response?.data) {
        setUser(response.data);
        if (response.data.role === ROLES.ADMIN)
          navigate(ROUTES.ADMIN.DASHBOARD)
      }
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = (userData: IUser) => setUser(userData)

  const logout = async () => {
    try {
      const response = await apiService.post<APIResponse<null>, {}>(ENDPOINT.LOGOUT, {});
      setUser(null);
      notify.success(response.message)
    } catch (error) {
      const err = error as Error;
      notify.error(err.message)
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
