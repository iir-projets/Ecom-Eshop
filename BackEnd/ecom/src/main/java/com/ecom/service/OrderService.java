package com.ecom.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.ecom.entity.OrderEntity;
import com.ecom.exception.RecordNotFoundException;
import com.ecom.repository.OrderRepository;

@Service
public class OrderService {
	

	@Autowired
	public OrderRepository repository;

	public ResponseEntity<?> Add(OrderEntity entity) {
		OrderEntity cEntity = null;
		try {
			
				cEntity = repository.save(entity);
			
		} catch (Exception e) {
             e.printStackTrace();
			throw new RecordNotFoundException("Something went wrong."+e);
		}
		return new ResponseEntity<>(cEntity, HttpStatus.OK);
	}
	
	

	public List<OrderEntity> list() {
		List<OrderEntity> list = null;

		list = repository.findAll();

		return list;
	}

	public OrderEntity Update(OrderEntity dto) {

		OrderEntity entity = repository.saveAndFlush(dto);
		return entity;
	}

	public List<OrderEntity> Delete(long id) {
		List<OrderEntity> list = null;
		if (findById(id) != null) {
			repository.deleteById(id);
			list = repository.findAll();
		} else {
			throw new RecordNotFoundException("Not a valid record id");
		}
		return list;
	}

	public OrderEntity findById(long id) {
		try {
			if (id > 0) {
				OrderEntity entity = repository.findById(id);
				if (entity == null) {
					throw new RecordNotFoundException("Record not found");

				} else {
					return entity;
				}
			} else {
				throw new RecordNotFoundException("Not a valid record id");
			}
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			throw new RecordNotFoundException("Record not found");
		}
	}
	
	public List<OrderEntity> findByUserId(long id) {
		try {
			if (id > 0) {
				List<OrderEntity> entity = repository.findByUserId(id);
				if (entity == null) {
					throw new RecordNotFoundException("Record not found");

				} else {
					return entity;
				}
			} else {
				throw new RecordNotFoundException("Not a valid record id");
			}
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			throw new RecordNotFoundException("Record not found");
		}
	}

}
