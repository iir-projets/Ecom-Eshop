package com.ecom.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecom.entity.OrderEntity;

public interface OrderRepository extends JpaRepository<OrderEntity, Long>{
	
	public OrderEntity findById(long id);
    public OrderEntity findByCatId(long id);
	public OrderEntity findByProductId(long id);
	public List<OrderEntity> findByUserId(long id);

}
