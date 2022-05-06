import { useState, useEffect } from "react";
import { getSession } from "../services/authService";

export const useSession = () => {
  const [session, setSession] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sessionGet = async () => {
      try {
        const response = await getSession();
        setSession(response);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    sessionGet();
  }, []);

  return {
    session,
    loading,
    error,
  };
};
