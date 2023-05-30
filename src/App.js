import "./styles.css";
import { useEffect, useState } from "react";

export default function App() {
  const [data, setData] = useState([]);
  const [filterList, setFilterList] = useState([]);
  const [inputval, setInputVal] = useState("");

  useEffect(() => {});

  useEffect(() => {
    fetch(
      "https://randomuser.me/api/?results=20&inc=name,picture,id,cell&nat=in"
    )
      .then((res) => res.json())
      .then((result) => {
        console.log(result.results);
        setData(result.results);
        setFilterList(result.results);
      });
  }, []);

  const handleSearch = (e) => {
    let inputVal = e.target.value;
    console.log("logggg", inputVal);
    setInputVal(inputVal);
    console.log(inputval);
    if (inputVal !== "") {
      const filterVal = data.filter((ele) => {
        console.log(Object.values(ele.name.first));
        return ele.name.first.toLowerCase().includes(inputVal.toLowerCase());
      });
      setFilterList(filterVal);
    } else {
      setFilterList(data);
    }
  };

  return (
    <div className="App">
      <div>Messages</div>
      <input
        type="text"
        placeholder="search.."
        value={inputval}
        onChange={(e) => handleSearch(e)}
      />

      {inputval.length > 0 ? (
        filterList.length !== 0 ? (
          filterList.map((ele) => {
            return (
              <ul>
                <img src={ele.picture.thumbnail} />
                <span>
                  {" "}
                  <li>
                    {ele.name.first} {ele.name.last}
                  </li>
                  <span>{ele.cell}</span>
                </span>
              </ul>
            );
          })
        ) : (
          <div> no records founds</div>
        )
      ) : (
        data.map((ele) => {
          return (
            <ul className="list-data">
              <img src={ele.picture.thumbnail} />
              <span>
                {" "}
                <li>
                  {ele.name.first} {ele.name.last}
                </li>
                <span>{ele.cell}</span>
              </span>
            </ul>
          );
        })
      )}
    </div>
  );
}
