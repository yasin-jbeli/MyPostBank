package com.Spring.MyPostBank.DTOs;

import com.Spring.MyPostBank.Enums.CheckBookStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CheckbookDTO {
    private Integer id;
    private String checkbookNo;
    private CheckBookStatus status;
    // these two are used for displaying info on the frontend
    private LocalDateTime CreatedOn;
    private String owner;

}
