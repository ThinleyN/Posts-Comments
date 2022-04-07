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
        background: theme.bgGrey,
        marginBottom: 20,
        "&:last-child": {
          marginBottom: 0
        },
      }, 
      body: {
        fontSize: 16,
        marginBottom: 10
      },
      commentInfo: {
        fontSize: 12
      }
    };
});

const Comment: React.FC<CommentProps> = ({id, postId, body}) => {
    const classes = useStyles();
    const [comments, setComments] = useState([] as Array<{}>);
    const value = useContext(DataContext);

    return (
        <div className={classes.container}>
            <h3 className={classes.idHolder}>
              This post belongs to post id: {postId}
            </h3>
            <div className={classes.body}>
              {body}
            </div>
            <div className={classes.commentInfo}>
              <span>
                Comment ID: {id}
              </span>
              <span>
                Post ID: {postId}
              </span>
            </div>
        </div>
    );
};

export { Comment };
