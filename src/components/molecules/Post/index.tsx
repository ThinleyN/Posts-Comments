import React from "react";
import { createUseStyles } from "react-jss";

export interface Props {
   id: number,
   title: string
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
      title:{
        color: theme.textLightBlack
      },
      idHolder: {
        color: theme.textLightBlack
      },
      showComments: {
      }
        
    };
});

const Post: React.FC<Props> = props => {
    const classes = useStyles();

    return (
        <div className={classes.container}>
          <h1 className={classes.title}>
            {props.title}
          </h1>
          <h3 className={classes.idHolder}>
            The post id is {props.id}
          </h3>
          <h4 className={classes.showComments}>
            Show comments
          </h4>
        </div>
    );
};

export { Post };
