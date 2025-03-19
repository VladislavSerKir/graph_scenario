import { useState, useEffect } from "react";
import { useTypedDispatch, useTypedSelector } from "../../types/types";
import { editAction } from "../../services/dataReducer/dataReducer";

export const ActionsEditor = () => {
  const dispatch = useTypedDispatch();
  const currAction = useTypedSelector((store) => store.data.currAction);

  const [inputData, setInputData] = useState({
    name: currAction?.name || "",
  });

  useEffect(() => {
    setInputData({
      name: currAction?.name || "",
    });
  }, [currAction]);

  const handleActionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmitAction = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formattedData = {
      ...inputData,
    };
    dispatch(editAction({ currAction: currAction?.action_id, formattedData }));
  };

  return (
    <form
      className="modal-content__form"
      name="action"
      onSubmit={handleSubmitAction}
    >
      <div className={`result-section__item ui items`}>
        <div className="item">
          <div className={`result-section__input`}>
            <a href="/" className={`header`}>
              {currAction ? (
                <p className={`result-section__item-title`}>
                  {currAction?.name}
                </p>
              ) : (
                <p className={`result-section__item-title`}>
                  Кликните на любое действие
                </p>
              )}
            </a>
            <input
              className={`result-section__input prompt`}
              name="name"
              type="text"
              placeholder="Введите название действия"
              value={inputData.name}
              onChange={handleActionChange}
            />
            <button type="submit"> Изменить</button>
          </div>
        </div>
      </div>
    </form>
  );
};
