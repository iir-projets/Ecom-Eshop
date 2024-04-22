package com.ecom.entity;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RequiredResponse {
	private String error;

	public RequiredResponse(String error) {
		this.error = error;
	}

}
