package com.saran.QuizApp.Services;

import com.saran.QuizApp.Mapper.QuestionMapper;
import com.saran.QuizApp.Mapper.QuizMapper;
import com.saran.QuizApp.Models.Question;
import com.saran.QuizApp.Models.Quiz;
import com.saran.QuizApp.Models.ScoreResponse;
import com.saran.QuizApp.Repository.QuestionRepository;
import com.saran.QuizApp.Repository.QuizRepository;
import com.saran.QuizApp.Responses.QuestionResponse;
import com.saran.QuizApp.Responses.QuizResponse;
import jakarta.persistence.Entity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class QuizService {

    private  final QuizRepository quizRepository;
    private final QuestionRepository questionRepository;
    private final QuestionMapper questionMapper;
    private final QuizMapper quizMapper;
    public QuizService(QuizRepository quizRepository, QuestionRepository questionRepository, QuestionMapper questionMapper, QuizMapper quizMapper) {
        this.quizRepository = quizRepository;
        this.questionRepository = questionRepository;
        this.questionMapper = questionMapper;
        this.quizMapper = quizMapper;
    }
    public ResponseEntity<String> CreateQuiz(String category, String quizname, int numQ) {

        List<Question> questions = questionRepository.findRandomQuestionsByCategory(category,numQ);
        Quiz quiz = new Quiz();
        quiz.setQuizName(quizname);
        quiz.setQuestions(questions);
        quizRepository.save(quiz);
        return new ResponseEntity<>("created Successfully", HttpStatus.CREATED) ;
    }

    public ResponseEntity<List<QuestionResponse>> getQuizbyId(Long id) {
        Optional<Quiz> quiz =quizRepository.findById(id);//optional(findbyid) becoz findbyid if present stores or else null will be stored so it is optional
        List<Question> questions = quiz.get().getQuestions();
        List<QuestionResponse> questionResponses = questions.stream().map(questionMapper::toQuestionResponse).toList();
        return new ResponseEntity<>(questionResponses,HttpStatus.OK);
    }

    public ResponseEntity<Integer> getQuizScore(Long id, List<ScoreResponse> scoreResponse) {
        Optional<Quiz> quiz =quizRepository.findById(id);
        List<Question> questions = quiz.get().getQuestions();
        int score = 0;
        int i =0;//iterate through each questions in quiz id
        for (ScoreResponse scoreResponse1 : scoreResponse) {
            if(scoreResponse1.getResponse().equals(questions.get(i).getCorrectAnswer())){
                score++;
            }
            i++;
        }
        return new ResponseEntity<>(score,HttpStatus.OK);
    }

    public ResponseEntity<List<QuizResponse>> getAvailableQuiz() {
        List<QuizResponse> quizResponses = quizRepository.findAll().stream().map(quizMapper::toQuizResponse).toList();
        return new ResponseEntity<>(quizResponses,HttpStatus.OK);
    }
}
