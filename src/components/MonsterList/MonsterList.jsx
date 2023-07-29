import { useState } from "react";

import style from "./MonsterList.module.css";

export default function MonsterList({ monsters }) {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState(null);

  const handleSort = (column) => {
    if (sortColumn && sortColumn.column === column) {
      setSortColumn({
        ...sortColumn,
        order: sortColumn.order === "asc" ? "desc" : "asc",
      });
    } else {
      setSortColumn({ column, order: "asc" });
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const getSortedData = () => {
    if (!sortColumn) {
      return monsters;
    }

    const { column, order } = sortColumn;
    const sortedData = [...monsters];

    sortedData.sort((a, b) => {
      const aValue = getColumnValue(a, column);
      const bValue = getColumnValue(b, column);

      if (typeof aValue === "string" && typeof bValue === "string") {
        return order === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      } else {
        return order === "asc" ? aValue - bValue : bValue - aValue;
      }
    });

    return sortedData;
  };

  const getColumnValue = (item, column) => {
    if (column === "hp") {
      return item.max_stats.hp;
    } else if (column === "mp") {
      return item.max_stats.mp;
    } else if (column === "atk") {
      return item.max_stats.atk;
    } else if (column === "def") {
      return item.max_stats.def;
    } else if (column === "agi") {
      return item.max_stats.agi;
    } else if (column === "wis") {
      return item.max_stats.wis;
    } else {
      return item[column];
    }
  };

  const findMaxValue = (monsters, column) => {
    let maxValue = Number.MIN_SAFE_INTEGER;
    for (const monster of monsters) {
      const columnValue = getColumnValue(monster, column);
      if (columnValue > maxValue) {
        maxValue = columnValue;
      }
    }
    return maxValue;
  };

  const findMinValue = (monsters, column) => {
    let minValue = Number.MAX_SAFE_INTEGER;
    for (const monster of monsters) {
      const columnValue = getColumnValue(monster, column);
      if (columnValue < minValue) {
        minValue = columnValue;
      }
    }
    return minValue;
  };

  const sortedMonsters = getSortedData();

  // Calculate the index range for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMonsters = sortedMonsters.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  return (
    <div className={style.monsterList}>
      <table className={style.table}>
        <caption>Dragon Quest Monster Joker 2 Professional Monsters</caption>
        <thead>
          <tr>
            <th scope="col" rowSpan={2} onClick={() => handleSort("id")}>
              ID{" "}
              {sortColumn?.column === "id" &&
                (sortColumn.order === "asc" ? "▲" : "▼")}
            </th>
            <th scope="col" rowSpan={2} onClick={() => handleSort("name")}>
              Name{" "}
              {sortColumn?.column === "name" &&
                (sortColumn.order === "asc" ? "▲" : "▼")}
            </th>
            <th scope="col" rowSpan={2} onClick={() => handleSort("family")}>
              Family{" "}
              {sortColumn?.column === "family" &&
                (sortColumn.order === "asc" ? "▲" : "▼")}
            </th>
            <th scope="col" rowSpan={2}>
              Rank{" "}
              {sortColumn?.column === "rank" &&
                (sortColumn.order === "asc" ? "▲" : "▼")}
            </th>
            <th scope="col" rowSpan={2}>
              Capture level
            </th>
            <th scope="colgroup" colSpan={6}>
              Stats
            </th>
          </tr>
          <tr>
            <th scope="col" onClick={() => handleSort("hp")}>
              HP{" "}
              {sortColumn?.column === "hp" &&
                (sortColumn.order === "asc" ? "▲" : "▼")}
            </th>
            <th scope="col" onClick={() => handleSort("mp")}>
              MP{" "}
              {sortColumn?.column === "mp" &&
                (sortColumn.order === "asc" ? "▲" : "▼")}
            </th>
            <th scope="col" onClick={() => handleSort("atk")}>
              ATK{" "}
              {sortColumn?.column === "atk" &&
                (sortColumn.order === "asc" ? "▲" : "▼")}
            </th>
            <th scope="col" onClick={() => handleSort("def")}>
              DEF{" "}
              {sortColumn?.column === "def" &&
                (sortColumn.order === "asc" ? "▲" : "▼")}
            </th>
            <th scope="col" onClick={() => handleSort("agi")}>
              AGI{" "}
              {sortColumn?.column === "agi" &&
                (sortColumn.order === "asc" ? "▲" : "▼")}
            </th>
            <th scope="col" onClick={() => handleSort("wis")}>
              WIS{" "}
              {sortColumn?.column === "wis" &&
                (sortColumn.order === "asc" ? "▲" : "▼")}
            </th>
          </tr>
        </thead>
        <tbody>
          {currentMonsters.map((monster) => (
            <tr key={monster.id}>
              <td>{monster.id}</td>
              <td>{monster.name}</td>
              <td>{monster.family}</td>
              <td>{monster.rank}</td>
              <td>{monster.level}</td>
              <td
                className={`${
                  monster.max_stats.hp === findMaxValue(monsters, "hp")
                    ? style.highestValue
                    : monster.max_stats.hp === findMinValue(monsters, "hp")
                    ? style.lowestValue
                    : ""
                }`}
              >
                {monster.max_stats.hp}
              </td>
              <td
                className={`${
                  monster.max_stats.mp === findMaxValue(monsters, "mp")
                    ? style.highestValue
                    : monster.max_stats.mp === findMinValue(monsters, "mp")
                    ? style.lowestValue
                    : ""
                }`}
              >
                {monster.max_stats.mp}
              </td>
              <td
                className={`${
                  monster.max_stats.atk === findMaxValue(monsters, "atk")
                    ? style.highestValue
                    : monster.max_stats.atk === findMinValue(monsters, "atk")
                    ? style.lowestValue
                    : ""
                }`}
              >
                {monster.max_stats.atk}
              </td>
              <td
                className={`${
                  monster.max_stats.def === findMaxValue(monsters, "def")
                    ? style.highestValue
                    : monster.max_stats.def === findMinValue(monsters, "def")
                    ? style.lowestValue
                    : ""
                }`}
              >
                {monster.max_stats.def}
              </td>
              <td
                className={`${
                  monster.max_stats.agi === findMaxValue(monsters, "agi")
                    ? style.highestValue
                    : monster.max_stats.agi === findMinValue(monsters, "agi")
                    ? style.lowestValue
                    : ""
                }`}
              >
                {monster.max_stats.agi}
              </td>
              <td
                className={`${
                  monster.max_stats.wis === findMaxValue(monsters, "wis")
                    ? style.highestValue
                    : monster.max_stats.wis === findMinValue(monsters, "wis")
                    ? style.lowestValue
                    : ""
                }`}
              >
                {monster.max_stats.wis}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Paginator */}
      <div className={style.paginator}>
        <button disabled={currentPage === 1} onClick={handlePrevPage}>
          Anterior
        </button>
        {Array.from(
          { length: Math.ceil(sortedMonsters.length / itemsPerPage) },
          (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={currentPage === index + 1 ? "active" : ""}
              disabled={currentPage === index + 1}
            >
              {index + 1}
            </button>
          )
        )}
        <button
          disabled={
            currentPage === Math.ceil(sortedMonsters.length / itemsPerPage)
          }
          onClick={handleNextPage}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
