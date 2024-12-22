import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LoginPage } from '../src/modules/login/login-page';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('Login', () => {
  it('Должна быть срендерена страница авторизации', () => {
    const { baseElement } = render(<LoginPage />);
    expect(baseElement).toBeTruthy();
  });

  it('Должны имется заголовки инпутов', () => {
    const { getByText } = render(<LoginPage />);
    expect(getByText('Email')).toBeInTheDocument();
    expect(getByText('Пароль')).toBeInTheDocument();
  });

  it('Должен содержать кнопку Войти', () => {
    const { getByRole } = render(<LoginPage />);
    expect(getByRole('button', { name: 'Войти' })).toBeInTheDocument();
  });
});
