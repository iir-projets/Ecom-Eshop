package com.ecom.dto;

import java.util.List;

import com.ecom.entity.User;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserResponseDTO {

	private List<User> users;
	
	private User uDto;
}
