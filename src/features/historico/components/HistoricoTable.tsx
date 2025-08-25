import type {SVGProps} from "react";

import React from "react";
import { Eye, Calendar, User as UserIcon, CreditCard, DollarSign, List } from 'lucide-react';
import { Pedido } from '../../../types';
import { StatusBadge } from './StatusBadge';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '../../../components/ui/table';
import { CustomDropdown, DropdownOption } from '../../../components/ui/CustomDropdown';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';

export type IconSvgProps = SVGProps<HTMLSVGElement> & {
  size?: number;
};

export function capitalize(s: string) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "";
}

export const PlusIcon = ({size = 24, width, height, ...props}: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height={size || height}
      role="presentation"
      viewBox="0 0 24 24"
      width={size || width}
      {...props}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      >
        <path d="M6 12h12" />
        <path d="M12 18V6" />
      </g>
    </svg>
  );
};

export const VerticalDotsIcon = ({size = 24, width, height, ...props}: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height={size || height}
      role="presentation"
      viewBox="0 0 24 24"
      width={size || width}
      {...props}
    >
      <path
        d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
        fill="currentColor"
      />
    </svg>
  );
};

export const SearchIcon = (props: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M22 22L20 20"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
};

export const ChevronDownIcon = (props: IconSvgProps) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 24 24"
    width="1em"
    {...props}
  >
    <path
      d="m19.92 8.95-6.52 6.52c-.77.77-2.03.77-2.8 0L4.08 8.95"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.5}
    />
  </svg>
);

interface HistoricoTableProps {
  pedidos: Pedido[];
  onViewPedido: (pedido: Pedido) => void;
}

export const columns = [
  {name: "PEDIDO", uid: "pedido", sortable: true},
  {name: "CLIENTE", uid: "cliente", sortable: true},
  {name: "STATUS", uid: "status", sortable: true},
  {name: "TOTAL", uid: "total", sortable: true},
  {name: "DATA", uid: "dataHora", sortable: true},
  {name: "AÇÕES", uid: "actions", sortable: false},
];

export const statusOptions = [
  {name: "Entregue", uid: "entregue"},
  {name: "Cancelado", uid: "cancelado"},
  {name: "Finalizado", uid: "finalizado"},
];

const statusColorMap: Record<string, "success" | "danger" | "primary"> = {
  entregue: "success",
  cancelado: "danger",
  finalizado: "primary",
};

const INITIAL_VISIBLE_COLUMNS = ["pedido", "cliente", "status", "total", "actions"];

export const HistoricoTable = React.memo(function HistoricoTable({ pedidos, onViewPedido }: HistoricoTableProps) {
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState<Set<string>>(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState<Set<string>>(
    new Set(INITIAL_VISIBLE_COLUMNS),
  );
  const [statusFilter, setStatusFilter] = React.useState<string>("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState<{
    column: string;
    direction: "ascending" | "descending";
  }>({
    column: "dataHora",
    direction: "descending",
  });

  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns.size === 0) return columns;
    return columns.filter((column) => visibleColumns.has(column.uid));
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredPedidos = [...pedidos];

    if (hasSearchFilter) {
      filteredPedidos = filteredPedidos.filter((pedido) =>
        pedido.cliente?.nome?.toLowerCase().includes(filterValue.toLowerCase()) ||
        pedido.numero?.toString().includes(filterValue)
      );
    }
    if (statusFilter !== "all") {
      filteredPedidos = filteredPedidos.filter((pedido) =>
        pedido.status === statusFilter,
      );
    }

    return filteredPedidos;
  }, [pedidos, filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage) || 1;

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column as keyof Pedido];
      const second = b[sortDescriptor.column as keyof Pedido];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [items, sortDescriptor]);

  const renderCell = React.useCallback((pedido: Pedido, columnKey: string) => {
    const cellValue = pedido[columnKey as keyof Pedido];

    switch (columnKey) {
      case "pedido":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{pedido.numero}</p>
          </div>
        );
      case "cliente":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{pedido.cliente?.nome}</p>
            <p className="text-bold text-tiny capitalize text-default-400">{pedido.cliente?.telefone}</p>
          </div>
        );
      case "status":
        return (
          <StatusBadge status={pedido.status} />
        );
      case "total":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">
              R$ {pedido.total?.toFixed(2)}
            </p>
          </div>
        );
      case "dataHora":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">
              {new Date(pedido.dataHora).toLocaleDateString('pt-BR')}
            </p>
            <p className="text-bold text-tiny capitalize text-default-400">
              {new Date(pedido.dataHora).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
        );
      case "actions":
        return (
          <div className="flex gap-2">
                      <Button
            size="sm"
            variant="ghost"
            onClick={() => onViewPedido(pedido)}
            className="p-2"
          >
            <Eye className="w-4 h-4" />
          </Button>
          </div>
        );
      default:
        return cellValue;
    }
  }, [onViewPedido]);

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <div className="relative w-full sm:max-w-[44%]">
            <Input
              className="w-full pr-10"
              placeholder="Buscar por cliente ou pedido..."
              value={filterValue}
              onChange={(e) => onSearchChange(e.target.value)}
            />
            {filterValue && (
              <button
                onClick={onClear}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            )}
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>
          <div className="flex gap-3">
            <CustomDropdown
              options={statusOptions}
              selectedValue={statusFilter}
              onValueChange={(value) => setStatusFilter(value)}
              placeholder="Filtrar por status"
            />
            <CustomDropdown
              options={[
                { value: "all", label: "Todas as colunas" },
                ...columns.map(col => ({ value: col.uid, label: col.name }))
              ]}
              selectedValue={Array.from(visibleColumns).join(',')}
              onValueChange={(value) => {
                if (value === "all") {
                  setVisibleColumns(new Set(columns.map(col => col.uid)));
                } else {
                  setVisibleColumns(new Set([value]));
                }
              }}
              placeholder="Colunas visíveis"
            />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {pedidos.length} pedidos
          </span>
          <label className="flex items-center text-default-400 text-small">
            Linhas por página:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
              value={rowsPerPage}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onSearchChange,
    onClear,
    onRowsPerPageChange,
    rowsPerPage,
    pedidos.length,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <div className="flex w-[30%] justify-start gap-2">
          <Button
            disabled={selectedKeys.size === 0}
            variant="destructive"
            onClick={() => setSelectedKeys(new Set())}
          >
            Limpar seleção
          </Button>
        </div>
        <div className="flex w-[1/3] justify-center items-center gap-2">
          <Button
            disabled={page === 1}
            size="sm"
            variant="outline"
            onClick={onPreviousPage}
          >
            Anterior
          </Button>
          <div className="flex items-center gap-1">
            {Array.from({ length: pages }, (_, i) => i + 1).map((pageNum) => (
              <Button
                key={pageNum}
                size="sm"
                variant={pageNum === page ? "default" : "outline"}
                onClick={() => setPage(pageNum)}
              >
                {pageNum}
              </Button>
            ))}
          </div>
          <Button
            disabled={page === pages}
            size="sm"
            variant="outline"
            onClick={onNextPage}
          >
            Próximo
          </Button>
        </div>
        <div className="flex w-[30%] justify-end gap-2">
          <span className="text-default-400 text-small">
            {`${(page - 1) * rowsPerPage + 1} a ${Math.min(page * rowsPerPage, filteredItems.length)} de ${filteredItems.length} resultados`}
          </span>
        </div>
      </div>
    );
  }, [
    selectedKeys.size,
    page,
    pages,
    onPreviousPage,
    onNextPage,
    rowsPerPage,
    filteredItems.length,
  ]);

  return (
    <div className="w-full">
      {topContent}
      <div className="max-h-[600px] overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {headerColumns.map((column) => (
                <TableHead key={column.uid}>
                  {column.name}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedItems.length === 0 ? (
              <TableRow>
                <TableCell colSpan={headerColumns.length} className="text-center py-12">
                  Nenhum pedido encontrado
                </TableCell>
              </TableRow>
            ) : (
              sortedItems.map((item) => (
                <TableRow key={item.id}>
                  {headerColumns.map((column) => (
                    <TableCell key={column.uid}>
                      {renderCell(item, column.uid)}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      {bottomContent}
    </div>
  );
}); 