import { useState } from "react";

import API from "../services/api";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function AIAssistant() {
  const [question, setQuestion] =
    useState("");

  const [messages, setMessages] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const askAI = async () => {
    if (!question.trim()) return;

    const userMessage = {
      role: "user",
      content: question
    };

    setMessages((prev) => [
      ...prev,
      userMessage
    ]);

    setLoading(true);

    try {
      const { data } =
        await API.post(
          "/ai/chat",
          {
            question
          }
        );

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            data.answer
        }
      ]);

      setQuestion("");
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
          error.response?.data?.message ||
          error.message
        }
      ]);

      console.log(error);
    }

    setLoading(false);
  };

  const quickQuestions = [
    "How much did I spend on food this month?",
    "Where can I save money?",
    "Am I overspending?",
    "How can I improve my savings?",
    "Analyze my spending pattern",
    "Give me a monthly budget plan"
  ];

  return (
    <>
      <Navbar />

      <div
        style={{
          display: "flex"
        }}
      >
        <Sidebar />

        <div
          style={{
            flex: 1,
            padding: "20px"
          }}
        >
          <h1>
            AI Financial Advisor
          </h1>

          <div className="card">
            <h3>
              Ask FinanceAI
            </h3>

            <div
              style={{
                display: "flex",
                gap: "10px",
                marginTop:
                  "15px"
              }}
            >
              <input
                type="text"
                value={question}
                placeholder="Ask anything about your finances..."
                onChange={(e) =>
                  setQuestion(
                    e.target.value
                  )
                }
              />

              <button
                className="btn btn-primary"
                onClick={askAI}
              >
                Ask
              </button>
            </div>

            <div
              style={{
                marginTop:
                  "20px"
              }}
            >
              <h4>
                Quick Questions
              </h4>

              {quickQuestions.map(
                (
                  item,
                  index
                ) => (
                  <button
                    key={index}
                    className="btn"
                    style={{
                      margin:
                        "5px"
                    }}
                    onClick={() =>
                      setQuestion(
                        item
                      )
                    }
                  >
                    {item}
                  </button>
                )
              )}
            </div>
          </div>

          <div
            className="card"
            style={{
              minHeight:
                "500px",
              marginTop:
                "20px"
            }}
          >
            <h3>
              Conversation
            </h3>

            {messages.length ===
              0 && (
              <p>
                Ask a financial
                question to get
                AI insights.
              </p>
            )}

            {messages.map(
              (
                message,
                index
              ) => (
                <div
                  key={index}
                  style={{
                    marginTop:
                      "15px",
                    padding:
                      "12px",
                    borderRadius:
                      "8px",
                    background:
                      message.role ===
                      "user"
                        ? "#e0f2fe"
                        : "#f3f4f6"
                  }}
                >
                  <strong>
                    {message.role ===
                    "user"
                      ? "You"
                      : "FinanceAI"}
                    :
                  </strong>

                  <p
                    style={{
                      marginTop:
                        "5px",
                      whiteSpace:
                        "pre-wrap"
                    }}
                  >
                    {
                      message.content
                    }
                  </p>
                </div>
              )
            )}

            {loading && (
              <div
                style={{
                  marginTop:
                    "15px"
                }}
              >
                AI is
                analyzing your
                finances...
              </div>
            )}
          </div>

          <div
            className="card"
            style={{
              marginTop:
                "20px"
            }}
          >
            <h3>
              AI Features
            </h3>

            <ul>
              <li>
                Spending Pattern
                Analysis
              </li>

              <li>
                Budget
                Recommendations
              </li>

              <li>
                Savings
                Suggestions
              </li>

              <li>
                Financial Health
                Insights
              </li>

              <li>
                Personalized
                Financial Advice
              </li>

              <li>
                Monthly Expense
                Optimization
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default AIAssistant;