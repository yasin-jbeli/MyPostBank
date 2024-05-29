package com.Spring.MyPostBank.Models;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.*;
import lombok.experimental.SuperBuilder;
import com.fasterxml.jackson.annotation.JsonBackReference;

@EqualsAndHashCode(callSuper = true)
@SuperBuilder
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Notification extends AbstractEntity {
    private String message;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonBackReference
    private User user;

    private boolean isRead;
}
