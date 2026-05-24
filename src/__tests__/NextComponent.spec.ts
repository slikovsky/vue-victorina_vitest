import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import NextComponent from "../components/NextComponent.vue";

describe("NextComponent", () => {
  it("renders button", () => {
    const wrapper = mount(NextComponent);
    expect(wrapper.find(".next-btn").exists()).toBe(true);
  });

  it("renders image", () => {
    const wrapper = mount(NextComponent);
    expect(wrapper.find("img").exists()).toBe(true);
  });

  it("emits click event when clicked", async () => {
    const wrapper = mount(NextComponent);
    await wrapper.find(".next-btn").trigger("click");
    expect(wrapper.emitted("click")).toBeTruthy();
    expect(wrapper.emitted("click")?.length).toBe(1);
  });
});
