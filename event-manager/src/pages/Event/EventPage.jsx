import React, { useEffect, useState } from "react";
import api from "../../services/api";
import styles from "./EventPage.module.css";
import topImage from "../../assets/top_events.svg";

const EventPage = () => {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [newEvent, setNewEvent] = useState({
    eventTitle: "",
    eventDate: "",
    photoUrl: "",
    postalCode: "",
    number: "",
    complement: ""
  });
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const fetchEvents = async () => {
    try {
      const response = await api.get("/events");
      setEvents(response.data);
    } catch (error) {
      console.error("Erro ao carregar eventos:", error);
      alert("Erro ao carregar eventos. Tente novamente.");
    }
  };
  useEffect(() => {
    fetchEvents();
  }, []);

  const handleAddEvent = async () => {
    try {
      const response = await api.post("/events", newEvent);
      setEvents([...events, response.data]);
      setShowModal(false);
      setNewEvent({
        eventTitle: "",
        eventDate: "",
        photoUrl: "",
        postalCode: "",
        number: "",
        complement: ""
      });
    } catch (error) {
      console.error("Erro ao adicionar evento:", error);
    }
  };

  const handleEditEvent = async id => {
    try {
      const response = await api.put(`/events/${id}`, newEvent);
      setEvents(
        events.map(event => (event.idEvent === id ? response.data : event))
      );
      setShowModal(false);
      setNewEvent({
        eventDate: "",
        postalCode: "",
        number: "",
        complement: ""
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Erro ao editar evento:", error);
    }
  };

  const handleDeleteEvent = async id => {
    try {
      await api.delete(`/events/${id}`);
      setEvents(events.filter(event => event.idEvent !== id));
    } catch (error) {
      console.error("Erro ao excluir evento:", error);
    }
  };

  const filteredEvents = events.filter(
    event =>
      event.idEvent.toString().includes(search) ||
      event.userId.toString().includes(search)
  );

  return (
    <>
      <div className={styles.container}>
        <img src={topImage} alt="Top" className={styles.topImage} />
        <input
          type="text"
          placeholder="Comece a digitar para encontrar eventos..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className={styles.searchBar}
        />
        <button
          onClick={() => {
          setShowModal(true);
          setIsEditing(false);
        }}
        className={styles.addButton}
      >
        Adicionar Evento
      </button>
      <div className={styles.eventGrid}>
        {filteredEvents.map(event =>
          <div key={event.idEvent} className={styles.eventCard}>
            <img
              src={event.photoUrl}
              alt="Evento"
              className={styles.eventImage}
            />
            <p>
              <strong>Id Administrador:</strong> {event.userId} <br />
              <strong>Administrador(a):</strong> {event.name} <br />
              <strong>Id evento:</strong> {event.idEvent}
              <br />
              <strong>Título:</strong> {event.eventTitle}
              <br />
              <strong>Data:</strong> {event.eventDate}
              <br />
              <strong>Endereço:</strong> {event.postalCode}, {event.street},{" "}
              {event.number}, {event.neighborhood}, {event.city} - {event.state}
            </p>
            <div className={styles.eventActions}>
              <button
                onClick={() => {
                  setShowModal(true);
                  setIsEditing(true);
                  setNewEvent(event);
                }}
                className={styles.editButton}
              >
                Editar
              </button>
              <button
                onClick={() => handleDeleteEvent(event.idEvent)}
                className={styles.deleteButton}
              >
                Excluir
              </button>
            </div>
          </div>
        )}
      </div>

      {showModal &&
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>
              {isEditing ? "Editar Evento" : "Adicionar Evento"}
            </h2>
            <input
              type="text"
              placeholder="Título do Evento"
              value={newEvent.eventTitle}
              onChange={e =>
                setNewEvent({ ...newEvent, eventTitle: e.target.value })}
            />
            <input
              type="datetime-local"
              value={newEvent.eventDate}
              onChange={e =>
                setNewEvent({ ...newEvent, eventDate: e.target.value })}
            />
            <input
              type="text"
              placeholder="URL da Imagem"
              value={newEvent.photoUrl}
              onChange={e =>
                setNewEvent({ ...newEvent, photoUrl: e.target.value })}
            />
            <input
              type="text"
              placeholder="00000-000"
              value={newEvent.postalCode}
              onChange={e =>
                setNewEvent({ ...newEvent, postalCode: e.target.value })}
            />
            <input
              type="text"
              placeholder="Número"
              value={newEvent.number}
              onChange={e =>
                setNewEvent({ ...newEvent, number: e.target.value })}
            />
            <input
              type="text"
              placeholder="Complemento"
              value={newEvent.complement}
              onChange={e =>
                setNewEvent({ ...newEvent, complement: e.target.value })}
            />
            <button
              onClick={() =>
                isEditing
                  ? handleEditEvent(newEvent.idEvent)
                  : handleAddEvent()}
              className={styles.modalButton}
            >
              Salvar
            </button>
            <button
              onClick={() => setShowModal(false)}
              className={`${styles.modalButton}`}
            >
              Cancelar
            </button>
          </div>
        </div>}
    </div>
    </>
  );
};

export default EventPage;
