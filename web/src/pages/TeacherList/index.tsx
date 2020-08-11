import React, { useState, useEffect, FormEvent } from "react";
import "./styles.css";
import PageHeader from "../../components/PageHeader";
import TeacherItem, {Teacher} from "../../components/TeacherItem";
import Input from "../../components/Input";
import Select from "../../components/Select";
import api from "../../services/api";
const TeacherList = () => {
  const [subject, setSubject] = useState("");
  const [week_day, setWeekDay] = useState("");
  const [time, setTime] = useState("");
  const [classesList, setClassesList] = useState([
    {
      id: 0,
      subject: "",
      cost: 0,
      user_id: 0,
      name: "",
      avatar: "",
      whatsapp: "",
      bio: "",
    },
  ]);

  useEffect(() => {
    api.get("/classes").then((response) => {
      const data = response.data;
      setClassesList(data);
    });
  }, []);

  const searchTeachers = async (e: FormEvent) => {
    e.preventDefault();
    const response = await api.get("/classes/filter",{
      params: {
        subject,
        week_day,
        time,
      }
    });
    setClassesList(response.data);
  };

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Estes são os proffys disponíveis.">
        <form id="search-teachers" onSubmit={searchTeachers}>
          <Select
            name="subject"
            label="Matéria"
            value={subject}
            onChange={(e) => {
              setSubject(e.target.value);
            }}
            options={[
              { value: "Artes", label: "Artes" },
              { value: "Biologia", label: "Biologia" },
              { value: "Ciências", label: "Ciências" },
              { value: "Educação Física", label: "Educação Física" },
              { value: "Física", label: "Física" },
              { value: "Geografia", label: "Geografia" },
              { value: "História", label: "História" },
              { value: "Matemática", label: "Matemática" },
              { value: "Português", label: "Português" },
              { value: "Química", label: "Química" },
            ]}
          />
          <Select
            name="week_day"
            label="Dia da semana"
            value={week_day}
            onChange={(e) => {
              setWeekDay(e.target.value);
            }}
            options={[
              { value: "1", label: "Domingo" },
              { value: "2", label: "Segunda-feira" },
              { value: "3", label: "Terça-feira" },
              { value: "4", label: "Quarta-feira" },
              { value: "5", label: "Quinta-feira" },
              { value: "6", label: "Sexta-feira" },
              { value: "7", label: "Sábado" },
            ]}
          />
          <Input
            type="time"
            name="time"
            label="Hora"
            value={time}
            onChange={(e) => {
              setTime(e.target.value);
            }}
          />
          <button type="submit">Pesquisar</button>
        </form>
      </PageHeader>
      <main>
        {classesList.map((teacher: Teacher) => {
          return (
            <TeacherItem
              key={teacher.id}
              teacher={teacher}
            />
          );
        })}
      </main>
    </div>
  );
};

export default TeacherList;
