import { CommentProps } from "../../molecules/Comments";
import React, { useContext, useEffect, useState } from "react";
import { createUseStyles } from "react-jss";
import { useParams } from "react-router";
import { DataContext } from "../../../dataContext";
import { Post, PostProp } from "../../molecules/Post";
import { AddCommentProp } from "../../molecules/AddComment";

export interface Props {
   
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
        paddingBottom: 20,
        width: '100%'
      },
      title:{
        color: theme.textLightBlack
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

const PostPage: React.FC<Props> = ({}) => {
    const classes = useStyles();
    const data = useContext(DataContext);
    const {id} = useParams();
    const [post, setPost] = useState({} as PostProp);

    useEffect(() => {
      if(id){
        getPost(Number(id));
      }
    },[id,data]);
    

    const getPost= (id:Number) => {
      const postData = { comments: [] as Array<CommentProps> } as PostProp;
      data.data.posts.map((item:any) => {
        if(item.id === id){
          postData.id = item.id;
          postData.title = item.title;
        }
      });
      data.data.comments.map((comment:any) => {
        if(comment.postId === id){
          postData.comments.push(comment);
        }
      });
      setPost({...postData});
    }
    
    return (
        <div className={classes.container}>
          {Object.keys(post).length > 0 ? 
          (
            <Post id={post.id} title={post.title} comments={post.comments} />
          ): 
          (
            'loading'
          )}
          {/* <h1 className={classes.title}>
            {title}
          </h1>
          <h3 className={classes.idHolder}>
            The post id is {id}
          </h3>
          <Button className={classes.showComments} onClick={handleShowComment}>
          {showComments ? 'Hide Comments' : `Show comments (${comments.length})`}   
          </Button>

          {showComments && (
           comments.length ?  comments.map(comment => {
              return(
                <div key={comment.id} className={classes.commentHolder}>
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

          {showComments && <AddComment postId={id}/>} */}
        </div>
    );
};

export { PostPage };
