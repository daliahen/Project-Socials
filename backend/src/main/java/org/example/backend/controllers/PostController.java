package org.example.backend.controllers;

import org.example.backend.Request.CreatePostRequest;
import org.example.backend.Response.BasicResponse;
import org.example.backend.Response.PostsResponse;
import org.example.backend.services.PostService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    @PostMapping("/create")
    public BasicResponse createPost(@RequestBody CreatePostRequest request) {
        return postService.createPost(request.getAuthorUserId(), request.getText());

    }

    @GetMapping("/by-user/{userId}")
    public PostsResponse getPosts(@PathVariable long userId) {
        return new PostsResponse(true, null, postService.getPostsByUserId(userId));
    }

    @GetMapping("/feed/{userId}")
    public PostsResponse getFeed(@PathVariable long userId) {
        return new PostsResponse(true, null, postService.getFeed(userId));
    }

}
