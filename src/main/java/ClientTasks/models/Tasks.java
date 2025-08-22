package ClientTasks.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "Tasks")

public class Tasks {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID", unique = true)
    private Long id;



    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;


    @Column(name  = "description", length = 255, nullable = false)
    @Size(min = 1, max  = 255)
    private String description;

    public void setId(Long id) {
        this.id = id;
    }

    public void setDescription(String desc) {
        this.description = desc;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public User getUser() {
        return this.user;

    }
    public Long getId() {
        return this.id;
    }

    public String getDescription() {
        return this.description;
    }



}
