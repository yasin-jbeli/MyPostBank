package com.Spring.MyPostBank.Controllers;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.server.ResponseStatusException;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

@Controller
@RequestMapping("/api/files")
public class FileController {

    @Value("${application.file.upload.files-output-path}")
    private String fileUploadPath;

    @GetMapping("/{userId}/{documentType}/{fileName}")
    public ResponseEntity<Resource> viewFile(
            @PathVariable Integer userId,
            @PathVariable String documentType,
            @PathVariable String fileName) {

        String filePath = fileUploadPath + File.separator + "users" + File.separator + userId
                + File.separator + documentType + File.separator + fileName;

        File file = new File(filePath);
        if (!file.exists() || file.isDirectory()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "File not found");
        }

        Resource fileResource = new FileSystemResource(file);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + fileName + "\"")
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(fileResource);
    }
}