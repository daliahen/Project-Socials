package org.example.backend.controllers;

import org.example.backend.JWT.JwtUtil;
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
    private final JwtUtil jwtUtil;

    public FollowersController(FollowersService followersService ,  JwtUtil jwtUtil) {
        this.followersService = followersService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/follow")
    public BasicResponse follow(@RequestHeader(value = "Authorization", required = false) String authHeader
            ,@RequestParam long followerUserId,
                                @RequestParam long followedUserId) {
        if (authHeader == null || !authHeader.startsWith("Bearer ") || !jwtUtil.isTokenValid(authHeader.substring(7))) {
            return new BasicResponse(false,null);
        }
        return followersService.follow(followerUserId, followedUserId);
    }

    @PostMapping("/unfollow")
    public BasicResponse unfollow(@RequestHeader(value = "Authorization", required = false) String authHeader
            ,@RequestParam long followerUserId,
                                  @RequestParam long followedUserId) {
        if (authHeader == null || !authHeader.startsWith("Bearer ") || !jwtUtil.isTokenValid(authHeader.substring(7))) {
            return new BasicResponse(false,null);
        }
        return followersService.unfollow(followerUserId, followedUserId);
    }

    @GetMapping("/following/{userId}")
    public FollowerResponse getFollowing(@RequestHeader(value = "Authorization", required = false) String authHeader
            ,@PathVariable long userId) {
        if (authHeader == null || !authHeader.startsWith("Bearer ") || !jwtUtil.isTokenValid(authHeader.substring(7))) {
            return new FollowerResponse(false,null , null);
        }
        List<Long> following =  followersService.getFollowing(userId);
        return new FollowerResponse(true , null , following);
    }

    @GetMapping("/followers/{userId}")
    public FollowerResponse getFollowers(@RequestHeader(value = "Authorization", required = false) String authHeader
            ,@PathVariable long userId) {
        if (authHeader == null || !authHeader.startsWith("Bearer ") || !jwtUtil.isTokenValid(authHeader.substring(7))) {
            return new FollowerResponse(false, null, null);
        }
        List<Long> followers = followersService.getFollowers(userId);
        return new FollowerResponse(true , null , followers);
    }

    @GetMapping("/is-following")
    public IsFollowingResponse isFollowing(@RequestHeader(value = "Authorization", required = false) String authHeader
            ,@RequestParam long followerUserId, @RequestParam long followedUserId) {
        if (authHeader == null || !authHeader.startsWith("Bearer ") || !jwtUtil.isTokenValid(authHeader.substring(7))) {
            return new IsFollowingResponse(false, null , false);
        }
        BasicResponse validate = followersService.validateFollower(followerUserId, followedUserId);
        if (!validate.isSuccess()) {
            return new IsFollowingResponse(false , validate.getErrorCode(), false);
        }
        boolean result = followersService.isFollowing(followerUserId, followedUserId);
        return new IsFollowingResponse(true, null ,result );
    }

}
