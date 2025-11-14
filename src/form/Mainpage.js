import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Mainpage() {
  const [itemname, setitemname] = useState("");
  const [itemstock, setitemstock] = useState("");
  const [itemlist, setitemlist] = useState([]);
  const [currentpg, setcurrentpg] = useState(1);
  const [search, setsearch] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [loaded, setLoaded] = useState(false);

  const navigate = useNavigate();

  const itemsperpg = 3;

  // USER-BASED STORAGE KEY
  const user = localStorage.getItem("user");
  const storageKey = `${user}_medicines`;

  // ----------- LOAD DATA ONCE -----------
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      setitemlist(JSON.parse(saved));
    }
    setLoaded(true); // loading complete
  }, [storageKey]);

  // ----------- SAVE AFTER LOADED -----------
  useEffect(() => {
    if (loaded) {
      localStorage.setItem(storageKey, JSON.stringify(itemlist));
    }
  }, [itemlist, loaded, storageKey]);

  // ADD ITEM
  const submititem = () => {
    if (itemlist.length >= 5) {
      alert("limit 5");
      return;
    }

    if (itemname && itemstock) {
      const date = new Date().toLocaleString();
      setitemlist([...itemlist, { itemname, itemstock, date }]);
      setitemname("");
      setitemstock("");
    } else {
      alert("Enter the name and stock");
    }
  };

  // DELETE ITEM
  const deleteitem = (index) => {
    const newList = [...itemlist];
    newList.splice(index, 1);
    setitemlist(newList);
  };

  // START EDIT
  const editItem = (index) => {
    setEditIndex(index);
    setitemname(itemlist[index].itemname);
    setitemstock(itemlist[index].itemstock);
  };

  // UPDATE ITEM
  const updateItem = () => {
    const newList = [...itemlist];
    newList[editIndex] = {
      itemname,
      itemstock,
      date: new Date().toLocaleString(),
    };

    setitemlist(newList);
    setitemname("");
    setitemstock("");
    setEditIndex(null);
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // SEARCH FILTER
  const filtered = itemlist.filter((item) =>
    item.itemname.toLowerCase().includes(search.toLowerCase())
  );

  // PAGINATION
  const indexOfLastItem = currentpg * itemsperpg;
  const indexOfFirstItem = indexOfLastItem - itemsperpg;
  const currentItems = filtered.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filtered.length / itemsperpg);

  return (
    <div>
      <div id="header">
        <h1>Medical Store</h1>
        <button id="logout" onClick={logout}>Logout</button>
      </div>

      <label>Item name</label>
      <input
        type="text"
        value={itemname}
        onChange={(e) => setitemname(e.target.value)}
      />

      <label>Available stock</label>
      <input
        type="number"
        value={itemstock}
        onChange={(e) => setitemstock(e.target.value)}
      />

      <button onClick={editIndex === null ? submititem : updateItem}>
        {editIndex === null ? "Add" : "Update"}
      </button>

      <br /><br />

      <h3>Available Stock</h3>

      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setsearch(e.target.value)}
      />

      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>Name</th>
            <th>Stock</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {currentItems.map((item, i) => (
            <tr key={i}>
              <td>{item.itemname}</td>
              <td>{item.itemstock}</td>
              <td>{item.date}</td>
              <td>
                <button onClick={() => editItem(indexOfFirstItem + i)}>Edit</button>
                <button onClick={() => deleteitem(indexOfFirstItem + i)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setcurrentpg(i + 1)}
            style={{
              margin: "3px",
              padding: "5px 10px",
              background: currentpg === i + 1 ? "lightblue" : "white",
              border: "1px solid",
              cursor: "pointer",
            }}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Mainpage;
