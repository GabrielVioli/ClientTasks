package ClientTasks.controllers;


import ClientTasks.models.User;
import ClientTasks.services.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.Optional;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/{id}")
    public ResponseEntity<User> findById(@PathVariable Long id) {
        User obj = this.userService.FindById(id);
        return ResponseEntity.ok().body(obj);
    }

    @GetMapping("/username/{username}")
    public ResponseEntity<User> findByUsername(@PathVariable String username) {
        Optional<User> user = userService.findByUsername(username);
        return user.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody User login) {
        Optional<User> optionalUser = userService.findByUsername(login.getUsername());
        if (optionalUser.isEmpty()) {
            return ResponseEntity.status(404).body("Usuário não encontrado");
        }

        User user = optionalUser.get();
        if (user.getPassword().equals(login.getPassword())) {
            return ResponseEntity.ok("Login successful");
        } else {
            return ResponseEntity.status(401).body("Senha incorreta");
        }
    }


    @PostMapping
    @Validated
    public ResponseEntity<Void> CreateUser(@Valid @RequestBody User obj) {
        this.userService.CreateUser(obj);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(obj.getId()).toUri();
        return ResponseEntity.created(uri).build();
    }

    @PutMapping("/{id}")
    @Validated
    public ResponseEntity<Void> UpdateUser(@Valid @RequestBody User obj, @PathVariable Long id) {
        obj.setID(id);
        obj = this.userService.UpdateUser(obj);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> DeleteUser(@PathVariable Long id) {
        this.userService.DeleteUser(id);
        return ResponseEntity.noContent().build();

    }
}
