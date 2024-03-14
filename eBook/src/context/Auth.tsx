import React, {
  useContext,
  createContext,
  type ReactNode,
  useEffect,
  useState,
} from "react";
import api from "../../utils/api";
import { toast } from "react-toastify";

export interface User {
  email: string;
  userName: string;
  _id: number;
  role: string;
  phone: string;
}
export interface Book {
  _id: string;
  name: string;
  category: string;
  author: string;
  image: { url: string; fileType: string };
  file: { url: string; fileType: string };
  bookId?: string;
}
export interface Cart {
  userId?: number;
  total: number;
  books?: Book[];
  coupon: boolean;
}

export const AuthContext = createContext<{
  user: User | undefined;
  AllBooks: Book[];
  logout: () => void;
  login: (email: string, password: string) => void;
  notifyLogin: (msg: string) => void;
  notifyError: (msg: string) => void;
  notifyAdd: (msg: string) => void;
  signUp: (
    userName: string,
    password: string,
    phone: string,
    email: string
  ) => Promise<any>;

  setAllBooks: React.Dispatch<React.SetStateAction<Book[]>>;
}>(null as any);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>();
  const [fetched, setFetched] = useState<boolean>(false);
  const [AllBooks, setAllBooks] = useState<Book[]>([]);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data } = await api.get("/api/auth", { withCredentials: true });
        if (typeof data === "object") {
          setUser(data);
        }
      } catch {
        console.log("error");
      } finally {
        setFetched(true);
      }
    };
    const getAllBooks = async () => {
      try {
        const { data } = await api.get("/api/books");
        setAllBooks(data);
      } catch (error: any) {
        if (error.response.status == "429") {
          notifyError("Time out Stop spamming !");
        } else {
          notifyError("Error Getting  Books");
        }
      }
    };
    getAllBooks();
    checkUser();
    console.log("meow");
  }, []);

  const notifyError = (msg: string) =>
    toast.error(msg, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "dark",
    });
  const notifyLogin = (msg: string) =>
    toast.success(msg, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "dark",
    });
  const notifyAdd = (msg: string) =>
    toast.success(msg, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "dark",
    });
  const logout = async () => {
    try {
      await api.get("/api/auth/logout", {
        withCredentials: true,
      });
    } finally {
      setUser(undefined);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const { data } = await api.post(
        "/api/auth/login",
        { email, password },
        {
          withCredentials: true,
        }
      );
      setUser(data);
      notifyLogin("Welcome " + data.userName);
    } catch (error: any) {
      notifyError(error.response.data.message);
    }
  };

  const signUp = async (
    userName: string,
    email: string,
    password: string,
    phone: string
  ) => {
    try {
      console.log(userName, email, password, phone);
      const { data } = await api.post(
        "/api/auth/register",
        {
          userName,
          phone,
          password,
          email,
        },
        {
          withCredentials: true,
        }
      );
      notifyLogin("Registered Successfully");
      console.log(data);
      setUser(data);
    } catch (error: any) {
      if (error.response.status == "500") {
        notifyError("Please enter a valid phone number");
      } else {
        notifyError(error.response.data.message);
      }
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        AllBooks,
        logout,
        login,
        signUp,
        notifyError,
        notifyAdd,

        notifyLogin,
        setAllBooks,
      }}
    >
      {fetched ? children : null}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export const authenticated = () => useAuth().user != null;
