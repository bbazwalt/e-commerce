package com.ecommerce.backend.configuration;

import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtProvider {

	SecretKey key = Keys.hmacShaKeyFor(JwtConstant.SECRET_KEY.getBytes());


	public String generateToken(Authentication authentication) {
		String jwt = Jwts.builder().issuer("Benilton Azwalt").issuedAt(new Date())
				.expiration(new Date(new Date().getTime() + 86400000)).claim("username", authentication.getName())
				.signWith(key).compact();
		return jwt;
	}

	public String getUsernameFromToken(String jwt) {
		jwt = jwt.substring(7);
		Claims claims = Jwts.parser().verifyWith(key).build().parseSignedClaims(jwt).getPayload();
		String username = String.valueOf(claims.get("username"));
		return username;
	}

}
