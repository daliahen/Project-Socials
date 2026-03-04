package org.example.backend.controllers;

import org.example.backend.JWT.JwtUtil;
import org.example.backend.Request.UpdateProfileImageReq;
import org.example.backend.Response.LoginResponse;
import org.example.backend.Response.SearchUserResponse;
import org.example.backend.Request.AuthRequest;
import org.example.backend.Response.AllUsersResponse;
import org.example.backend.Response.BasicResponse;
import org.example.backend.services.UserService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;
    private final JwtUtil jwtUtil;

    public UserController(UserService userService , JwtUtil jwtUtil) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

    @GetMapping("/search")
    public SearchUserResponse searchUsers(@RequestHeader(value = "Authorization", required = false) String authHeader
            ,@RequestParam String text) {
        if (authHeader == null || !authHeader.startsWith("Bearer ") || !jwtUtil.isTokenValid(authHeader.substring(7))) {
            return new SearchUserResponse(false, null, null);
        }
        return new SearchUserResponse(true, null, userService.searchUsers(text));
    }

    @GetMapping("/all")
    public AllUsersResponse getAllUsers(@RequestHeader(value = "Authorization", required = false) String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ") || !jwtUtil.isTokenValid(authHeader.substring(7))) {
            return new AllUsersResponse(false, null, null);
        }
        return new AllUsersResponse(true, null, userService.getAllUsers());
    }

    @PostMapping("/register")
    public BasicResponse register(@RequestBody AuthRequest request) {
        return userService.register(request.getUsername(), request.getPassword());
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody AuthRequest request) {
        System.out.println("user " + request.getUsername() + "trying to connect");
        return userService.login(request.getUsername(), request.getPassword());
    }

    @PutMapping("/profile-image")
    public BasicResponse updateProfileImage(@RequestHeader(value = "Authorization", required = false) String authHeader
            ,@RequestBody UpdateProfileImageReq request) {
        if (authHeader == null || !authHeader.startsWith("Bearer ") || !jwtUtil.isTokenValid(authHeader.substring(7))) {
            return new SearchUserResponse(false, null, null);
        }
        return userService.updateProfileImage(request.getUserId() , request.getImageUrl());
    }
}
