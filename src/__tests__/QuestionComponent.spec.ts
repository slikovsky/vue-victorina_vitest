import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import QuestionComponent from "../components/QuestionComponent.vue";

describe("QuestionComponent", () => {
  it("renders question text", () => {
    const questionText = "Тестовый вопрос?";
    const wrapper = mount(QuestionComponent, {
      props: {
        text: questionText,
      },
    });
    expect(wrapper.text()).toContain(questionText);
  });

  it("has correct class", () => {
    const wrapper = mount(QuestionComponent, {
      props: {
        text: "Вопрос",
      },
    });
    expect(wrapper.find(".question").exists()).toBe(true);
  });
});
