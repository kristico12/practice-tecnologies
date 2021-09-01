import { Column } from 'react-table';
import { CitysAttr } from '../services/citys';

export const titlesTablesCitys: Array<Column<CitysAttr>> = [
  {Header: 'Region', accessor: 'region'},
  {Header: 'Codigo del departamento', accessor: 'c_digo_dane_del_departamento'},
  {Header: 'Departamento', accessor: 'departamento'},
  {Header: 'Codigo del municipio', accessor: 'c_digo_dane_del_municipio'},
  {Header: 'Municipio', accessor: 'municipio'},
]