import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../lib/api";
import toast from "react-hot-toast";

const useLogin = () => {
  const queryClient = useQueryClient();
  const { isPending, error, mutate } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      toast.success("Login Successfully.");
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
  return { isPending, error, mutate };
};

export default useLogin;
