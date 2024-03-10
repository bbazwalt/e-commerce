package com.azwalt.ecommerce.user;

import java.time.Instant;
import java.util.LinkedHashSet;
import java.util.Set;

import com.azwalt.ecommerce.order.Address;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotBlank(message = "{user.constraints.fullName.NotBlank.message}")
    @Size(max = 255, message = "{user.constraints.fullName.Size.message}")
    private String fullName;

    @NotBlank(message = "{user.constraints.username.NotBlank.message}")
    @Pattern(regexp = "^[a-zA-Z][a-zA-Z0-9_.]{5,28}$", message = "{user.constraints.username.Pattern.message}")
    private String username;

    @NotBlank(message = "{user.constraints.password.NotBlank.message}")
    @Size(min = 8, max = 255, message = "{user.constraints.password.Size.message}")
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).*$", message = "{user.constraints.password.Pattern.message}")
    @JsonIgnore
    private String password;

    private boolean isAdmin;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @JsonIgnore
    private Set<Address> addresses = new LinkedHashSet<>();

    private Instant createdAt;

}
