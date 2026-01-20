package com.example.backend.order.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

@Service
public class SmsService {

    private final RestTemplate restTemplate = new RestTemplate();

    public void sendSms(String phone, String message) {

        String url = "https://textbelt.com/text";

        MultiValueMap<String, String> data = new LinkedMultiValueMap<>();
        data.add("phone", phone);          // +919999999999
        data.add("message", message);
        data.add("key", "textbelt");       // FREE key

        restTemplate.postForObject(url, data, String.class);
    }
}