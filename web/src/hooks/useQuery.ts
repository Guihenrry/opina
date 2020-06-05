import { useLocation } from 'react-router';

function useQuery(): URLSearchParams {
  return new URLSearchParams(useLocation().search);
}

export default useQuery;
