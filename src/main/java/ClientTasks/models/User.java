package ClientTasks.models;

import jakarta.persistence.*;
import org.antlr.v4.runtime.misc.NotNull;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import ClientTasks.models.Tasks;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = User.TABLE_NAME)

public class User {
    public static final String TABLE_NAME = "users";


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID", unique = true)
    private Long id;

    @Column(name = "USERNAME", unique = true, length =  100, nullable = false)
    private String username;

    @Column(name = "PASSWORD", length = 60, nullable = false)
    private String password;

    @OneToMany(mappedBy = "user")
    private ArrayList<Tasks> tasks = new ArrayList<Tasks>();


    public User(long id, String username, String password) {
        this.id = id;
        this.username = username;
        this.password = password;
    }

    public void setUsername(String username)  {
        this.username = username;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public String getUsername() {
        return this.username;
    }
    public String getPassword() {
        return this.password;
    }
    public void setTasks(ArrayList list) {
        this.tasks = list;
    }
    public ArrayList getTasks() {
        return this.tasks;
    }

    @Override
    public boolean equals(Object obj) {
        if (obj == null || getClass() != obj.getClass()) return false;
        User user = (User) obj;
        return Objects.equals(id, user.id) && Objects.equals(username, user.username) && Objects.equals(password, user.password);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, username, password);
    }


}
