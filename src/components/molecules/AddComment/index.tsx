import React, { useContext, useState } from "react";
import { createUseStyles } from "react-jss";
import { Button } from "../../atoms/Button";
import { TextField } from "../../atoms/Input";
import { DataContext } from "../../../dataContext";
import { CommentProps } from "../Comments";
import { Alert } from "../../atoms/Alert";


export interface AddCommentProp {
  postId: number;
}

let useStyles:any = createUseStyles((theme: any) => {
    return {
      container: {
        padding: 20,
        paddingBottom: 0
      }, 
      textfield: {
        marginTop: 25,
        marginBottom: 25
      }
    };
});

const AddComment: React.FC<AddCommentProp> = ({postId}) => {
    const classes = useStyles();
    const [commentAdding, setCommentAdding] = useState(false as boolean);
    const initialData:CommentProps = {
      body:'',
      id: 0,
      postId: 0
    }
    const [formValues, setFormValue] = useState(initialData);
    const [formError, setFormError] = useState({
      id: '',
      body: ''
    })

    const data = useContext(DataContext);

    const handleAddComment = () => {
      setCommentAdding(!commentAdding);
    }

    const handleChange = (data: any) => {
      setFormValue({...formValues,  [data.target.name]: data.target.value });
      if(data.target.value){
        setFormError({...formError, [data.target.name]: "" });
      }
    }

    const onSubmit = (e:React.SyntheticEvent) => {
      e.preventDefault();

      const comment = {
        id: Number(formValues.id),
        body: formValues.body,
        postId: postId
      };

      let idExists = false;

      data.data.comments.map((item:any) => {
        if(item.id == comment.id){
          idExists = true;
        }
      })

      if(idExists){
        Alert("Id already exists", "error");
        return;
      }

      const notValid = validateData();
      if(notValid){
        return;
      }

      const jsonData = data.data;
      jsonData.comments.push(comment);
      data.setData({...jsonData});
      Alert("Comment Added", "success");

      setCommentAdding(false);
    }

    const validateData = () => {
      let error:any = {};
      Object.entries(formValues).map(item => {
        if(item[0] === 'postId'){
          return;
        }
        if(item[1] === "" || !item[1]){
          error[item[0]] = '*Required';
        }
      });
      setFormError({...error});
      return Object.keys(error).length;
    }

    return (
        <div className={classes.container}>
            {!commentAdding ? 
            <Button onClick={handleAddComment}>Add comment</Button> : 
            (
              <>
                <h2>Adding Comment</h2>
                <form onSubmit={onSubmit}>
                  <TextField label={"Id"}
                              name={"id"}
                              placeholder={"Id"}
                              type="number"
                              onChange={handleChange}
                              error={formError.id}
                              errorFlag={!!(formError.id)}
                              positive
                              wrapperClass={classes.textfield}
                  />
                  <TextField label={"Body"}
                              name={"body"}
                              placeholder={"body"}
                              type="number"
                              onChange={handleChange}
                              textArea
                              error={formError.body}
                              errorFlag={!!(formError.body)}
                              wrapperClass={classes.textfield}
                              
                  />
                  <Button htmlType="submit" onClick={onSubmit}>Add Comment</Button>
                </form>
              </>
            )}
        </div>
    );
};

export { AddComment };
