package com.azwalt.ecommerce.order;

import java.util.Objects;

import com.azwalt.ecommerce.user.User;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Address {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	@ManyToOne
	@JoinColumn(name = "user_id")
	@JsonIgnore
	private User user;

	@NotBlank(message = "{address.constraints.firstName.NotBlank.message}")
	private String firstName;

	@NotBlank(message = "{address.constraints.lastName.NotBlank.message}")
	private String lastName;

	@NotBlank(message = "{address.constraints.streetAddress.NotBlank.message}")
	private String streetAddress;

	@NotBlank(message = "{address.constraints.city.NotBlank.message}")
	private String city;

	@NotBlank(message = "{address.constraints.state.NotBlank.message}")
	private String state;

	@NotBlank(message = "{address.constraints.country.NotBlank.message}")
	private String country;

	@NotBlank(message = "{address.constraints.postalCode.NotBlank.message}")
	@Pattern(regexp = "^[1-9][0-9]{5}$", message = "{address.constraints.postalCode.Pattern.message}")
	private String postalCode;

	@NotBlank(message = "{address.constraints.email.NotBlank.message}")
	@Email(message = "{address.constraints.email.Email.message}")
	private String email;

	@NotBlank(message = "{address.constraints.phoneNumber.NotBlank.message}")
	@Pattern(regexp = "^(\\+\\d{1,3}[- ]?)?\\d{10}$", message = "{address.constraints.phoneNumber.Pattern.message}")
	private String phoneNumber;

	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (o == null || getClass() != o.getClass())
			return false;
		Address address = (Address) o;
		return Objects.equals(id, address.id) &&
				Objects.equals(firstName, address.firstName) &&
				Objects.equals(lastName, address.lastName) &&
				Objects.equals(streetAddress, address.streetAddress) &&
				Objects.equals(city, address.city) &&
				Objects.equals(state, address.state) &&
				Objects.equals(country, address.country) &&
				Objects.equals(postalCode, address.postalCode) &&
				Objects.equals(email, address.email) &&
				Objects.equals(phoneNumber, address.phoneNumber);
	}

	@Override
	public int hashCode() {
		return Objects.hash(id, firstName, lastName, streetAddress, city, state, country, postalCode, email,
				phoneNumber);
	}

}
