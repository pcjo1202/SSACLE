package ssafy.com.ssacle.diary.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@AllArgsConstructor
public class DiaryResponseDTO {
    private String name;
    private String content;
    private LocalDate date;
}
