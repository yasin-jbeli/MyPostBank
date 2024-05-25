package com.Spring.MyPostBank.Services;

import com.Spring.MyPostBank.Enums.DocumentType;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import static java.io.File.separator;

@Service
@RequiredArgsConstructor
@Slf4j
public class FileStorageService {

    @Value("${application.file.upload.files-output-path}")
    private String fileUploadPath;

    public Object saveFile(
            @NotNull MultipartFile sourceFile,
            @NotNull Integer userId,
            DocumentType documentType) {

        String fileUploadSubPath = "users" + separator + userId;
        switch (documentType) {
            case BANK_ACCOUNT:
                fileUploadSubPath += separator + "bank-account";
                break;
            case LOAN:
                fileUploadSubPath += separator + "loans";
                break;
            default:
                throw new IllegalArgumentException("Unknown document type: " + documentType);
        }

        return fileUpload(sourceFile, fileUploadSubPath);
    }

    private String fileUpload(
            @NotNull MultipartFile sourceFile,
            @NotNull String fileUploadSubPath) {

        final String finalUploadPath = fileUploadPath + separator + fileUploadSubPath;
        File targetFolder = new File(finalUploadPath);

        if (!targetFolder.exists()) {
            boolean folderCreated = targetFolder.mkdirs();
            if (!folderCreated) {
                log.warn("Failed to create target folder");
                return null;
            }
        }

        final String fileExtension = getFileExtension(sourceFile.getOriginalFilename());
        String targetFilePath = finalUploadPath + separator + System.currentTimeMillis() + "." + fileExtension;
        Path targetPath = Paths.get(targetFilePath);
        try {
            Files.write(targetPath, sourceFile.getBytes());
            log.info("File saved to " + targetFilePath);
            return targetFilePath;
        } catch (IOException e) {
            log.error("Failed to save file", e);
            return null;
        }
    }

    private String getFileExtension(String fileName) {
        if (fileName == null || fileName.isEmpty()) {
            return "";
        }

        int lastIndexOf = fileName.lastIndexOf(".");
        if (lastIndexOf == -1) {
            return "";
        }
        return fileName.substring(lastIndexOf + 1).toLowerCase();
    }
}
