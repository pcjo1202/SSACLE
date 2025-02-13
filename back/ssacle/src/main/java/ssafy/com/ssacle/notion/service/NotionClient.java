package ssafy.com.ssacle.notion.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class NotionClient {

    private final RestTemplate restTemplate = new RestTemplate(); // REST API 호출을 위한 클라이언트

    @Value("${notion.api-key}")
    private String notionApiKey;

    private static final String NOTION_API_BASE_URL = "https://api.notion.com/v1";

    /**
     * Notion API의 `/search` 엔드포인트를 호출하여 특정 페이지/보드의 존재 여부 확인
     */
    public String searchDatabase(String queryJson) {
        HttpHeaders headers = getHeaders(); // 요청 헤더 생성
        HttpEntity<String> requestEntity = new HttpEntity<>(queryJson, headers);

        // Notion API 호출 (검색 요청)
        ResponseEntity<String> response = restTemplate.exchange(
                NOTION_API_BASE_URL + "/search",
                HttpMethod.POST,
                requestEntity,
                String.class
        );
        System.out.println("Notion API 응답: " + response.getBody());
        return response.getBody(); // JSON 응답 반환
    }

    /**
     * Notion API의 `/pages` 엔드포인트를 호출하여 새로운 페이지/보드를 생성
     */
    public String createPage(String jsonBody) {
        HttpHeaders headers = getHeaders(); // 요청 헤더 생성
        HttpEntity<String> requestEntity = new HttpEntity<>(jsonBody, headers);

        // Notion API 호출 (페이지 생성 요청)
        ResponseEntity<String> response = restTemplate.exchange(
                NOTION_API_BASE_URL + "/pages",
                HttpMethod.POST,
                requestEntity,
                String.class
        );
        System.out.println("Notion API 요청: " + jsonBody);
        System.out.println("Notion API 응답: " + response.getBody());

        return response.getBody(); // JSON 응답 반환
    }

    /**
     * Notion API 호출에 필요한 요청 헤더 생성
     */
    private HttpHeaders getHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "Bearer " + notionApiKey);
        headers.set("Notion-Version", "2022-06-28");
        return headers;
    }
}
