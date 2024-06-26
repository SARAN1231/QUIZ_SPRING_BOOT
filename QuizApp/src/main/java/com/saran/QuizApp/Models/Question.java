package com.saran.QuizApp.Models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Question {
    @Id
    @GeneratedValue
    private Long id;
    private String question;
    private String correctAnswer;
    private String option1;
    private String option2;
    private String option3;
    private String option4;
    private String category;
    private String difficultyLevel;
}
