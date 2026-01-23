package org.example.backend.Response;

import org.example.backend.entities.User;

import java.util.List;

public class SearchUserResponse extends BasicResponse{
    private List<User> users;

    public SearchUserResponse(boolean success, Integer errorCode, List<User> users) {
        super(success, errorCode);
        this.users = users;
    }

    public List<User> getUsers() {
        return users;
    }
}
