package lk.icta.eService.eServiceManagement.service;

import lk.icta.eService.eServiceManagement.entity.User;
import lk.icta.eService.eServiceManagement.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User registerUser(User user) {
        if (userRepository.findByUserName(user.getUserName()) != null) {
            throw new RuntimeException("Username already exists");
        }
        return userRepository.save(user);
    }

    @Override
    public User loginUser(User user) {
        User existingUser = userRepository.findByUserName(user.getUserName());
        if (existingUser != null && existingUser.getPassword().equals(user.getPassword())) {
            return existingUser;
        }
        throw new RuntimeException("Invalid username or password");
    }
}
