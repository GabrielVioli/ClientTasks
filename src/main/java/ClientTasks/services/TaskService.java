package ClientTasks.services;


import ClientTasks.models.Tasks;
import ClientTasks.models.User;
import ClientTasks.repositories.TaskRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private UserService userService;

    public Tasks FindById(Long id) {
        Optional<Tasks> tasks = taskRepository.findById(id);
        return tasks.orElseThrow(()->new RuntimeException(
                id + "não encontrado"
        ));
    }


    public Tasks CreateTask(Tasks obj) {
        User user = this.userService.FindById(obj.getUser().getId());
        obj.setId(null);
        obj.setUser(user);
        obj = taskRepository.save(obj);
        return obj;
    }

    @Transactional
    public Tasks UpdateTask(Tasks obj) {
        Tasks newObj = FindById(obj.getId());
        newObj.setDescription(obj.getDescription());
        return this.taskRepository.save(newObj);
    }

    @Transactional
    public void DeleteTask(Long id) {
        FindById(id);

    }

    public List<Tasks> findAllByUserId(Long userId) {
        List<Tasks> tasks = this.taskRepository.findByUser_Id(userId);
        return  tasks;
    }
}
