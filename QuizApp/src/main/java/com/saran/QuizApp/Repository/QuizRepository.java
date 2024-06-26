package com.saran.QuizApp.Repository;

import com.saran.QuizApp.Models.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuizRepository extends JpaRepository<Quiz, Long> {
}
