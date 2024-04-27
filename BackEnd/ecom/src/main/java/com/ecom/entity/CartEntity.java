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
@Table(name = "cart")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CartEntity {
	
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
	
	@Column(name = "catId")
	private Long catId;
	
	@Column(name = "productId")
	private Long productId;
	
	@Column(name = "userId")
	private Long userId;
	
	@Column(name = "productName", length = 755)
	private String productName;
	
	@Column(name = "quantity")
	private Long quantity;
	
	@Column(name = "price")
	private Long price;
	
	@Column(name = "image", columnDefinition = "LONGBLOB")
	private String image;



}
