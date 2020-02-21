import React, { Suspense } from "react";
import AuthRoute from "./middleware/AuthRoute";
import Navbar from "./component/Navbar/Navbar.js";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import AlertBar from "./component/Common/Snackbar";
import { createMuiTheme, lighten } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import {Redirect, Route, Switch, useRouteMatch} from "react-router-dom";
import Auth from "./middleware/Auth";
import { CssBaseline, makeStyles, ThemeProvider } from "@material-ui/core";
import PageLoading from "./component/Placeholder/PageLoading.js";
import {changeThemeColor} from "./untils";
import NotFound from "./component/Share/NotFound";
import NoAuthRoute from "./middleware/NoAuthRoute";

// Lazy loads
const LoginForm = React.lazy(() => import("./component/Login/LoginForm"));
const FileManager = React.lazy(() =>
    import("./component/FileManager/FileManager.js")
);
const VideoPreview = React.lazy(() => import("./component/Viewer/Video.js"));
const SearchResult = React.lazy(() => import("./component/Share/SearchResult"));
const MyShare = React.lazy(() => import("./component/Share/MyShare"));
const Download = React.lazy(() => import("./component/Download/Download"));
const SharePreload = React.lazy(() => import("./component/Share/SharePreload"));
const DocViewer = React.lazy(() => import("./component/Viewer/Doc"));
const TextViewer = React.lazy(() => import("./component/Viewer/Text"));
const Quota = React.lazy(() => import("./component/VAS/Quota"));
const BuyQuota = React.lazy(() => import("./component/VAS/BuyQuota"));
const WebDAV = React.lazy(() => import("./component/Setting/WebDAV"));
const Tasks = React.lazy(() => import("./component/Setting/Tasks"));
const Profile = React.lazy(() => import("./component/Setting/Profile"));
const UserSetting = React.lazy(() => import("./component/Setting/UserSetting"));
const QQCallback = React.lazy(() => import("./component/Login/QQ"));
const Register = React.lazy(() => import("./component/Login/Register"));

export default function App() {
    const themeConfig = useSelector(state => state.siteConfig.theme);
    const isLogin = useSelector(state => state.viewUpdate.isLogin);
    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

    const theme = React.useMemo(() => {
        themeConfig.palette.type = prefersDarkMode ? "dark" : "light";
        let prefer = Auth.GetPreference("theme_mode");
        if (prefer) {
            themeConfig.palette.type = prefer;
        }
        let theme = createMuiTheme({
            ...themeConfig,
            palette: {
                ...themeConfig.palette,
                primary: {
                    ...themeConfig.palette.primary,
                    main:
                        themeConfig.palette.type === "dark"
                            ? lighten(themeConfig.palette.primary.main, 0.3)
                            : themeConfig.palette.primary.main
                }
            }
        });
        changeThemeColor(themeConfig.palette.type === "dark"?theme.palette.background.default:theme.palette.primary.main);
        return theme;
    }, [prefersDarkMode, themeConfig]);

    const useStyles = makeStyles(theme => ({
        root: {
            display: "flex"
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing.unit * 0,
            minWidth: 0
        },
        toolbar: theme.mixins.toolbar
    }));

    const classes = useStyles();

    let { path } = useRouteMatch();
    return (
        <React.Fragment>
            <ThemeProvider theme={theme}>
                <div className={classes.root} id="container">
                    <CssBaseline />
                    <AlertBar />
                    <Navbar />
                    <main className={classes.content}>
                        <div className={classes.toolbar} />
                        <Switch>
                            <AuthRoute exact path={path} isLogin={isLogin}>
                                <Redirect
                                    to={{
                                        pathname: "/home",
                                    }}
                                />
                            </AuthRoute>

                            <AuthRoute path={`${path}home`} isLogin={isLogin}>
                                <Suspense fallback={<PageLoading />}>
                                    <FileManager />
                                </Suspense>
                            </AuthRoute>

                            <AuthRoute
                                path={`${path}video/*`}
                                isLogin={isLogin}
                            >
                                <Suspense fallback={<PageLoading />}>
                                    <VideoPreview />
                                </Suspense>
                            </AuthRoute>

                            <AuthRoute path={`${path}text/*`} isLogin={isLogin}>
                                <Suspense fallback={<PageLoading />}>
                                    <TextViewer />
                                </Suspense>
                            </AuthRoute>

                            <AuthRoute path={`${path}doc/*`} isLogin={isLogin}>
                                <Suspense fallback={<PageLoading />}>
                                    <DocViewer />
                                </Suspense>
                            </AuthRoute>

                            <AuthRoute path={`${path}aria2`} isLogin={isLogin}>
                                <Suspense fallback={<PageLoading />}>
                                    <Download />
                                </Suspense>
                            </AuthRoute>

                            <AuthRoute path={`${path}shares`} isLogin={isLogin}>
                                <Suspense fallback={<PageLoading />}>
                                    <MyShare />
                                </Suspense>
                            </AuthRoute>

                            <AuthRoute path={`${path}search`} isLogin={isLogin}>
                                <Suspense fallback={<PageLoading />}>
                                    <SearchResult />
                                </Suspense>
                            </AuthRoute>

                            <AuthRoute path={`${path}quota`} isLogin={isLogin}>
                                <Suspense fallback={<PageLoading />}>
                                    <Quota />
                                </Suspense>
                            </AuthRoute>

                            <AuthRoute path={`${path}buy`} isLogin={isLogin}>
                                <Suspense fallback={<PageLoading />}>
                                    <BuyQuota />
                                </Suspense>
                            </AuthRoute>

                            <AuthRoute path={`${path}setting`} isLogin={isLogin}>
                                <Suspense fallback={<PageLoading />}>
                                    <UserSetting />
                                </Suspense>
                            </AuthRoute>


                            <AuthRoute path={`${path}profile/:id`} isLogin={isLogin}>
                                <Suspense fallback={<PageLoading />}>
                                    <Profile />
                                </Suspense>
                            </AuthRoute>


                            <AuthRoute path={`${path}webdav`} isLogin={isLogin}>
                                <Suspense fallback={<PageLoading />}>
                                    <WebDAV />
                                </Suspense>
                            </AuthRoute>

                            <AuthRoute path={`${path}tasks`} isLogin={isLogin}>
                                <Suspense fallback={<PageLoading />}>
                                    <Tasks />
                                </Suspense>
                            </AuthRoute>

                            <NoAuthRoute path={`${path}login`} exact>
                                <Suspense fallback={<PageLoading />}>
                                    <LoginForm />
                                </Suspense>
                            </NoAuthRoute>

                            <NoAuthRoute path={`${path}signup`} exact>
                                <Suspense fallback={<PageLoading />}>
                                    <Register />
                                </Suspense>
                            </NoAuthRoute>

                            <Route path={`${path}login/qq`}>
                                <Suspense fallback={<PageLoading />}>
                                    <QQCallback />
                                </Suspense>
                            </Route>

                            <Route exact path={`${path}s/:id`}>
                                <Suspense fallback={<PageLoading />}>
                                    <SharePreload />
                                </Suspense>
                            </Route>

                            <Route path={`${path}s/:id/video(/)*`}>
                                <Suspense fallback={<PageLoading />}>
                                    <VideoPreview />
                                </Suspense>
                            </Route>

                            <Route path={`${path}s/:id/doc(/)*`}>
                                <Suspense fallback={<PageLoading />}>
                                    <DocViewer />
                                </Suspense>
                            </Route>

                            <Route path={`${path}s/:id/text(/)*`}>
                                <Suspense fallback={<PageLoading />}>
                                    <TextViewer />
                                </Suspense>
                            </Route>

                            <Route path="*">
                                <NotFound msg={"页面不存在"} />
                            </Route>


                        </Switch>
                    </main>
                </div>
            </ThemeProvider>
        </React.Fragment>
    );
}
