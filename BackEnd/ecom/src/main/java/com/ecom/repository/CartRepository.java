package com.ecom.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecom.entity.CartEntity;


public interface CartRepository extends JpaRepository<CartEntity, Long> {
	
	public CartEntity findById(long id);
    public CartEntity findByCatId(long id);
	public CartEntity findByProductId(long id);
	public List<CartEntity> findByUserId(long id);

}
