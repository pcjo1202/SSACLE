package ssafy.com.ssacle.category.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ssafy.com.ssacle.category.domain.Category;
import ssafy.com.ssacle.category.dto.CategoryResponseDTO;
import ssafy.com.ssacle.category.service.CategoryService;

import java.util.List;

@RestController
@RequestMapping("/api/v1/category")
@RequiredArgsConstructor
public class CategoryController implements CategorySwaggerController {
    private final CategoryService categoryService;

    @Override
    public ResponseEntity<List<CategoryResponseDTO>> getAllCategories() {
        return ResponseEntity.ok(categoryService.findAllCategories());
    }

    @Override
    public ResponseEntity<List<CategoryResponseDTO>> getParentCategories() {
        return ResponseEntity.ok(categoryService.findParentCategories());
    }

    @Override
    public ResponseEntity<List<CategoryResponseDTO>> getSubCategories(@PathVariable Long parentId) {
        return ResponseEntity.ok(categoryService.findSubCategories(parentId));
    }
}
