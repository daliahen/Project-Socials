import "../../Styles/PostItem.css";
function PostItem({post , usersById }){

    if (!post){
        return null;
    }

    const authorId = post.authorUserId;
    const authorUser = usersById ? usersById[authorId] : null; // יש תנאי כדאי למנוע קריסה אם USERSBYID עדיין לא נטען
    const authorName = authorUser?.username || "Unknown user";

    function formatPostTime(createdAt) {
        if (!createdAt){
            return "Unknown time";
        }
        const postTime = new Date(createdAt)
        const now = new Date();
        const diffMs = now - postTime;
        const diffMin = Math.floor(diffMs / 60000);
        const diffHour = Math.floor(diffMin / 60);

        if (diffMin < 1) return "Just now";
        if (diffMin < 60) return `${diffMin} min ago`;
        if (diffHour < 24) return `${diffHour} hours ago`;

        return postTime.toLocaleString();
    }


    return(
        <div className="post-item">
            <div className="post-meta">
                <div className="post-author">
                    {authorName}
                </div>

                <div className="post-time">
                    {formatPostTime(post.createdAt)}
                </div>
            </div>

            <div className="post-content">
                {post.text || "(No text)"}
            </div>
        </div>
    );

}export default PostItem;