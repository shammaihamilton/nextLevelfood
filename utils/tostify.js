import { toast } from "react-toastify";

export const notifySuccess = (message) => {
  toast.success(`${message}`, {
    position: "top-center",
    autoClose: 1000,
  });
};


export const notifyError = (message) => {
    toast.error(`${message}`, {
      position: "top-center",
      autoClose: 2000,
    });
  };
