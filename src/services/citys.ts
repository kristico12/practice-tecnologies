import { UseQueryResult, useQuery, UseQueryOptions } from 'react-query';
import { publicRequest } from '../utils/public-request';
import { CitysAttr } from './types/citys';
import { baseUrl } from '../utils/constantsEnv';
import { SortingRule } from 'react-table';

const CITYS_ENPOINT = baseUrl;
const COMICS_KEY = 'citys';

const useCitys = (
  limit: number,
  offset: number,
  order: SortingRule<CitysAttr>[],
  options?: UseQueryOptions<CitysAttr[]>,
): UseQueryResult<CitysAttr[]> => {
  const queryResult = useQuery(
    [COMICS_KEY, limit, offset, order],
    async () => {
      let localEndpoint = `${CITYS_ENPOINT}?$limit=${limit}&$offset=${offset}`;
      if (order.length > 0) localEndpoint = `${localEndpoint}&$order=${order[0].id} ${order[0].desc ? 'DESC' : 'ASC'}`;
      const response = await publicRequest.get<CitysAttr[]>(localEndpoint);
      return response.data;
    },
    options  
  );
  return queryResult;
};

export { useCitys };
export type { CitysAttr };
