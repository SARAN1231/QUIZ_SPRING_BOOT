package com.saran.QuizApp.Services;

import com.saran.QuizApp.Mapper.QuestionMapper;
import com.saran.QuizApp.Models.Question;
import com.saran.QuizApp.Repository.QuestionRepository;
import com.saran.QuizApp.Responses.QuestionResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;



@Service
public class QuestionService {

    private final QuestionRepository questionRepository;
    private final QuestionMapper questionMapper;

    public QuestionService(QuestionRepository questionRepository, QuestionMapper questionMapper) {
        this.questionRepository = questionRepository;
        this.questionMapper = questionMapper;
    }

    public ResponseEntity<List<Question>> getAllQuestions(){
        try {
            return new ResponseEntity<>(questionRepository.findAll(), HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();// print the error in console
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.BAD_REQUEST);
    }


    public ResponseEntity<Question> postQuestion(Question question){

        try {
            return new ResponseEntity<>( questionRepository.save(question), HttpStatus.CREATED);
        }
        catch (Exception e){
            e.printStackTrace();// print the error in console
        }
        return new ResponseEntity<>(new Question(),//empty question class
                HttpStatus.BAD_REQUEST);

    }
    public void deleteQuestion(Long id){

        try {
            questionRepository.deleteById(id);
        }
        catch (Exception e){
            e.printStackTrace();// print the error in console
        }


    }
    public ResponseEntity< List<QuestionResponse>> getAllQuestionsbycategory(String category){

        try {
            return new ResponseEntity<>(questionRepository.findAllByCategory(category).
                    stream()
                    .map(questionMapper::toQuestionResponse)
                    .collect(Collectors.toList()),HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();// print the error in console
        }
        return new ResponseEntity<>(new ArrayList<>(),HttpStatus.BAD_REQUEST);

    }
}
