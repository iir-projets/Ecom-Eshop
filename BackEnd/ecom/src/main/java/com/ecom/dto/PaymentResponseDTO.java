package com.ecom.dto;

import java.util.List;

import com.ecom.entity.OrderEntity;
import com.ecom.entity.PaymentEntity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PaymentResponseDTO {
	
private List<PaymentEntity> payments;
private PaymentEntity payment;

}
