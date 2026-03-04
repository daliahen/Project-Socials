package org.example.backend.controllers;

import org.example.backend.JWT.JwtUtil;
import org.example.backend.Request.CreatePostRequest;
import org.example.backend.Response.BasicResponse;
import org.example.backend.Response.PostsResponse;
import org.example.backend.services.PostService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    private final PostService postService;
    private final JwtUtil jwtUtil;


    public PostController(PostService postService , JwtUtil jwtUtil) {
        this.postService = postService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/create")
    public BasicResponse createPost(@RequestHeader(value = "Authorization", required = false) String authHeader
            , @RequestBody CreatePostRequest request) {
        if (authHeader == null || !authHeader.startsWith("Bearer ") || !jwtUtil.isTokenValid(authHeader.substring(7))) {
            return new BasicResponse(false,null);
        }
        return postService.createPost(request.getAuthorUserId(), request.getText());
    }

    @GetMapping("/by-user/{userId}")
    public PostsResponse getPosts(@RequestHeader(value = "Authorization", required = false) String authHeader
            , @PathVariable long userId) {
        if (authHeader == null || !authHeader.startsWith("Bearer ") ||  !jwtUtil.isTokenValid(authHeader.substring(7))) {
            System.out.println("Incorrect token for posts for user");
            return new PostsResponse(false,null,null);
        }
        return new PostsResponse(true, null, postService.getPostsByUserId(userId));
    }

    @GetMapping("/feed/{userId}")
    public PostsResponse getFeed(@RequestHeader(value = "Authorization", required = false) String authHeader
            , @PathVariable long userId) {
        if (authHeader == null|| !authHeader.startsWith("Bearer ") ||  !jwtUtil.isTokenValid(authHeader.substring(7))){
            System.out.println("The token: " + authHeader);
            System.out.println("Incorrect token for GetFeed");
            return new PostsResponse(false,null,null);
        }
        return new PostsResponse(true, null, postService.getFeed(userId));
    }

}
