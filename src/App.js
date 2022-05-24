import "./App.css";
import contacts from "./contacts.json";
import { useState } from "react";
import { Button } from "react-bootstrap";

function App() {
  const [contacsList, setContactList] = useState(contacts.slice(0, 5)); //Que aparezcan solo 5

  //!----------- Add -------------
  const handleAddContact = () => {
    console.log("asddsa");
    let randomNumber = Math.floor(Math.random() * contacts.length); //Numero random
    const randomContact = contacts[randomNumber]; //Posicion random del array
    console.log(randomContact);

    setContactList([randomContact, ...contacsList]); //renderizamos el contacts random
    //Cuando añadimos elemento adicional
    //Para no dañar el array original cuando  utilizamos metodos que lo mutan
  };
  //!----------- Short -------------
  const handleSortByName = () => {
    //Copiamos el array pq sort es un metodo que muta
    const contactsCopy = [...contacsList];
    contactsCopy.sort((elem1, elem2) => {
      if (elem1.name > elem2.name) {
        return 1;
      } else {
        return -1;
      }
    });
    setContactList(contactsCopy);
  };

  const handleSortBypopularity = () => {
    const contactsCopy = [...contacsList];
    contactsCopy.sort((elem1, elem2) =>
      elem1.popularity > elem2.popularity ? 1 : -1
    );
    setContactList(contactsCopy);
  };

  //!----------- Delete -------------
  //? Delete con Slice
  /*const handleDelete = (iToDelete) => {
    console.log(iToDelete);
    const contactsCopy = [...contacsList];

    contactsCopy.splice(iToDelete, 1);

    setContactList(contactsCopy);
  };*/
  //? Delete con Filter
  const handleDelete = (idToDelete) => {
    const filterArr = contacsList.filter((each) => each.id !== idToDelete);

    setContactList(filterArr);
  };

  //!----------- Render -------------
  return (
    <div className="App">
      <div className="btn-container">
        <button onClick={handleAddContact}>Random Contact</button>
        <button variant="outline-dark" onClick={handleSortByName}>
          Sort by name{" "}
        </button>
        <button onClick={handleSortBypopularity}>Sort by popularity</button>
      </div>

      <table className="border-separate border border-slate-500">
        <thead>
          <th>Photo</th>
          <th>Name</th>
          <th>Popularity</th>
          <th>Won Oscar</th>
          <th>Won Emmy</th>
        </thead>
        {contacsList.map((each, i) => {
          return (
            <tbody key={each.id}>
              <tr>
                <td>
                  <img src={each.pictureUrl} alt="" width="150px" />
                </td>
                <td>
                  <h3>{each.name}</h3>
                </td>
                <td>
                  <span>{each.popularity.toFixed(2)}</span>
                </td>
                <td>
                  <samp> {each.wonOscar === true ? "🗿" : ""}</samp>
                </td>
                <td>
                  <samp> {each.wonEmmy === true ? "🏆" : ""}</samp>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(each.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>
    </div>
  );
}

export default App;
