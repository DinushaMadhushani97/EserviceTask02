package lk.icta.eService.eServiceManagement.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lk.icta.eService.eServiceManagement.entity.Admin;
import lk.icta.eService.eServiceManagement.repository.AdminRepository;

@CrossOrigin(origins = { "http://localhost:3000" })
@RestController
@RequestMapping("/api/admin")
public class AdminController {
	
	// Repository for managing User entities
	@Autowired
    private AdminRepository adminRepository;
    
   
    
    // Endpoint for user registration
    @PostMapping({ "/register" })
    public ResponseEntity<String> registerAdmin(@RequestBody Admin admin) {
    	
    	// Check if username already exists
        if (this.adminRepository.findByUserName(admin.getUserName()) != null) {
            return ResponseEntity.badRequest().body("Username already exists");
        }
       // Save the user to the repository
        this.adminRepository.save(admin);
        return ResponseEntity.ok("Registration successful");
    }
    
    // Endpoint for user login
    @PostMapping({ "/login" })
    public ResponseEntity<String> loginAdmin(@RequestBody  Admin admin) {
    	
    	 // Find user by username in the repository
         Admin existingUser = this.adminRepository.findByUserName(admin.getUserName());
        // Check if the user exists and the password matches
        if (existingUser != null && existingUser.getPassword().equals(admin.getPassword())) {
            return ResponseEntity.ok("Login successful");
        }
        // Return unauthorized status if login fails
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
    }
}
