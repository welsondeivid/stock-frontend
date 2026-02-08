import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router';
import NavBar from './Index';
import { test } from 'vitest';

function renderNavBar() {
  return render(
    <MemoryRouter>
      <NavBar />
    </MemoryRouter>
  );
}

//Testes de Renderização

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
  const links = ['Produtos', 'Matérias-Prima', 'Produtos Disponíveis'];

  links.forEach(link => {
    fireEvent.click(button);

    const nav = container.querySelector('nav');
    expect(nav).toHaveClass('open');

    fireEvent.click(screen.getByText(link));
    expect(nav).not.toHaveClass('open');
  });
});

//Testes de Navegação

test('navigates to Products page', async () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route path="/" element={<NavBar />} />
        <Route path="/products" element={<div>Products Page</div>} />
      </Routes>
    </MemoryRouter>
  );
});

test('navigates to Raw Materials page', async () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route path="/" element={<NavBar />} />
        <Route path="/raw-materials" element={<div>Raw Materials Page</div>} />
      </Routes>
    </MemoryRouter>
  );
});

test('navigates to Available Products page', async () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route path="/" element={<NavBar />} />
        <Route path="/" element={<div>Available Products Page</div>} />
      </Routes>
    </MemoryRouter>
  );
});

test("adds active class to current route link", () => {
  render(
    <MemoryRouter initialEntries={["/products"]}>
      <NavBar />
    </MemoryRouter>
  );

  const produtosLink = screen.getByText("Produtos");

  expect(produtosLink).toHaveClass("active");
});