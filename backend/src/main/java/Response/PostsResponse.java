package Response;

import org.example.backend.entities.Post;

import java.util.List;

public class PostsResponse extends BasicResponse{

    private List<Post> posts;

    public PostsResponse(boolean success, Integer errorCode, List<Post> posts) {
        super(success, errorCode);
        this.posts = posts;
    }

    public List<Post> getPosts() {
        return posts;
    }
}
