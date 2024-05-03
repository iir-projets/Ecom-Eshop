package com.ecom.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.ecom.entity.User;
import com.ecom.exception.RecordNotFoundException;
import com.ecom.repository.UserRepository;

@Service
public class UserService  {
	
	@Autowired
	public UserRepository userRepository;

	
	public ResponseEntity<?> CreateUser(User entity) {
		User userEntity = null;
		try {
			User user = userRepository.findByUsername(entity.getUsername());
			if(user == null) {
				userEntity = userRepository.save(entity);
			}else {
				System.out.println("Duplicate username");
				throw new RecordNotFoundException("User name is already available");
			}
		}catch (Exception e) {
			
			throw new RecordNotFoundException("User name is already available");
		}
		return new ResponseEntity<>(userEntity,HttpStatus.OK);
	}
	
	public List<User> GetUserList(){
		List<User> list = null;
		
		list = userRepository.findAll();
		
		return list;
	}
	
	public User UpdateUser(User user) {
		
		User userentity = userRepository.saveAndFlush(user);
		return userentity;
	}
	
	
	public List<User> DelUser(long id){
		List<User> list = null;
		if(findUserById(id)!=null) {
			userRepository.deleteById(id);
			list = userRepository.findAll();
		}else {
			throw new RecordNotFoundException("Not a valid user id");
		}
		return list;
	}
	
	public User findUserByUserName(String uname) {
		
      return  userRepository.findByUsername(uname);
	}
	
	
	public User findUserById(long id) {
	try {
		if(id>0) {
			Optional<User> user = userRepository.findById(id);
			if(user == null) {
				throw new RecordNotFoundException("Record not found");
				
			}else {
				return user.get();
			}
		}else {
			throw new RecordNotFoundException("Not a valid user id");
		}
	}catch (Exception e) {
		// TODO: handle exception
		e.printStackTrace();
		throw new RecordNotFoundException("Record not found");
	}
	}
	

}
