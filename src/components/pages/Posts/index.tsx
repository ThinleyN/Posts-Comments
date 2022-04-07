import React from "react";
import { createUseStyles } from "react-jss";
import { useLocation } from "react-router";
import { Button } from "../../atoms/Button";

const useStyles = createUseStyles((theme: any) => {
    return {
        sidebar: {
            background: theme.lightBg,
            height: "100vh"
        },
        menuBlock: {
            height: "100%"
        },
        logo: {
            margin: 24,
            marginBottom: 28
        },
        sidebarIcon: {
            minWidth: 14,
            marginRight: 10
        }
    };
});

const Posts = () => {
    const classes = useStyles();
    const location = useLocation();
    const keys = ["posts"];
    return (
        <div>
          Posts
        </div>
    );
};
export { Posts };
