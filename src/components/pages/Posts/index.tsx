import React, { useContext, useEffect, useState } from "react";
import { createUseStyles } from "react-jss";
import { useLocation } from "react-router";
import { DataContext } from "../../../dataContext";
import { Post } from "../../molecules/Post";

const useStyles = createUseStyles((theme: any) => {
    return {
        postContainer:{
          width: "100%",
          paddingTop: 20,
          paddingBottom: 20
        },
    };
});

const Posts = () => {
    const classes = useStyles();
    const location = useLocation();
    const value = useContext(DataContext);
    const [posts, setPosts] = useState([] as Array<{
        title: string,
        id: number
    }>);

    useEffect(() => {
      if(value && value.data){
        init();
      }
    },[value]);
    
    const init = () => {
      setPosts(value.data.posts);
    }
    
    return (
        <div className={classes.postContainer}>
          {posts.length && posts.map(post => {
            return (
              <Post title={post.title} id={post.id} />
            )
          })}
        </div>
    );
};
export { Posts };
