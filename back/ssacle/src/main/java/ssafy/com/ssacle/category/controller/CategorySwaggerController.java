package ssafy.com.ssacle.category.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import ssafy.com.ssacle.category.domain.Category;
import ssafy.com.ssacle.category.dto.CategoryResponseDTO;

import java.util.List;

@Tag(name = "Category API", description = "카테고리 관련 API입니다.")
public interface CategorySwaggerController {

    @Operation(summary = "전체 카테고리 조회", description = "모든 카테고리를 조회합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "카테고리 목록 조회 성공"),
            @ApiResponse(responseCode = "500", description = "서버 오류 발생")
    })
    @GetMapping("/all")
    ResponseEntity<List<CategoryResponseDTO>> getAllCategories();

    @Operation(summary = "상위 카테고리 조회", description = "부모가 없는 상위 카테고리를 조회합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "상위 카테고리 목록 조회 성공"),
            @ApiResponse(responseCode = "500", description = "서버 오류 발생")
    })
    @GetMapping("/parents")
    ResponseEntity<List<CategoryResponseDTO>> getParentCategories();

    @Operation(summary = "하위 카테고리 조회", description = "특정 상위 카테고리의 하위 카테고리를 조회합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "하위 카테고리 목록 조회 성공"),
            @ApiResponse(responseCode = "404", description = "해당 parentId를 가진 카테고리가 없음"),
            @ApiResponse(responseCode = "500", description = "서버 오류 발생")
    })
    @GetMapping("/subcategories/{parentId}")
    ResponseEntity<List<CategoryResponseDTO>> getSubCategories(@PathVariable Long parentId);



}
