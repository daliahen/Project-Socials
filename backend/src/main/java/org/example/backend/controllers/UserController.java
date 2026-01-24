package org.example.backend.controllers;

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

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/search")
    public SearchUserResponse searchUsers(@RequestParam String text){
        return new SearchUserResponse(true , null , userService.searchUsers(text));
    }

    @GetMapping("/all")
    public AllUsersResponse getAllUsers() {
        return new AllUsersResponse(true, null, userService.getAllUsers());
    }

    @PostMapping("/register")
    public BasicResponse register(@RequestBody AuthRequest request) {
        return userService.register(request.getUsername(), request.getPassword());
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody AuthRequest request) {
        return userService.login(request.getUsername(), request.getPassword());
    }

    @PutMapping("/profile-image")
    public BasicResponse updateProfileImage(@RequestBody UpdateProfileImageReq request) {
        return userService.updateProfileImage(request.getUserId() , request.getImageUrl());
    }
}
