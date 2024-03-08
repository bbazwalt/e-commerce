package com.azwalt.ecommerce.order;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.azwalt.ecommerce.cart.CartService;
import com.azwalt.ecommerce.configuration.CorsConstants;
import com.azwalt.ecommerce.shared.ApiConstants;
import com.azwalt.ecommerce.shared.ApiResponse;
import com.azwalt.ecommerce.user.User;
import com.azwalt.ecommerce.user.UserUtil;
import com.razorpay.Payment;
import com.razorpay.PaymentLink;
import com.razorpay.RazorpayClient;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping(ApiConstants.BASE_API_PATH + "/payments")
public class PaymentController {

	@Value("${razorpay.api.key}")
	private String apiKey;

	@Value("${razorpay.api.secret}")
	private String apiSecret;

	private final OrderService orderService;
	private final CartService cartService;
	private final UserUtil userUtil;

	@PostMapping("/{orderId}")
	@ResponseStatus(HttpStatus.CREATED)
	public PaymentLinkResponse createPaymentLink(@PathVariable @NotNull Long orderId) throws Exception {
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
		paymentLinkRequest.put("callback_url", CorsConstants.CORS_API_URL + "/payment/" + orderId);
		paymentLinkRequest.put("callback_method", "get");
		PaymentLink payment = razorpayClient.paymentLink.create(paymentLinkRequest);
		return new PaymentLinkResponse(payment.get("id"), payment.get("short_url"));
	}

	@GetMapping
	public ApiResponse paymentRedirect(@RequestParam(name = "paymentId") @NotBlank String paymentId,
			@RequestParam(name = "orderId") @NotNull Long orderId) throws Exception {
		RazorpayClient razorpayClient = new RazorpayClient(apiKey, apiSecret);
		Payment payment = razorpayClient.payments.fetch(paymentId);
		if (payment.get("status").equals("captured")) {
			orderService.updateOrderStatus(orderId, OrderStatus.PLACED);
		}
		User user = userUtil.getCurrentUser();
		cartService.emptyCart(user);
		return new ApiResponse("Your order get placed.", true);
	}

	@PostMapping("/place/{orderId}")
	@ResponseStatus(HttpStatus.ACCEPTED)
	public ApiResponse bypassPayment(@PathVariable @NotNull Long orderId) throws Exception {
		orderService.updateOrderStatus(orderId, OrderStatus.PLACED);
		User user = userUtil.getCurrentUser();
		cartService.emptyCart(user);
		return new ApiResponse("Your order get placed.", true);
	}

}
