import { LoadingTableProps } from "./types";

const LoadingTable = ({
  heigth = 'h-10',
  width = 'w-10'
}: LoadingTableProps): React.ReactElement => (
  <svg fill='none' className={`${width} ${heigth} animate-spin text-gray-400`} viewBox="0 0 32 32" xmlns='http://www.w3.org/2000/svg'>
    <path clipRule='evenodd'
      d='M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z'
      fill='currentColor' fillRule='evenodd' />
  </svg>
);

export default LoadingTable;
