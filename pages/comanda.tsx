import React, { useState } from 'react';

interface IOrder {
  id?: number;
  number: number;
  client_name: string;
  date: string;
  id_ticket: number;
  adult_qtd: number;
  kid_qtd: number;
  status: string;
}
const formatDate = (date: number, type: 'SHOW' | 'SEND') => {
  let d = new Date(date);
  let month = (d.getMonth() + 1).toString();
  let day = d.getDate().toString();
  let year = d.getFullYear();
  if (month.length < 2) {
    month = '0' + month;
  }
  if (day.length < 2) {
    day = '0' + day;
  }
  if (type === 'SEND') {
    return [year, month, day].join('-');
  } else {
    return [day, month, year].join('-');
  }
};

const formateDateToSend = (date: string) => {
  const [day, month, year] = date.split('-');

  const result = [year, month, day].join('-');
  return result;
};

const formateDateToShow = (date: string) => {
  const [year, month, day] = date.split('-');

  const result = [day, month, year].join('-');
  return result;
};

const Comanda = () => {
  const [number, setNumber] = useState('');
  const [eventDate, setEventDate] = useState(formatDate(Date.now(), 'SHOW'));
  const [clientName, setClientName] = useState('');
  const [adultQtd, setAdultQtd] = useState('');
  const [kidQtd, setKidQtd] = useState('');
  const [idTicket, setIdTicket] = useState('1');
  const [showMsg, setShowMsg] = useState(false);
  const [msg, setMsg] = useState('');

  const [list, setList] = useState<IOrder[]>([]);
  const [showList, setShowList] = useState(false);

  const cleanData = () => {
    setNumber('');
    setClientName('');
    setAdultQtd('');
    setKidQtd('');
    setIdTicket('1');
    setShowMsg(false);
  };

  const validateData = () => {
    if (!(number && parseInt(number) > 0)) {
      setMsg('Numero da comanda é obrigatório.');
      setShowMsg(true);
      return;
    }
    if (!eventDate) {
      setMsg('Data do evento é obrigatória.');
      setShowMsg(true);
      return;
    }
    if (parseInt(idTicket) === 1) {
      if (!(parseInt(adultQtd) > 0)) {
        setMsg('Rodízio, o número de adultos obrigatório.');
        setShowMsg(true);
        return;
      }
    }
    return true;
  };

  const handleClick = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setIdTicket(idTicket);
    if (validateData()) {
      let newOrder: IOrder = {
        number: parseInt(number),
        date: formateDateToSend(eventDate),
        client_name: clientName,
        adult_qtd: adultQtd ? parseInt(adultQtd) : 0,
        kid_qtd: kidQtd ? parseInt(kidQtd) : 0,
        status: 'criada',
        id_ticket: +idTicket,
      };

      // console.log('newOrder ', newOrder);

      // https://api-creative-festa.herokuapp.com

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/order`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
          },
          body: JSON.stringify(newOrder),
        }
      );

      if (response.ok) {
        const order = await response.json();
        if (order.message) {
          setMsg(order.message);
          setShowMsg(true);
        } else {
          cleanData();
          listOrder();
        }
      } else {
        console.log('Erro ', await response.json());
      }

      // router.push('/');
    }
  };

  const listOrder = async () => {
    const dateParam = formateDateToSend(eventDate);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/order/${dateParam}`
    );

    if (response.ok) {
      const list = await response.json();
      setList(list.orders);
      setShowList(true);
    } else {
      console.log('Error', response.status);
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  };

  const handleList = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    listOrder();
  };

  return (
    <div className="px-10 py-5">
      <div className="bg-white py-6 sm:py-8 lg:py-2">
        <div className="max-w-screen-2xl px-4 md:px-8 mx-auto bg-slate-100 rounded-lg ">
          {/* text - start */}
          <div className="mb-10 md:mb-3">
            <h2 className="text-gray-800 text-2xl lg:text-3xl font-bold text-center mb-4 md:mb-6 pt-5">
              Cadastro de Comandas
            </h2>
            {showMsg && (
              <div className="bg-red-400">
                <div className="text-slate-50 p-3 font-bold">{msg}</div>
              </div>
            )}
          </div>
          {/* text - end */}
          {/* form - start */}
          <form className="max-w-screen-md grid sm:grid-cols-2 gap-4 mx-auto">
            <div>
              <label
                htmlFor="number"
                className="inline-block text-gray-800 text-sm sm:text-base mb-2"
              >
                Numero *
              </label>
              <input
                type="text"
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

            <div className="sm:col-span-2">
              <label
                htmlFor="clientName"
                className="inline-block text-gray-800 text-xl sm:text-base mb-2"
              >
                Cliente
              </label>
              <input
                type="text"
                name="clientName"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Nome do cliente NÃO OBRIGATÓRIO"
                className="w-full bg-gray-50 text-gray-800 border focus:ring ring-teal-300 rounded outline-none transition duration-100 px-3 py-2"
              />
            </div>

            <div>
              <label
                htmlFor="adultQtd"
                className="inline-block text-gray-800 text-sm sm:text-base mb-2"
              >
                Número de Adultos *
              </label>
              <input
                type="text"
                name="adultQtd"
                value={adultQtd}
                onChange={(e) => setAdultQtd(e.target.value.replace(/\D/g, ''))}
                className="w-full bg-gray-50 text-gray-800 border focus:ring ring-teal-300 rounded outline-none transition duration-100 px-3 py-2"
              />
            </div>
            <div>
              <label
                htmlFor="kidQtd"
                className="inline-block text-gray-800 text-sm sm:text-base mb-2"
              >
                Número de crianças *
              </label>
              <input
                type="text"
                name="kidQtd"
                value={kidQtd}
                onChange={(e) => setKidQtd(e.target.value.replace(/\D/g, ''))}
                className="w-full bg-gray-50 text-gray-800 border focus:ring ring-teal-300 rounded outline-none transition duration-100 px-3 py-2"
              />
            </div>

            <div className="sm:col-span-2">
              <div className="inline-block relative w-64">
                <select
                  className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                  onChange={(e) => setIdTicket(e.target.value)}
                  defaultValue="1"
                >
                  <option value="1">Rodízio</option>
                  <option value="2">Salão Externo</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>

            <span className="text-rose-600 text-sm">* Campo obrigatório</span>

            <div className="sm:col-span-2 ">
              <div className="flex gap-10 mb-5">
                <button
                  className="bg-transparent hover:bg-teal-500 text-teal-700 font-semibold hover:text-white py-2 px-4 border border-teal-500 hover:border-transparent rounded"
                  onClick={handleClick}
                >
                  Salvar
                </button>
                <button
                  className="bg-transparent hover:bg-teal-500 text-teal-700 font-semibold hover:text-white py-2 px-4 border border-teal-500 hover:border-transparent rounded"
                  onClick={handleList}
                >
                  Listar
                </button>
              </div>
            </div>
          </form>

          {/* form - end */}
        </div>
      </div>

      {showList && (
        <table className="table-auto w-full">
          <thead className="text-left">
            <tr>
              <th>Data</th>
              <th>Número</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {list.map((order) => (
              <tr key={order.id}>
                <td>{formateDateToShow(order.date)}</td>
                <td>{order.number}</td>
                <td>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Comanda;
