package com.ecom.ctl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ecom.dto.UserResponseDTO;
import com.ecom.entity.User;
import com.ecom.service.UserService;





@RestController
public class UserController {
	
	@Autowired
	public UserService userService;
	
	@CrossOrigin(origins = "http://localhost:3000")
	@PostMapping("/registration")
	public ResponseEntity<?> createUser(@RequestBody User entity) {
		
		entity.setRole("User");
		entity.setEnabled(true);
		System.out.println(entity.toString());
 
		ResponseEntity<?> userEntity = userService.CreateUser(entity);
		System.out.println("userEntity:" + userEntity);
		
		return userEntity;
	}
	
	@CrossOrigin(origins = "http://localhost:3000/")
	@GetMapping("/users")
	public ResponseEntity<?> GetUserList() {
		List<User> list = userService.GetUserList();
		System.out.println("userEntity:" + list);
		return ResponseEntity.ok(new UserResponseDTO(list, null));
	}
	
	@CrossOrigin(origins = "http://localhost:3000/")
	@PatchMapping("/updateuser")
	public User UpdateUser(@RequestBody User entity) {
		entity.setRole("User");
		entity.setEnabled(true);
		User user = userService.UpdateUser(entity);
		System.out.println("userEntity:" + user);
		return user;
	}
	
	@CrossOrigin(origins = "http://localhost:3000/")
	@DeleteMapping("/deleteuser")
	public List<User> DelUser(@RequestParam long id ){		
		List<User> list = userService.DelUser(id);
		return list;
	}
	
	@CrossOrigin(origins = "http://localhost:3000/")
	@GetMapping("/user")
	public ResponseEntity<?> Userinfot(@RequestParam long id) {
		User user = userService.findUserById(id);
		System.out.println("userEntity:" + user);
		return ResponseEntity.ok(new UserResponseDTO(null, user));
	}

}
