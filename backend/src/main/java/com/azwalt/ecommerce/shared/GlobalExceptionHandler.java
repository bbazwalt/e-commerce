package com.azwalt.ecommerce.shared;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.servlet.NoHandlerFoundException;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import com.azwalt.ecommerce.cart.CartItemException;
import com.azwalt.ecommerce.order.OrderException;
import com.azwalt.ecommerce.product.ProductException;
import com.azwalt.ecommerce.product.category.CategoryException;
import com.azwalt.ecommerce.user.UserException;

@RestControllerAdvice
public class GlobalExceptionHandler {

	private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

	@ExceptionHandler(UserException.class)
	public ResponseEntity<ApiResponse> UserExceptionHandler(UserException userException, WebRequest webRequest) {
		logger.error("UserException: {}", webRequest.getDescription(true), userException);
		ApiResponse apiErrorResponse = new ApiResponse(userException.getMessage(),
				false);
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(apiErrorResponse);
	}

	@ExceptionHandler(ProductException.class)
	public ResponseEntity<ApiResponse> productExceptionHandler(ProductException productException,
			WebRequest webRequest) {
		logger.error("ProductException: {}", webRequest.getDescription(true), productException);
		ApiResponse apiErrorResponse = new ApiResponse(productException.getMessage(),
				false);
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(apiErrorResponse);
	}

	@ExceptionHandler(CategoryException.class)
	public ResponseEntity<ApiResponse> categoryExceptionHandler(CategoryException categoryException,
			WebRequest webRequest) {
		logger.error("CategoryException: {}", webRequest.getDescription(true), categoryException);
		ApiResponse apiErrorResponse = new ApiResponse(categoryException.getMessage(),
				false);
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(apiErrorResponse);
	}

	@ExceptionHandler(CartItemException.class)
	public ResponseEntity<ApiResponse> cartItemExceptionHandler(CartItemException cartItemException,
			WebRequest webRequest) {
		logger.error("CartItemException: {}", webRequest.getDescription(true), cartItemException);
		ApiResponse apiErrorResponse = new ApiResponse(cartItemException.getMessage(),
				false);
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(apiErrorResponse);
	}

	@ExceptionHandler(OrderException.class)
	public ResponseEntity<ApiResponse> orderExceptionHandler(OrderException orderException, WebRequest webRequest) {
		logger.error("OrderException: {}", webRequest.getDescription(true), orderException);
		ApiResponse apiErrorResponse = new ApiResponse(orderException.getMessage(),
				false);
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(apiErrorResponse);
	}

	@ExceptionHandler(BadCredentialsException.class)
	public ResponseEntity<ApiResponse> badCredentialsExceptionHandler(
			BadCredentialsException badCredentialsException, WebRequest webRequest) {
		logger.error("BadCredentialsException: {}", webRequest.getDescription(true), badCredentialsException);
		ApiResponse apiErrorResponse = new ApiResponse(
				"Invalid credentials.",
				false);
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(apiErrorResponse);
	}

	@ExceptionHandler(UsernameNotFoundException.class)
	public ResponseEntity<ApiResponse> usernameNotFoundExceptionHandler(
			UsernameNotFoundException usernameNotFoundException, WebRequest webRequest) {
		logger.error("UsernameNotFoundException: {}", webRequest.getDescription(true), usernameNotFoundException);
		ApiResponse apiErrorResponse = new ApiResponse(usernameNotFoundException.getMessage(),
				false);
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(apiErrorResponse);
	}

	@ExceptionHandler(HttpMessageNotReadableException.class)
	public ResponseEntity<ApiResponse> httpMessageNotReadableExceptionHandler(
			HttpMessageNotReadableException httpMessageNotReadableException, WebRequest webRequest) {
		logger.error("HttpMessageNotReadableException: {}", webRequest.getDescription(true),
				httpMessageNotReadableException);
		ApiResponse apiErrorResponse = new ApiResponse("Invalid input.",
				false);
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(apiErrorResponse);
	}

	@ExceptionHandler(MethodArgumentTypeMismatchException.class)
	public ResponseEntity<ApiResponse> methodArgumentTypeMismatchExceptionHandler(
			MethodArgumentTypeMismatchException methodArgumentTypeMismatchException, WebRequest webRequest) {
		logger.error("MethodArgumentTypeMismatchException: {}", webRequest.getDescription(true),
				methodArgumentTypeMismatchException);
		ApiResponse apiErrorResponse = new ApiResponse("Invalid input.", false);
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(apiErrorResponse);
	}

	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<ApiResponse> handleValidationExceptions(
			MethodArgumentNotValidException methodArgumentNotValidException, WebRequest webRequest) {
		logger.error("MethodArgumentNotValidException: {}", webRequest.getDescription(true),
				methodArgumentNotValidException);
		Map<String, String> errors = new HashMap<>();
		methodArgumentNotValidException.getBindingResult().getAllErrors().forEach((error) -> {
			String fieldName = ((FieldError) error).getField();
			String errorMessage = error.getDefaultMessage();
			errors.put(fieldName, errorMessage);
		});
		ApiResponse apiErrorResponse = new ApiResponse(errors.toString(), false);
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(apiErrorResponse);
	}

	@ExceptionHandler(NoHandlerFoundException.class)
	public ResponseEntity<ApiResponse> noHandlerFoundExceptionHandler(
			NoHandlerFoundException noHandlerFoundException, WebRequest webRequest) {
		logger.error("NoHandlerFoundException: {}", webRequest.getDescription(true),
				noHandlerFoundException);
		ApiResponse apiErrorResponse = new ApiResponse("No handler found.",
				false);
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(apiErrorResponse);
	}

	@ExceptionHandler(NoResourceFoundException.class)
	public ResponseEntity<ApiResponse> noResourceFoundExceptionHandler(
			NoResourceFoundException noResourceFoundException, WebRequest webRequest) {
		logger.error("NoResourceFoundException: {}", webRequest.getDescription(true),
				noResourceFoundException);
		ApiResponse apiErrorResponse = new ApiResponse("No resource found.", false);
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(apiErrorResponse);
	}

	@ExceptionHandler(Exception.class)
	public ResponseEntity<ApiResponse> otherExceptionHandler(Exception except, WebRequest webRequest) {
		logger.error("Exception: {}", webRequest.getDescription(true), except);
		ApiResponse apiErrorResponse = new ApiResponse("An error occurred.",
				false);
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(apiErrorResponse);
	}

}
