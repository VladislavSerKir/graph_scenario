import { useState, useEffect } from "react";
import { useTypedDispatch, useTypedSelector } from "../../types/types";
import { editScenario } from "../../services/dataReducer/dataReducer";
import MultiSelectField from "../multi-select-field/multi-select-field";
import { IGenericObject } from "../../types/dataType";

export const ScenarioEditor = () => {
  const dispatch = useTypedDispatch();
  const currScenario = useTypedSelector((store) => store.data.currScenario);
  const actions = useTypedSelector((store) => store.data.actions);

  const actionsList = actions.map((action) => ({
    label: action.name,
    value: action.action_id,
  }));

  const [inputData, setInputData] = useState({
    name: currScenario?.name || "",
    actions:
      currScenario?.actions?.map((actionId) => {
        const action = actions.find((a) => a.action_id === actionId);
        return { label: action?.name, value: actionId };
      }) || [],
  });

  useEffect(() => {
    setInputData({
      name: currScenario?.name || "",
      actions:
        currScenario?.actions?.map((actionId) => {
          const action = actions.find((a) => a.action_id === actionId);
          return { label: action?.name, value: actionId };
        }) || [],
    });
  }, [currScenario, actions]);

  const handleScenarioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleMultiSelectChange = (selectedOptions: IGenericObject) => {
    setInputData((prevState) => ({
      ...prevState,
      actions: selectedOptions.value,
    }));
  };

  const handleSubmitScenario = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formattedData = {
      ...inputData,
      actions: inputData.actions.map((i: IGenericObject) => i.value),
    };
    dispatch(
      editScenario({ currScenario: currScenario?.scenario_id, formattedData })
    );
  };

  return (
    <form
      className="modal-content__form"
      name="scenario"
      onSubmit={handleSubmitScenario}
    >
      <div className={`result-section__item ui items`}>
        <div className="item">
          <div className={`result-section__input`}>
            {currScenario ? (
              <p className={`result-section__item-title`}>
                Текущий сценарий: {currScenario?.name}
              </p>
            ) : (
              <p className={`result-section__item-title`}>
                Кликните на любой из сценариев (прямоугольник)
              </p>
            )}
            <input
              className={`result-section__input prompt`}
              name="name"
              type="text"
              placeholder="Введите название сценария"
              value={inputData.name}
              onChange={handleScenarioChange}
            />
            <MultiSelectField
              options={actionsList}
              onChange={handleMultiSelectChange}
              defaultValue={inputData.actions}
              name="actions"
              label={"Возможные действия:"}
              toTop
            />
            <button className="button" type="submit">
              {" "}
              Изменить
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};
