import { Button as ButtonComponent } from "antd";
import React from "react";
import { createUseStyles } from "react-jss";

type ButtonType = "link" | "primary" | "default";


export interface Props {
    type?: ButtonType;
    className?: any;
    disabled?: boolean;
    htmlType?: "submit" | "button" | "reset";
    loading?: boolean;
    margin?: any;
    icon?: any;
    prefix?: any;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    id?: string;
}

let useStyles:any = createUseStyles((theme: any) => {
    return {
        button: {
            position: "relative",
            borderRadius: 2,
            ...theme.button,
            margin: ({ margin }: Props) => {
                return margin;
            },
            background: ({ type }: Props) => {
                switch (type) {
                    case "link":
                        return theme.light;
                    case "primary":
                        return theme.blue6;
                    default:
                        return theme.textWhite;
                }
            },
            color: ({ type }: Props) => {
                switch (type) {
                    case "link":
                        return theme.textWhite;
                    case "primary":
                        return theme.textWhite;
                    default:
                        return "#595959";
                }
            },
            border: ({ type }: Props) => {
                switch (type) {
                    case "default":
                        return "1px solid #D9D9D9";
                    default:
                        return null;
                }
            },
            padding: "5px 16px",
            fontSize: 14,
        }
    };
});

const Button: React.FC<Props> = props => {
    let { type = "primary", onClick, margin, icon, id } = props;
    const classes = useStyles({type});

    return (
        <ButtonComponent
            id={id}
            className={`${classes.button} ${props.className}`}
            htmlType={props.htmlType || "button"}
            icon={icon}
            {...props}
            onClick={onClick}
        >
            {props.children}
        </ButtonComponent>
    );
};

export { Button };
