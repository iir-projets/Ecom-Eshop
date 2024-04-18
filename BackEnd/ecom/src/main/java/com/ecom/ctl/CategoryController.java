package com.ecom.ctl;

import java.io.IOException;
import java.util.Base64;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ecom.dto.CategoryResponseDTO;
import com.ecom.entity.CategoryEntity;
import com.ecom.service.CategoryService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
public class CategoryController {
	
	@Autowired
	public CategoryService service;
	
	@Autowired
	private ObjectMapper objectMapper;
	
	@CrossOrigin(origins = "http://localhost:3000")
	@PostMapping("/addCategory")
	public ResponseEntity<?> Add(@RequestParam("image") MultipartFile image,@RequestParam("categoryData") String categoryData ) {
		CategoryEntity entity = null;
		ResponseEntity<?> dto = null;
		String imageContent = null;
		try {
			entity = objectMapper.readValue(categoryData, CategoryEntity.class);
			if(image!=null)
				try {
					imageContent = Base64.getEncoder().encodeToString(image.getBytes());
					
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			System.out.println(entity.toString());
			entity.setImage(imageContent);
			 dto = service.Add(entity);
			System.out.println("dto:" + dto);
		} catch (JsonMappingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (JsonProcessingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return dto;
	}
	
	@CrossOrigin(origins = "http://localhost:3000/")
	@GetMapping("/categories")
	public ResponseEntity<?> list() {
		List<CategoryEntity> list = service.list();
		System.out.println("list:" + list);
		return ResponseEntity.ok(new CategoryResponseDTO(list, null));
	}
	
	@CrossOrigin(origins = "http://localhost:3000/")
	@PatchMapping("/updateCategory")
	public CategoryEntity update(@RequestParam("image") MultipartFile image,@RequestParam("categoryData") String categoryData) {
		CategoryEntity entity = null;
		String imageContent = null;
		CategoryEntity dto = null;
		try {
			entity = objectMapper.readValue(categoryData, CategoryEntity.class);
			if(image!=null)
				try {
					imageContent = Base64.getEncoder().encodeToString(image.getBytes());
					
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			entity.setImage(imageContent);
			 dto = service.Update(entity);
			System.out.println("dto:" + dto);
			
		} catch (JsonMappingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (JsonProcessingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return dto;
	
	}
	
	@CrossOrigin(origins = "http://localhost:3000/")
	@DeleteMapping("/deleteCategory")
	public List<CategoryEntity> delete(@RequestParam long id ){		
		List<CategoryEntity> list = service.Delete(id);
		return list;
	}
	
	@CrossOrigin(origins = "http://localhost:3000/")
	@GetMapping("/category")
	public ResponseEntity<?> category(@RequestParam long id) {
		CategoryEntity entity = service.findById(id);
		System.out.println("entity:" + entity);
		return ResponseEntity.ok(new CategoryResponseDTO(null, entity));
	}


}
