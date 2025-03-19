import { useState } from "react";
import { useTypedDispatch, useTypedSelector } from "../../types/types";
import { addAction } from "../../services/dataReducer/dataReducer";

export const AddAction = () => {
  const dispatch = useTypedDispatch();
  const currAction = useTypedSelector((store) => store.data.currAction);

  const [inputData, setInputData] = useState({
    name: currAction?.name || "",
    to_scenario: "",
  });

  const handleActionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmitAddAction = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formattedData = {
      ...inputData,
      action_id: String(Math.floor(Math.random() * 100)),
      to_scenario: "",
    };
    dispatch(addAction({ formattedData }));
    setInputData({
      name: "",
      to_scenario: "",
    });
  };

  return (
    <form
      className="modal-content__form"
      name="add-action"
      onSubmit={handleSubmitAddAction}
    >
      <div className={`result-section__item ui items`}>
        <div className="item">
          <div className={`result-section__input`}>
            <a href="/" className={`header`}>
              <p className={`result-section__item-title`}>
                Добавить новое действие
              </p>
            </a>
            <input
              className={`result-section__input prompt`}
              name="name"
              type="text"
              placeholder="Введите название действия"
              value={inputData.name}
              onChange={handleActionChange}
            />
            <button type="submit"> Добавить</button>
          </div>
        </div>
      </div>
    </form>
  );
};
