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

    @GetMapping("/{userId}/{documentType}/download-all")
    public ResponseEntity<Resource> downloadAllFiles(
            @PathVariable Integer userId,
            @PathVariable String documentType) {

        String folderPath = fileUploadPath + File.separator + "users" + File.separator + userId
                + File.separator + documentType;

        File folder = new File(folderPath);
        if (!folder.exists() || !folder.isDirectory()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Folder not found");
        }

        try {
            File zipFile = File.createTempFile("files", ".zip");
            try (ZipOutputStream zos = new ZipOutputStream(Files.newOutputStream(zipFile.toPath()))) {
                addFilesToZip(folder.toPath(), folder.toPath(), zos);
            }

            Resource zipResource = new FileSystemResource(zipFile);
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"files.zip\"")
                    .contentType(MediaType.APPLICATION_OCTET_STREAM)
                    .body(zipResource);
        } catch (IOException e) {
            System.err.println("Failed to create zip file: " + e.getMessage());
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to create zip file", e);
        }
    }

    private void addFilesToZip(Path basePath, Path currentPath, ZipOutputStream zos) throws IOException {
        Files.walk(currentPath)
                .filter(path -> !Files.isDirectory(path))
                .forEach(path -> {
                    try {
                        String zipEntryName = basePath.relativize(path).toString().replace("\\", "/");
                        zos.putNextEntry(new ZipEntry(zipEntryName));
                        byte[] bytes = Files.readAllBytes(path);
                        zos.write(bytes, 0, bytes.length);
                        zos.closeEntry();

                        // Log the file added to the ZIP
                        System.out.println("Added file to ZIP: " + zipEntryName);
                    } catch (IOException e) {
                        System.err.println("Error adding file to ZIP: " + e.getMessage());
                    }
                });
    }
}
