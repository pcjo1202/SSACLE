package ssafy.com.ssacle.category.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import ssafy.com.ssacle.category.domain.Category;
import ssafy.com.ssacle.category.dto.CategoryCreateRequest;
import ssafy.com.ssacle.category.dto.CategoryResponseDTO;
import ssafy.com.ssacle.category.exception.UpperCategoryNotFoundException;
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

    public CategoryResponseDTO createCategory(CategoryCreateRequest request) {
        Category parentCategory = null;

        // 1. 상위 카테고리가 있을 경우 찾기
        if (request.getParentCategoryName() != null) {
            parentCategory = categoryRepository.findByCategoryName(request.getParentCategoryName())
                    .orElseThrow(UpperCategoryNotFoundException::new);
        }

        // 2. 새 카테고리 생성
        Category newCategory = new Category(
                null,
                parentCategory,
                null,
                null,
                request.getCategoryName(),
                request.isLeaf(),
                request.getImage()
        );

        Category savedCategory = categoryRepository.save(newCategory);
        return convertToDTO(savedCategory);
    }

    private CategoryResponseDTO convertToDTO(Category category) {
        return CategoryResponseDTO.builder()
                .categoryName(category.getCategoryName())
                .image(category.getImage())
                .build();
    }
}
