import React from 'react';
import { useRouter } from 'next/router';

import tw from 'tailwind-styled-components';

import {
  TemplateContainer,
  TemplateContent,
} from '../src/components/templates';

import { getBrazilianDate } from '../util/helpers';

const formateDateToShow = (date: string) => {
  const [year, month, day] = date.split('-');

  const result = [day, month, year].join('-');
  return result;
};

const Sucesso = () => {
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

  return (
    <TemplateContainer>
      <TemplateContent>
        <Panel>
          <div className="flex flex-col gap-5 justify-center items-center mt-5">
            <Title className="font-normal">
              Caixa do dia {formateDateToShow(getBrazilianDate())}
            </Title>
            <div className="px-4 my-3">
              <div className="border border-teal-400 rounded-lg bg-teal-100 px-4 py-3 text-teal-700">
                <p>Caixa Fechado com sucesso !</p>
              </div>
            </div>
            <button
              onClick={(e) => router.push('/')}
              className="w-2/4 rounded-lg bg-stone-500 hover:bg-stone-700 text-white font-bold py-2 px-4"
            >
              Voltar
            </button>
          </div>
        </Panel>
      </TemplateContent>
    </TemplateContainer>
  );
};

export default Sucesso;
