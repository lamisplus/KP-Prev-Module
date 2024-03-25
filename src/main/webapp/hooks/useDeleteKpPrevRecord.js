import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { queryClient } from "../../webapp/jsx/utils/queryClient";
import { deleteKpPrevRecord } from "../jsx/services/deleteKpPrevRecord";

export const useDeleteKpPrevRecord = () => {
  const { mutate, isLoading, isError } = useMutation({
    mutationFn: deleteKpPrevRecord,
    onSuccess: () => {
      toast.success("Record deleted successful.");
      queryClient.invalidateQueries();
      queryClient.refetchQueries();
    },
    onError: (error) => {
      if (error.response && error.response.data) {
        let errorMessage =
          error.response.data.apierror &&
          error.response.data.apierror.message !== ""
            ? error.response.data.apierror.message
            : "Something went wrong, please try again";
        toast.error(errorMessage);
      } else {
        toast.error("Something went wrong. Please try again...");
      }
    },
  });
  return {
    mutate,
    isLoading,
    isError,
  };
};
