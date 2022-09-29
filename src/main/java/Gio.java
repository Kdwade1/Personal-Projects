import javax.persistence.*;

@Entity
@Table(name="testing")
public class Gio {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
}
