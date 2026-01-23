package org.example.backend.Response;

import org.example.backend.entities.User;

import java.util.List;

public class AllUsersResponse extends BasicResponse{
    private List<User> userList;

    public AllUsersResponse(boolean success, Integer errorCode, List<User> userList) {
        super(success, errorCode);
        this.userList = userList;
    }

    public List<User> getUserList() {
        return userList;
    }
}
