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
};
