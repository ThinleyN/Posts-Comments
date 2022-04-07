import { CommentProps } from "../../molecules/Comments";
import React, { useContext, useEffect, useState } from "react";
import { createUseStyles } from "react-jss";
import { useParams } from "react-router";
import { DataContext } from "../../../dataContext";
import { Post, PostProp } from "../../molecules/Post";
import { useNavigate } from "react-router-dom";
import { Spin } from "antd";

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
      },
      spinner :{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
      }
        
    };
});

const PostPage: React.FC<Props> = ({}) => {
    const classes = useStyles();
    const data = useContext(DataContext);
    const {id} = useParams();
    const [post, setPost] = useState({} as PostProp);
    const navigate = useNavigate();

    useEffect(() => {
      if(id){
        getPost(Number(id));
      }
    },[id,data]);
    

    const getPost= (id:Number) => {
      const postData = { comments: [] as Array<CommentProps> } as PostProp;
      let idExists =  false;
      data.data.posts.map((item:any) => {
        if(item.id === id){
           idExists =  true;
          postData.id = item.id;
          postData.title = item.title;
        }
      });
      data.data.comments.map((comment:any) => {
        if(comment.postId === id){
          postData.comments.push(comment);
        }
      });
      if(!idExists){
        navigate('/posts');
      }
      setPost({...postData});
    }
    
    return (
        <div className={classes.container}>
          {Object.keys(post).length > 0 ? 
          (
            <Post id={post.id} title={post.title} comments={post.comments} />
          ): 
          (
            <div className={classes.spinner}>
              <Spin />
            </div>
          )}
        </div>
    );
};

export { PostPage };
