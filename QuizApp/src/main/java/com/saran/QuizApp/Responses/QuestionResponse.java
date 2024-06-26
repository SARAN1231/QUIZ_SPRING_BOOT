package com.saran.QuizApp.Responses;

public record QuestionResponse(
        Long id,
         String question,
         String option1,
         String option2,
         String option3,
         String option4
) {
}
