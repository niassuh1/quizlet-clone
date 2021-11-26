import { User } from "@supabase/supabase-js";
import { createContext, FC, useContext, useState, useEffect } from "react";
import { UserType } from "../types";
import getCurrentuser from "../util/getCurrentUser";
import supabase from "../util/supabase";

interface AuthContextProps {
  user?: User | null;
  userData?: UserType;
}

const AuthContext = createContext<AuthContextProps>({});

export const useAuthContext = () => {
  return useContext(AuthContext);
};

/**
 * Auth context is used to keep track of auth state changes,
 * and the authenticated user throughout the app.
 */
export const AuthProvider: FC = ({ children }) => {
  const [user, setUser] = useState<User | null>();
  const [userData, setUserData] = useState<UserType>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session = supabase.auth.session();
    setUser(session?.user);
    setLoading(false);

    const client = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user);
      setLoading(false);
    });

    if (user) {
      getCurrentuser(user)
        .then((data) => {
          setUserData(data);
        })
        .catch();
    }
    return () => {
      client.data?.unsubscribe();
    };
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, userData }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
