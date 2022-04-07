import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "react-jss";
import 'antd/dist/antd.css';
import { theme } from './theme';
import { Layout } from 'antd';
import { Sidebar } from './components/pages/Sidebar';
import { createUseStyles } from "react-jss";
import { Posts } from './components/pages/Posts';
import { DataProvider } from './dataContext';
import { PostPage } from './components/pages/Post';


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
      <DataProvider>
        <Layout className={classes.container}>
          <Sidebar />
          <Routes>
            <Route
              path="/posts"
              element={<Posts />}
            >
            </Route>
            <Route
              path="/post/:id"
              element={<PostPage />}
            >
            </Route>
            <Route path='*' element={<Navigate to='/posts' replace />} />
          </Routes>
        </Layout>
      </DataProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
