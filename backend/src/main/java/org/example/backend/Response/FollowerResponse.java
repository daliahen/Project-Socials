package org.example.backend.Response;


import java.util.List;

public class FollowerResponse extends BasicResponse{
    private List<Long> users;

    public FollowerResponse(boolean success, Integer errorCode, List<Long> followers) {
        super(success, errorCode);
        this.users = followers;
    }

    public List<Long> getUsers() {
        return users;
    }
}
