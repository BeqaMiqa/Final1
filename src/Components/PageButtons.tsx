import React, { useEffect, useState } from "react";
import axios from "axios";

interface ApiResponse {
  data: {
    meta: {
      total: number;
      per_page: number;
      current_page: number;
      last_page: number;
    };
  };
}

interface LastPageComponentProps {
  onInnerHTML: (innerHTML: string) => void;
}

const LastPageComponent: React.FC<LastPageComponentProps> = ({ onInnerHTML }) => {
  const [lastPage, setLastPage] = useState<number | null>(null);
  const [index, setIndex] = useState(1);
  const [selectedButton, setSelectedButton] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<ApiResponse>(
          "https://api2.myauto.ge/ka/products/"
        );
        const { last_page } = response.data.data.meta;
        setLastPage(last_page);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);


  const handleInnerHTML = (innerHTML: string) => {
    // Pass the innerHTML value to the app.tsx file or perform any other necessary actions
    console.log("InnerHTML:", innerHTML);
  };
  useEffect(() => {
    // Rest of the useEffect code

    const button = document.getElementById(selectedButton.toString());
    if (button) {
      const innerHTML = button.innerHTML;
      onInnerHTML(innerHTML); // Call the onInnerHTML function with innerHTML value
    }

    // Rest of the component code
  }, []);


  const handleDecrement = () => {
    if (lastPage !== null) {
      if (index == lastPage) {
        setIndex(index-1)
      } else {
        if (index > 1) {
          setIndex((prevIndex) => prevIndex - 1);
          if (selectedButton > 1) {
            setSelectedButton((prevIndex) => prevIndex - 1);
          }

          if (index > 4) {
            setSelectedButton(4);
          }
        }
      }
    }
  };

  const handleIncrement = () => {
    if (lastPage !== null) {
      if (selectedButton === 4) {
        setIndex((prevIndex) => prevIndex + 1);
      } else if (index < lastPage) {
        setIndex((prevIndex) => prevIndex + 1);
        if (selectedButton < 4) {
          setSelectedButton((prevIndex) => prevIndex + 1);
        }
      }
    }
  };

  const handleLastPageClick = () => {
    setSelectedButton(4);
    console.log(selectedButton);
    if (lastPage !== null) {
      setIndex(lastPage);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      console.log(index);
    }, 2000); // Log every 2 seconds (2000 milliseconds)

    return () => {
      clearInterval(interval); // Clean up the interval on component unmount
    };
  }, [selectedButton]);

  return (
    <div>
      {index > 1 ? (
        <button
          style={selectedButton === 1 ? { backgroundColor: "orange" } : {}}
          onClick={() => {
            console.log(selectedButton);
            setIndex(1);
            setSelectedButton(1);
          }}
        >
          {"<<"}
        </button>
      ) : (
        <button disabled>{"<<"}</button>
      )}
      <button disabled={index === 1} onClick={handleDecrement}>
        {"<"}
      </button>
      <button
        id="1"
        style={selectedButton === 1 ? { backgroundColor: "orange" } : {}}
        onClick={() => {
          if (index - 3 > 1) {
            console.log(selectedButton);
            setIndex(index - 3);
            setSelectedButton(4);
          } else {
            console.log(selectedButton);
            setSelectedButton(1);
          }
        }}
      >
        {index > 4 ? index - 3 : 1}
      </button>

      <button
        id="2"
        style={selectedButton === 2 ? { backgroundColor: "orange" } : {}}
        onClick={() => {
          if (index - 3 > 1) {
            console.log(selectedButton);
            setIndex(index - 2);
            setSelectedButton(4);
          } else {
            console.log(selectedButton);
            setSelectedButton(2);
          }
        }}
      >
        {index > 4 ? index - 2 : 2}
      </button>
      <button
        id="3"
        style={selectedButton === 3 ? { backgroundColor: "orange" } : {}}
        onClick={() => {
          if (index - 3 > 1) {
            console.log(selectedButton);
            setIndex(index - 1);
            setSelectedButton(4);
          } else {
            console.log(selectedButton);
            setSelectedButton(3);
          }
        }}
      >
        {index > 4 ? index - 1 : 3}
      </button>
      <button
        id="4"
        style={selectedButton === 4 ? { backgroundColor: "orange" } : {}}
        onClick={() => {
          setSelectedButton(4);
          console.log(selectedButton);
        }}
      >
        {index > 4 ? index : 4}
      </button>
      {lastPage !== null && index < lastPage ? (
        <>
          {index + 1 > lastPage ? null : (
            <button
              id="5"
              style={selectedButton === 5 ? { backgroundColor: "orange" } : {}}
              onClick={() => {
                console.log("i");
                if (index < 4) {
                  setIndex(5);
                  setSelectedButton(4);
                } else {
                  setSelectedButton(4);
                  setIndex(index + 1);
                }
              }}
            >
              {index > 4 ? index + 1 : 5}
            </button>
          )}
          {index + 2 > lastPage ? null : (
            <button
              id="6"
              style={selectedButton === 6 ? { backgroundColor: "orange" } : {}}
              onClick={() => {
                if (index < 4) {
                  setSelectedButton(4);
                  setIndex(6);
                } else {
                  setSelectedButton(4);
                  setIndex(index + 2);
                }
              }}
            >
              {index > 4 ? index + 2 : 6}
            </button>
          )}
          {index + 3 > lastPage ? null : (
            <button
              id="7"
              style={selectedButton === 7 ? { backgroundColor: "orange" } : {}}
              onClick={() => {
                console.log(selectedButton);
                if (index < 4) {
                  setSelectedButton(4);
                  setIndex(7);
                } else {
                  setSelectedButton(4);
                  setIndex(index + 3);
                }
              }}
            >
              {index > 4 ? index + 3 : 7}
            </button>
          )}
        </>
      ) : null}

      <button onClick={handleIncrement}>{">"}</button>
      {lastPage !== null && index !== lastPage ? (
        <button
          style={selectedButton === lastPage ? { backgroundColor: "orange" } : {}}
          onClick={handleLastPageClick}
        >
          {">>"}
        </button>
      ) : (
        <button disabled>{">>"}</button>
      )}
      <p>Last Page: {lastPage}</p>
    </div>
  );
};

export default LastPageComponent;