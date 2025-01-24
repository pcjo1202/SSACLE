package ssafy.com.ssacle.user.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import ssafy.com.ssacle.user.dto.JoinDTO;
import ssafy.com.ssacle.user.service.JoinService;

@RestController
@ResponseBody
@RequiredArgsConstructor
public class JoinController {
    private final JoinService joinService;
    @PostMapping("/join")
    public boolean joinProcess(@RequestBody @Valid JoinDTO joinDTO){
        return joinService.joinProcess(joinDTO);
    }
}
