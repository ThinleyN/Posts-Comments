import React, { useContext, useState } from "react";
import { createUseStyles } from "react-jss";
import { DataContext } from "../../../dataContext";
import { TextField } from "../../atoms/Input";
import { Button } from "../../atoms/Button";
import { Alert } from "../../atoms/Alert";
import { useNavigate } from "react-router-dom";

export interface Props {
   
}

let useStyles:any = createUseStyles((theme: any) => {
    return {
      container: {
        borderRadius: 9,
        background: theme.bgGrey,
        marginBottom: 20,
        "&:last-child": {
          marginBottom: 0
        },
        padding: '10px 20px 20px 10px',
        width: '100%'
      },
      textfield:{
        marginTop: 20,
        marginBottom: 20
      }
        
    };
});

const AddPost: React.FC<Props> = ({}) => {
    const classes = useStyles();
    const data = useContext(DataContext);
    const navigate = useNavigate();
    const [formValue, setFormValue] = useState({
      id: 0 as Number,
      title: '' as String
    } as any);
    const [formError, setFormError] = useState({
      id: '' as String,
      title: '' as String
    } as any);

    const handleChange = (e:any) => {
      setFormValue({...formValue, [e.target.name]: e.target.value });
      if(e.target.value){
        setFormError({...formError, [e.target.name]: "" });
      }
    }
    
    const handleSubmit = (e:React.SyntheticEvent) => {
      e.preventDefault();
      let idExists = false;

      data.data.posts.map((item:any) => {
        if(item.id == formValue.id){
          idExists = true;
        }
      })

      if(idExists){
        Alert("Id already exists", "error");
        return;
      }

      const notValid = validate();
      if(notValid){
        return;
      }

      const value = {
        id: Number(formValue.id),
        title: formValue.title
      }

      const jsonData = data.data;
      jsonData.posts.push(value);
      data.setData({...jsonData});
      navigate('/posts')
    }

    const validate = () => {
      let error:any = {};
      Object.entries(formValue).map(item => {
        console.log(item,"item")
        if(item[1] === "" || !item[1]){
          error[item[0]] = '*Required';
        }
      });
      setFormError({...error});
      return Object.keys(error).length;
    }
    
    return (
        <div className={classes.container}>
          <form onSubmit={handleSubmit}>
            <TextField label="Id"
              placeholder="Post id"
              name="id"
              type="number"
              onChange={handleChange}
              wrapperClass={classes.textfield}
              errorFlag={!!(formError.id)}
              error={formError.id}
              />
              <TextField label="Title"
              placeholder="Post Title"
              name="title"
              onChange={handleChange}
              errorFlag={!!(formError.title)}
              error={formError.title}
              wrapperClass={classes.textfield}
              />

            <Button onClick={handleSubmit} htmlType="submit">Add Post</Button>
                        
          </form>
        </div>
    );
};

export { AddPost };
