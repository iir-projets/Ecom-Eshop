package com.ecom.ctl;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import com.ecom.entity.User;
import com.ecom.model.JwtRequest;
import com.ecom.model.JwtResponse;
import com.ecom.repository.UserRepository;
import com.ecom.service.CustomUserDetailsService;
import com.ecom.utility.JwtUtil;



@RestController
@CrossOrigin(origins = "*")
public class JwtController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @Autowired
    private JwtUtil jwtUtil;

    @RequestMapping(value = "/token", method = RequestMethod.POST)
    public ResponseEntity<?> generateToken(@RequestBody JwtRequest jwtRequest) throws Exception {
    	String token = null;
    	User user = null;
        System.out.println("Inside Controller");
        System.out.println(jwtRequest);
        try {

            this.authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(jwtRequest.getUsername(), jwtRequest.getPassword()));
            UserDetails userDetails = this.customUserDetailsService.loadUserByUsername(jwtRequest.getUsername());

             token = this.jwtUtil.generateToken(userDetails);
            System.out.println("JWT " + token);
            user = userRepository.findByUsername(jwtRequest.getUsername());

        } catch (UsernameNotFoundException e) {
            e.printStackTrace();
            throw new Exception("Bad Credentials");
        }catch (BadCredentialsException e)
        {
            e.printStackTrace();
            throw new Exception("Bad Credentials");
            
        }


        //fine area..
   
        //{"token":"value"}

        return ResponseEntity.ok(new JwtResponse(token, user));

    }
}
