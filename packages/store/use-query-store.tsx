import { useRouter } from 'next/router';
import React, { Context, ReactNode, useState, useEffect, createContext } from 'react';
import Debug from 'debug';

import { IStoreContext, defaultContext, useStore } from './use-store';

const debug = Debug('deepcase:store:use-store-query');

export const QueryStoreContext = createContext(defaultContext);

export const fakeRouter: any = {};

export const QueryStoreProvider = ({
  context = QueryStoreContext,
  children,
}: {
  context?: Context<IStoreContext>;
  children?: ReactNode;
}) => {
  const [useStore] = useState(() => {
    return function useStore<T extends any>(
      key: string,
      defaultValue: T,
    ): [T, (value: T) => any] {
      const router = useRouter();
      const { query, pathname, push } = router || fakeRouter;

      const [setValue] = useState(() => (value) => {
        try {
          push({
            pathname,
            query: {
              ...query,
              [key]: JSON.stringify(value),
            },
          });
        } catch (error) {
          debug('setStore:error', { error, key, defaultValue, value });
        }
      });

      let value: any;
      try {
        value = query && query[key] && JSON.parse(query[key]);
      } catch (error) {
        debug('value:error', { error, key, defaultValue, query });
      }
      return [value || defaultValue, setValue];
    };
  });

  return <context.Provider value={{ useStore }}>
    {children}
  </context.Provider>;
};

export function useQueryStore<T extends any>(key: string, defaultValue: T, context = QueryStoreContext) {
  return useStore(key, defaultValue, context);
}
