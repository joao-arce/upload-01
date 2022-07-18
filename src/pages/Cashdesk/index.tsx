import React, { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/router';
import tw from 'tailwind-styled-components';

import { TemplateContainer, TemplateContent } from '../../components/templates';

export const Cashdesc = () => {
  const [totalOrders, setOrders] = useState(800);
  const [deskValue, setDeskValue] = useState('');
  const [number, setNumber] = useState('');

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

  const checkValues = (e: React.SyntheticEvent) => {
    e.preventDefault();

    // console.log('totalOrders ', totalOrders);
    // console.log('deskValue ', deskValue);
    if (+deskValue === totalOrders) return true;
    return false;
  };

  const handeChange = (e: ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.value);
    setDeskValue(e.target.value);
  };

  return (
    <TemplateContainer>
      <TemplateContent className="gap-2">
        <Panel>
          <Title>Entradas</Title>
          <div className="px-4 my-3">
            <div className="border border-red-400 rounded-lg bg-red-100 px-4 py-3 text-red-700">
              <p>Existem comandas abertas. É necessário fechá-las.</p>
            </div>
          </div>

          <TableRow>
            <Item>Salão interno </Item>
            <Item> R$ 100,00</Item>
          </TableRow>
          <TableRow>
            <Item>Salão Externo </Item>
            <Item> R$ 100,00</Item>
          </TableRow>
          <TableRow className="justify-end my-5 gap-x-10">
            <Item>Total</Item>
            <Item> R$ {totalOrders.toFixed(2)}</Item>
          </TableRow>
        </Panel>
        <Panel>
          <Title>Caixa</Title>
          <form>
            <div className="px-5 grid">
              <div className="mb-5">
                <label
                  htmlFor="desk_value"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Valor no caixa
                </label>
                <input
                  type="text"
                  id="desk_value"
                  name="deskValue"
                  value={deskValue}
                  onChange={handeChange}
                  // onChange={(e) =>
                  //   setDeskValue(e.target.value.replace(/\D/g, ''))
                  // }
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-teal-500 focus:ring-2 focus:ring-teal-200 block w-full p-2.5"
                  // placeholder="John"
                  // required
                />
                <input
                  type="text"
                  value={number}
                  onChange={(e) => setNumber(e.target.value.replace(/\D/g, ''))}
                  name="number"
                  className="w-full bg-gray-50 text-gray-800 border focus:ring ring-teal-300 rounded outline-none transition duration-100 px-3 py-2"
                />
              </div>
              <button
                onClick={checkValues}
                className="w-2/4 rounded-lg bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 mb-3"
              >
                Conferir
              </button>
            </div>

            <div className="px-4 my-3">
              <div className="border border-red-400 rounded-lg bg-red-100 px-4 py-3 text-red-700">
                <p>Valor informado não confere.</p>
              </div>
            </div>

            <div className="relative px-5">
              <label
                htmlFor="first_name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Descrição
              </label>
              <textarea
                id="message"
                name="message"
                className="w-full bg-white rounded-lg border border-gray-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
              ></textarea>
            </div>
            <div className="px-5 mt-3 flex gap-10 ">
              <button className="w-2/4 rounded-lg bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4">
                Fechar Caixa
              </button>
              <button
                onClick={(e) => router.back()}
                className="w-2/4 rounded-lg bg-stone-500 hover:bg-stone-700 text-white font-bold py-2 px-4"
              >
                Voltar
              </button>
            </div>
          </form>
        </Panel>
      </TemplateContent>
    </TemplateContainer>
  );
};
