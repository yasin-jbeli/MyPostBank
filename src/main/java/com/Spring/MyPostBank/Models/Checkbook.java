package com.Spring.MyPostBank.Models;


import com.Spring.MyPostBank.Enums.CheckBookStatus;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

@EqualsAndHashCode(callSuper = true)
@SuperBuilder
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Checkbook extends AbstractEntity {

    @Column(nullable = false, unique = true)
    private String CheckbookNo;

    @Enumerated(EnumType.STRING)
    private CheckBookStatus status;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User user;

}
