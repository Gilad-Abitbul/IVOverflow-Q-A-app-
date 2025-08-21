import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signup } from "../lib/api";
import toast from "react-hot-toast";

const useSignup = () => {
  const queryClient = useQueryClient();
  const { isPending, error, mutate } = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      toast.success("Signup Successfully.");
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
  return { isPending, error, mutate };
};

export default useSignup;
