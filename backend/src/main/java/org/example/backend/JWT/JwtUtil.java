package org.example.backend.JWT;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    // שימוש במפתח קבוע ואלגוריתם תואם (HS256)
    private final String SECRET = "MySuperSecretKeyForSocialNetworkProjectNeedsToBeLongEnough";
    private final Key SECRET_KEY = Keys.hmacShaKeyFor(SECRET.getBytes());

    private final long EXPIRATION_TIME = 1000 * 60 * 60 *24;


    public String generateToken(String username){
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SECRET_KEY , SignatureAlgorithm.HS256)
                .compact();
    }

    public String extractUsername(String token){
        return getClaims(token).getSubject();
    }

    public boolean validateToken(String token , String username){
        try {
            String extractedUsername = extractUsername(token);
            return extractedUsername.equals(username);
        } catch (Exception e) {
            return false;
        }
    }

    public boolean isTokenValid(String token){
        try {
            extractUsername(token);
            System.out.println("Token is valid");
            return true;
        } catch (Exception e) {
            System.out.println("Token is not valid");
            return false;
        }
    }

    private Claims getClaims(String token){
        return Jwts.parserBuilder()
                .setSigningKey(SECRET_KEY)
                .build()
                .parseClaimsJws(token)
                .getBody();

    }
}
