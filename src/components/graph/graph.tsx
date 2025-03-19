import React, { useEffect, useRef } from "react";
import cytoscape from "cytoscape";
import dagre from "cytoscape-dagre";
import { IAction, IScenario } from "../../types/dataType";
import { useTypedDispatch, useTypedSelector } from "../../types/types";
import {
  setCurrAction,
  setCurrScenario,
} from "../../services/dataReducer/dataReducer";

cytoscape.use(dagre);

const Graph: React.FC = () => {
  const dispatch = useTypedDispatch();
  const scenarios = useTypedSelector((store) => store.data.scenarios);
  const actions = useTypedSelector((store) => store.data.actions);

  const cyRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!cyRef.current) return;

    const elements: cytoscape.ElementDefinition[] = [];

    // Добавляем узлы для сценариев
    scenarios?.forEach((scenario: IScenario) => {
      elements.push({
        group: "nodes",
        data: {
          id: scenario.scenario_id,
          label: scenario.name,
          type: "scenario", // Добавляем тип узла для сценариев
        },
      });
    });

    // Добавляем узлы для действий
    actions?.forEach((action: IAction) => {
      elements.push({
        group: "nodes",
        data: {
          id: action.action_id,
          label: action.name,
          type: "action", // Добавляем тип узла для действий
        },
      });
    });

    // Добавляем ребра между сценариями и действиями
    scenarios?.forEach((scenario: IScenario) => {
      scenario.actions.forEach((actionId) => {
        const action = actions.find((a: IAction) => a.action_id === actionId);
        elements.push({
          group: "edges",
          data: {
            id: `${scenario.scenario_id}-${actionId}`,
            source: scenario.scenario_id,
            target: actionId,
            label: action ? action.name : "", // Добавляем название действия как метку ребра
          },
        });
      });
    });

    // Добавляем ребра между действиями и сценариями
    actions?.forEach((action: IAction) => {
      if (action.to_scenario) {
        elements.push({
          group: "edges",
          data: {
            id: `${action.action_id}-${action.to_scenario}`,
            source: action.action_id,
            target: action.to_scenario,
            label: action.name, // Добавляем название действия как метку ребра
          },
        });
      }
    });

    const cy = cytoscape({
      container: cyRef.current,
      elements: elements,
      style: [
        {
          selector: 'node[type = "scenario"]', // Стиль для узлов-сценариев
          style: {
            label: "data(label)",
            "text-valign": "center",
            "text-halign": "center",
            "background-color": "#777",
            color: "#fff",
            shape: "rectangle",
            width: "250px",
            height: "40px",
          },
        },
        {
          selector: 'node[type = "action"]', // Стиль для узлов-действий
          style: {
            label: "data(label)",
            "text-valign": "center",
            "text-halign": "center",
            "background-color": "#999",
            color: "#fff",
            shape: "ellipse",
            width: "250px",
            height: "50px",
          },
        },
        {
          selector: "edge",
          style: {
            width: 3,
            "line-color": "#999",
            "curve-style": "bezier",
            "target-arrow-shape": "triangle",
            "target-arrow-color": "#999",
            label: "data(label)", // Отображаем метку ребра
            "text-rotation": "autorotate", // Автоматически поворачиваем текст
            "text-margin-y": -10, // Смещаем текст для лучшей видимости
            "font-size": 12, // Размер шрифта
            color: "#333", // Цвет текста
          },
        },
      ],
      layout: {
        name: "dagre",
      },
    });

    // Обработчик клика на узлы с типом "scenario"
    cy.on("click", 'node[type = "scenario"]', (event) => {
      const node = event.target;

      // Сброс цвета всех узлов
      cy.nodes().style("background-color", "#666"); // Сбрасываем цвет для сценариев
      cy.nodes('[type = "action"]').style("background-color", "#999"); // Сбрасываем цвет для действий

      // Устанавливаем красный цвет для выбранного узла
      node.style("background-color", "red");

      const scenarioID = node.data("id");
      dispatch(setCurrScenario(scenarioID));
    });

    // Обработчик клика на узлы с типом "action"
    cy.on("click", 'node[type = "action"]', (event) => {
      const node = event.target;

      // Сброс цвета всех узлов
      cy.nodes().style("background-color", "#777"); // Сбрасываем цвет для сценариев
      cy.nodes('[type = "action"]').style("background-color", "#999"); // Сбрасываем цвет для действий

      // Устанавливаем зеленый цвет для выбранного узла
      node.style("background-color", "green");

      const actionID = node.data("id");
      dispatch(setCurrAction(actionID));
    });

    // Покрасить блок основного сценария

    const nodeS1 = cy.nodes(`#${scenarios[0].scenario_id}`);
    if (nodeS1.length > 0) {
      nodeS1.style("background-color", "blue");
    }

    return () => {
      cy.destroy();
    };
  }, [actions, scenarios, dispatch]);

  return <div ref={cyRef} style={{ width: "100%", height: "600px" }} />;
};

export default Graph;
