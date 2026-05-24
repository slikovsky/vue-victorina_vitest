import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import ResultComponent from "../components/ResultComponent.vue";

describe("ResultComponent", () => {
  const mockResults = [
    { count: 1, text: "Плохой результат" },
    { count: [2, 3], text: "Средний результат" },
    { count: [4, 5], text: "Хороший результат" },
    { count: 6, text: "Отличный результат" },
    { count: 7, text: "Превосходный результат" },
  ];

  it("displays score and total", () => {
    const wrapper = mount(ResultComponent, {
      props: {
        score: 5,
        total: 7,
        results: mockResults,
      },
    });
    expect(wrapper.text()).toContain("5 / 7");
  });

  it("shows correct text for single count match", () => {
    const wrapper = mount(ResultComponent, {
      props: {
        score: 1,
        total: 7,
        results: mockResults,
      },
    });
    expect(wrapper.text()).toContain("Плохой результат");
  });

  it("shows correct text for array count match", () => {
    const wrapper = mount(ResultComponent, {
      props: {
        score: 3,
        total: 7,
        results: mockResults,
      },
    });
    expect(wrapper.text()).toContain("Средний результат");
  });
});
