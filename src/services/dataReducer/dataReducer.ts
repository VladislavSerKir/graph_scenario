import { createSlice } from "@reduxjs/toolkit";
import { IGraphData } from "../../types/dataType";

const initialScenarios = [
  {
    scenario_id: "s1",
    name: "Состояние покоя s1",
    actions: ["a1", "a2", "a3"],
  },
  {
    scenario_id: "s2",
    name: "Состояние стресса s2",
    actions: ["a4", "a5", "a6"],
  },
  {
    scenario_id: "s3",
    name: "Состояние активности s3",
    actions: ["a1", "a5", "a7"],
  },
];

const initialActions = [
  {
    action_id: "a1",
    name: "Глубокое дыхание a1",
    to_scenario: "s2",
  },
  {
    action_id: "a2",
    name: "Медитация a2",
    to_scenario: "", // действие не ведет на сценарий
  },
  {
    action_id: "a3",
    name: "Чтение книги a3",
    to_scenario: "s2",
  },
  {
    action_id: "a4",
    name: "Физическая активность a4",
    to_scenario: "s3",
  },
  {
    action_id: "a5",
    name: "Прогулка на свежем воздухе a5",
    to_scenario: "s1",
  },
  {
    action_id: "a6",
    name: "Общение с близкими a6",
    to_scenario: "", // действие не ведет на сценарий
  },
  {
    action_id: "a7",
    name: "Силовые тренировки a7",
    to_scenario: "s1",
  },
];

const dataState: IGraphData = {
  scenarios: initialScenarios,
  actions: initialActions,
  currScenario: null,
  currAction: null,
};

export const dataSlice = createSlice({
  name: "data",
  initialState: dataState,
  reducers: {
    setCurrScenario: (state, action) => {
      state.currScenario = state.scenarios.find(
        (s) => s.scenario_id === action.payload
      );
    },
    setCurrAction: (state, action) => {
      state.currAction = state.actions.find(
        (a) => a.action_id === action.payload
      );
    },
    editScenario: (state, action) => {
      const { currScenario, formattedData } = action.payload;

      state.scenarios = state.scenarios.map((scenario) => {
        if (scenario.scenario_id === currScenario) {
          return {
            ...scenario,
            ...formattedData,
          };
        }
        return scenario;
      });
    },
    editAction: (state, action) => {
      const { currAction, formattedData } = action.payload;

      state.actions = state.actions.map((action) => {
        if (action.action_id === currAction) {
          return {
            ...action,
            ...formattedData,
          };
        }
        return action;
      });
    },
    addAction: (state, action) => {
      state.actions.push(action.payload.formattedData);
    },
    addScenario: (state, action) => {
      state.scenarios.push(action.payload.formattedData);
    },
  },
});

export const {
  setCurrScenario,
  setCurrAction,
  editScenario,
  editAction,
  addAction,
  addScenario,
} = dataSlice.actions;
export const dataReducer = dataSlice.reducer;
