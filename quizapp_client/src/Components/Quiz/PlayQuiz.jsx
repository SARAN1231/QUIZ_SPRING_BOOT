import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../App.css";
const PlayQuiz = () => {
  const [Questions, setQuestions] = useState([]);
  const [NextQn, setNextQn] = useState(0);
  const [Responses,setResponses] = useState({})
  const { id } = useParams();

  useEffect(() => {
    loadquestions();
  }, []);

  const loadquestions = async () => {
    const response = await axios.get(`http://localhost:8080/quiz/get/${id}`);
    setQuestions(response.data);
    console.log(response.data);
  };

  const handleOptionChange = (questionid, response) => {
    setResponses({ ...Responses, [questionid]: response });
    console.log(Responses)
  };
   const handleSubmit = async () => {
     const formattedResponses = Object.keys(Responses).map((questionId) => ({
       id: parseInt(questionId),
       response: Responses[questionId],
     }));
console.log(formattedResponses)
     try {
       const response = await axios.post(
         `http://localhost:8080/quiz/submit/${id}`,
         formattedResponses
       );
       console.log("Submit response:", response.data);
     } catch (error) {
       console.error("Error submitting quiz:", error);
     }
   };
  const handleprevqnchange = () => {
    if (NextQn > 0) {
      setNextQn(NextQn - 1);
    }
  };

  const handlenextqnchange = () => {
    if (NextQn < Questions.length - 1) {
      setNextQn(NextQn + 1);
    }
  };
  return (
    <div className="container ">
      <h1 className="text-center mt-4">Play Quiz</h1>
      <div className="col-md-6 offset-md-3 border rounded p-4 mt-4 shadow">
        <div class="row m-4">
          <h3>Quiz Title</h3>
          {Questions.length > 0 && (
            <div className="card mt-4">
              <ul class="list-group list-group-flush">
                <li className="list-group-item">
                  <strong>
                    <em>
                      {NextQn + 1}&nbsp; {Questions[NextQn].question}
                    </em>
                  </strong>
                </li>
                {["option1", "option2", "option3", "option4"].map((option) => (
                  <li
                    type="option"
                    className="list-group-item"
                    name={`question-${Questions[NextQn].id}`}
                    value={Questions[NextQn][option]}
                    onChange={() =>
                      handleOptionChange(
                        Questions[NextQn].id,
                        Questions[NextQn][option]
                      )
                    }
                  >
                    {Questions[NextQn][option]}
                  </li>
                ))}
              </ul>
              <div className="d-flex justify-content-between m-4">
                <button
                  onClick={handleprevqnchange}
                  className="btn btn-primary"
                  disabled={NextQn === 0}
                >
                  prev
                </button>
                <button onClick={handleSubmit} className="btn btn-info">
                  Submit
                </button>
                <button
                  onClick={handlenextqnchange}
                  className="btn btn-primary"
                  disabled={NextQn === Questions.length - 1}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlayQuiz;
