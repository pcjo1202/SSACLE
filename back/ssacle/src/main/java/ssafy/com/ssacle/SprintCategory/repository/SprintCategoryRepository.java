package ssafy.com.ssacle.SprintCategory.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.com.ssacle.SprintCategory.domain.SprintCategory;

public interface SprintCategoryRepository extends JpaRepository<SprintCategory, Long> {
}
