package com.saran.QuizApp.Controllers;

import com.saran.QuizApp.Models.Quiz;
import com.saran.QuizApp.Models.ScoreResponse;
import com.saran.QuizApp.Responses.QuestionResponse;
import com.saran.QuizApp.Responses.QuizResponse;
import com.saran.QuizApp.Services.QuizService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("quiz")
public class QuizController {

    private final QuizService quizService;
    public QuizController(QuizService quizService) {
        this.quizService = quizService;
    }

    @PostMapping("create")
    public ResponseEntity<String> quiz(@RequestParam String category, @RequestParam String quizName, @RequestParam int numQ) {
        return quizService.CreateQuiz(category,quizName,numQ);
    }
    @GetMapping("get/{id}")
    public ResponseEntity<List<QuestionResponse>> getQuiz(@PathVariable Long id) {
        return quizService.getQuizbyId(id);
    }

    @PostMapping("submit/{id}")
    public ResponseEntity<Integer> submitQuiz(@PathVariable Long id, @RequestBody List<ScoreResponse> scoreResponse) {
        return quizService.getQuizScore(id,scoreResponse);
    }
    @GetMapping("/availablequiz")
    public ResponseEntity<List<QuizResponse>> getAvailableQuiz() {
        return quizService.getAvailableQuiz();
    }
}
