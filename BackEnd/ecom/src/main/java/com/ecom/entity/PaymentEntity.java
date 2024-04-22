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
@Table(name = "payment")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PaymentEntity {
	
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
	
	@Column(name = "cardNumber", length = 755)
	private String cardNumber;
	
	@Column(name = "cardHolderName", length = 755)
	private String cardHolderName;
	
	@Column(name = "expiryDate", length = 755)
	private String expiryDate;
	
	@Column(name = "cvv", length = 755)
	private String cvv;
	
	@Column(name = "userId")
	private Long userId;
	
	@Column(name = "totalPrice")
	private Long totalPrice;
	
	@Column(name = "status", length = 755)
	private String status;

	@Override
	public String toString() {
		return "PaymentEntity [id=" + id + ", cardNumber=" + cardNumber + ", cardHolderName=" + cardHolderName
				+ ", expiryDate=" + expiryDate + ", cvv=" + cvv + ", userId=" + userId + ", totalPrice=" + totalPrice
				+ ", status=" + status + "]";
	}
	
	

}
