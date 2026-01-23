package org.example.backend.controllers;

import org.example.backend.Response.BasicResponse;
import org.example.backend.Response.FollowerResponse;
import org.example.backend.Response.IsFollowingResponse;
import org.example.backend.services.FollowersService;
import org.springframework.web.bind.annotation.*;



import java.util.List;

@RestController
@RequestMapping("/api/followers")
public class FollowersController {

    private final FollowersService followersService;

    public FollowersController(FollowersService followersService) {
        this.followersService = followersService;
    }

    @PostMapping("/follow")
    public BasicResponse follow(@RequestParam long followerUserId,
                                @RequestParam long followedUserId) {
        return followersService.follow(followerUserId, followedUserId);
    }

    @PostMapping("/unfollow")
    public BasicResponse unfollow(@RequestParam long followerUserId,
                                  @RequestParam long followedUserId) {
        return followersService.unfollow(followerUserId, followedUserId);
    }

    @GetMapping("/following/{userId}")
    public FollowerResponse getFollowing(@PathVariable long userId) {
        List<Long> following =  followersService.getFollowing(userId);
        return new FollowerResponse(true , null , following);
    }

    @GetMapping("/followers/{userId}")
    public FollowerResponse getFollowers(@PathVariable long userId) {
        List<Long> followers = followersService.getFollowers(userId);
        return new FollowerResponse(true , null , followers);
    }

    @GetMapping("/is-following")
    public IsFollowingResponse isFollowing(@RequestParam long followerUserId,
                                           @RequestParam long followedUserId) {
        BasicResponse validate = followersService.validateFollower(followerUserId, followedUserId);
        if (!validate.isSuccess()) {
            return new IsFollowingResponse(false , validate.getErrorCode(), false);
        }
        boolean result = followersService.isFollowing(followerUserId, followedUserId);
        return new IsFollowingResponse(true, null ,result );
    }

}
