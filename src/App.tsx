import { useEffect, useState } from "react";
import Product from "./Components/Product";
import selectArrow from "./svgs/arrow.svg";
import logo from "./svgs/logo.svg";
import "./App.css";
import Form from "./Components/Form";
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
interface Car {
  car_id: number;
  photo: string;
  man_id: number;
  model_id: number;
  prod_year: number;
  price_value: number;
  price_usd: number;
  fuel_type_id: number;
  gear_type_id: number;
  right_wheel: boolean;
  engine_volume: number;
  car_run_km: number;
  views:number;
  for_rent:boolean;
  special_persons:boolean;
  rent_insured:boolean;
  location_id:number;
  pic_number:number;
}

interface Manufacturer {
  man_id: string;
  man_name: string;
}

interface Model {
  model_id: number;
  man_id: number;
  model_name: string;
}

function App() {
  const [url,seturl] = useState(`https://api2.myauto.ge/ka/products/?Page=1&fbclid=IwAR2b1V6Yrk3njz57yoAAx2-SYEzeLo7UgFl99SSmqCnaN5zUH6xZCAjuPLc`);
  const [data, setData] = useState<any>([]);
  const [period, setPeriod] = useState();
  const [sortOrder, setSortOrder] = useState("0");
  const [query, setQuery] = useState("");
  const [manData, setManData] = useState([]);
  const [catData, setCatData] = useState([]);
  const [filters, setFilters] = useState();
  const [lastPage, setLastPage] = useState<number | null>(null);
  const [index, setIndex] = useState(1);
  const [selectedButton, setSelectedButton] = useState(1);
  const [innerHTML,setinnerHTML]=useState('')
  const [page,setpage]=useState(true)
  

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
  // useEffect(() => {
  //   const button = document.getElementById(selectedButton.toString());
  //   if (button) {
  //     const innerHTML = button.innerHTML;
  //     console.log(innerHTML);
  //    seturl(`https://api2.myauto.ge/ka/products/?Page=${innerHTML}&fbclid=IwAR2b1V6Yrk3njz57yoAAx2-SYEzeLo7UgFl99SSmqCnaN5zUH6xZCAjuPLc`)// Call the onInnerHTML function with innerHTML value
  //   }
  // }, []);
useEffect(() => {
  const button = document.getElementById(selectedButton.toString());
  if (button) {
    const updatedInnerHTML = button.innerHTML;
    setinnerHTML(updatedInnerHTML);
    console.log(updatedInnerHTML);
    seturl(`https://api2.myauto.ge/ka/products/?Page=${updatedInnerHTML}&fbclid=IwAR2b1V6Yrk3njz57yoAAx2-SYEzeLo7UgFl99SSmqCnaN5zUH6xZCAjuPLc`);
    setpage(false)
  }
}, [selectedButton, index]);
  
  useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get<ApiResponse>(url);
      const { last_page } = response.data.data.meta;
      setLastPage(last_page);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  fetchData();
}, [url]);

  
  
  
  
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
        //changepage(); // Call the changepage function here
      } else if (index < lastPage) {
        setIndex((prevIndex) => prevIndex + 1);
        //changepage(); // Call the changepage function here
        if (selectedButton < 4) {
          setSelectedButton((prevIndex) => prevIndex + 1);
          //changepage(); // Call the changepage function here
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
    fetch("https://static.my.ge/myauto/js/mans.json")
      .then((res) => res.json())
      .then((res) => setManData(res));
    fetch("https://api2.myauto.ge/ka/cats/get")
      .then((res) => res.json())
      .then((res) => setCatData(res.data));
  }, []);
  useEffect(() => {
    fetch(`${url}?${query}&Period=${period}&SortOrder=${sortOrder}`)
      .then((res) => res.json())
      .then((res) => setData([res.data.items, res.data.meta]));
  }, [period, sortOrder, query]);
  function containerReset() {
    Array.from(document.querySelectorAll(".checkbox-container")).map(
      (item: any) => {
        item.style.display = "";
        item.parentNode.children[0].children[1].classList.remove(
          "active-select"
        );
        return item;
      }
    );
    Array.from(document.querySelectorAll(".option-container")).map(
      (item: any) => {
        item.style.display = "";
        item.parentNode.children[0].children[1].classList.remove(
          "active-select"
        );
        return item;
      }
    );
  }
  function handleOptions(e: any) {
    if (e.target.className.includes("select-span")) {
      const container = e.target.parentNode.children[1];
      if (container.style.display === "flex") {
        containerReset();
        container.style.display = "";
      } else {
        containerReset();
        container.style.display = "flex";
        container.parentNode.children[0].children[1].classList.add(
          "active-select"
        );
      }
    } else if (e.target.tagName === "BUTTON") {
      switch (e.target.parentNode.parentNode.id) {
        case "period":
          setPeriod(e.target.value);
          break;
        case "sort-order":
          setSortOrder(e.target.value);
          break;
      }
      containerReset();
      e.target.parentNode.parentNode.children[0].children[0].textContent =
        e.target.textContent;
    }
  }
  return (
    <div
      className="App"
      onClick={(e: any) => {
        const activeContainer: any = Array.from(
          document.querySelectorAll(".checkbox-container")
        )?.find((item: any) => item.style.display === "flex");
        if (
          activeContainer &&
          !activeContainer.contains(e.target) &&
          !e.target.classList.contains("select-span")
        ) {
          containerReset();
        }
      }}
    >
      {data.length === 0 && (
        <div className="loading-screen">
          <div className="load-img"></div>
        </div>
      )}
      <header>
        <img src={logo} alt="Myauto Logo" />
      </header>
      <main>
        <button
          className="filter-btn-mobile"
          onClick={() => {
            const searchForm = document.getElementById("search-form");
            searchForm!.classList.toggle("active-form");
          }}
        >
          <svg
            className="type-icon"
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 4H7.5"
              stroke="#272A37"
              strokeWidth="1.4"
              strokeLinecap="round"
            ></path>
            <circle
              cx="10"
              cy="4"
              r="2.3"
              stroke="#272A37"
              strokeWidth="1.4"
            ></circle>
            <path
              d="M12 10L6.5 10"
              stroke="#272A37"
              strokeWidth="1.4"
              strokeLinecap="round"
            ></path>
            <circle
              cx="4"
              cy="10"
              r="2.3"
              transform="rotate(-180 4 10)"
              stroke="#272A37"
              strokeWidth="1.4"
            ></circle>
          </svg>
          ფილტრი
        </button>
        <Form
          setQuery={setQuery}
          catData={catData}
          manData={manData}
          containerReset={containerReset}
        />
        <div className="product-list-container">
          <div className="product-container-top">
            <p className="total">{data[1]?.total} განცხადება</p>
            <div className="extra-param-control" onClick={handleOptions}>
              <div id="period" className="param-type-container">
                <span className="select-span">
                  <p>პერიოდი</p>
                  <img
                    src={selectArrow}
                    alt="Select Arrow"
                    className="select-arrow"
                  />
                </span>
                <div className="checkbox-container">
                  <button value="">პერიოდი</button>
                  <button value="1h">ბოლო 1 საათი</button>
                  <button value="2h">ბოლო 2 საათი</button>
                  <button value="3h">ბოლო 3 საათი</button>
                  <button value="1d">ბოლო 1 დღე</button>
                  <button value="2d">ბოლო 2 დღე</button>
                  <button value="3d">ბოლო 3 დღე</button>
                  <button value="1w">ბოლო 1 კვირა</button>
                  <button value="2w">ბოლო 2 კვირა</button>
                  <button value="3w">ბოლო 3 კვირა</button>
                </div>
              </div>
              <div id="sort-order" className="param-type-container">
                <span className="select-span">
                  <p>თარიღი კლებადი</p>
                  <img
                    src={selectArrow}
                    alt="Select Arrow"
                    className="select-arrow"
                  />
                </span>
                <div className="checkbox-container">
                  <button value="1">თარიღი კლებადი</button>
                  <button value="2">თარიღი ზრდადი</button>
                  <button value="3">ფასი კლებადი</button>
                  <button value="4">ფასი ზრდადი</button>
                  <button value="5">გარბენი კლებადი</button>
                  <button value="6">გარბენი ზრდადი</button>
                </div>
              </div>
            </div>
          </div>
          {data[0]?.map((car: any, i: number) => (
            <Product
              key={i}
              {...car}
              man_name={
                manData.find((item: any) => item.man_id === car.man_id + "")?.[
                  "man_name"
                ]
              }
              category_name={
                catData.find(
                  (item: any) => item.category_id === car.category_id
                )?.["title"]
              }
            />
          ))}
        </div>
        
      </main>
      {/* ----------------------------------------------------------------------------- */}
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
    </div>
  );
}

export default App;
