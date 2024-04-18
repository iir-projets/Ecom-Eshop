package com.ecom.ctl;

import java.io.IOException;
import java.util.ArrayList;
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

import com.ecom.dto.ProductResponseDTO;
import com.ecom.entity.CategoryEntity;
import com.ecom.entity.ProductEntity;
import com.ecom.service.CategoryService;
import com.ecom.service.ProductService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
public class ProdutController {

	@Autowired
	public ProductService service;
	
	@Autowired
	public CategoryService catService;

	@Autowired
	private ObjectMapper objectMapper;

	@CrossOrigin(origins = "http://localhost:3000")
	@PostMapping("/addProduct")
	public ResponseEntity<?> Add(@RequestParam("image") MultipartFile image,
			@RequestParam("productData") String productData) {
		ProductEntity entity = null;
		ResponseEntity<?> dto = null;
		String imageContent = null;
		try {
			entity = objectMapper.readValue(productData, ProductEntity.class);
			if (image != null)
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
	@GetMapping("/products")
	public ResponseEntity<?> list() {
		List<ProductEntity> list = service.list();
		System.out.println("list:" + list);
		List<CategoryEntity> catlist = catService.list();
		System.out.println("list:" + catlist);
		return ResponseEntity.ok(new ProductResponseDTO(list, null, catlist));
	}

	@CrossOrigin(origins = "http://localhost:3000/")
	@PatchMapping("/updateProduct")
	public ProductEntity update(@RequestParam("image") MultipartFile image,
			@RequestParam("productData") String productData) {
		ProductEntity entity = null;
		String imageContent = null;
		ProductEntity dto = null;
		try {
			entity = objectMapper.readValue(productData, ProductEntity.class);
			if (image != null)
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
	@DeleteMapping("/deleteProduct")
	public List<ProductEntity> delete(@RequestParam long id) {
		List<ProductEntity> list = service.Delete(id);
		return list;
	}
	
	
	@CrossOrigin(origins = "http://localhost:3000/")
	@GetMapping("/product")
	public ResponseEntity<?> category(@RequestParam long id) {
		List<ProductEntity> proList = new ArrayList<>();
		ProductEntity entity = service.findById(id);
		System.out.println("entity:" + entity.getProductName());
	     proList.add(entity);
	     List<CategoryEntity> catlist = catService.list();
		System.out.println("list:" + catlist);
		return ResponseEntity.ok(new ProductResponseDTO(null, proList, catlist));
	}

}
