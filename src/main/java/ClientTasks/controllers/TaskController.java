package ClientTasks.controllers;


import ClientTasks.models.Tasks;
import ClientTasks.services.TaskService;
import jakarta.validation.Valid;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/task")
@Validated

public class TaskController {

    @Autowired
    private TaskService taskService;


    @GetMapping("/{id}")
    public ResponseEntity<Tasks> FindById(@PathVariable Long id) {
        Tasks obj = this.taskService.FindById(id);
        return ResponseEntity.ok().body(obj);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Tasks>> findAllByUserId(@PathVariable Long userId) {
        List<Tasks> objs = this.taskService.findAllByUserId(userId);
        return ResponseEntity.ok().body(objs);
    }

    @PostMapping
    public ResponseEntity<Void> CreateTask(@Valid @RequestBody Tasks obj) {
        Tasks savedTask = taskService.CreateTask(obj);
        URI uri = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(savedTask.getId())
                .toUri();
        return ResponseEntity.created(uri).build();
    }



    @PutMapping("/{id}")
    @Validated
    public ResponseEntity<Void> UpdateTask(@Valid @RequestBody Tasks obj, @PathVariable Long id) {
        obj.setId(id);
        this.taskService.UpdateTask(obj);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> DeleteTask(@PathVariable Long id) {
        this.taskService.DeleteTask(id);
        return ResponseEntity.noContent().build();
    }


}
