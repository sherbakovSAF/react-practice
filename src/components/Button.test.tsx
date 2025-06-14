import { test, expect, describe, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./Button";

describe("Button", () => {
  test("has type='button' by default", () => {
    render(<Button>Кнопка</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("type", "button");
  });
  test("accepts custom type", () => {
    render(<Button type="submit">Отправить</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
  });
  test("has base style class", () => {
    render(<Button>Стиль</Button>);
    expect(screen.getByRole("button").className).toMatch(/btn/);
  });
  test("adds secondary class when view='secondary'", () => {
    render(<Button view="secondary">Кнопка</Button>);
    expect(screen.getByRole("button").className).toMatch(/btn--secondary/);
  });
  test("merges passed className", () => {
    render(<Button className="custom-class">Кнопка</Button>);
    expect(screen.getByRole("button").className).toMatch(/custom-class/);
  });
  test("calls onClick handler", () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Клик</Button>);
    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
  test("supports disabled prop", () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  test("supports aria-label", () => {
    render(<Button aria-label="Моя кнопка" />);
    expect(screen.getByLabelText("Моя кнопка")).toBeInTheDocument();
  });
});
