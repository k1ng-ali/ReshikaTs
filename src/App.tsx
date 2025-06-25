import {QueryClientProvider, QueryClient} from "@tanstack/react-query";
import {message} from "antd";
import {useEffect, useState} from "react";
import {useCurrentUser, useGetPosts} from "./Hooks/useAuth.ts";
import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Profile from "./Pages/Profile.tsx";
import Home from "./Pages/Home.tsx";
import Login from "./Pages/Login.tsx";
import Footer from "./components/Footer";
import MobileFooter from "./components/MobileFooter";
import {api} from "./Api/axios.ts"


const queryClient = new QueryClient();

function AppContent() {
    const location = useLocation();
    const HideHeader = ["/Login"];
    const HideFooter = ["/Profile"];
    const shouldShowHeader = !HideHeader.includes(location.pathname);
    const shouldShowFooter = !HideFooter.includes(location.pathname);
    const [limit] = useState(10);
    const [offset, setOffset] = useState(0);
    const {data: posts, isLoading: isLoadingContent} = useGetPosts(limit, offset);
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        api.get('auth/csrf')
            .then(()=> console.log(currentUser))
            .catch(err => console.log(err));
    })

    const { data: currentUser, isLoading} = useCurrentUser();

    return (
        <>
            {contextHolder}
            {shouldShowHeader && (
                <div className="wrapper">
                    <Header key={1} currentUser={currentUser} isLoading={isLoading} inProfile={!shouldShowFooter}/>
                    {shouldShowFooter && <Footer messageApi={messageApi} posts={posts?.posts || []} currentUser={currentUser ? currentUser : null}/>}
                    <MobileFooter />
                </div>
            )}
            <Routes>
                <Route
                    path="/"
                    element={
                        <Home
                            currentUser={currentUser || null}
                            isLoading={isLoadingContent}
                            posts={posts?.posts || []}
                        />
                    }
                />
                <Route path="/Profile" element={<Profile />} />
                <Route path="/Login" element={<Login />} />
            </Routes>
        </>
    );
}

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <AppContent />
            </Router>
        </QueryClientProvider>
    );
}

export default App;