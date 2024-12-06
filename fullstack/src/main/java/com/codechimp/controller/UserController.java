package com.codechimp.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;
import org.springframework.web.bind.annotation.CrossOrigin;
import com.codechimp.model.User;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
    private final List<User> userList = new ArrayList<>();

    @PostMapping("/users")
    public User addUser(@RequestBody User user) {
        userList.add(user);
        return user;
    }

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userList;
    }

    @PutMapping("/users/{id}")
    public User updateUser(@PathVariable int id, @RequestBody User updatedUser) {
        for (User user : userList) {
            if (user.getId() == id) {
                user.setName(updatedUser.getName());
                user.setAge(updatedUser.getAge());
                return user;
            }
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
    }

    @DeleteMapping("/users/{id}")
    public void deleteUser(@PathVariable int id) {
        boolean removed = userList.removeIf(user -> user.getId() == id);
        if (!removed) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }
    }
}
