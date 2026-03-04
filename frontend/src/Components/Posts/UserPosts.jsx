import {useEffect, useState} from "react";
import PostList from "./PostList.jsx";
import Buttons from "../Buttons.jsx";
import {getPostsByUser} from "../../api/api.jsx";

function UserPosts({currentUserId , usersById , refreshToken}){

    const[posts, setPosts] = useState([]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function fetchUserPosts(){
        if (!currentUserId){
            setPosts([]);
            setError("Missing logged-in user")
            return;
        }

        setLoading(true)
        setError("");


        try {
            const response = await getPostsByUser(currentUserId);
            const ok = response && response.data && response.data.success;
            if (!ok) {
                setPosts([]);
                setError("Failed to load your posts");
                return;
            }

            const serverPosts = response.data.posts;
            if (Array.isArray(serverPosts)) {
                setPosts(serverPosts);
            } else {
                // אם השרת החזיר משהו לא צפוי
                setPosts([]);
                setError("Unexpected server response");
            }
        }catch (e){
            setPosts([])
            setError("Failed to load your posts")
        }finally {
            setLoading(false)
        }
    }

    useEffect(()=>{
        fetchUserPosts("useEffect");
    } , [currentUserId , refreshToken]);

    function handleManualRefresh(){
        fetchUserPosts("manual refresh")
    }



    let content = null;

    if (!currentUserId) {
        content = <div style={{ opacity: 0.7 }}>No user selected.</div>;
    } else if (loading) {
        content = <div style={{ opacity: 0.7 }}>Loading your posts...</div>;
    } else if (error) {
        content = <div style={{ color: "red" }}>{error}</div>;
    } else if (posts.length === 0) {
        content = <div style={{ opacity: 0.7 }}>No posts yet.</div>;
    } else {
        content = <PostList posts={posts} usersById={usersById} />;
    }


    return(
        <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <h3 style={{ margin: 0 }}>Your posts</h3>

                <Buttons
                    text="Refresh"
                    onClick={handleManualRefresh}
                    loading={loading}
                    disabled={!currentUserId}
                />
            </div>

            <div style={{ marginTop: 10 }}>{content}</div>

        </div>
    );
}export default UserPosts;