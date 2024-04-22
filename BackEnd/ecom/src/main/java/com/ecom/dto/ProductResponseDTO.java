package com.ecom.dto;

import java.util.List;

import com.ecom.entity.CategoryEntity;
import com.ecom.entity.ProductEntity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProductResponseDTO {

private List<ProductEntity> products;
	
private List<ProductEntity> product;

private List<CategoryEntity> categories;

}
