package com.ecom.dto;

import java.util.List;

import com.ecom.entity.OrderEntity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class OrderResponseDTO {
	
private List<OrderEntity> orders;
	
	private OrderEntity order;
	
	private Long totalPrice;

}
