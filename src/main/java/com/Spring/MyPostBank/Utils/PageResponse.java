package com.Spring.MyPostBank.Utils;

import lombok.*;

import java.util.List;

@Builder
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class PageResponse <T>{
    private List<T> content;
    private int number;
    private int size;
    private long totalElements;
    private long totalPages;
    private boolean first;
    private boolean last;
}
