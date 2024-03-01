package com.azwalt.ecommerce.order;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.azwalt.ecommerce.cart.CartService;
import com.azwalt.ecommerce.shared.ApiResponse;
import com.azwalt.ecommerce.user.User;
import com.azwalt.ecommerce.user.UserService;
import com.razorpay.Payment;
import com.razorpay.PaymentLink;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;

import jakarta.validation.constraints.NotNull;

@Validated
@RestController
@RequestMapping("/api/v1/payments")
public class PaymentController {

	@Value("${razorpay.api.key}")
	private String apiKey;

	@Value("${razorpay.api.secret}")
	private String apiSecret;

	private OrderService orderService;

	private CartService cartService;

	private UserService userService;

	public PaymentController(@Value("${razorpay.api.key}") String apiKey,
			@Value("${razorpay.api.secret}") String apiSecret, OrderService orderService, CartService cartService,
			UserService userService) {
		super();
		this.apiKey = apiKey;
		this.apiSecret = apiSecret;
		this.cartService = cartService;
		this.orderService = orderService;
		this.userService = userService;
	}

	@PostMapping("/{orderId}")
	public ResponseEntity<?> createPaymentLink(@PathVariable @NotNull Long orderId) {
		try {
			Order order = orderService.findOrderById(orderId);
			RazorpayClient razorpayClient = new RazorpayClient(apiKey, apiSecret);
			JSONObject paymentLinkRequest = new JSONObject();
			paymentLinkRequest.put("amount", order.getTotalDiscountedPrice());
			paymentLinkRequest.put("currency", "INR");

			JSONObject customer = new JSONObject();
			customer.put("name", order.getUser().getFullName());
			paymentLinkRequest.put("customer", customer);

			JSONObject notify = new JSONObject();
			notify.put("sms", true);
			notify.put("email", true);
			paymentLinkRequest.put("notify", notify);

			paymentLinkRequest.put("callback_url", "https://azwalt-e-commerce.vercel.app/payment/" + orderId);
			paymentLinkRequest.put("callback_method", "get");
			PaymentLink payment = razorpayClient.paymentLink.create(paymentLinkRequest);
			String paymentLinkId = payment.get("id");
			String paymentLinkUrl = payment.get("short_url");

			PaymentLinkResponse res = new PaymentLinkResponse();
			res.setPayment_link_id(paymentLinkId);
			res.setPayment_link_url(paymentLinkUrl);

			return new ResponseEntity<PaymentLinkResponse>(res, HttpStatus.CREATED);

		} catch (RazorpayException | OrderException exception) {
			return new ResponseEntity<ApiResponse>(new ApiResponse(exception.getMessage(), false),
					HttpStatus.BAD_REQUEST);
		} catch (Exception exception) {
			return new ResponseEntity<>(new ApiResponse("An error occurred while creating the payment link.", false),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping
	public ResponseEntity<ApiResponse> paymentRedirect(@RequestParam(name = "paymentId") @NotNull String paymentId,
			@RequestParam(name = "orderId") @NotNull Long orderId,
			@RequestHeader("Authorization") @NotNull String token) {
		try {
			User user = userService.findUserByToken(token);
			RazorpayClient razorpayClient = new RazorpayClient(apiKey, apiSecret);
			Payment payment = razorpayClient.payments.fetch(paymentId);
			if (payment.get("status").equals("captured")) {
				orderService.placeOrder(orderId);
			}
			cartService.emptyCart(user);
			return new ResponseEntity<ApiResponse>(new ApiResponse("Your order get placed", true), HttpStatus.OK);
		} catch (BadCredentialsException badCredentialsException) {
			return new ResponseEntity<ApiResponse>(new ApiResponse(badCredentialsException.getMessage(), false),
					HttpStatus.UNAUTHORIZED);
		} catch (UsernameNotFoundException usernameNotFoundException) {
			return new ResponseEntity<ApiResponse>(new ApiResponse(usernameNotFoundException.getMessage(), false),
					HttpStatus.NOT_FOUND);
		} catch (RazorpayException | OrderException exception) {
			return new ResponseEntity<ApiResponse>(new ApiResponse(exception.getMessage(), false),
					HttpStatus.BAD_REQUEST);
		} catch (Exception exception) {
			return new ResponseEntity<>(new ApiResponse("An error occurred while redirecting the payment.", false),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping("/place/{orderId}")
	public ResponseEntity<ApiResponse> bypassPayment(@PathVariable Long orderId,
			@RequestHeader("Authorization") String token) {
		try {
			orderService.placeOrder(orderId);
			User user = userService.findUserByToken(token);
			cartService.emptyCart(user);
			return new ResponseEntity<ApiResponse>(new ApiResponse("Your order get placed", true), HttpStatus.OK);
		} catch (BadCredentialsException badCredentialsException) {
			return new ResponseEntity<ApiResponse>(new ApiResponse(badCredentialsException.getMessage(), false),
					HttpStatus.UNAUTHORIZED);
		} catch (UsernameNotFoundException usernameNotFoundException) {
			return new ResponseEntity<ApiResponse>(new ApiResponse(usernameNotFoundException.getMessage(), false),
					HttpStatus.NOT_FOUND);
		} catch (IllegalArgumentException | OrderException exception) {
			return new ResponseEntity<ApiResponse>(new ApiResponse(exception.getMessage(), false),
					HttpStatus.BAD_REQUEST);
		} catch (Exception exception) {
			return new ResponseEntity<>(new ApiResponse("An error occurred while bypassing the payment.", false),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}
