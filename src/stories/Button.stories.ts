import type { Meta, StoryObj } from "@storybook/react-vite";

import { fn } from "storybook/test";

import Button from "../components/Button";

const meta = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Кнопка",
  },
};

export const Secondary: Story = {
  args: {
    ...Default.args,
    view: "secondary",
  },
};
