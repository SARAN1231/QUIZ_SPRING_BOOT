import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AvailableQuiz = () => {
  const [Quiz, setQuiz] = useState([]);

  useEffect(() => {
    loadQuizs();
  }, []);
  const loadQuizs = async () => {
    const response = await axios.get(
      "http://localhost:8080/quiz/availablequiz"
    );
    console.log(response);
    setQuiz(response.data);
  };
  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center ">
        <h1 className="text-center mt-4">Available Quizes</h1>

        <div>
          <Link to="/create" className="btn btn-primary">
            Create Quiz
          </Link>
        </div>
      </div>

      <table className="table table-hover  mt-4">
        <thead>
          <tr className="table-primary">
            <th scope="col">#</th>
            <th scope="col">Title</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {Quiz.map((quiz, index) => (
            <tr>
              <th scope="row">{index + 1}</th>
              <td>{quiz.quizName}</td>
              <td>
                <Link
                  to={`playquiz/${quiz.id}`}
                  className="btn btn-warning btn-sm mx-1"
                >
                  Take Quiz
                </Link>
                {/* <button
                  onClick={() => handleDelete(question.id)}
                  className="btn btn-danger btn-sm mx-1"
                >
                  <i className="fas fa-trash"></i>
                </button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AvailableQuiz;
