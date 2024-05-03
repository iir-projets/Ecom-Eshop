package com.ecom.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.ecom.entity.CategoryEntity;
import com.ecom.exception.RecordNotFoundException;
import com.ecom.repository.CategoryRepository;

@Service
public class CategoryService {

	@Autowired
	public CategoryRepository repository;

	public ResponseEntity<?> Add(CategoryEntity entity) {
		CategoryEntity cEntity = null;
		try {
			CategoryEntity category = repository.findByName(entity.getName());
			if (category == null) {
				cEntity = repository.save(entity);
			} else {
				System.out.println("Duplicate Category..");
				throw new RecordNotFoundException("Category is already available");
			}
		} catch (Exception e) {

			throw new RecordNotFoundException("Category is already available");
		}
		return new ResponseEntity<>(cEntity, HttpStatus.OK);
	}

	public List<CategoryEntity> list() {
		List<CategoryEntity> list = null;

		list = repository.findAll();

		return list;
	}

	public CategoryEntity Update(CategoryEntity user) {

		CategoryEntity entity = repository.saveAndFlush(user);
		return entity;
	}

	public List<CategoryEntity> Delete(long id) {
		List<CategoryEntity> list = null;
		if (findById(id) != null) {
			repository.deleteById(id);
			list = repository.findAll();
		} else {
			throw new RecordNotFoundException("Not a valid user id");
		}
		return list;
	}

	public CategoryEntity findById(long id) {
		try {
			if (id > 0) {
				CategoryEntity entity = repository.findById(id);
				if (entity == null) {
					throw new RecordNotFoundException("Record not found");

				} else {
					return entity;
				}
			} else {
				throw new RecordNotFoundException("Not a valid user id");
			}
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			throw new RecordNotFoundException("Record not found");
		}
	}

}
