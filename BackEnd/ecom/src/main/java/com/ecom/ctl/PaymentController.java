package com.ecom.ctl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ecom.dto.OrderResponseDTO;
import com.ecom.dto.PaymentResponseDTO;
import com.ecom.entity.CartEntity;
import com.ecom.entity.OrderEntity;
import com.ecom.entity.PaymentEntity;
import com.ecom.entity.ProductEntity;
import com.ecom.exception.RecordNotFoundException;
import com.ecom.service.CartService;
import com.ecom.service.CategoryService;
import com.ecom.service.OrderService;
import com.ecom.service.PaymentService;
import com.ecom.service.ProductService;
import com.ecom.service.UserService;

@RestController
public class PaymentController {
	
	@Autowired
	public PaymentService service;
	
	@Autowired
	public CategoryService catService;
	
	@Autowired
	public ProductService productService;

	@Autowired
	public UserService userService;
	
	@Autowired
	public CartService cartService;
	
	@Autowired
	public OrderService orderService;


	@CrossOrigin(origins = "http://localhost:3000")
	@PostMapping("/AddPayment")
	public ResponseEntity<?> AddPayment(@RequestBody PaymentEntity entity) {
	try {
		
		System.out.println("Payment entity:" +entity);
		        entity.setStatus("Paid");
		        service.Add(entity);
				cartService.DeleteAll();
				long userId = entity.getUserId();
				
			 List<OrderEntity> orders =	orderService.findByUserId(userId);
			 for (OrderEntity orderEntity : orders) {

				 orderEntity.setPaymentStatus("Paid");
				 orderService.Update(orderEntity);
				 
				 ProductEntity productEntity = productService.findById(orderEntity.getProductId());
				 
				 productEntity.setQuantity(productEntity.getQuantity()-1);
				 productService.Update(productEntity);
				 
			}
				
				List<PaymentEntity> list = service.list();
				System.out.println("OrderEntity:" + list);
				return ResponseEntity.ok(new PaymentResponseDTO(list, null));
	
		}catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			throw new RecordNotFoundException("Not able to place order");
			
		}
		
	
		
	}
	
	@CrossOrigin(origins = "http://localhost:3000/")
	@GetMapping("/payments")
	public ResponseEntity<?> list() {
		List<PaymentEntity> list = service.list();
		System.out.println("OrderEntity:" + list);
		return ResponseEntity.ok(new PaymentResponseDTO(list, null));
	}
	

}
