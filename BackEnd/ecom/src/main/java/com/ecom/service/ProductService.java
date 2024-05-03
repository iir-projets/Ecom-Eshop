package com.ecom.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.ecom.entity.CategoryEntity;
import com.ecom.entity.ProductEntity;
import com.ecom.exception.RecordNotFoundException;
import com.ecom.repository.CategoryRepository;
import com.ecom.repository.ProductRepository;
import com.ecom.utility.DataUtility;

@Service
public class ProductService {

	@Autowired
	public ProductRepository repository;

	
	@Autowired
	public CategoryRepository catRepository;
	
	
	public ResponseEntity<?> Add(ProductEntity entity) {
		ProductEntity cEntity = null;
		try {
			ProductEntity product = repository.findByProductName(entity.getProductName());
			if (product == null) {
				
			CategoryEntity cDto=	catRepository.findById(DataUtility.getLong(entity.getCatId()));
			entity.setCatName(cDto.getName());
				cEntity = repository.save(entity);
			} else {
				System.out.println("Duplicate product..");
				throw new RecordNotFoundException("product is already available");
			}
		} catch (Exception e) {

			throw new RecordNotFoundException("Something went wrong.");
		}
		return new ResponseEntity<>(cEntity, HttpStatus.OK);
	}

	public List<ProductEntity> list() {
		List<ProductEntity> list = null;

		list = repository.findAll();

		return list;
	}

	public ProductEntity Update(ProductEntity dto) {

		ProductEntity entity = repository.saveAndFlush(dto);
		return entity;
	}

	public List<ProductEntity> Delete(long id) {
		List<ProductEntity> list = null;
		if (findById(id) != null) {
			repository.deleteById(id);
			list = repository.findAll();
		} else {
			throw new RecordNotFoundException("Not a valid record id");
		}
		return list;
	}

	public ProductEntity findById(long id) {
		try {
			if (id > 0) {
				ProductEntity entity = repository.findById(id);
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
