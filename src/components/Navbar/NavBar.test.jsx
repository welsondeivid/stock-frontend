import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import NavBar from './Index';

function renderNavBar() {
  return render(
    <MemoryRouter>
      <NavBar />
    </MemoryRouter>
  );
}

test('renders navigation links', () => {
  renderNavBar();

  expect(screen.getByText('Produtos')).toBeInTheDocument();
  expect(screen.getByText('Matérias-Prima')).toBeInTheDocument();
  expect(screen.getByText('Produtos Disponíveis')).toBeInTheDocument();
});

test('menu starts closed', () => {
  const { container } = renderNavBar();

  const nav = container.querySelector('nav');
  expect(nav).not.toHaveClass('open');
});

test('opens menu when clicking hamburger button', () => {
  const { container } = renderNavBar();

  const button = screen.getByRole('button');
  const nav = container.querySelector('nav');

  fireEvent.click(button);

  expect(nav).toHaveClass('open');
});

test('closes menu when clicking a link', () => {
  const { container } = renderNavBar();

  const button = screen.getByRole('button');
  fireEvent.click(button); // abre

  const nav = container.querySelector('nav');
  expect(nav).toHaveClass('open');

  fireEvent.click(screen.getByText('Produtos')); // fecha

  expect(nav).not.toHaveClass('open');
});