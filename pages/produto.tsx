const Produto = () => {
  return (
    <div className="main">
      <div className="main">
        <div className="bg-white py-6 sm:py-8 lg:py-12">
          <div className="max-w-screen-2xl px-4 md:px-8 mx-auto">
            {/* text - start */}
            <div className="mb-10 md:mb-16">
              <h2 className="text-gray-800 text-2xl lg:text-3xl font-bold text-center mb-4 md:mb-6">
                Cadastro de Produtos
              </h2>
            </div>
            {/* text - end */}
            {/* form - start */}
            <form className="max-w-screen-md grid sm:grid-cols-2 gap-4 mx-auto">
              <div>
                <label
                  htmlFor="product"
                  className="inline-block text-gray-800 text-sm sm:text-base mb-2"
                >
                  Produto *
                </label>
                <input
                  name="product"
                  className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
                />
              </div>
              <div>
                <label
                  htmlFor="price"
                  className="inline-block text-gray-800 text-sm sm:text-base mb-2"
                >
                  Preço *
                </label>
                <input
                  name="price"
                  className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
                />
              </div>

              <div>
                <label
                  htmlFor="initial_date"
                  className="inline-block text-gray-800 text-sm sm:text-base mb-2"
                >
                  Inicio do preço *
                </label>
                <input
                  name="initial_date"
                  className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
                />
              </div>
              <div>
                <label
                  htmlFor="final_date"
                  className="inline-block text-gray-800 text-sm sm:text-base mb-2"
                >
                  Fim do preço
                </label>
                <input
                  name="final_date"
                  className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
                />
              </div>

              <div className="sm:col-span-2">
                <div className="inline-block relative w-64">
                  <select className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                    <option>Álcoolico</option>
                    <option>Sem álcool</option>
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
                <div className="flex gap-10 ">
                  <button className="bg-transparent hover:bg-teal-500 text-teal-700 font-semibold hover:text-white py-2 px-4 border border-teal-500 hover:border-transparent rounded">
                    Salvar
                  </button>
                  <button className="bg-transparent hover:bg-teal-500 text-teal-700 font-semibold hover:text-white py-2 px-4 border border-teal-500 hover:border-transparent rounded">
                    Listar
                  </button>
                </div>
              </div>
            </form>

            {/* form - end */}
          </div>
        </div>

        {/* table  */}
        <div className="container flex justify-center ">
          <div className="flex flex-col">
            <div className="w-full">
              <div className="border-b border-gray-200 shadow">
                <table>
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-2 text-lg text-gray-500">
                        Produto
                      </th>
                      <th className="px-6 py-2 text-lg text-gray-500">
                        Data de início
                      </th>
                      <th className="px-6 py-2 text-lg text-gray-500">Valor</th>
                      <th className="px-6 py-2 text-xs text-gray-500"></th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    <tr className="whitespace-nowrap">
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">Coca Cola</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-500">02-03-2022</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        R$ 3,00
                      </td>

                      <td className="px-6 py-4">
                        <a
                          href="#"
                          className="px-4 py-1 text-sm text-white bg-blue-500 rounded"
                        >
                          Editar
                        </a>
                      </td>
                    </tr>
                    <tr className="whitespace-nowrap">
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">Água</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-500">02-03-2022</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        R$ 2,00
                      </td>
                      <td className="px-6 py-4">
                        <a
                          href="#"
                          className="px-4 py-1 text-sm text-white bg-blue-500 rounded"
                        >
                          Editar
                        </a>
                      </td>
                    </tr>
                    <tr className="whitespace-nowrap">
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          Cerveja em lata
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-500">02-03-2022</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        R$ 3,00
                      </td>

                      <td className="px-6 py-4">
                        <a
                          href="#"
                          className="px-4 py-1 text-sm text-white bg-blue-500 rounded"
                        >
                          Editar
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Produto;
