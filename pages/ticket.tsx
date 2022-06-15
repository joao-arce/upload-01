const Tickets = () => {
  return (
    <div className="px-10 py-5">
      <div className="bg-white py-6 sm:py-8 lg:py-2">
        <div className="max-w-screen-2xl px-4 md:px-8 mx-auto bg-slate-100 rounded-lg ">
          {/* text - start */}
          <div className="mb-10 md:mb-3">
            <h2 className="text-gray-800 text-2xl lg:text-3xl font-bold text-center mb-4 md:mb-6 pt-5">
              Cadastro de Tickets
            </h2>
          </div>
          {/* text - end */}
          {/* form - start */}
          <form className="max-w-screen-md grid sm:grid-cols-2 gap-4 mx-auto">
            <div className="sm:col-span-2">
              <label
                htmlFor="description"
                className="inline-block text-gray-800 text-xl sm:text-base mb-2"
              >
                Descrição *
              </label>
              <input
                name="description"
                className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
              />
            </div>
            <div>
              <label
                htmlFor="adultPrice"
                className="inline-block text-gray-800 text-sm sm:text-base mb-2"
              >
                Valor para adulto *
              </label>
              <input
                name="adultPrice"
                className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
              />
            </div>
            <div>
              <label
                htmlFor="kidPrice"
                className="inline-block text-gray-800 text-sm sm:text-base mb-2"
              >
                Valor para criança *
              </label>
              <input
                name="kidPrice"
                className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
              />
            </div>
            <div>
              <label
                htmlFor="initialDate"
                className="inline-block text-gray-800 text-sm sm:text-base mb-2"
              >
                Data inicial *
              </label>
              <input
                name="initialDate"
                className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
              />
            </div>
            <div>
              <label
                htmlFor="finalDdate"
                className="inline-block text-gray-800 text-sm sm:text-base mb-2"
              >
                Data final
              </label>
              <input
                name="finalDdate"
                className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
              />
            </div>

            <span className="text-rose-600 text-sm">* Campo obrigatório</span>
            <div className="sm:col-span-2 ">
              <div className="flex gap-10 mb-5">
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
      <div className="container w-full mt-5 flex justify-center ">
        <div className="flex flex-col ">
          <div className="w-full">
            <div className="border-b border-gray-200 shadow">
              <table>
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-2 text-lg text-gray-500">
                      Descrição
                    </th>
                    <th className="px-6 py-2 text-lg text-gray-500">
                      R$ Adulto
                    </th>
                    <th className="px-6 py-2 text-lg text-gray-500">
                      R$ Criança
                    </th>
                    <th className="px-6 py-2 text-lg text-gray-500">Início</th>
                    <th className="px-6 py-2 text-lg text-gray-500">Fim</th>
                    <th className="px-6 py-2 text-xs text-gray-500"></th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  <tr className="whitespace-nowrap">
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        Lorem ipsum dolor sit
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500">30,00</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">15,00</td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      01-01-2022
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500"></td>

                    <td className="px-6 py-4">
                      <a
                        href="#"
                        className="px-4 py-1 text-sm text-white bg-red-400 rounded"
                      >
                        Delete
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
  );
};

export default Tickets;
