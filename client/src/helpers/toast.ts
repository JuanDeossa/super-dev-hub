import { toast as toast_ } from "sonner";

export const toast = {
  error: (message: string) => {
    toast_.error(message, {
      toasterId: "global",
      style: {
        backgroundColor: "#d43838ff",
        color: "#fff",
      },
    });
  },
  success: (message: string) => {
    toast_.success(message, {
      toasterId: "global",
      style: {
        backgroundColor: "#03993dff",
        color: "#fff",
      },
    });
  },
};
