import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "react-jss";
import 'antd/dist/antd.css';
import { theme } from './theme';
import { Layout } from 'antd';
import { Sidebar } from './components/pages/Sidebar';
import { createUseStyles } from "react-jss";
import { Posts } from './components/pages/Posts';


const App = () => {

  let useStyles = createUseStyles((theme: any) => {
    return {
      container: {
        height: "-webkit-fill-available",
        width: "100%",
        display: "flex",
        flexDirection: "row"
      },
    };
  });
  const classes = useStyles()
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Layout className={classes.container}>
          <Sidebar />
          <Routes>
            <Route
              path="/posts"
              element={<Posts />}
            >
            </Route>
            <Route path='*' element={<Navigate to='/posts' replace />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
