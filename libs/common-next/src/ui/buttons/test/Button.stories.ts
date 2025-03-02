import { Button } from '@org/common-next';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Button> = {
  component: Button,
};

export default meta;
type TButton = StoryObj<typeof Button>;

export const Default: TButton = {
  args: {
    children: 'Кнопка',
  },
};
