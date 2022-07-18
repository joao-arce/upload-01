import React, { useEffect, useState } from 'react';
import tw from 'tailwind-styled-components';
import { useRouter } from 'next/router';

import { TemplateContainer, TemplateContent } from '../../components/templates';
import {
  formateDateToSend,
  formateDateToShow,
  getBrazilianDate,
} from '../../../util/helpers';

import { getAllTickets } from '../../../libs/ticket';
import { ITicket } from '../../../types/ticket';
import { IOrder } from '../../../types/order';
import { getCashierByDate } from '../../../libs/cashier';
import { createOrder, listTodayOrders } from '../../../libs/order';
import { Spinner } from '../../components/Spinner';

export const Cadastro = () => {
  const [eventDate, setEventDate] = useState(
    formateDateToShow(getBrazilianDate())
  );

  const [number, setNumber] = useState('');
  const [idTicket, setIdTicket] = useState('EMPTY');
  const [comboPrice, setcomboPrice] = useState(0);
  const [idCashier, setIdCashier] = useState(0);

  const [list, setList] = useState<ITicket[]>([]);
  const [orders, setOrders] = useState<IOrder[]>([]);

  const [showMsg, setShowMsg] = useState(false);
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const router = useRouter();

  const Panel = tw.div`
    bg-gray-100
    rounded-md 
    border-neutral-400
  `;

  const Title = tw.h2`
    text-gray-800 
    text-2xl 
    lg:text-3xl 
    font-bold 
    text-center 
    mb-4 
    md:mb-6 
    pt-5
  `;

  const loadCombos = async () => {
    const tickets = await getAllTickets();
    const notCombos = tickets.filter((ticket: { id: number }) => ticket.id > 2);
    // console.log('tickets ', notCombos);
    setList(notCombos);
  };

  const cleanData = () => {
    setNumber('');
    setIdTicket('EMPTY');
  };

  const validateData = () => {
    if (!(number && parseInt(number) > 0)) {
      setMsg('Numero da comanda é obrigatório.');
      setShowMsg(true);
      return;
    }

    if (!eventDate) {
      // TODO there is date than it must be valid
      setMsg('Data é obrigatória.');
      setShowMsg(true);
      return;
    }
    // console.log('validateData ', idTicket);
    if (idTicket === 'EMPTY') {
      setMsg('Selecione o combo.');
      setShowMsg(true);
      return;
    }

    setShowMsg(false);
    return true;
  };

  const loadTiketValues = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();

    const id = e.target.value;
    const ticket = list.filter((item) => item.id === +id);

    // console.log('id ', id);
    // console.log('ticket ', ticket);

    setIdTicket(id);
    if (ticket.length > 0) {
      setcomboPrice(
        ticket[0].combo_price === undefined ? 0 : ticket[0].combo_price
      );
    }
  };

  const handleSave = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (validateData()) {
      setLoading(true);
      let newOrder: IOrder = {
        id: 0,
        number: parseInt(number),
        date: formateDateToSend(eventDate),
        combo_price: comboPrice,
        client_name: '',
        adult_qtd: 0,
        kid_qtd: 0,
        status: 'criada',
        id_ticket: +idTicket,
        id_cashier: +idCashier,
      };

      try {
        const order = await createOrder(newOrder);
        // console.log('order ', order);

        if (order.message) {
          setMsg(order.message);
          setShowMsg(true);
        } else {
          setMsg('Combo gravado com sucesso!');
          setSuccess(true);
          cleanData();
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log('Erro ', await error);
      }
    }
  };

  const loadCashier = async () => {
    try {
      const response = await getCashierByDate();

      // console.log('response ', response);
      if (response.cashier !== null) {
        const { cashier } = response;
        setIdCashier(cashier.id);
      } else {
        setMsg(
          'Não existe caixa aberto. Abrir caixa antes de lançar comamanda.'
        );
        setShowMsg(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const listOrder = async () => {
    try {
      const orders = await listTodayOrders();
      const onlyCombos = orders.filter(
        (order: { id_ticket: number }) => order.id_ticket > 2
      );
      setOrders(onlyCombos);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadCashier();
    loadCombos();
  }, []);

  return (
    <TemplateContainer>
      <Panel className="w-2/3">
        <Title>Registar Combos</Title>
        {showMsg && (
          <div className="px-4 my-3">
            <div className="border border-red-400 rounded-lg bg-red-100 px-4 py-3 text-red-700">
              <p>{msg}</p>
            </div>
          </div>
        )}
        {loading ? (
          <Spinner />
        ) : (
          <>
            {success && (
              <div className="px-4 my-3">
                <div className="border border-cyan-400 rounded-lg bg-cyan-100 px-4 py-3 text-cyan-700">
                  <p>{msg}</p>
                </div>
              </div>
            )}

            <TemplateContent className="px-5 gap-5">
              <div>
                <label
                  htmlFor="number"
                  className="inline-block text-gray-800 text-sm sm:text-base mb-2"
                >
                  Comanda *
                </label>
                <input
                  type="text"
                  autoFocus
                  value={number}
                  onChange={(e) => setNumber(e.target.value.replace(/\D/g, ''))}
                  name="number"
                  className="w-full bg-gray-50 text-gray-800 border focus:ring ring-teal-300 rounded outline-none transition duration-100 px-3 py-2"
                />
              </div>
              <div>
                <label
                  htmlFor="eventDate"
                  className="inline-block text-gray-800 text-sm sm:text-base mb-2"
                >
                  Data *
                </label>
                <input
                  type="text"
                  name="eventDate"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="w-full bg-gray-50 text-gray-800 border focus:ring ring-teal-300 rounded outline-none transition duration-100 px-3 py-2"
                />
              </div>

              {list.length > 0 && (
                <div className="mt-2">
                  <label
                    htmlFor="comboName"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                  >
                    Selecione o combo
                  </label>
                  <select
                    id="comboName"
                    onChange={loadTiketValues}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-300 focus:border-teal-500 block w-full p-2.5"
                    // defaultValue={list[0].id}
                    value={idTicket}
                  >
                    <option value="EMPTY">Selecione</option>
                    {list.length > 0 &&
                      list.map((ticket) => (
                        <option key={ticket.id} value={ticket.id}>
                          {ticket.description}
                        </option>
                      ))}
                  </select>
                </div>
              )}

              <div className="sm:col-span-2 mt-5">
                <div className="flex justify-center gap-10 mb-5">
                  <button
                    className="bg-transparent hover:bg-teal-500 text-teal-700 font-normal hover:text-white px-8 py-0 border border-teal-500 hover:border-transparent rounded"
                    onClick={handleSave}
                  >
                    Salvar
                  </button>
                  <button
                    className="bg-transparent hover:bg-teal-500 text-teal-700 font-normal hover:text-white py-2 px-6 border border-teal-500 hover:border-transparent rounded"
                    onClick={listOrder}
                  >
                    Listar
                  </button>
                  <button
                    className="bg-transparent hover:bg-teal-500 text-teal-700 font-normal hover:text-white py-2 px-6 border border-teal-500 hover:border-transparent rounded"
                    onClick={(e) => router.push('/')}
                  >
                    Voltar
                  </button>
                </div>
              </div>
            </TemplateContent>
          </>
        )}

        {orders.length > 0 ? (
          <div className="mx-5 mt-5">
            <table className="w-full table-fixed">
              <thead className="bg-teal-200 ">
                <tr>
                  <th className="py-2 w-1/4 font-medium">Data</th>
                  <th className="w-1/4 font-medium">Número</th>
                  <th className="w-1/4 font-medium">Status</th>
                  <th className="w-1/4 font-medium">Ação</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td className="py-3">{formateDateToShow(order.date)}</td>
                    <td className="text-right px-10">{order.number}</td>
                    <td className="text-right px-10">{order.status}</td>
                    <td className="flex justify-around py-3 gap-5">
                      <button
                        type="button"
                        className="px-3 py-1 text-xs font-medium text-center text-white bg-yellow-400 rounded-lg hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 dark:bg-blue-600"
                      >
                        Editar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          ''
        )}
      </Panel>
    </TemplateContainer>
  );
};
