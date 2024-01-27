package com.ecommerce.backend.order;

import java.util.Objects;

import com.ecommerce.backend.user.User;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
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

	@Column(name = "first_name")
	private String firstName;

	@Column(name = "last_name")
	private String lastName;

	@Column(name = "street_address")
	private String streetAddress;

	@Column(name = "city")
	private String city;

	@Column(name = "state")
	private String state;

	@Column(name = "postal_code")
	private String postalCode;

	@Column(name = "phone_number")
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
		return Objects.equals(streetAddress, address.streetAddress) && Objects.equals(city, address.city)
				&& Objects.equals(state, address.state) && Objects.equals(postalCode, address.postalCode)
				&& Objects.equals(phoneNumber, address.phoneNumber);
	}

	@Override
	public int hashCode() {
		return Objects.hash(streetAddress, city, state, postalCode, phoneNumber);
	}

}
