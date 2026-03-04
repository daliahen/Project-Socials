import {useState , useEffect} from "react";
import Buttons from "../Buttons.jsx";
import PostList from "./PostList.jsx";
import {getFeed} from "../../api/api.jsx";
import "../../Styles/Feed.css";


function Feed({currentUserId , usersById , refreshKey}){

    const [feedPosts, setFeedPosts] = useState([]);
    const [feedLoading, setFeedLoading] = useState(false);
    const [feedError, setFeedError] = useState("");


    async function refreshFeed() {
        if (!currentUserId) {
            setFeedError("Missing logged-in user");
            setFeedPosts([]);
            return;
        }
        setFeedLoading(true);
        setFeedError("");
        try {
            const response = await getFeed(currentUserId);

            if (!response.data?.success) {
                setFeedError("Failed to load feed");
                setFeedPosts([]);
                return;
            }

            setFeedPosts(response.data.posts || []);
        }catch {
            setFeedPosts([]);
            setFeedError("Failed to load feed");
        }finally {
            setFeedLoading(false);
        }
    }


    useEffect(() => {
        refreshFeed();
    }, [currentUserId , refreshKey]);


    return(
        <div className="feed">
            <h3>Feed (latest 20)</h3>

            <Buttons text="Refresh Feed" onClick={refreshFeed} loading={feedLoading} />

            {feedError && <div style={{ color: "red" }}>{feedError}</div>}

            {!feedLoading && !feedError && feedPosts.length === 0 && (
                <div style={{ opacity: 0.7 }}>No posts yet.</div>
            )}

            {!feedError && (
                <PostList posts={feedPosts} usersById={usersById} />
            )}
        </div>
    );

}export default Feed;