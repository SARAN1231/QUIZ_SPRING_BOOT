import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./PlayQuiz.css";
const PlayQuiz = () => {

  const [Questions, setQuestions] = useState([]);
  const [NextQn, setNextQn] = useState(0);
  const [Responses, setResponses] = useState([]);
  const [scoredisplay,setscoredisplay] =  useState(false)
  const [Score, setScore] = useState(0);
  const { id } = useParams();

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    const response = await axios.get(`http://localhost:8080/quiz/get/${id}`);
    setQuestions(response.data);
    console.log(response.data);
  };

  const handlePrevQnChange = () => {
    if (NextQn > 0) {
      setNextQn(NextQn - 1);
    }
  };

  const handleNextQnChange = () => {
    if (NextQn < Questions.length - 1) {
      setNextQn(NextQn + 1);
    }
  };

  const handleselectedoption = (questionId, option) => {
    // removes the previous response for the current question (if the user need to respond the same question for 2nd time then previous response is removed in the updateedresponse array)
    const updatedresposne = Responses.filter(
      (response) => response.id !== questionId
    );
    //updatedresponse ia an array
    updatedresposne.push({ id: questionId, response: option });
    setResponses(updatedresposne);
  };

  const handleSubmit = async () => {
    const response = await axios.post(
      `http://localhost:8080/quiz/submit/${id}`,
      Responses
    );
   setscoredisplay(true)
    setScore(response.data);
   
  };

  return (
   
      <div className="containers">
        <h2 className="text-center">Quiz App</h2>
        <hr />
        {scoredisplay ? ( // to display score scoredisplay state is used when the user submits the quiz then score will be displayed
          <>
            <h3 className="text-center">Your Score is {Score}</h3>
            <Link to={"/"} className="btn btn-info">
              Home
            </Link>
          </>
        ) : (
          <>
            {Questions.length > 0 && (
              <div>
                <h5>
                  <em>
                    {NextQn + 1}.&nbsp;{Questions[NextQn].question}
                  </em>
                </h5>
                <ul>
                  {["option1", "option2", "option3", "option4"].map(
                    (option, index) => (
                      <li
                        key={index}
                        className={
                          // to add hover effect on the clicked option it checks the Responses array with current id if matches then clciked option will hover
                          Responses.find(
                            (response) =>
                              response.id === Questions[NextQn].id &&
                              response.response === Questions[NextQn][option]
                          )
                            ? "selected"
                            : ""
                        }
                        onClick={() => {
                          handleselectedoption(
                            Questions[NextQn].id,
                            Questions[NextQn][option]
                          );
                        }}
                      >
                        {Questions[NextQn][option]}
                      </li>
                    )
                  )}
                </ul>
                <div className="d-flex justify-content-between m-4">
                  <button
                    onClick={handlePrevQnChange}
                    className="btn btn-primary"
                    disabled={NextQn === 0}
                  >
                    Prev
                  </button>
                  <button onClick={handleSubmit} className="btn btn-info">
                    Submit
                  </button>
                  <button
                    onClick={handleNextQnChange}
                    className="btn btn-primary"
                    disabled={NextQn === Questions.length - 1}
                  >
                    Next
                  </button>
                </div>
                <div className="text-center ">
                  {NextQn + 1} of {Questions.length}
                </div>
              </div>
            )}
          </>
        )}
      </div>
  
  );
};

export default PlayQuiz;
