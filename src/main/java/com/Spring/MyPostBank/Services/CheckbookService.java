package com.Spring.MyPostBank.Services;


import com.Spring.MyPostBank.DTOs.CheckbookDTO;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.List;

@Service
public interface CheckbookService {
    void requestCheckbook(Principal connectedUser);

    List<CheckbookDTO> getCheckbookByUserId(Principal connectedUser);

    CheckbookDTO getCheckbookById(Integer checkbookId, Principal connectedUser);
}
