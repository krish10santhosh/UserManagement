import { toast } from "react-toastify";

export const ErrorLogger = (api) => (next) => (action) => {
    if (action.payload?.toastMessage) {
        toast.success(action.payload?.message, {
            toastId: 'Success',
        })
    }
    if (action.error?.message === "Rejected") {
        toast.error("Rejected");
    }
    return next(action);
}