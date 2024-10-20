package lk.icta.eService.eServiceManagement.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import lk.icta.eService.eServiceManagement.entity.User;
import lk.icta.eService.eServiceManagement.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;

@CrossOrigin(origins = { "http://localhost:3000" })
@RestController
@RequestMapping({ "/api/eservices" })
public class UserController {

    private UserRepository userRepository;
    
    @Autowired
    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    
    @PostMapping({ "/user/register" })
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        // Check if username already exists
        if (this.userRepository.findByUserName(user.getUserName()) != null) {
            return ResponseEntity.badRequest().body("Username already exists");
        }
        // Save the user to the repository
        this.userRepository.save(user);
        return ResponseEntity.ok("Registration successful");
    }
    
    @PostMapping({ "/user/login" })
    public ResponseEntity<String> loginUser(@RequestBody User user) {
        User existingUser = this.userRepository.findByUserName(user.getUserName());
        // Check if the user exists and the password matches
        if (existingUser != null && existingUser.getPassword().equals(user.getPassword())) {
            return ResponseEntity.ok("Login successful");
        }
        // Return unauthorized status if login fails
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
    }
}
