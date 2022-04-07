import React, { useContext, useEffect, useState } from "react";
import { createUseStyles } from "react-jss";
import { DataContext } from "../../../dataContext";

export interface CommentProps {
  id: Number,
  body: String,
  postId: Number
}

let useStyles:any = createUseStyles((theme: any) => {
    return {
      container: {
        padding: 10,
        borderRadius: 9,
        background: theme.lightBg,
        marginBottom: 20,
        "&:last-child": {
          marginBottom: 0
        },
      },        
    };
});

const Comment: React.FC<CommentProps> = ({id, postId, body}) => {
    const classes = useStyles();
    const [comments, setComments] = useState([] as Array<{}>);
    const value = useContext(DataContext);

    return (
        <div className={classes.container}>
            {body}
        </div>
    );
};

export { Comment };
