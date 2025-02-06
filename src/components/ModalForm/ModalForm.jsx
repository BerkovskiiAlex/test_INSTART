/** @format */

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsModalClose } from "../../Redux/seminars/seminarsSlice";
import { getSeminarForEdit } from "../../Redux/seminars/selectors";
import { updateSeminarThunk } from "../../Redux/seminars/operations";
import { StyledCloseIcon } from "./ModalForm.styled";

export const ModalForm = () => {
  const dispatch = useDispatch();
  const seminarForEdit = useSelector(getSeminarForEdit);
  const [editedSeminar, setEditedSeminar] = useState({});

  useEffect(() => {
    if (seminarForEdit) {
      setEditedSeminar(seminarForEdit);
    }
  }, [seminarForEdit]);

  const handleClose = () => {
    dispatch(setIsModalClose());
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedSeminar((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = () => {
    dispatch(updateSeminarThunk(editedSeminar));
    dispatch(setIsModalClose());
  };

  return (
    <section>
      <StyledCloseIcon onClick={handleClose} />
      {seminarForEdit && (
        <div className="modal-content">
          <h3>Редактировать семинар</h3>
          <form>
            <label>
              Название:
              <input
                type="text"
                name="title"
                value={editedSeminar.title || ""}
                onChange={handleChange}
              />
            </label>
            <label>
              Описание:
              <textarea
                name="description"
                value={editedSeminar.description || ""}
                onChange={handleChange}
              />
            </label>
            <label>
              Дата:
              <input
                type="text"
                name="date"
                value={editedSeminar.date || ""}
                onChange={handleChange}
              />
            </label>
            <label>
              Время:
              <input
                type="text"
                name="time"
                value={editedSeminar.time || ""}
                onChange={handleChange}
              />
            </label>
            <button type="button" onClick={handleSave}>
              Сохранить
            </button>
            <button type="button" onClick={handleClose}>
              Отмена
            </button>
          </form>
        </div>
      )}
    </section>
  );
};
