import PostItem from "./PostItem.jsx";

function PostList({posts , usersById}){//מקבלת מערך פוסטים ומציירת אותו כרשימה של PostItem

    const safePosts = posts || [];

    if (safePosts.length === 0 ){
        return <div style={{ opacity: 0.7 }}>No posts to display.</div>;
    }

    return(
        <div className="post-list">
            {safePosts.map((post) => (
                <PostItem
                    key={post.postId}
                    post={post}
                    usersById={usersById}
                />
            ))}
        </div>
    );

}export default PostList;