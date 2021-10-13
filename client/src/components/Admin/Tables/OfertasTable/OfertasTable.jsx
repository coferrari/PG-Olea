import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styles from "./OfertasTable.module.css";
function OfertasTable() {
  const [value, onChange] = useState(new Date());
  const [off, setOff] = useState({
    id: "",
    off: 0,
  });
  return (
    <div className={styles.main}>
      <form className={styles.container}>
        <input
          type="text"
          placeholder="Ingrese el ID de un producto"
          required
          className={styles.id}
        />
        <span>Porcentaje de descuento</span>
        <input type="range" min={0} max={100} step={10} required />
      </form>
      <Calendar onChange={onChange} value={value} />
    </div>
  );
}

export default OfertasTable;
