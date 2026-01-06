package org.example.backend.controllers;

import Request.AuthRequest;
import Response.AllUsersResponse;
import Response.BasicResponse;

import org.example.backend.services.UserService;

import org.springframework.web.bind.annotation.*;

import static Response.Error.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }


    @GetMapping("/all")
    public AllUsersResponse getAllUsers() {
        return new AllUsersResponse(true, null, userService.getAllUsers());
    }

        @PostMapping("/register")
        public BasicResponse register(@RequestBody AuthRequest request){
            return userService.register(request.getUsername() , request.getPassword());
        }

        @PostMapping("/login")
        public BasicResponse login (@RequestBody AuthRequest request){
            return userService.login(request.getUsername(), request.getPassword());
        }



    }
