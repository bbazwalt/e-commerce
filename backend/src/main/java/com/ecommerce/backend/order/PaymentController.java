package com.ecommerce.backend.order;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.backend.cart.Cart;
import com.ecommerce.backend.cart.CartRepository;
import com.ecommerce.backend.shared.ApiResponse;
import com.ecommerce.backend.user.User;
import com.ecommerce.backend.user.UserException;
import com.ecommerce.backend.user.UserService;
import com.razorpay.Payment;
import com.razorpay.PaymentLink;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;

@RestController
@RequestMapping("/api/v1")
public class PaymentController {

	@Value("${razorpay.api.key}")
	String apiKey;

	@Value("${razorpay.api.secret}")
	String apiSecret;

	@Autowired
	public PaymentController(@Value("${razorpay.api.key}") String apiKey,
			@Value("${razorpay.api.secret}") String apiSecret) {
		this.apiKey = apiKey;
		this.apiSecret = apiSecret;
	}

	@Autowired
	private OrderService orderService;

	@Autowired
	private UserService userService;

	@Autowired
	private CartRepository cartRepository;

	@Autowired
	private OrderRepository orderRepository;

	@PostMapping("/payments/{orderId}")
	public ResponseEntity<PaymentLinkResponse> createPaymentLink(@PathVariable Long orderId,
			@RequestHeader("Authorization") String jwt) throws OrderException, RazorpayException {
		Order order = orderService.findOrderById(orderId);
		try {
			RazorpayClient razorpayClient = new RazorpayClient(apiKey, apiSecret);
			JSONObject paymentLinkRequest = new JSONObject();
			paymentLinkRequest.put("amount", order.getTotalDiscountedPrice());
			paymentLinkRequest.put("currency", "INR");

			JSONObject customer = new JSONObject();
			customer.put("name", order.getUser().getFirstName());
			paymentLinkRequest.put("customer", customer);

			JSONObject notify = new JSONObject();
			notify.put("sms", true);
			paymentLinkRequest.put("notify", notify);

			paymentLinkRequest.put("callback_url", "https://e-commerce-pzp8.onrender.com/payment/" + orderId);
			paymentLinkRequest.put("callback_method", "get");
			PaymentLink payment = razorpayClient.paymentLink.create(paymentLinkRequest);
			String paymentLinkId = payment.get("id");
			String paymentLinkUrl = payment.get("short_url");

			PaymentLinkResponse res = new PaymentLinkResponse();
			res.setPayment_link_id(paymentLinkId);
			res.setPayment_link_url(paymentLinkUrl);

			return new ResponseEntity<PaymentLinkResponse>(res, HttpStatus.CREATED);

		} catch (Exception e) {
			throw new RazorpayException(e.getMessage());
		}
	}

	@GetMapping
	public ResponseEntity<ApiResponse> redirect(@RequestParam(name = "payment_id") String paymentId,
			@RequestParam(name = "order_id") Long orderId, @RequestHeader("Authorization") String jwt)
			throws OrderException, RazorpayException, UserException {
		Order order = orderService.findOrderById(orderId);
		RazorpayClient razorpayClient = new RazorpayClient(apiKey, apiSecret);
		User user = userService.findUserProfileByJwt(jwt);
		try {
			Payment payment = razorpayClient.payments.fetch(paymentId);
			if (payment.get("status").equals("captured")) {
				order.getPaymentDetails().setPaymentId(paymentId);
				order.getPaymentDetails().setStatus("COMPLETED");
				order.setOrderStatus("PLACED");
				orderRepository.save(order);
			}
			emptyCart(user);
			ApiResponse res = new ApiResponse();
			res.setMessage("Your order get placed");
			res.setStatus(true);
			return new ResponseEntity<ApiResponse>(res, HttpStatus.ACCEPTED);

		} catch (Exception e) {
			throw new RazorpayException(e.getMessage());
		}
	}

	@PostMapping("/payments/place/{orderId}")
	public ResponseEntity<ApiResponse> skipPayment(@PathVariable Long orderId,
			@RequestHeader("Authorization") String jwt) throws OrderException, UserException {
		orderService.placeOrder(orderId);
		User user = userService.findUserProfileByJwt(jwt);
		emptyCart(user);
		ApiResponse res = new ApiResponse();
		res.setMessage("Your order get placed");
		res.setStatus(true);
		return new ResponseEntity<ApiResponse>(res, HttpStatus.ACCEPTED);
	}

	private void emptyCart(User user) {
		Cart cart = cartRepository.findByUserId(user.getId());
		if (cart != null) {
			cart.getCartItems().clear();
			cartRepository.save(cart);
			cartRepository.delete(cart);
		}
		Cart newCart = new Cart();
		newCart.setUser(user);
		cartRepository.save(newCart);
	}

}
