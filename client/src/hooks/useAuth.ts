import { useQuery } from "@tanstack/react-query";
import { getAuthUser } from "../lib/api";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { clearUser, setUser } from "../store/auth.slice";

const useAuth = () => {
  const dispatch = useDispatch();

  const { isLoading, data, error } = useQuery({
    queryKey: ["me"],
    queryFn: getAuthUser,
    retry: false,
  });

  useEffect(() => {
    if (data) {
      dispatch(setUser(data));
    } else if (error) {
      dispatch(clearUser());
    }
  }, [isLoading, data, error]);

  return { isLoading, data, error };
};

export default useAuth;
