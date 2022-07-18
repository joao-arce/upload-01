import { useRouter } from 'next/router';
import React, { useState } from 'react';

import tw from 'tailwind-styled-components';
import { getCashierByDate, open } from '../libs/cashier';
import { Spinner } from '../src/components/Spinner';
import { ICashier } from '../types/cashier';
import { getBrazilianDate } from '../util/helpers';

const formateDateToShow = (date: string) => {
  const [year, month, day] = date.split('-');

  const result = [day, month, year].join('-');
  return result;
};
const formateDateToSend = (date: string) => {
  const [day, month, year] = date.split('-');

  const result = [year, month, day].join('-');
  return result;
};

const diaPorExtenso = (dia: number) => {
  switch (dia) {
    case 0:
      return 'Domingo';
      break;

    case 1:
      return 'Segunda-Feira';
      break;

    case 2:
      return 'Terça-Feira';
      break;

    case 3:
      return 'Quarta-Feira';
      break;
    case 4:
      return 'Quita-Feira';
      break;
    case 5:
      return 'Sexta-Feira';
      break;

    case 6:
      return 'Sábado';
      break;

    default:
      break;
  }
};

const Abrircaixa = () => {
  const [eventDate, setEventDate] = useState(
    formateDateToShow(getBrazilianDate())
  );
  const [loading, setLoading] = useState(false);
  const [showMsg, setShowMsg] = useState(false);

  const router = useRouter();

  const today = new Date();
  const diadasemana = diaPorExtenso(today.getDay());

  const Title = tw.p`
    font-bold 
    text-xl 
    flex 
    justify-center
    mt-2
  `;
  const date = new Date();
  const hour =
    date.getHours() + ':' + String(date.getMinutes()).padStart(2, '0');

  const handleSave = async () => {
    const newOne: ICashier = {
      id_user_open: 1,
      open_date: formateDateToSend(eventDate),
      open_time: hour,
    };
    try {
      setLoading(true);

      // console.log('oi o que aconteceu !!');

      const therIsCashier = await getCashierByDate();

      // console.log(therIsCashier.cashier);

      if (therIsCashier.cashier !== null) {
        // console.log('Já exite');
        setLoading(false);
        setShowMsg(true);
        return;
      }

      // console.log('Vai gravar !!!');
      // setLoading(false);
      // return;

      const cashier = await open(newOne);
      setLoading(false);
      router.push('/sucesso');
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-12 mx-auto">
        <div className="mb-5 w-full sm:w-1/2 ">
          <Title>Abrir Caixa</Title>
          {loading ? (
            <Spinner />
          ) : (
            <>
              {showMsg && (
                <div className="my-3">
                  <div className="border border-red-400 rounded-lg bg-red-100 px-4 py-3 text-red-700">
                    <p>Já existe caixa aberto nessa data !</p>
                  </div>
                </div>
              )}
              <div className="mt-5 flex flex-col">
                <p className="font-medium mb-4">{diadasemana}</p>

                <input
                  type="text"
                  name="eventDate"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="w-72 bg-gray-50 text-gray-800 border focus:ring ring-teal-300 rounded outline-none transition duration-100 px-3 py-2"
                />
              </div>

              <div className="flex gap-5 mt-5">
                <button
                  className="bg-transparent w-1/4 hover:bg-teal-500 text-teal-700 font-semibold hover:text-white py-2 px-4 border border-teal-500 hover:border-transparent rounded-lg"
                  onClick={handleSave}
                >
                  Abrir
                </button>
                <button
                  onClick={(e) => router.push('/')}
                  className="w-1/4 rounded-lg bg-stone-500 hover:bg-stone-700 text-white font-bold py-2 px-4"
                >
                  Voltar
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Abrircaixa;
