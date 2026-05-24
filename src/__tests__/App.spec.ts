import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import App from "../App.vue";

describe("App", () => {
  it("renders the app component", () => {
    const wrapper = mount(App);
    expect(wrapper.find(".app").exists()).toBe(true);
  });

  it("shows first question initially", () => {
    const wrapper = mount(App);
    expect(wrapper.find(".question").exists()).toBe(true);
    expect(wrapper.find(".answers").exists()).toBe(true);
  });

  it("shows result when all questions are answered", async () => {
    const wrapper = mount(App);

    // Проходим все 7 вопросов
    const totalQuestions = 7;

    for (let i = 0; i < totalQuestions; i++) {
      // Выбираем первый ответ
      const answers = wrapper.findAll(".answer");
      expect(answers.length).toBeGreaterThan(0);
      await answers[0].trigger("click");
      await wrapper.vm.$nextTick();

      // Проверяем, что isAnswered стал true
      expect(wrapper.vm.isAnswered).toBe(true);

      // Нажимаем кнопку Next для перехода к следующему вопросу
      const nextButton = wrapper.find(".next-btn");

      // Нажимаем Next для всех вопросов, включая последний
      // (для последнего вопроса это вызовет showResult = true)
      expect(nextButton.exists()).toBe(true);
      await nextButton.trigger("click");
      await wrapper.vm.$nextTick();
    }

    // Теперь showResult должен быть true
    expect(wrapper.vm.showResult).toBe(true);

    // Проверяем, что компонент результата отображается
    expect(wrapper.findComponent({ name: "ResultComponent" }).exists()).toBe(true);
  });

  it("increases score when answer is correct", async () => {
    const wrapper = mount(App);
    const correctAnswerIndex = wrapper.vm.currentQuestion.correct;

    await wrapper.findAll(".answer")[correctAnswerIndex].trigger("click");
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.correctAnswers).toBe(1);

    // Нажимаем Next чтобы перейти к следующему вопросу
    await wrapper.find(".next-btn").trigger("click");
  });

  it("does not increase score when answer is wrong", async () => {
    const wrapper = mount(App);
    // Выбираем неправильный ответ (если correct = 0, берем 1, иначе 0)
    const correctIndex = wrapper.vm.currentQuestion.correct;
    const wrongAnswerIndex = correctIndex === 0 ? 1 : 0;

    await wrapper.findAll(".answer")[wrongAnswerIndex].trigger("click");
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.correctAnswers).toBe(0);
  });

  it("changes question after clicking next", async () => {
    const wrapper = mount(App);
    const firstQuestionId = wrapper.vm.currentQuestion.id;

    // Выбираем ответ
    await wrapper.findAll(".answer")[0].trigger("click");
    await wrapper.vm.$nextTick();

    // Нажимаем Next
    await wrapper.find(".next-btn").trigger("click");
    await wrapper.vm.$nextTick();

    // Проверяем, что вопрос изменился
    expect(wrapper.vm.currentQuestion.id).not.toBe(firstQuestionId);
    expect(wrapper.vm.selectedAnswer).toBe(null);
    expect(wrapper.vm.isAnswered).toBe(false);
  });
});
