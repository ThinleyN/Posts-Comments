import { CommentProps } from "../../molecules/Comments";
import React, { useState } from "react";
import { createUseStyles } from "react-jss";
import { Button } from "../../atoms/Button";
import { Comment } from "../Comments";
import { AddComment } from "../AddComment";
import { useNavigate } from "react-router-dom";

export interface PostProp {
   id: number,
   title: string,
   comments: Array<CommentProps>
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
        paddingBottom: 20,
      },
      title:{
        color: theme.textLightBlack,
        cursor: 'pointer',
        textDecoration: 'underline',
        transition: 'all 0.3s ease',
        "&:hover": {
          color: theme.textPrimary
        }
      },
      idHolder: {
        color: theme.textLightBlack
      },
      showComments: {
      },
      commentHolder: {
        padding: 20,
        paddingBottom: 0
      }
        
    };
});

const Post: React.FC<PostProp> = ({title,id,comments}) => {
    const classes = useStyles();
    const navigate = useNavigate();
    const [showComments, setShowComments] = useState(false as boolean);

    const handleShowComment = () => {
      setShowComments(!showComments);    
    }

    const handleNavigate = (e:React.SyntheticEvent) => {
      e.preventDefault();
      navigate(`/post/${id}`);
    }
    

    return (
        <div className={classes.container} >
          <h1 className={classes.title} onClick={handleNavigate}>
            {title}
          </h1>
          <h3 className={classes.idHolder}>
            The post id is {id}
          </h3>
          <Button className={classes.showComments} onClick={handleShowComment}>
          {showComments ? 'Hide Comments' : `Show comments (${comments.length})`}   
          </Button>

          {showComments && (
           comments.length ?  comments.map((comment,key) => {
              return(
                <div key={key} className={classes.commentHolder}>
                  <Comment id={comment.id} postId={comment.postId} body={comment.body} />
                </div>
              )
            }
            ) :
            ( 
            <div>There is no comments to display</div>
            )
            )
          }

          {showComments && <AddComment postId={id}/>}
        </div>
    );
};

export { Post };
