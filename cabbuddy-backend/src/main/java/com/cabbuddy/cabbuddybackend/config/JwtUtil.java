package com.cabbuddy.cabbuddybackend.config;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    // ✅ Strong secret key (same as before)
    private final String SECRET_KEY =
            "sgdsdiudgougeyufgeof87r983r7r98hiujkdjksbhkdhi7y87438473984efbjdhsd";

    private final long EXPIRATION_TIME = 1000 * 60 * 60 * 10; // 10 hours

    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
    }

    // =========================================================
    // 1️⃣ Generate token (UPDATED → includes userId)
    // =========================================================
    public String generateToken(Long userId, String email, String role) {
        return Jwts.builder()
                .setSubject(email)
                .claim("userId", userId)   // ✅ IMPORTANT
                .claim("role", role)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    // =========================================================
    // 2️⃣ Extract email (NULL SAFE)
    // =========================================================
    public String extractEmail(String token) {
        Claims claims = extractClaims(token);
        return claims != null ? claims.getSubject() : null;
    }

    // =========================================================
    // 3️⃣ Extract userId (NEW)
    // =========================================================
    public Long extractUserId(String token) {
        Claims claims = extractClaims(token);
        if (claims == null) return null;

        Object userId = claims.get("userId");
        if (userId == null) return null;

        return Long.valueOf(userId.toString());
    }

    // =========================================================
    // 4️⃣ Extract role
    // =========================================================
    public String extractRole(String token) {
        Claims claims = extractClaims(token);
        return claims != null ? claims.get("role", String.class) : null;
    }

    // =========================================================
    // 5️⃣ Extract expiration
    // =========================================================
    public Date extractExpiration(String token) {
        Claims claims = extractClaims(token);
        return claims != null ? claims.getExpiration() : null;
    }

    // =========================================================
    // 6️⃣ Validate token
    // =========================================================
    public boolean validateToken(String token, String email) {
        String extractedEmail = extractEmail(token);
        return extractedEmail != null
                && extractedEmail.equals(email)
                && !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) {
        Date expiration = extractExpiration(token);
        return expiration == null || expiration.before(new Date());
    }

    // =========================================================
    // 7️⃣ Extract claims (LOG REAL ERRORS)
    // =========================================================
    private Claims extractClaims(String token) {
        try {
            return Jwts.parserBuilder()
                    .setSigningKey(getSigningKey())
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
        } catch (ExpiredJwtException e) {
            System.out.println("JWT expired");
        } catch (UnsupportedJwtException e) {
            System.out.println("JWT unsupported");
        } catch (MalformedJwtException e) {
            System.out.println("JWT malformed");
        } catch (SignatureException e) {
            System.out.println("JWT signature invalid");
        } catch (IllegalArgumentException e) {
            System.out.println("JWT token empty or null");
        }
        return null;
    }
}
