package com.ecom.entity;



import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "USER")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    
    @Column(name="firstName",length = 225)
    private String firstName;
    
    @Column(name="lastName",length = 225)
    private String lastName;
    
    @Column(name="username",length = 225)
    private String username;
    
    @Column(name="password",length = 225)
    private String password;
    
    @Column(name="email",length = 225)
    private String email;
    
    @Column(name="role",length = 225)
    private String role;
    
    @Column(name="enabled")
    private boolean enabled;
    //more properties as your project requirements

}
