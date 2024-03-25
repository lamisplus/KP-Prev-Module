import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { queryClient } from "../../webapp/jsx/utils/queryClient";
import { updateKpPrevRecord } from "../jsx/services/updateKpPrevRecord";

export const useUpdateKpPrev = (formik, props) => {
  const { mutate, isLoading, isError } = useMutation({
    mutationFn: updateKpPrevRecord,
    onSuccess: () => {
      toast.success("Record updated successful.");
      formik.resetForm();
      queryClient.invalidateQueries();
      queryClient.refetchQueries();
      props.setActiveContent({
        ...props.activeContent,
        route: "recent-history",
      });
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
