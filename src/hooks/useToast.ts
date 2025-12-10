import { useState } from "react";

export default function useToast() {
    const [toast, setToast] = useState({
        open: false,
        message: "",
        type: "error" as "error" | "success",
    });

    const showToast = (message: string, type: "error" | "success" = "error") => {
        setToast({ open: true, message, type });
    };

    const closeToast = () => {
        setToast({ ...toast, open: false });
    };

    return { toast, showToast, closeToast };
}
