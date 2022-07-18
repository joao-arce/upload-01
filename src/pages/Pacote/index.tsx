import React, { useState } from 'react';
import tw from 'tailwind-styled-components';

import { TemplateContainer } from '../../components/templates';
import {
  formateDateToSend,
  formateDateToShow,
  getBrazilianDate,
} from '../../../util/helpers';
import { useRouter } from 'next/router';
import { ITicket } from '../../../types/ticket';
import { createTicket, getAllTickets } from '../../../libs/ticket';
import { Spinner } from '../../components/Spinner';

export const Pacote = () => {
  const [initialDate, setInitialDate] = useState(
    formateDateToShow(getBrazilianDate())
  );
  const [finalDate, setFinalDate] = useState(
    formateDateToShow(getBrazilianDate())
  );
  const [description, setDescription] = useState('');
  const [comboValue, setComboValue] = useState('');

  const [list, setList] = useState<ITicket[]>([]);

  const [msg, setMsg] = useState('');
  const [showMsg, setShowMsg] = useState(false);
  const [isClosePackage, setIsClosePackage] = useState(false);
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

  const cleanData = () => {
    setDescription('');
    setComboValue('');
  };

  const handleClose = (e: React.SyntheticEvent) => {
    setIsClosePackage(true);
  };

  const validateData = (isClosing: boolean) => {
    if (isClosing) {
      setInitialDate('');
      if (!finalDate) {
        // TODO there is date than it must be valid

        setMsg('Data final é obrigatória.');
        setShowMsg(true);
        return;
      }
      return true;
    }

    if (!initialDate) {
      // TODO there is date than it must be valid
      setMsg('Data inicial é obrigatória.');
      setShowMsg(true);
      return;
    }

    if (!description) {
      setMsg('Descrição do combo é obrigatória.');
      setShowMsg(true);
      return;
    }

    if (!comboValue) {
      setMsg('O valor do combo é obrigatório.');
      setShowMsg(true);
      return;
    }

    setShowMsg(false);
    return true;
  };

  const handleSave = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (validateData(isClosePackage)) {
      setLoading(true);

      let newTicket: ITicket = {
        id: 0,
        description,
        initial_date: formateDateToSend(initialDate),
        combo_price: comboValue ? parseInt(comboValue) : 0,
      };
      try {
        const ticket = await createTicket(newTicket);
        setLoading(false);
        setMsg('Combo gravado com sucesso!');
        setSuccess(true);
        cleanData();
      } catch (error) {
        setLoading(false);
        console.log('Erro ', await error);
      }
    }
  };

  const handleList = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const tickets = await getAllTickets();
    const notCombos = tickets.filter((ticket: { id: number }) => ticket.id > 2);
    // console.log('tickets ', notCombos);
    setList(notCombos);
  };

  return (
    <TemplateContainer>
      <div className="bg-gray-100 border-neutral-400 rounded-md w-2/3">
        <Title>Cadastro de Pacotes</Title>
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

            <form className="max-w-screen-md grid sm:grid-cols-2 gap-4 mx-auto px-5">
              {!isClosePackage ? (
                <>
                  <div>
                    <label
                      htmlFor="date01"
                      className="inline-block text-gray-800 text-sm sm:text-base mb-2"
                    >
                      Data inicial
                    </label>
                    <input
                      name="date01"
                      type="text"
                      value={initialDate}
                      onChange={(e) => setInitialDate(e.target.value)}
                      // onChange={(e) => setNumber(e.target.value.replace(/\D/g, ''))}
                      className="w-full bg-gray-50 text-gray-800 border focus:ring ring-teal-300 rounded outline-none transition duration-100 px-3 py-2"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="description"
                      className="inline-block text-gray-800 text-sm sm:text-base mb-2"
                    >
                      Descrição
                    </label>
                    <input
                      type="text"
                      name="description"
                      autoFocus
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full bg-gray-50 text-gray-800 border focus:ring ring-teal-300 rounded outline-none transition duration-100 px-3 py-2"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="value"
                      className="inline-block text-gray-800 text-sm sm:text-base mb-2"
                    >
                      Valor
                    </label>
                    <input
                      type="text"
                      name="value"
                      value={comboValue}
                      onChange={(e) =>
                        setComboValue(e.target.value.replace(/[A-Za-z]|,/, ''))
                      }
                      className="w-full bg-gray-50 text-gray-800 border focus:ring ring-teal-300 rounded outline-none transition duration-100 px-3 py-2"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label
                      htmlFor="date02"
                      className="inline-block text-gray-800 text-sm sm:text-base mb-2"
                    >
                      Data final
                    </label>
                    <input
                      type="text"
                      name="date02"
                      value={finalDate}
                      onChange={(e) => setFinalDate(e.target.value)}
                      className="w-full bg-gray-50 text-gray-800 border focus:ring ring-teal-300 rounded outline-none transition duration-100 px-3 py-2"
                    />
                  </div>
                </>
              )}

              <div className="sm:col-span-2">
                <div className="flex justify-center gap-10 mb-5">
                  <button
                    className="bg-transparent hover:bg-teal-500 text-teal-700 font-normal hover:text-white px-6 py-0 border border-teal-500 hover:border-transparent rounded"
                    onClick={handleSave}
                  >
                    Salvar
                  </button>
                  <button
                    className="bg-transparent hover:bg-teal-500 text-teal-700 font-normal hover:text-white py-2 px-6 border border-teal-500 hover:border-transparent rounded"
                    onClick={handleList}
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
            </form>
          </>
        )}

        {list.length > 0 ? (
          <div className="mx-5 mt-5">
            <table className="w-full table-fixed">
              <thead className="bg-teal-200">
                <tr>
                  <th className="w-2/3 font-medium">Descrição</th>
                  <th className="w-1/3 font-medium">Valor</th>
                  <th className="w-1/3 font-medium">Ação</th>
                </tr>
              </thead>
              <tbody>
                {list.map((ticket) => (
                  <tr key={ticket.id}>
                    <td className="py-3">{ticket.description}</td>
                    <td className="text-right px-10">
                      {ticket.combo_price?.toFixed(2)}
                    </td>
                    <td className="flex justify-around py-3 gap-5">
                      <button
                        type="button"
                        className="px-3 py-1 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        onClick={handleClose}
                      >
                        Finalizar
                      </button>

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
      </div>
    </TemplateContainer>
  );
};
