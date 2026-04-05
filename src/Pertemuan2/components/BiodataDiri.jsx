import Nama from "./Nama";
import Umur from "./Umur";
import Alamat from "./Alamat";
import Hobi from "./Hobi";
import Pendidikan from "./Pendidikan";
import Kontak from "./Kontak";

import foto from "../../assets/hiu.png";

function BiodataDiri() {
  return (
    <div className="poster">
      {/* BUBBLES */}
      <div className="bubbles">
        <span style={{ left: "10%", animationDuration: "8s" }}></span>
        <span style={{ left: "20%", animationDuration: "10s" }}></span>
        <span style={{ left: "35%", animationDuration: "7s" }}></span>
        <span style={{ left: "50%", animationDuration: "9s" }}></span>
        <span style={{ left: "70%", animationDuration: "11s" }}></span>
        <span style={{ left: "85%", animationDuration: "6s" }}></span>
      </div>

      <h1>OCEAN PROFILE</h1>
      <h3 className="sub">Biodata Diri 🌊</h3>

      <img src={foto} alt="foto" />

      <div className="biodata">
        <Nama />
        <Umur />
        <Alamat />
        <Hobi />
        <Pendidikan />
        <Kontak />
      </div>
    </div>
  );
}

export default BiodataDiri;
