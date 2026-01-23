package org.example.backend.services;

import org.example.backend.Response.BasicResponse;
import org.example.backend.Utils.DbUtils;
import org.example.backend.entities.User;
import org.example.backend.Utils.PasswordUtils;


import org.springframework.stereotype.Service;


import java.util.ArrayList;
import java.util.List;

import static org.example.backend.Response.Error.*;
import static org.example.backend.Response.Error.ERROR_WRONG_PASSWORD;

@Service
public class UserService {

    private DbUtils dbUtils;


    public UserService(DbUtils dbUtils) {
        this.dbUtils = dbUtils;
    }

    private BasicResponse validateUsernameAndPassword(String username, String password) {

        if (username == null || username.trim().isEmpty()) {
            return new BasicResponse(false, ERROR_MISSING_USERNAME);
        }

        if (password == null || password.trim().isEmpty()) {
            return new BasicResponse(false, ERROR_MISSING_PASSWORD);
        }

        return null; // הכול תקין
    }

    public BasicResponse register(String username, String password) {
        BasicResponse validation = validateUsernameAndPassword(username, password);
        if (validation != null) {
            return validation;
        }

        String cleanUsername = username.trim();
        String cleanPassword = password.trim();

        if (dbUtils.usernameExists(cleanUsername)) {
            return new BasicResponse(false, ERROR_USERNAME_TAKEN);
        }

        String hashedPassword = PasswordUtils.hash(cleanPassword);


        User user = new User();
        user.setUsername(cleanUsername);
        user.setPassword(hashedPassword);
        user.setImageURL(null);

        dbUtils.createUserOnDb(user);

        return new BasicResponse(true, null);
    }


    public BasicResponse login(String username, String password) {
        BasicResponse validation = validateUsernameAndPassword(username, password);
        if (validation != null) {
            return validation;
        }

        String cleanUsername = username.trim();
        String cleanPassword = password.trim();

        User user = dbUtils.getUserByUsername(cleanUsername);
        if (user == null) {
            return new BasicResponse(false, ERROR_USER_NOT_FOUND);
        }

        String hashedInput = PasswordUtils.hash(cleanPassword);
        if (user.getPassword() == null || !user.getPassword().equals(hashedInput)) {
            return new BasicResponse(false, ERROR_WRONG_PASSWORD);
        }

        return new BasicResponse(true, null);
    }

    public BasicResponse updateProfileImage(long userId, String imageUrl) {
        if (userId <= 0){
            return new BasicResponse(false , ERROR_USER_NOT_FOUND);
        }
        if (imageUrl == null || imageUrl.trim().isEmpty()) {
            return new BasicResponse(false , ERROR_MISSING_IMAGE_URL);
        }
        String cleanImageUrl = imageUrl.trim();
        User user = dbUtils.getUserById(userId);
        if (user == null) {
            return new BasicResponse(false, ERROR_USER_NOT_FOUND);
        }
        dbUtils.updateUserImage(userId , cleanImageUrl);
        return new BasicResponse(true , null);
    }

    public List<User> searchUsers(String text) {
        if (text == null){
            return new ArrayList<>();
        }
        String cleanText = text.trim();
        if (cleanText.isEmpty()){
            return new ArrayList<>();
        }
        return dbUtils.searchUsersByUsername(cleanText);
    }

    public List<User> getAllUsers() {
        return dbUtils.getAllUsers();
    }
}

