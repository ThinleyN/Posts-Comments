import { Input } from "antd";
import React, { useState } from "react";
import { createUseStyles } from "react-jss";

export interface Props {
    placeholder?: string;
    type?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => void;
    name?: string;
    className?: any;
    editValue?: string | number;
    disabled?: boolean;
    label?: string;
    suffix?: string;
    error?: string | number;
    positive?: boolean;
    wrapperClass?: string;
    id?: string;
    errorFlag?: boolean;
    textArea?: boolean;
}

let useStyles = createUseStyles((theme: any) => {
    return {
        text: {
            border: ({ errorFlag }: any) => {
                return !errorFlag
                    ? `1px solid ${theme.borderColor}`
                    : `1px solid ${theme.red6}`;
            },
            "&:focus": {
                border: ({ errorFlag }: any) => {
                    return !errorFlag
                        ? `1px solid ${theme.borderColor}`
                        : `1px solid ${theme.red6}`;
                }
            },
            borderRadius: 2,
            minHeight: 32,
            background: "white",
            "& .ant-input-suffix": {
                fontSize: 12,
                color: theme.textLightBlack
            }
        },
        label: {
            fontSize: 14,
            color: theme.formLabelColor,
            display: "flex",
            lineHeight: "20px",
            "& > :first-child": {
                padding: 0
            }
        },
        error: {
            marginTop: 0,
            marginBottom: 0,
            fontSize: 12,
            color: theme.error,
            fontWeight: 300,
            maxWidth: 220,
            position: 'absolute'
        },
        wrapper: {
            position: 'relative'
        }
    };
});
const TextField: React.FC<Props> = props => {
    let { disabled,textArea } = props;
    const errorFlag = props.errorFlag;
    const classes = useStyles({ errorFlag });

    const [textError, setTextError] = useState("" as string);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { value } = event.currentTarget;

        if (props.positive && parseInt(value) < 0) {
            setTextError("Enter zero or positive number");
            setTimeout(() => {
                setTextError("");
            }, 3000);
        }

        props.onChange && props.onChange(event);
    };

    if(textArea) {
        const { TextArea } = Input;
        return (
            <div className={`${props.wrapperClass} ${classes.wrapper}`}>
                <div
                    className={classes.label}
                >
                    {props.label}
                </div>
                <TextArea
                    rows={4}
                    className={`${classes.text} ${props.className}`}
                    placeholder={props.placeholder}
                    name={props.name}
                    value={props.editValue ? props.editValue : undefined}
                    size={"large"}
                    disabled={disabled}
                    onChange={handleChange}
                    id={props.id}
                />
                {textError && <p className={classes.error}>{textError}</p>}
    
                {props.error && <p className={classes.error}>{props.error}</p>}
    
            </div>
        )

    }else{
        return (
            <div className={`${props.wrapperClass} ${classes.wrapper}`}>
                <div
                    className={classes.label}
                >
                    {props.label}
                </div>
                <Input
                    type={props.type}
                    className={`${classes.text} ${props.className}`}
                    placeholder={props.placeholder}
                    name={props.name}
                    value={props.editValue ? props.editValue : undefined}
                    size={"large"}
                    disabled={disabled}
                    onChange={handleChange}
                    id={props.id}
                />
                {textError && <p className={classes.error}>{textError}</p>}
    
                {props.error && <p className={classes.error}>{props.error}</p>}
    
            </div>
        );
    }

};
export { TextField };
