import { ContainerOutlined, FileAddOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { createUseStyles } from "react-jss";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

const useStyles = createUseStyles((theme: any) => {
    return {
        sidebar: {
            background: theme.lightBg,
            height: "100vh"
        },
        menuBlock: {
            height: "100%"
        },
        logo: {
            margin: 24,
            marginBottom: 28
        },
        sidebarIcon: {
            minWidth: 14,
            marginRight: 10
        }
    };
});

const Sidebar = () => {
    const classes = useStyles();
    const location = useLocation();
    const keys = ["posts"];
    
    return (
        <Layout.Sider className={classes.sidebar}>
            <Menu
                className={classes.menuBlock}
                mode="inline"
                defaultSelectedKeys={[
                    keys.find(val => {
                        if (location.pathname === "/") return "posts";
                        return location.pathname.includes(val);
                    }) || ""
                ]}
                selectedKeys={[location.pathname.substring(1)]}
            >
                <Menu.Item icon={<ContainerOutlined />} key="posts">
                    <Link to={"/posts"}>Posts</Link>
                </Menu.Item>
                <Menu.Item icon={<FileAddOutlined />} key="add-post">
                    <Link to={"/add-post"}>Add Post</Link>
                </Menu.Item>
            </Menu>
        </Layout.Sider>
    );
};
export { Sidebar };
