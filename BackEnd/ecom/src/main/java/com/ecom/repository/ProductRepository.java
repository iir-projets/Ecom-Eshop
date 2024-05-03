package com.ecom.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecom.entity.ProductEntity;

public interface ProductRepository extends JpaRepository<ProductEntity, Long> {
	
	public ProductEntity findById(long id);
    public ProductEntity findByCatId(long id);
	public ProductEntity findByProductName(String pName);

}
