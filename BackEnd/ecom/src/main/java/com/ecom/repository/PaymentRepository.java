package com.ecom.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecom.entity.PaymentEntity;

public interface PaymentRepository extends JpaRepository<PaymentEntity, Long> {
	
   public PaymentEntity findById(long id);
   public List<PaymentEntity> findByUserId(long id);

}
