package org.example.backend.controllers;

import org.example.backend.services.UserService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/users")
public class UserController {

    private UserService userService;

    //TODO: GetMapping ...

}
