import React, { useState } from "react";
import { useEffect } from "react";
import InputField from "./InputField";
import SelectField from "./SelectField";
import "./custom.css";

function App() {
  const [form, setForm] = useState({
    nama: "",
    email: "",
    umur: "",
    jurusan: "",
    gender: "",
  });

  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [touched, setTouched] = useState({});

  const handleChange = (e) => {
  const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });

    setTouched({
      ...touched,
      [name]: true, 
    });
  };

  const validate = () => {
    let err = {};

    // NAMA
    if (!form.nama) {
      err.nama = "Nama wajib diisi";
    } else if (!isNaN(form.nama)) {
      err.nama = "Nama tidak boleh angka";
    } else if (form.nama.length < 3) {
      err.nama = "Nama minimal 3 huruf";
    }

    // EMAIL
    if (!form.email) {
      err.email = "Email wajib diisi";
    } else if (!/^[^\s@]+@mahasiswa\.pcr\.ac\.id$/.test(form.email)) {
      err.email = "Gunakan email kampus (@mahasiswa.pcr.ac.id)";
    }

    // UMUR
    if (!form.umur) {
      err.umur = "Umur wajib diisi";
    } else if (isNaN(form.umur)) {
      err.umur = "Umur harus angka";
    } else if (form.umur < 10) {
      err.umur = "Umur minimal 10";
    }

    if (!form.jurusan) {
      err.jurusan = "Jurusan harus dipilih";
    }

    if (!form.gender) {
      err.gender = "Gender harus dipilih";
    }

    setErrors(err);
    setIsValid(
      Object.keys(err).length === 0 &&
        form.nama &&
        form.email &&
        form.umur &&
        form.jurusan &&
        form.gender,
    );
  };

  useEffect(() => {
    validate();
  }, [form]);

  const handleSubmit = (e) => {
    setTouched({
      nama: true,
      email: true,
      umur: true,
      jurusan: true,
      gender: true,
    });
    e.preventDefault();
    validate();
    setSubmitted(true);
  };

  return (
    <div className="container">
      <h2>Form Biodata Mahasiswa</h2>

      <form onSubmit={handleSubmit}>
        <InputField
          label="Nama"
          type="text"
          name="nama"
          value={form.nama}
          onChange={handleChange}
          error={touched.nama && errors.nama}
        />

        <InputField
          label="Email"
          type="text"
          name="email"
          value={form.email}
          onChange={handleChange}
          error={touched.email && errors.email}
        />

        <InputField
          label="Umur"
          type="text"
          name="umur"
          value={form.umur}
          onChange={handleChange}
          error={touched.umur && errors.umur}
        />

        <SelectField
          label="Jurusan"
          value={form.jurusan}
          onChange={handleChange}
          options={[
            "Teknik Informatika",
            "Sistem Informasi",
            "Teknik Komputer",
          ]}
          error={touched.jurusan && errors.jurusan}
          name="jurusan"
        />

        <SelectField
          label="Gender"
          value={form.gender}
          onChange={handleChange}
          options={["Laki-laki", "Perempuan"]}
          error={touched.gender && errors.gender}
          name="gender"
        />

        {/* Conditional Rendering */}
        {isValid && <button type="submit">Submit</button>}
      </form>

      {/* HASIL */}
      {submitted && isValid && (
        <div className="result">
          <h3>Data Berhasil Dikirim</h3>
          <p>Nama: {form.nama}</p>
          <p>Email: {form.email}</p>
          <p>Umur: {form.umur}</p>
          <p>Jurusan: {form.jurusan}</p>
          <p>Gender: {form.gender}</p>
        </div>
      )}
    </div>
  );
}

export default App;
