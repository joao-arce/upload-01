import Link from 'next/link';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h1 className="text-left ml-5 text-xl mb-4">Cadastros</h1>
      <Link href="/funcionario">
        <a className="flex items-center p-2 text-base text-teal-200 hover:text-teal-600 font-normal rounded-lg hover:bg-gray-100">
          <span className="ml-3">Funcionário</span>
        </a>
      </Link>
      <Link href="/produto">
        <a className="flex items-center p-2 text-base font-normal text-teal-200 hover:text-teal-600 rounded-lg hover:bg-gray-100">
          <span className="ml-3">Produto</span>
        </a>
      </Link>
      <Link href="/ticket">
        <a className="flex items-center p-2 text-base font-normal text-teal-200 hover:text-teal-600 rounded-lg hover:bg-gray-100">
          <span className="ml-3">Ticket</span>
        </a>
      </Link>
      <Link href="/cadastrarpacote">
        <a className="flex items-center p-2 text-base font-normal text-teal-200 hover:text-teal-600 rounded-lg hover:bg-gray-100">
          <span className="ml-3">Pacote</span>
        </a>
      </Link>
      <h1 className="text-left ml-5 mb-2 text-xl pt-10">Caixa</h1>

      <Link href="/comanda">
        <a className="flex items-center p-2 text-base font-normal text-teal-200 hover:text-teal-600 rounded-lg hover:bg-gray-100">
          <span className="ml-3">Comanda</span>
        </a>
      </Link>
      <Link href="/combo">
        <a className="flex items-center p-2 text-base font-normal text-teal-200 hover:text-teal-600 rounded-lg hover:bg-gray-100">
          <span className="ml-3">Combo</span>
        </a>
      </Link>
      <Link href="/abrircaixa">
        <a className="flex items-center p-2 text-base font-normal text-teal-200 hover:text-teal-600 rounded-lg hover:bg-gray-100">
          <span className="ml-3">Abrir caixa</span>
        </a>
      </Link>

      <h1 className="text-left ml-5 mb-2 text-xl pt-10">Salão</h1>

      <Link href="/salao">
        <a className="flex items-center p-2 text-base font-normal text-teal-200 hover:text-teal-600 rounded-lg hover:bg-gray-100">
          <span className="ml-3">Ver salão</span>
        </a>
      </Link>
      <Link href="/fecharcaixa">
        <a className="flex items-center p-2 text-base font-normal text-teal-200 hover:text-teal-600 rounded-lg hover:bg-gray-100">
          <span className="ml-3">Fechar salão</span>
        </a>
      </Link>
      <Link href="/funcionario">
        <a className="flex items-center p-2 text-base font-normal text-teal-200 hover:text-teal-600 rounded-lg hover:bg-gray-100">
          <span className="ml-3">Log Out</span>
        </a>
      </Link>
    </div>
  );
};

export default Sidebar;
