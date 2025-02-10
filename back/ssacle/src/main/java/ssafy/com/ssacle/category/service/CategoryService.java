package ssafy.com.ssacle.category.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import ssafy.com.ssacle.category.domain.Category;
import ssafy.com.ssacle.category.dto.CategoryResponseDTO;
import ssafy.com.ssacle.category.repository.CategoryRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class CategoryService {
    private final CategoryRepository categoryRepository;

    public List<CategoryResponseDTO> findAllCategories() {
        return categoryRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<CategoryResponseDTO> findParentCategories() {
        return categoryRepository.findByParentIsNull()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<CategoryResponseDTO> findSubCategories(Long parentId) {
        return categoryRepository.findByParentId(parentId)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private CategoryResponseDTO convertToDTO(Category category) {
        return CategoryResponseDTO.builder()
                .categoryName(category.getCategoryName())
                .image(category.getImage())
                .build();
    }
}
