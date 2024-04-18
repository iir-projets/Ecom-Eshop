package com.ecom.ctl;

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
import com.ecom.dto.OrderResponseDTO;
import com.ecom.entity.CartEntity;
import com.ecom.entity.OrderEntity;
import com.ecom.entity.User;
import com.ecom.exception.RecordNotFoundException;
import com.ecom.model.CustomUserDetails;
import com.ecom.service.CartService;
import com.ecom.service.CategoryService;
import com.ecom.service.OrderService;
import com.ecom.service.ProductService;
import com.ecom.service.UserService;

@RestController
public class OrderController {
	
	@Autowired
	public OrderService service;
	
	@Autowired
	public CategoryService catService;
	
	@Autowired
	public ProductService productService;

	@Autowired
	public UserService userService;
	
	@Autowired
	public CartService cartService;


	@CrossOrigin(origins = "http://localhost:3000")
	@PostMapping("/AddOrder")
	public ResponseEntity<?> AddOrder(@RequestBody OrderEntity entity) {
		
		List<CartEntity> list = cartService.list();
		try {
			
			long totalPrice = 0;
		    long userId = entity.getUserId();
		    User uDto = userService.findUserById(userId);
		    String address = entity.getAddress();
			for (CartEntity cartEntity : list) {
				entity = new OrderEntity();
				System.out.println("Exe Cycle:");
				entity.setCatId(cartEntity.getCatId());
				entity.setProductId(cartEntity.getProductId());
				entity.setProductName(cartEntity.getProductName());
				entity.setQuantity(cartEntity.getQuantity());
				entity.setPrice(cartEntity.getPrice());
				entity.setPaymentStatus("Pendding");
				entity.setUserId(userId);
				entity.setUsername(uDto.getUsername());
			    entity.setAddress(address);
				
				service.Add(entity);
				totalPrice = totalPrice + cartEntity.getPrice();
				
			}
			
			List<OrderEntity> orderList = service.list();
			
			return ResponseEntity.ok(new OrderResponseDTO(orderList, null, totalPrice));
		}catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			throw new RecordNotFoundException("Not able to place order");
			
		}
		
	
		
	}
	
	@CrossOrigin(origins = "http://localhost:3000/")
	@GetMapping("/orders")
	public ResponseEntity<?> list() {
		List<OrderEntity> list = null;
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		CustomUserDetails user = (CustomUserDetails) auth.getPrincipal();
		
		User uDto = userService.findUserByUserName(user.getUsername());
		if(uDto.getRole().equals("Admin")) {
			list = service.list();
		}else {
			 list = service.findByUserId(uDto.getId());
		}
		
		System.out.println("OrderEntity:" + list);
		return ResponseEntity.ok(new OrderResponseDTO(list, null, null));
	}
	
	@CrossOrigin(origins = "http://localhost:3000/")
	@PatchMapping("/updateOrder")
	public OrderEntity Update(@RequestBody OrderEntity entity) {
	
		OrderEntity cart = service.Update(entity);
		System.out.println("cart:" + cart);
		return cart;
	}
	
	@CrossOrigin(origins = "http://localhost:3000/")
	@DeleteMapping("/deleteOrder")
	public List<OrderEntity> deleteOrder(@RequestParam long id ){		
		List<OrderEntity> list = service.Delete(id);
		return list;
	}
	
	@CrossOrigin(origins = "http://localhost:3000/")
	@GetMapping("/orderById")
	public ResponseEntity<?> orderById(@RequestParam long id) {
		OrderEntity order = service.findById(id);
		System.out.println("cartEntity:" + order);
		return ResponseEntity.ok(new OrderResponseDTO(null, order, null));
	}
	
	@CrossOrigin(origins = "http://localhost:3000/")
	@GetMapping("/ordersByUser")
	public ResponseEntity<?> ordersByUser() {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		CustomUserDetails user = (CustomUserDetails) auth.getPrincipal();
		
		User uDto = userService.findUserByUserName(user.getUsername());
		
		List<OrderEntity> list = service.findByUserId(uDto.getId());
		System.out.println("CartList:" + list);
		return ResponseEntity.ok(new OrderResponseDTO(list, null, null));
	}
	

}
