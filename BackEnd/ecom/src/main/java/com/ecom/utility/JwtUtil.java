package com.ecom.utility;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

// Utilitaire pour la manipulation de JWT
@Component
public class JwtUtil {

    private static final long serialVersionUID = -2550185165626007488L;

    // Durée de validité du jeton JWT en secondes (5 heures)
    public static final long JWT_TOKEN_VALIDITY = 5 * 60 * 60;

    // Clé secrète pour signer les jetons JWT
    private String secret = "java";

    // Extraire le nom d'utilisateur du jeton JWT
    public String getUsernameFromToken(String token) {
        return getClaimFromToken(token, Claims::getSubject);
    }

    // Extraire la date d'expiration du jeton JWT
    public Date getExpirationDateFromToken(String token) {
        return getClaimFromToken(token, Claims::getExpiration);
    }

    public <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = getAllClaimsFromToken(token);
        return claimsResolver.apply(claims);
    }

    // Extraire toutes les revendications du jeton JWT
    private Claims getAllClaimsFromToken(String token) {
        return Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
    }

    // Vérifier si le jeton a expiré avec une marge de tolérance
    private Boolean isTokenExpired(String token) {
        final Date expiration = getExpirationDateFromToken(token);
        Date now = new Date();
        // Ajouter une marge de tolérance de 5 minutes
        return expiration.before(new Date(now.getTime() + (5 * 60 * 1000)));
    }

    // Générer un jeton JWT pour l'utilisateur
    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        return doGenerateToken(claims, userDetails.getUsername());
    }

    // Créer le jeton JWT :
    // 1. Définir les revendications du jeton, telles que l'émetteur, la date d'expiration, le sujet et l'ID.
    // 2. Signer le JWT en utilisant l'algorithme HS512 et la clé secrète.
    // 3. Compacter le JWT selon la sérialisation compacte JWS.
    private String doGenerateToken(Map<String, Object> claims, String subject) {
        return Jwts.builder().setClaims(claims).setSubject(subject).setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + JWT_TOKEN_VALIDITY * 1000))
                .signWith(SignatureAlgorithm.HS512, secret).compact();
    }

    // Valider le jeton JWT
   // Valider le jeton JWT
public String validateToken(String token, UserDetails userDetails) {
    final String username = getUsernameFromToken(token);
    if (username.equals(userDetails.getUsername())) {
        if (isTokenExpired(token)) {
            // Le jeton est expiré, générons un nouveau jeton avec une nouvelle date d'expiration
            return generateToken(userDetails);
        } else {
            // Le jeton est valide, retournez le jeton existant
            return token;
        }
    } else {
        return null;
    }
}

}
