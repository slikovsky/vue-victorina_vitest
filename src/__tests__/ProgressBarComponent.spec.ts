import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import ProgressBarComponent from "../components/ProgressBarComponent.vue";

describe("ProgressBarComponent", () => {
  it("renders progress bar with correct width", () => {
    const wrapper = mount(ProgressBarComponent, {
      props: {
        current: 3,
        total: 10,
      },
    });
    const bar = wrapper.find(".bar");
    expect(bar.attributes("style")).toContain("width: 30%");
  });

  it("shows correct number of ticks", () => {
    const total = 5;
    const wrapper = mount(ProgressBarComponent, {
      props: {
        current: 1,
        total: total,
      },
    });
    const ticks = wrapper.findAll(".tick");
    expect(ticks.length).toBe(total - 1);
  });

  it("updates width when current changes", async () => {
    const wrapper = mount(ProgressBarComponent, {
      props: {
        current: 2,
        total: 5,
      },
    });
    expect(wrapper.find(".bar").attributes("style")).toContain("width: 40%");

    await wrapper.setProps({ current: 4 });
    expect(wrapper.find(".bar").attributes("style")).toContain("width: 80%");
  });
});
