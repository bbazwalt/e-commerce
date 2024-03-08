package com.azwalt.ecommerce.order;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface OrderRepository extends JpaRepository<Order, Long> {

	@Query("SELECT o FROM Order o WHERE o.user.id=:userId ORDER BY o.createdAt DESC")
	public Set<Order> findUserOrders(@Param("userId") Long userId);

	@Query("SELECT o FROM Order o WHERE o.user.id=:userId AND o.orderStatus IN :statuses ORDER BY o.createdAt DESC")
	public Set<Order> findUserOrdersByStatus(@Param("userId") Long userId,
			@Param("statuses") Set<OrderStatus> statuses);

}
