import Link from 'next/link';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h1 className="text-center">Cadastros</h1>
      <Link href="/funcionario">
        <a className="flex justify-center mx-auto w-48 mt-6 text-teal-600 text-2xl bg-gray-200 border-0 py-2 px-5 focus:outline-none hover:bg-teal-400 rounded">
          Funcionários
        </a>
      </Link>
      <Link href="/produto">
        <a className="flex justify-center mx-auto w-48 mt-6 text-teal-600 text-2xl bg-gray-200 border-0 py-2 px-5 focus:outline-none hover:bg-teal-400 rounded">
          Produtos
        </a>
      </Link>
      <Link href="/ticket">
        <a className="flex justify-center mx-auto w-48 mt-6 text-teal-600 text-2xl bg-gray-200 border-0 py-2 px-5 focus:outline-none hover:bg-teal-400 rounded">
          Ticket
        </a>
      </Link>
      <Link href="/comanda">
        <a className="flex justify-center mx-auto w-48 mt-6 text-teal-600 text-2xl bg-gray-200 border-0 py-2 px-5 focus:outline-none hover:bg-teal-400 rounded">
          Comanda
        </a>
      </Link>

      <h1 className="text-center pt-10">Caixa</h1>
      <Link href="/salao">
        <a className="flex justify-center mx-auto w-48 mt-6 text-teal-600 text-2xl bg-gray-200 border-0 py-2 px-5 focus:outline-none hover:bg-teal-400 rounded">
          Ver salão
        </a>
      </Link>
      <Link href="/funcionario">
        <a className="flex justify-center mx-auto w-48 mt-6 text-teal-600 text-2xl bg-gray-200 border-0 py-2 px-5 focus:outline-none hover:bg-teal-400 rounded">
          Log Out
        </a>
      </Link>
    </div>
  );
};

export default Sidebar;
