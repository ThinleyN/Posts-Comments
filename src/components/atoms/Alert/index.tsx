import { notification } from "antd";

type AlertType = "success" | "error";

const Alert = (title: string, type: AlertType, error?: any) => {
    const alertClass = {
        background: type === "error" ? "#FFF1F0" : "#F6FFED",
        border: type === "error" ? "1px solid #FFA39E" : "1px solid #B7EB8F",
        borderRadius: "2px"
    };

    const duration = type === "success" ? 5 : 10;

    notification.open({
        key: "key",
        style: alertClass,
        message: title,
        duration: duration,
        top: 10
    });
};
export { Alert };
