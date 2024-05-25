package com.Spring.MyPostBank.Services;


import com.Spring.MyPostBank.DTOs.CheckbookDTO;
import com.Spring.MyPostBank.DTOs.Mappers.CheckbookMapper;
import com.Spring.MyPostBank.Enums.CheckBookStatus;
import com.Spring.MyPostBank.Models.Checkbook;
import com.Spring.MyPostBank.Models.User;
import com.Spring.MyPostBank.Repositories.CheckBookRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.encrypt.TextEncryptor;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class CheckbookServiceImpl implements CheckbookService{

    private final CheckBookRepository checkbookRepository;
    private final TextEncryptor textEncryptor;

    @Override
    public void requestCheckbook(Principal connectedUser) {
        User user = (User) ((UsernamePasswordAuthenticationToken) connectedUser).getPrincipal();

        boolean hasOrderedOrBeingDeliveredCheckbook = user.getCheckbooks().stream()
                .anyMatch(checkbook -> checkbook.getStatus() == CheckBookStatus.ORDERED
                        || checkbook.getStatus() == CheckBookStatus.BEING_DELIVERED);

        if (!hasOrderedOrBeingDeliveredCheckbook) {
            Checkbook checkbook = Checkbook.builder()
                    .CheckbookNo(textEncryptor.encrypt(generateCheckNumber()))
                    .status(CheckBookStatus.ORDERED)
                    .user(user)
                    .build();

            checkbookRepository.save(checkbook);
        } else {
        throw new RuntimeException("User already has a checkbook request");
        }}

    @Override
    public List<CheckbookDTO> getCheckbookByUserId(Principal connectedUser) {
        User user = (User) ((UsernamePasswordAuthenticationToken) connectedUser).getPrincipal();
        List<Checkbook> checkbooks = checkbookRepository.findByUserId(user.getId());

        return checkbooks.stream()
                .map(checkbook -> {
                    CheckbookDTO dto = CheckbookMapper.toDTO(checkbook);
                    dto.setCheckbookNo(textEncryptor.decrypt(dto.getCheckbookNo())); // Decrypt checkbook number
                    return dto;
                })
                .collect(Collectors.toList());
    }

    @Override
    public CheckbookDTO getCheckbookById(Integer checkbookId, Principal connectedUser) {
        User user = (User) ((UsernamePasswordAuthenticationToken) connectedUser).getPrincipal();
        Checkbook checkbook = checkbookRepository.findByIdAndUserId(checkbookId, user.getId());
        if (checkbook == null) {
            throw new RuntimeException("Checkbook not found for id: " + checkbookId);
        }

        CheckbookDTO dto = CheckbookMapper.toDTO(checkbook);
        dto.setCheckbookNo(textEncryptor.decrypt(dto.getCheckbookNo())); // Decrypt checkbook number

        return dto;
    }
    public String generateCheckNumber() {
        final String PREFIX = "CHK";
        final int ACCOUNT_NUMBER_LENGTH = 10;
        final int MAX_CHECK_NUMBER = 9999;
        Random random = new Random();

        StringBuilder accountNumber = new StringBuilder();
        for (int i = 0; i < ACCOUNT_NUMBER_LENGTH; i++) {
            accountNumber.append(random.nextInt(10));
        }

        int checkNumber = random.nextInt(MAX_CHECK_NUMBER) + 1;

        return String.format("%s-%s-%04d", PREFIX, accountNumber, checkNumber);
    }

}
