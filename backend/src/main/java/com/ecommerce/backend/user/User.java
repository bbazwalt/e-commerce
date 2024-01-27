package com.ecommerce.backend.user;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.ecommerce.backend.order.Address;
import com.ecommerce.backend.order.PaymentInformation;
import com.ecommerce.backend.product.rating.Rating;
import com.ecommerce.backend.product.rating.Review;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User implements UserDetails {

	private static final long serialVersionUID = 7823270450104183753L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	@NotNull
	@Size(min = 1, max = 255)
	private String firstName;

	@NotNull
	@Size(min = 1, max = 255)
	private String lastName;

	@NotNull
	@JsonIgnore
	@Size(min = 8, max = 255)
	@Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).*$", message = "{ecommerce.constraints.password.Pattern.message}")
	private String password;

	@NotNull
	@Pattern(regexp = "^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@"
			+ "[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$", message = "{ecommerce.constraints.email.Pattern.message}")
	private String email;

	private String role;

	private String mobile;

	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	private List<Address> addresses = new ArrayList<>();

	@Embedded
	@ElementCollection
	@JsonIgnore
	@CollectionTable(name = "payment_information", joinColumns = @JoinColumn(name = "user_id"))
	private List<PaymentInformation> paymentInformation = new ArrayList<>();

	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	@JsonIgnore
	private List<Rating> ratings = new ArrayList<>();

	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	@JsonIgnore
	private List<Review> reviews = new ArrayList<>();

	private LocalDateTime createdAt;

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {

		return null;
	}

	@Override
	public String getUsername() {

		return null;
	}

	@Override
	public boolean isAccountNonExpired() {

		return false;
	}

	@Override
	public boolean isAccountNonLocked() {

		return false;
	}

	@Override
	public boolean isCredentialsNonExpired() {

		return false;
	}

	@Override
	public boolean isEnabled() {

		return false;
	}

}
