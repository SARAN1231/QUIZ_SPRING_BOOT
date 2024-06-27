package com.saran.QuizApp.Mapper;

import com.saran.QuizApp.Models.Quiz;
import com.saran.QuizApp.Responses.QuizResponse;
import org.springframework.stereotype.Service;

@Service
public class QuizMapper {

    public QuizResponse toQuizResponse(Quiz quiz) {
        return new QuizResponse(quiz.getId(), quiz.getQuizName());
    }
}
