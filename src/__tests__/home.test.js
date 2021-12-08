import React from 'react';
import {render, waitFor, screen, waitForElementToBeRemoved, within} from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import App from '../App';
import api from '../services/api';

test('Renders pet listing', async () => {
    render(<App />);
  
    await waitFor(() => {screen.getByTestId('table-body')});

    expect(screen.getByText('Exemplo'));
});

test('Can create a pet', async () => {
    render(<App />);

    await waitFor(() => {screen.getByTestId('table-body')});

    await waitFor(() => {screen.getByText('Criar Novo Pet')});

    userEvent.click(screen.getByText('Criar Novo Pet'));

    await waitFor(() => {screen.getByText('Cadastrar um PET')});

    userEvent.type(screen.getByPlaceholderText('Nome'), 'TESTANDO');

    userEvent.click(screen.getByText('Salvar'));

    await waitFor(() => {screen.getByTestId('table-body')});

    await waitFor(() => {screen.getAllByText('TESTANDO')});
});

test('Can delete a pet', async () => {
    const response = await api.post('/pet', { name: 'ME_APAGUE' });
    const id = response.data.data.id;

    render(<App />);

    await waitFor(() => {screen.getByTestId('table-body')});

    await waitFor(() => {screen.getByTestId('pet-row-' + id)});

    const confirmSpy = jest.spyOn(window, 'confirm');
    confirmSpy.mockImplementation(jest.fn(() => true));

    userEvent.click(screen.getByTestId('pet-row-' + id).getElementsByClassName('deleteBtn')[0]);

    confirmSpy.mockRestore();

    await waitForElementToBeRemoved(screen.getByTestId('pet-row-' + id), {timeout: 2000});
});

test('Can Adopt a pet', async () => {
    render(<App />);

    await waitFor(() => {screen.getByTestId('table-body')});

    const exampleRow = screen.getByText('Exemplo').parentElement;
    const adoptBtn = exampleRow.getElementsByClassName('btn')[0];

    userEvent.click(adoptBtn);

    await waitFor(() => { within(exampleRow).getByText('Adotado') });
});