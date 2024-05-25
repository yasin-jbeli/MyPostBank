package com.Spring.MyPostBank.Models;

import com.Spring.MyPostBank.Enums.Role;
import lombok.*;
import jakarta.persistence.*;
import lombok.experimental.SuperBuilder;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.security.Principal;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;


@EqualsAndHashCode(callSuper = true)
@SuperBuilder
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "_user")
public class User extends AbstractEntity implements UserDetails, Principal {


  private String firstName;

  private String lastName;

  @Column(unique = true)
  private String email;

  private String phone;

  private String password;

  private boolean enabled;

  @Enumerated(EnumType.STRING)
  private Role role;

  @OneToMany(mappedBy = "user", fetch = FetchType.EAGER)
  private List<BankAccount> accounts;

  @OneToMany(mappedBy = "user", fetch = FetchType.EAGER)
  private List<Card> cards;

  @OneToMany(mappedBy = "user", fetch = FetchType.EAGER)
  private List<Checkbook> checkbooks;

  @OneToMany(mappedBy = "user", fetch = FetchType.EAGER)
  private List<Credit> loans;

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return role.getAuthorities();
  }

  @Override
  public String getUsername() {
    return email;
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true ;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return enabled;
  }

  @Override
  public String getName() {
    return email;
  }
}
