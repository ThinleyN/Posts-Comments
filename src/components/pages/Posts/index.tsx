import React, { useContext, useEffect, useState } from "react";
import { createUseStyles } from "react-jss";
import { useLocation } from "react-router";
import { DataContext } from "../../../dataContext";
import { Post } from "../../molecules/Post";
import { CommentProps } from "../../molecules/Comments";

const useStyles = createUseStyles((theme: any) => {
    return {
        postContainer:{
          width: "100%",
          padding: 20
        },
    };
});



interface PostsProps {
  title: string,
  id: number,
  comments : Array<CommentProps>
}

const Posts = () => {
    const classes = useStyles();
    const value = useContext(DataContext);
    const [posts, setPosts] = useState([] as Array<PostsProps>);

    useEffect(() => {
      if(value && value.data){
        init();
      }
    },[value.data]);
    const init = () => {
      const postsArr: Array<PostsProps> = [];
      value.data.posts.map((post:any) => {
        const postData = post;
        postData.comments = [];
        value.data.comments.map((comment:any) => {
          if(comment.postId === post.id){
            postData.comments.push(comment);
          }
        });
        postsArr.push(postData);
      });
      setPosts([...postsArr]);
    };

   
    
    return (
        <div className={classes.postContainer}>
            {posts.length && posts.map(post => {
              return (
                <Post key={post.id} title={post.title} id={post.id} comments={post.comments} />
              )
            })}
        </div>
    );
};
export { Posts };
