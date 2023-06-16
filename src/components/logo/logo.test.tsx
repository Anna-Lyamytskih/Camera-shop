import { render, screen } from '@testing-library/react';
import { Logo } from './logo';
import { createMemoryHistory } from 'history';
import { HistoryRouter } from '../history-router';
import { Route, Routes } from 'react-router-dom';

const history = createMemoryHistory();

describe('Component: Logo', () => {
  it('should render correctly', () => {
    history.push('/');

    render(
      <HistoryRouter history={history}>
        <Routes>
          <Route
            path="/"
            element={<h1>This is page</h1>}
          />
          <Route
            path="*"
            element={<Logo />}
          />
        </Routes>
      </HistoryRouter>);

    expect(screen.getByText(/This is page/i)).toBeInTheDocument();
  });
});
