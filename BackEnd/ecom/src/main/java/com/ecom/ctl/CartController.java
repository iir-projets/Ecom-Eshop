package com.ecom.ctl;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import com.ecom.dto.CartResponseDTO;

import com.ecom.entity.CartEntity;

import com.ecom.entity.ProductEntity;
import com.ecom.entity.User;
import com.ecom.exception.RecordNotFoundException;
import com.ecom.model.CustomUserDetails;
import com.ecom.service.CartService;
import com.ecom.service.CategoryService;
import com.ecom.service.ProductService;
import com.ecom.service.UserService;
import com.ecom.utility.DataUtility;


@RestController
public class CartController {
	
	
	@Autowired
	public CartService service;
	
	@Autowired
	public CategoryService catService;
	
	@Autowired
	public ProductService productService;

	@Autowired
	public UserService userService;


	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping("/addCart")
	public ResponseEntity<?> AddCart(@RequestParam long id) {
		ResponseEntity<?> dto = null;
		CartEntity entity = new CartEntity();
		try {
			Authentication auth = SecurityContextHolder.getContext().getAuthentication();
			CustomUserDetails user = (CustomUserDetails) auth.getPrincipal();
			
			User uDto = userService.findUserByUserName(user.getUsername());
			
			System.out.println("UserId: "+uDto.getId()+" : uname: "+ user.getUsername());
			
			
			long prodcutId = id;
	         
	         
	         ProductEntity pEntity = productService.findById(prodcutId);
	         //entity.setId(1l);
	         entity.setCatId(DataUtility.getLong(pEntity.getCatId()));
	         entity.setProductId(pEntity.getId());
	         entity.setUserId(uDto.getId());
	         entity.setProductName(pEntity.getProductName());
	         entity.setQuantity(1l);
	         entity.setPrice(pEntity.getPrice());
	         entity.setImage(pEntity.getImage());
	         System.out.println("entity: "+entity.toString());
			 dto = service.Add(entity);
			System.out.println("dto:" + dto);
			//return ResponseEntity.ok(dto);
			List<CartEntity> list = service.findByUserId(uDto.getId());
			System.out.println("userEntity:" + list);
			return ResponseEntity.ok(new CartResponseDTO(list, null));
		}catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			throw new RecordNotFoundException("Product is already in cart");
			
		}
		
	
		
	}
	
	@CrossOrigin(origins = "http://localhost:3000/")
	@GetMapping("/carts")
	public ResponseEntity<?> list() {
		List<CartEntity> list = service.list();
		System.out.println("userEntity:" + list);
		return ResponseEntity.ok(new CartResponseDTO(list, null));
	}
	
	@CrossOrigin(origins = "http://localhost:3000/")
	@PatchMapping("/updatecart")
	public CartEntity Update(@RequestBody CartEntity entity) {
	
		CartEntity cart = service.Update(entity);
		System.out.println("cart:" + cart);
		return cart;
	}
	
	@CrossOrigin(origins = "http://localhost:3000/")
	@DeleteMapping("/deletecart")
	public List<CartEntity> DelUser(@RequestParam long id ){		
		List<CartEntity> list = service.Delete(id);
		if(list !=null) {
			return list;
		}else {
			return null;
		}
		
		
	}
	
	@CrossOrigin(origins = "http://localhost:3000/")
	@GetMapping("/cart")
	public ResponseEntity<?> cart(@RequestParam long id) {
		CartEntity cart = service.findById(id);
		System.out.println("cartEntity:" + cart);
		return ResponseEntity.ok(new CartResponseDTO(null, cart));
	}
	
	@CrossOrigin(origins = "http://localhost:3000/")
	@GetMapping("/cartsByUser")
	public ResponseEntity<?> cartsByUser() {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		CustomUserDetails user = (CustomUserDetails) auth.getPrincipal();
		
		User uDto = userService.findUserByUserName(user.getUsername());
		
		List<CartEntity> list = service.findByUserId(uDto.getId());
		System.out.println("CartList:" + list);
		return ResponseEntity.ok(new CartResponseDTO(list, null));
	}
	
	
	
	
	
	

}
