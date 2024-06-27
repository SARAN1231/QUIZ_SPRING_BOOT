package com.saran.QuizApp.Controllers;

import com.saran.QuizApp.Models.Question;
import com.saran.QuizApp.Responses.QuestionResponse;
import com.saran.QuizApp.Services.QuestionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("question")
public class QuestionController {

   private final QuestionService questionService;

    public QuestionController(QuestionService questionService) {
        this.questionService = questionService;
    }

    @GetMapping("allquestions")
    public ResponseEntity<List<Question>> getallquestions() {
        return questionService.getAllQuestions();
    }

    @GetMapping("category/{category}")
    public ResponseEntity< List<QuestionResponse>> getallquestionsbycategory(@PathVariable String category) {
        return questionService.getAllQuestionsbycategory(category);
    }

    @PostMapping("postquestion")
    public ResponseEntity< Question> postquestion(@RequestBody Question question) {
        return questionService.postQuestion(question);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable Long id) {
         questionService.deleteQuestion(id);
    }
}
