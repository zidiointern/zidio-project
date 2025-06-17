package com.zidiointern.authbackend.util;

import com.zidiointern.authbackend.model.User;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    private final long EXPIRATION_TIME = 86400000; // 1 day (in ms)

    //  Use a truly 64-byte secure secret key
    private static final String SECRET = "zidiointern-super-secure-authentication-secret-key-2025@123456789";
    private final Key secretKey = Keys.hmacShaKeyFor(SECRET.getBytes());

    //  Generate JWT token
    public String generateToken(String email) {
        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(secretKey, SignatureAlgorithm.HS512)
                .compact();
    }

    //  Extract username (email) from token
    public String extractUsername(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    //  Validate token by comparing email and checking expiration
    public boolean validateToken(String token, User user) {
        final String email = extractUsername(token);
        return (email.equals(user.getEmail()) && !isTokenExpired(token));
    }

    // Check if token is expired
    private boolean isTokenExpired(String token) {
        Date expiration = Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getExpiration();
        return expiration.before(new Date());
    }
}