import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderHook, act } from "@testing-library/react";
import type { Filters } from "../models/types.ts";
import FilterBar from "./FilterBar.tsx";
import useLocalStorage from "../hooks/useLocalStorage.ts";

const defaultFilters: Filters = {
  status: "all",
  priority: "all",
  search: "",
};

// ── FilterBar rendering ──────────────────────────────────────

describe("FilterBar — rendering", () => {
  it("renders the status dropdown", () => {
    render(<FilterBar filters={defaultFilters} onFilterChange={vi.fn()} />);
    expect(screen.getByLabelText(/status/i)).toBeInTheDocument();
  });

  it("renders the priority dropdown", () => {
    render(<FilterBar filters={defaultFilters} onFilterChange={vi.fn()} />);
    expect(screen.getByLabelText(/priority/i)).toBeInTheDocument();
  });

  it("renders the search input", () => {
    render(<FilterBar filters={defaultFilters} onFilterChange={vi.fn()} />);
    expect(screen.getByPlaceholderText(/search tasks/i)).toBeInTheDocument();
  });

  it("shows the current status value", () => {
    render(<FilterBar filters={{ ...defaultFilters, status: "completed" }} onFilterChange={vi.fn()} />);
    const select = screen.getByLabelText(/status/i) as HTMLSelectElement;
    expect(select.value).toBe("completed");
  });

  it("shows the current search value", () => {
    render(<FilterBar filters={{ ...defaultFilters, search: "math" }} onFilterChange={vi.fn()} />);
    const input = screen.getByPlaceholderText(/search tasks/i) as HTMLInputElement;
    expect(input.value).toBe("math");
  });
});

// ── FilterBar interactions ───────────────────────────────────

describe("FilterBar — interactions", () => {
  it("calls onFilterChange with updated status", async () => {
    const user = userEvent.setup();
    const onFilterChange = vi.fn();
    render(<FilterBar filters={defaultFilters} onFilterChange={onFilterChange} />);
    await user.selectOptions(screen.getByLabelText(/status/i), "pending");
    expect(onFilterChange).toHaveBeenCalledWith({ ...defaultFilters, status: "pending" });
  });

  it("calls onFilterChange with updated priority", async () => {
    const user = userEvent.setup();
    const onFilterChange = vi.fn();
    render(<FilterBar filters={defaultFilters} onFilterChange={onFilterChange} />);
    await user.selectOptions(screen.getByLabelText(/priority/i), "high");
    expect(onFilterChange).toHaveBeenCalledWith({ ...defaultFilters, priority: "high" });
  });

  it("calls onFilterChange when user types in search", async () => {
    const user = userEvent.setup();
    const onFilterChange = vi.fn();
    render(<FilterBar filters={defaultFilters} onFilterChange={onFilterChange} />);
    await user.type(screen.getByPlaceholderText(/search tasks/i), "r");
    expect(onFilterChange).toHaveBeenCalledWith({ ...defaultFilters, search: "r" });
  });

  it("keeps other filters unchanged when one changes", async () => {
    const user = userEvent.setup();
    const onFilterChange = vi.fn();
    const current: Filters = { status: "pending", priority: "high", search: "math" };
    render(<FilterBar filters={current} onFilterChange={onFilterChange} />);
    await user.selectOptions(screen.getByLabelText(/status/i), "completed");
    expect(onFilterChange).toHaveBeenCalledWith({ status: "completed", priority: "high", search: "math" });
  });
});

// ── useLocalStorage ──────────────────────────────────────────

describe("useLocalStorage", () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.clearAllMocks();
  });

  it("returns initialValue when localStorage is empty", () => {
    const { result } = renderHook(() => useLocalStorage("tasks", []));
    expect(result.current[0]).toEqual([]);
  });

  it("returns stored value when key exists", () => {
    window.localStorage.setItem("tasks", JSON.stringify([{ id: "1", title: "Buy milk" }]));
    const { result } = renderHook(() => useLocalStorage("tasks", []));
    expect(result.current[0]).toEqual([{ id: "1", title: "Buy milk" }]);
  });

  it("saves to localStorage when value is updated", () => {
    const { result } = renderHook(() => useLocalStorage("tasks", []));
    act(() => { result.current[1]([{ id: "2", title: "Study React" }] as any); });
    const stored = JSON.parse(window.localStorage.getItem("tasks")!);
    expect(stored).toEqual([{ id: "2", title: "Study React" }]);
  });

  it("persists across remounts", () => {
    const { result: first } = renderHook(() => useLocalStorage<string>("mykey", "default"));
    act(() => { first.current[1]("saved"); });
    const { result: second } = renderHook(() => useLocalStorage<string>("mykey", "default"));
    expect(second.current[0]).toBe("saved");
  });

  it("falls back to initialValue with corrupted data", () => {
    window.localStorage.setItem("bad", "not valid json {{{");
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    const { result } = renderHook(() => useLocalStorage("bad", "fallback"));
    expect(result.current[0]).toBe("fallback");
    spy.mockRestore();
  });
});