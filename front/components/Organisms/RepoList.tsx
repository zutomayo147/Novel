// import { Box, Text, Divider, Grid, GridItem } from "@chakra-ui/layout";
// import { Avatar, AvatarGroup } from "@chakra-ui/avatar"
// import { Input, Flex, Spacer } from '@chakra-ui/react'
// import { AiFillLock } from 'react-icons/ai';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'

type User = {
  firstName: string
  lastName: string
  age: number
}
export const LpHeader = () => {
  const data: User[] = [
    {
      firstName: '太郎',
      lastName: '山田',
      age: 42,
    },
    {
      firstName: '太郎',
      lastName: '山田',
      age: 42,
    },
    {
      firstName: '太郎',
      lastName: '山田',
      age: 42,
    },
    {
      firstName: '太郎',
      lastName: '山田',
      age: 42,
    },
    {
      firstName: '太郎',
      lastName: '山田',
      age: 42,
    },
    {
      firstName: '太郎',
      lastName: '山田',
      age: 42,
    },
    {
      firstName: '花子',
      lastName: '山田',
      age: 30,
    },]

  const columns: any[] = [
    {
      accessorKey: 'firstName',
      header: '名',
    },
    {
      accessorKey: 'lastName',
      header: '姓',
    },
    {
      accessorKey: 'age',
      header: '年齢',
    },
  ]
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <>
      <TableContainer>
        <Table variant='striped' colorScheme='teal'>
          <TableCaption>Imperial to metric conversion factors</TableCaption>
          <Thead>
            {table.getHeaderGroups().map(headerGroup => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <Th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {table.getRowModel().rows.map(row => (
              <Tr key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <Td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>

      </TableContainer>
    </>
  );
};

export default LpHeader