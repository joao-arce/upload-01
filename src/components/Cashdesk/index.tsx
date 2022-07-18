import React, { SyntheticEvent, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import tw from 'tailwind-styled-components';

import { TemplateContainer, TemplateContent } from '../templates';
import { getOrderItemByDate } from '../../../libs/order';
import { ICompletedOrder, IOrder } from '../../../types/order';
import { ICashier } from '../../../types/cashier';
import { getBrazilianDate } from '../../../util/helpers';
import { close } from '../../../libs/cashier';
import { Spinner } from '../Spinner';

enum TypeTicket {
  Interno = '1',
  Externo = '2',
}

type Entrada = {
  description: string;
  value: number;
};

export const Cashdesc = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [entradas, setEntradas] = useState<Entrada[]>([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [deskValue, setDeskValue] = useState('');
  const [description, setDescription] = useState('');

  const [showMsg, setShowMsg] = useState(false);
  const [showMsgOpenOrder, setShowMsgOpenOrder] = useState(false);
  const [showCaixa, setShowCaixa] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingCaixa, setLoadingCaixa] = useState(false);

  let totalGeral = 0;

  const router = useRouter();

  const Panel = tw.div`
    bg-gray-200 
    rounded-md 
    border-2 
    border-neutral-400
  `;

  const Title = tw.p`
    font-bold 
    text-xl 
    flex 
    justify-center
    mt-2
  `;

  const TableRow = tw.div`
    flex 
    justify-between 
    px-5
    py-2
  `;
  const Item = tw.p`
    text-gray-800 
    text-lg 
    font-medium
  `;

  const isValuesIgual = () => {
    if (+deskValue === +totalOrders.toFixed(2)) {
      return true;
    }
    return false;
  };

  const accumulateTotal = (value: number) => {
    totalGeral += value;
  };

  const summaryType = (orders: ICompletedOrder[]) => {
    let result = 0;
    orders.forEach((order) => {
      let { ticket } = order;
      if (ticket !== null && ticket !== undefined) {
        let aux = ticket.kid_price;
        result += order.kid_qtd * (aux !== undefined ? aux : 0);
        aux = ticket.adult_price;
        result += order.adult_qtd * (aux !== undefined ? aux : 0);
      }
      order.items.forEach((item) => {
        result += item.quantity * item.product.price;
      });
    });
    accumulateTotal(result);
    return result;
  };

  const separateOrders = (orders: ICompletedOrder[]) => {
    let arrayEntrada = [];
    let objEntrada: Entrada = { description: '', value: 0 };

    // console.log('CHEGOU AQUI 01');
    const internals = orders.filter(
      (order) => order.id_ticket === +TypeTicket.Interno
    );

    // console.log('CHEGOU AQUI 02');

    // console.log('INTERNALS ', internals);
    let internalTotal = 0;
    internalTotal = summaryType(internals);

    // console.log('CHEGOU AQUI 03');

    if (internals.length > 0) {
      objEntrada.description = internals[0].ticket.description;
      objEntrada.value = internalTotal;
      arrayEntrada.push(objEntrada);
    }

    const externals = orders.filter(
      (order) => order.id_ticket === +TypeTicket.Externo
    );

    // console.log('CHEGOU AQUI 04');

    let externalTotal = 0;
    externalTotal = summaryType(externals);

    // console.log('CHEGOU AQUI 05');
    // console.log('externals ', externals);

    if (externals.length > 0) {
      arrayEntrada.push({
        description: externals[0].ticket.description,
        value: externalTotal,
      });
    }

    // console.log('CHEGOU AQUI 06');

    // console.log('arrayEntrada ', arrayEntrada);
    setEntradas(arrayEntrada);
    setTotalOrders(totalGeral);
  };

  const buildRowEntradas = () =>
    entradas.map((elem, index) => (
      <TableRow key={index}>
        <Item>{elem.description}</Item> <Item>{elem.value.toFixed(2)}</Item>{' '}
      </TableRow>
    ));

  const isOrdersClose = (orders: IOrder[]) => {
    const isClose = orders.filter((order) => order.status !== 'fechada');
    if (isClose.length > 0) {
      setShowMsgOpenOrder(true);
    } else {
      setShowMsgOpenOrder(false);
      setShowCaixa(true);
    }
    // console.log('isClose ', isClose);
  };

  const handleGetOrders = async () => {
    try {
      setLoading(true);
      const orders = await getOrderItemByDate();
      setOrders(orders);
      separateOrders(orders);
      isOrdersClose(orders);
      setLoading(false);

      // console.log('orders ', orders);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleCloseDesk = async (e: SyntheticEvent) => {
    e.preventDefault();
    const date = new Date();
    const hour =
      date.getHours() + ':' + String(date.getMinutes()).padStart(2, '0');
    const newOne: ICashier = {
      open_date: getBrazilianDate(),
      open_time: '',
      close_date: getBrazilianDate(),
      close_time: hour,
      description: description,
      cash_desk_value: +deskValue,
      order_sum: totalOrders,
      id_user_close: 1,
      id_user_open: 0,
    };

    if (!isValuesIgual()) {
      setShowMsg(true);
      return;
    }

    try {
      setLoadingCaixa(true);
      const cashier = await close(newOne);
      setLoadingCaixa(false);
      router.push('/sucesso');
    } catch (error) {
      setLoadingCaixa(false);
      console.log(error);
    }
  };

  return (
    <TemplateContainer>
      {loadingCaixa ? (
        <Spinner />
      ) : (
        <TemplateContent className="gap-2">
          <Panel>
            <Title>Entradas</Title>
            {showMsgOpenOrder && (
              <div className="px-4 my-3">
                <div className="border border-red-400 rounded-lg bg-red-100 px-4 py-3 text-red-700">
                  <p>Existem comandas abertas. É necessário fechá-las.</p>
                </div>
              </div>
            )}
            {loading ? <Spinner /> : ''}
            <TableRow className="flex justify-center mt-4">
              <button
                onClick={handleGetOrders}
                className="w-2/4 rounded-lg bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4"
              >
                Buscar Comandas
              </button>
              <Item> </Item>
            </TableRow>

            {buildRowEntradas()}
            <TableRow className="justify-end my-5 gap-x-10">
              <Item>Total</Item>
              <Item> R$ {totalOrders.toFixed(2)}</Item>
            </TableRow>
          </Panel>
          {showCaixa && (
            <div className="bg-gray-200 rounded-md border-2 border-neutral-400 ">
              <Title>Caixa</Title>

              <form>
                <div className="px-5 grid">
                  <div className="mb-5 w-1/2 ">
                    <label
                      htmlFor="desk_value"
                      className="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Valor no caixa
                    </label>
                    <input
                      type="text"
                      id="desk_value"
                      name="deskValue"
                      value={deskValue}
                      onChange={
                        // (e) => setDeskValue(e.target.value.replace(/\D/g, ''))
                        (e) =>
                          setDeskValue(e.target.value.replace(/[A-Za-z]|,/, ''))
                      }
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-teal-500 focus:ring-2 focus:ring-teal-200 block w-full p-2.5"
                    />
                  </div>
                </div>

                {showMsg && (
                  <div className="px-4 my-3">
                    <div className="border border-red-400 rounded-lg bg-red-100 px-4 py-3 text-red-700">
                      <p>Valor informado não confere.</p>
                    </div>
                  </div>
                )}

                <div className="relative px-5">
                  <label
                    htmlFor="first_name"
                    className="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Descrição
                  </label>
                  <textarea
                    id="message"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full bg-white rounded-lg border border-gray-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                  ></textarea>
                </div>
                <div className="px-5 mt-3 flex gap-10 ">
                  <button
                    onClick={handleCloseDesk}
                    className="w-2/4 rounded-lg bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4"
                  >
                    Fechar Caixa
                  </button>

                  <Link href="/">
                    <a className="w-2/4 rounded-lg bg-stone-500 hover:bg-stone-700 text-white text-center font-bold py-2 px-4">
                      Voltar
                    </a>
                  </Link>
                </div>
              </form>
            </div>
          )}
        </TemplateContent>
      )}
    </TemplateContainer>
  );
};
