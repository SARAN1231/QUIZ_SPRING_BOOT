package com.saran.QuizApp.Mapper;

import com.saran.QuizApp.Models.Question;
import com.saran.QuizApp.Responses.QuestionResponse;
import org.springframework.stereotype.Service;

@Service
public class QuestionMapper {

    public  QuestionResponse toQuestionResponse(Question question) {
        return new QuestionResponse(question.getId(), question.getQuestion(), question.getOption1(), question.getOption2(), question.getOption3(), question.getOption4());
    }

}
