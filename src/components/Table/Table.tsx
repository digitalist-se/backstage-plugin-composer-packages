import React from 'react';
import { Table, TableColumn } from '@backstage/core-components';

export type Library = {
  id: string; // "5a7d7c29-58cb-411a-b139-6e18118e43ab"
  name: string; // "drupal/core"
  site: string; // "foo.bar"
  type: string; // "module"
  version: string; // "1.3"
};

type DenseTableProps = {
  composerpackages: Library[];
};

export const DenseTable = ({ composerpackages }: DenseTableProps) => {
  const columns: TableColumn[] = [
    { title: 'Name', field: 'name' },
    { title: 'Version', field: 'version' },
    { title: 'Type', field: 'type' },
    { title: 'Site', field: 'site' },
  ];

  const data = composerpackages.map(library => {
    return {
      name: library.name,
      version: library.version,
      type: library.type,
      site: library.site,
    };
  });

  return (
    <Table
      title="Indexed modules, libraries etc."
      options={{ search: true, paging: true }}
      columns={columns}
      data={data}
    />
  );
};
