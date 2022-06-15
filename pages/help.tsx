import React from 'react';

const Help = () => {
  const handleClick = () => {
    console.log('BASE_URL', process.env.BASE_URL);
    console.log('NEXT_PUBLIC_BASE_URL', process.env.NEXT_PUBLIC_BASE_URL);
  };
  return (
    <div className="container px-1 py-16 mx-auto">
      <div className="grid grid-cols-2  mb-10">
        <div className="grid grid-cols-4 gap-1 pl-3 min-w-[150px] ">
          <h2 className="col-span-4 font-medium text-lg text-gray-900 ">
            Ticket
          </h2>
          <div className="">Adulto</div>
          <div className="">03 </div>
          <div className="">30,00</div>
          <div className="text-right pr-5">500,00</div>

          <div className="">Criança</div>
          <div className="">02 </div>
          <div className="">15,00 </div>
          <div className="text-right pr-5">45,00</div>

          <div className="col-span-2 font-bold text-right">Total</div>
          <div className="col-span-2 font-bold text-right pr-5">R$ 50,00</div>
        </div>
        <div className="grid grid-cols-4 gap-1 pl-3 min-w-[150px] ">
          <h2 className="col-span-4 font-medium text-lg text-gray-900 ">
            Ticket
          </h2>
          <div className="">Adulto</div>
          <div className="">03 </div>
          <div className="">30,00</div>
          <div className="text-right pr-5">500,00</div>

          <div className="">Criança</div>
          <div className="">02 </div>
          <div className="">15,00 </div>
          <div className="text-right pr-5">45,00</div>

          <div className="col-span-2 font-bold text-right">Total</div>
          <div className="col-span-2 font-bold text-right pr-5">R$ 50,00</div>
        </div>
        <div className="grid grid-cols-4 gap-1 pl-3 min-w-[150px] ">
          <h2 className="col-span-4 font-medium text-lg text-gray-900 ">
            Ticket
          </h2>
          <div className="">Adulto</div>
          <div className="">03 </div>
          <div className="">30,00</div>
          <div className="text-right pr-5">500,00</div>

          <div className="">Criança</div>
          <div className="">02 </div>
          <div className="">15,00 </div>
          <div className="text-right pr-5">45,00</div>

          <div className="col-span-2 font-bold text-right">Total</div>
          <div className="col-span-2 font-bold text-right pr-5">R$ 50,00</div>
        </div>
        <div className="col-span-4 bg-stone-100 min-h-[60px] min-w-[150px] mt-10"></div>
        <button className="bg-orange-400 px4 py-2" onClick={handleClick}>
          teste
        </button>
      </div>
    </div>
  );
};

export default Help;
