'use client';

import { FC, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { mainStore } from '@/store';

type Props = {
  children: ReactNode;
};

const Providers: FC<Props> = ({ children }) => {
  return (
    <Provider store={ mainStore }>
      {children}
    </Provider>
  );
};

export default Providers;