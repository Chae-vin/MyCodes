import React, {useState} from "react";
import { Button, Paper } from "@mui/material";

export default function Bingo() {
  const [bingoCard, setBingoCard] = useState(null);
  const [bingoCode, setBingoCode] = useState("");
  const [selectedNumbers, setSelectedNumbers] = useState([]);

  const getBingoCard = async () => {
    try {
      const response = await fetch(
        `http://www.hyeumine.com/getcard.php?bcode=${bingoCode}`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      setBingoCard(data);
      if (data === 0) {
        alert("Bingo Code does not exist!");
      }
    } catch (error) {
      console.error("There was a problem with this fetch operation", error);
    }
  };

  const checkWinner = async () => {
    try {
      const response = await fetch(
        `http://www.hyeumine.com/checkwin.php?playcard_token=${bingoCard.playcard_token}`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if (data === 0) {
        alert("You have not won yet!");
      } else {
        alert("You have won!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getNewCard = async () => {
    try {
      const response = await fetch(
        `http://www.hyeumine.com/getcard.php?bcode=${bingoCode}`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      setBingoCard(data);
      if (data === 0) {
        alert("Bingo Card does not exist!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {bingoCard === null || bingoCard === 0 ? (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                width: "300px",
                height: "500px",
                padding: 20,
                textAlign: "center",
              }}
            >
              <h1>Enter your game code here:</h1>
              <input
                id="code"
                name="code"
                type="text"
                placeholder="Enter your Code"
                value={bingoCode}
                onChange={(e) => setBingoCode(e.target.value)}
              />
              <Button
                variant="contained"
                sx={{ width: "auto", marginTop: "20px" }}
                onClick={getBingoCard}
              >
                Get Bingo Card
              </Button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                borderRadius: 5,
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                width: "auto",
                height: "auto",
                padding: 20,
              }}
            >
              <h1
                style={{
                  fontSize: 30,
                  textAlign: "center",
                  justifyContent: "center",
                }}
              >
                Game Code: {bingoCode}
              </h1>
              <div
                style={{
                  display: "flex",
                  padding: 10,
                  marginBottom: 10,
                  textAlign: "center",
                  justifyContent: "center",
                }}
              >
                <a href="">
                  <button sx={{ width: 200 }}>Change Code</button>
                </a>
                <div style={{ width: 20 }}></div> {/* Add a gap */}
                <a
                  href={`http://www.hyeumine.com/bingodashboard.php?bcode=${bingoCode}`}
                  target="_blank"
                >
                  <button sx={{ width: 200 }}>Open Dashboard</button>
                </a>
              </div>

              <Paper
                elevation={5}
                style={{
                  padding: "80px",
                  display: "inline-block",
                  background: "#ADD8E6",
                }}
              >
                <div style={{ textAlign: "center" }}>
                  {["B", "I", "N", "G", "O"].map((letter) => (
                    <div key={letter} style={{ display: "inline-block" }}>
                      <span style={{ fontWeight: "bold" }}>{letter}</span>
                      <div>
                        {bingoCard.card[letter].map((number, index) => (
                          <div
                            key={index}
                            style={{
                              border: "1px solid black",
                              textAlign: "center",
                              margin: "1px",
                              width: "50px",
                              height: "50px",
                              cursor: "pointer",
                              backgroundColor: selectedNumbers.includes(number)
                                ? "lightgreen"
                                : "white",
                            }}
                            onClick={() => {
                              if (selectedNumbers.includes(number)) {
                                setSelectedNumbers(
                                  selectedNumbers.filter((n) => n !== number)
                                );
                              } else {
                                setSelectedNumbers([
                                  ...selectedNumbers,
                                  number,
                                ]);
                              }
                            }}
                          >
                            <span style={{ fontWeight: "bold" }}>{number}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </Paper>

              <div
                style={{
                  display: "flex",
                  padding: 10,
                  marginTop: 10,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <button
                  style={{ width: 150, marginRight: 10 }}
                  onClick={checkWinner}
                >
                  Check Card
                </button>
                <button style={{ width: 150 }} onClick={getNewCard}>
                  New Card
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
