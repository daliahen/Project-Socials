package org.example.backend.services;

import Response.BasicResponse;
import Utils.DbUtils;
import org.example.backend.entities.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;

import static Response.Error.*;
import static Response.Error.ERROR_WRONG_PASSWORD;

@Service
public class UserService {

    private DbUtils dbUtils;


    private BasicResponse validateUsernameAndPassword(String username, String password) {

        if (username == null || username.trim().isEmpty()) {
            return new BasicResponse(false, ERROR_MISSING_USERNAME);
        }

        if (password == null || password.trim().isEmpty()) {
            return new BasicResponse(false, ERROR_MISSING_PASSWORD);
        }

        return null; // הכול תקין
    }

    public BasicResponse register(String username , String password){
        BasicResponse validation = validateUsernameAndPassword(username, password);
        if (validation != null) {
            return validation;
        }

        String cleanUsername = username.trim();
        String cleanPassword = password.trim();

        if (dbUtils.usernameExists(cleanUsername)) {
            return new BasicResponse(false, ERROR_USERNAME_TAKEN);
        }

        User user = new User();
        user.setUsername(cleanUsername);
        user.setPassword(cleanPassword);
        user.setImageURL(null);

        dbUtils.createUserOnDb(user);

        return new BasicResponse(true, null);
    }



    public BasicResponse login(String username , String password){
        BasicResponse validation = validateUsernameAndPassword(username, password);
        if (validation != null) {
            return validation;
        }

        String cleanUsername = username.trim();
        String cleanPassword = password.trim();

        User user = dbUtils.getUserByUsername(cleanUsername);
        if (user == null){
            return new BasicResponse(false , ERROR_USER_NOT_FOUND);
        }
        if (user.getPassword() ==  null || !user.getPassword().equals(cleanPassword)){
            return new BasicResponse(false , ERROR_WRONG_PASSWORD);
        }

        return new BasicResponse(true, null);
    }


    public List<User> getAllUsers() {
        return dbUtils.getAllUsers();
    }
}

