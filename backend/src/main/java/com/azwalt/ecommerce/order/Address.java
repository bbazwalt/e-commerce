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

	private String firstName;

	private String lastName;

	private String streetAddress;

	private String city;

	private String state;

	private String country;

	private String postalCode;

	private String email;

	private String phoneNumber;

	@ManyToOne
	@JoinColumn(name = "user_id")
	@JsonIgnore
	private User user;

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
