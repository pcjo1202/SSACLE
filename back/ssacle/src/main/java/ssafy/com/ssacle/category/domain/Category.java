package ssafy.com.ssacle.category.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
import ssafy.com.ssacle.SprintCategory.domain.SprintCategory;
import ssafy.com.ssacle.board.domain.BoardType;
import ssafy.com.ssacle.sprint.domain.Sprint;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "category")
@Getter
@Setter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Category {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** 부모 주제 (상위 카테고리) */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id")
    @JsonIgnore
    private Category parent;

    /** 하위 소주제 목록 (하위 카테고리) */
    @OneToMany(mappedBy = "parent", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Category> children;

    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<SprintCategory> sprintCategories = new ArrayList<>();

    @Column(name = "category_name", nullable = false, length = 255)
    private String categoryName;

    @Column(name = "image", nullable = true, length = 1024)
    private String image;
}
