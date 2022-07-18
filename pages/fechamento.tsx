import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

type FechamentProps = {
  idOrder: number;
};

type Product = {
  id_category: number;
  name: string;
  price: number;
};

type Item = {
  quantity: number;
  product: Product;
};

type Ticket = {
  adult_price: number;
  description: string;
  kid_price: number;
};

// interface OrderClosed {
//   adult_qtd: number;
//   client_name: string;
//   date: string;
//   id: number;
//   ticket: Ticket;
//   kid_qtd: number;
//   number: number;
//   status: string;
// }

const Fechamento = (props: any) => {
  // const [order, setOrder] = useState<OrderClosed>();
  const [ticket, setTicket] = useState<Ticket>();
  const [items, setItems] = useState<Item[]>();
  const [showTela, setShowTela] = useState(false);
  const [loading, setLoading] = useState(true);
  const [parcialTicket, setParcialTicket] = useState(0);
  const [parcialBebidas, setParcialBebidas] = useState(0);
  const [parcialSemAlcool, setParcialSemAlcool] = useState(0);
  const [total, setTotal] = useState(0);

  const router = useRouter();

  const searchItems = async () => {
    const { id } = props.order;
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/item/${id}`
    );
    const list = await result.json();
    const items: Item[] = list.items;

    if (items.length > 0) {
      const result = items.map((item) => {
        const objItem: Item = {
          quantity: item.quantity,
          product: item.product,
        };
        return objItem;
      });

      const totalAlcool = items.reduce((total, element) => {
        if (element.product.id_category === 1) {
          total += element.quantity * element.product.price;
        }
        return total;
      }, 0);
      const totalSemAlcool = items.reduce((total, element) => {
        if (element.product.id_category !== 1) {
          total += element.quantity * element.product.price;
        }
        return total;
      }, 0);

      setParcialBebidas(totalAlcool);
      setParcialSemAlcool(totalSemAlcool);
      let totalOrder = totalAlcool + totalSemAlcool + parcialTicket;
      setTotal(totalOrder);
      setItems(result);
    }
  };

  const somatorios = (t: Ticket) => {
    let soma = props.order.adult_qtd * (t.adult_price ?? 0);
    soma += props.order.kid_qtd * (t.kid_price ?? 0);

    setParcialTicket(soma);
  };

  const feachData = async () => {
    const { id_ticket } = props.order;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/ticket/${id_ticket}`
    );

    const objTicket = await response.json();

    const formatedTicket: Ticket = {
      adult_price: objTicket.ticket.adult_price ?? 0,
      description: objTicket.ticket?.description ?? '',
      kid_price: objTicket.ticket.kid_price ?? 0,
    };

    setTicket(formatedTicket);

    somatorios(formatedTicket);
  };

  const montarTela = async () => {
    setLoading(false);
    feachData();
    searchItems();
    setLoading(true);
  };
  const handleFecharComanda = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const id = props.order.id;
    const newStatus = {
      status: 'fechada',
    };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/order/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(newStatus),
      }
    );

    if (response.ok) {
      const order = await response.json();
      // props.closeFechamento();
      router.push('/');
    } else {
      console.log('Erro ', await response.json());
    }
  };

  const formateDateToShow = (date: string | null) => {
    if (date) {
      const [year, month, day] = date.split('-');

      const result = [day, month, year].join('-');
      return result;
    } else {
      return '';
    }
  };

  type TipoCategoria = 'alcool' | 'sem alcool';

  const montaItems = (lst: Item[], cat: TipoCategoria) => {
    if (lst.length > 0) {
      const lstResult = lst.filter((item) => {
        if (cat === 'alcool') {
          if (item.product.id_category === 1) return item;
        } else {
          if (item.product.id_category !== 1) return item;
        }
      });

      // setParcialBebidas(totalAlcool);
      return lstResult.map((item) => (
        <>
          <div className="">{item.product.name}</div>
          <div className="">{item.quantity} </div>
          <div className="">{item.product.price.toFixed(2)}</div>
          <div className="text-right pr-5">
            {(item.product.price * item.quantity).toFixed(2)}
          </div>
        </>
      ));
    }
  };

  const handleRetornar = (e: React.SyntheticEvent) => {
    e.preventDefault();
    props.closeFechamento();
  };

  useEffect(() => {
    setShowTela(false);
    montarTela();

    setShowTela(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="main">
      {showTela && (
        <div className="text-gray-600 body-font">
          <div className="container px-5 ">
            <h2 className="font-bold text-2xl">Dados da comanda</h2>
            <div>Comanda {props.order.number}</div>
            <div>Cliente: {props.order.client_name}</div>
            <div>Data: {formateDateToShow(props.order.date)}</div>
          </div>

          <div className="container px-1 py-16 mx-auto">
            <div className="grid grid-cols-2  mb-10">
              <div className="grid grid-cols-4 gap-1 pl-3 min-w-[150px] ">
                <h2 className="col-span-4 font-medium text-lg text-gray-900 ">
                  Ticket
                </h2>
                <div className="">Adulto</div>
                <div className="">{props.order.adult_qtd}</div>
                <div className="">{ticket?.adult_price?.toFixed(2)}</div>
                <div className="text-right pr-5">
                  {(props.order.adult_qtd * (ticket?.adult_price ?? 0)).toFixed(
                    2
                  )}
                </div>

                <div className="">Criança</div>
                <div className="">{props.order.kid_qtd}</div>
                <div className="">{(ticket?.kid_price ?? 0).toFixed(2)}</div>
                <div className="text-right pr-5">
                  {(props.order.kid_qtd * (ticket?.kid_price ?? 0)).toFixed(2)}
                </div>

                <div className="col-span-2 font-bold text-right pt-5">
                  Total
                </div>
                <div className="col-span-2 font-bold text-right pr-5 pt-5">
                  R$ {parcialTicket.toFixed(2)}
                </div>
              </div>
              <div className="grid grid-cols-4 gap-1 pl-3 min-w-[150px] ">
                <h2 className="col-span-4 font-medium text-lg text-gray-900 ">
                  Bebidas
                </h2>

                {(items?.length ?? 0) > 0 && montaItems(items ?? [], 'alcool')}

                <div className="col-span-2 font-bold text-right">Total</div>
                <div className="col-span-2 font-bold text-right pr-5">
                  R$ {parcialBebidas.toFixed(2)}
                </div>
              </div>

              {/* trabalhando aqui em cima */}

              <div className="grid grid-cols-4 gap-1 pl-3 min-w-[150px] ">
                <h2 className="col-span-4 font-medium text-lg text-gray-900 ">
                  Sem álcool
                </h2>
                {(items?.length ?? 0) > 0 &&
                  montaItems(items ?? [], 'sem alcool')}

                <div className="col-span-2 col-end-1 font-bold text-right">
                  Total
                </div>
                <div className="col-span-2 font-bold text-right pr-5">
                  R$ {parcialSemAlcool.toFixed(2)}
                </div>
              </div>

              {/* TOTAL */}
              <div className="col-span-4 bg-stone-100 min-h-[60px] min-w-[150px] mt-10">
                <div className="font-bold text-xl flex flex-col items-center">
                  Total R${' '}
                  {(parcialTicket + parcialBebidas + parcialSemAlcool).toFixed(
                    2
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* TESTE  */}

          {/* <div className="p-2 w-full bg-gray-100 rounded-md mt-2">
          <div>
            <h2 className="text-gray-900 title-font text-center font-medium">
              Consumo
            </h2>
            {items.map((element, index) => {
              totalConsumo += element.product_price * element.quantity;
              return (
                // <div key={index} className="flex justify-between text-gray-500">
                <div key={index} className="flex text-gray-500">
                  <p className="basis-2/5">{element.product_name} </p>
                  <p className="basis-1/5">{element.quantity} </p>
                  <p className="basis-1/5">
                    {element.product_price.toFixed(2)}{' '}
                  </p>

                  <p className="basis-1/5 text-end">
                    {(element.product_price * element.quantity).toFixed(2)}{' '}
                  </p>
                </div>
              );
            })}
            <div className="flex justify-end gap-5 text-gray-900 title-font  font-medium">
              <h2 className="">Total R$</h2>
              <h2>{totalConsumo.toFixed(2)}</h2>
            </div>
          </div>
          </div> */}

          {/* fim do teste */}
        </div>
      )}
      <div className="flex justify-center gap-10 mb-5">
        <button
          onClick={handleRetornar}
          className="bg-transparent hover:bg-teal-500 text-teal-700 font-semibold hover:text-white py-2 px-4 border border-teal-500 hover:border-transparent rounded"
        >
          Retornar
        </button>

        <button
          onClick={handleFecharComanda}
          className="bg-transparent hover:bg-teal-500 text-teal-700 font-semibold hover:text-white py-2 px-4 border border-teal-500 hover:border-transparent rounded"
        >
          Fechar a conta
        </button>
      </div>
    </div>
  );
};

export default Fechamento;
