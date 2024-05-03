package com.ecom.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.ecom.entity.CartEntity;
import com.ecom.exception.RecordNotFoundException;
import com.ecom.repository.CartRepository;


@Service
public class CartService {
	
	@Autowired
	public CartRepository repository;

	public ResponseEntity<?> Add(CartEntity entity) {
		CartEntity cEntity = null;
		try {
			CartEntity cart = repository.findByProductId(entity.getProductId());
			
			if (cart == null) {
				cEntity = repository.save(entity);
			} else {
				System.out.println("Product Is already Added into cart");
				throw new RecordNotFoundException("Product Is already Added into cart");
			}
		} catch (Exception e) {
             e.printStackTrace();
			throw new RecordNotFoundException("Something went wrong."+e);
		}
		return new ResponseEntity<>(cEntity, HttpStatus.OK);
	}

	public List<CartEntity> list() {
		List<CartEntity> list = null;

		list = repository.findAll();

		return list;
	}

	public CartEntity Update(CartEntity dto) {

		CartEntity entity = repository.saveAndFlush(dto);
		return entity;
	}

	public List<CartEntity> Delete(long id) {
		List<CartEntity> list = null;
		if (findById(id) != null) {
			repository.deleteById(id);
			list = repository.findAll();
		} else {
			throw new RecordNotFoundException("Not a valid record id");
		}
		return list;
	}
	
	public void DeleteAll() {
		repository.deleteAll();
	}

	public CartEntity findById(long id) {
		try {
			if (id > 0) {
				CartEntity entity = repository.findById(id);
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
	
	public List<CartEntity> findByUserId(long id) {
		try {
			if (id > 0) {
				List<CartEntity> entity = repository.findByUserId(id);
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
