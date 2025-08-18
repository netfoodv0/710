import type {SVGProps} from "react";
import type {Selection, ChipProps, SortDescriptor} from "@heroui/react";

import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
} from "@heroui/react";
import { Eye, Calendar, User as UserIcon, CreditCard, DollarSign, List } from 'lucide-react';
import { Pedido } from '../../../types';
import { StatusBadge } from './StatusBadge';

export type IconSvgProps = SVGProps<SVGSVGElement> & {
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

export const ChevronDownIcon = ({strokeWidth = 1.5, ...otherProps}: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...otherProps}
    >
      <path
        d="m19.92 8.95-6.52 6.52c-.77.77-2.03.77-2.8 0L4.08 8.95"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={strokeWidth}
      />
    </svg>
  );
};

interface HistoricoTableProps {
  pedidos: Pedido[];
  onViewPedido: (pedido: Pedido) => void;
}

export const columns = [
  {name: "PEDIDO", uid: "pedido", sortable: true},
  {name: "CLIENTE", uid: "cliente", sortable: true},
  {name: "PAGAMENTO", uid: "pagamento", sortable: true},
  {name: "STATUS", uid: "status", sortable: true},
  {name: "DATA/HORA", uid: "dataHora", sortable: true},
  {name: "TOTAL", uid: "total", sortable: true},
  {name: "AÇÕES", uid: "actions"},
];

export const statusOptions = [
  {name: "Entregue", uid: "entregue"},
  {name: "Cancelado", uid: "cancelado"},
  {name: "Finalizado", uid: "finalizado"},
];

const statusColorMap: Record<string, ChipProps["color"]> = {
  entregue: "success",
  cancelado: "danger",
  finalizado: "primary",
};

const INITIAL_VISIBLE_COLUMNS = ["pedido", "cliente", "status", "total", "actions"];

export const HistoricoTable = React.memo(function HistoricoTable({ pedidos, onViewPedido }: HistoricoTableProps) {
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS),
  );
  const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "dataHora",
    direction: "descending",
  });

  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredPedidos = [...pedidos];

    if (hasSearchFilter) {
      filteredPedidos = filteredPedidos.filter((pedido) =>
        pedido.cliente?.nome?.toLowerCase().includes(filterValue.toLowerCase()) ||
        pedido.numero?.toString().includes(filterValue)
      );
    }
    if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
      filteredPedidos = filteredPedidos.filter((pedido) =>
        Array.from(statusFilter).includes(pedido.status),
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
    return [...items].sort((a: Pedido, b: Pedido) => {
      let first: any;
      let second: any;

      switch (sortDescriptor.column) {
        case "dataHora":
          first = new Date(a.dataHora).getTime();
          second = new Date(b.dataHora).getTime();
          break;
        case "total":
          first = a.total;
          second = b.total;
          break;
        case "pedido":
          first = a.numero;
          second = b.numero;
          break;
        default:
          first = a[sortDescriptor.column as keyof Pedido];
          second = b[sortDescriptor.column as keyof Pedido];
      }

      const cmp = first < second ? -1 : first > second ? 1 : 0;
      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const formatarData = (data: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(data);
  };

  const formatarValor = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  };

  const formatarFormaPagamento = (forma: string) => {
    const formas = {
      dinheiro: 'Dinheiro',
      pix: 'PIX',
      cartao_credito: 'Cartão de Crédito',
      cartao_debito: 'Cartão de Débito',
      vale_refeicao: 'Vale Refeição',
      vale_alimentacao: 'Vale Alimentação'
    };
    return formas[forma as keyof typeof formas] || forma;
  };

  const renderCell = React.useCallback((pedido: Pedido, columnKey: React.Key) => {
    const cellValue = pedido[columnKey as keyof Pedido];

    switch (columnKey) {
      case "pedido":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small">#{pedido.numero}</p>
            <p className="text-bold text-tiny capitalize text-default-400">{pedido.itens.length} itens</p>
          </div>
        );
      case "cliente":
        return (
          <User
            avatarProps={{radius: "lg", src: "https://i.pravatar.cc/150?u=a042581f4e29026024d"}}
            description={pedido.cliente?.telefone || 'N/A'}
            name={pedido.cliente?.nome || 'Cliente não identificado'}
          >
            {pedido.cliente?.telefone || 'N/A'}
          </User>
        );
      case "pagamento":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{formatarFormaPagamento(pedido.formaPagamento)}</p>
            <p className="text-bold text-tiny capitalize text-default-400">
              {pedido.pagamento?.statusPagamento === 'pago' ? 'Pago' : 'Pendente'}
            </p>
          </div>
        );
      case "status":
        return (
          <Chip className="capitalize" color={statusColorMap[pedido.status]} size="sm" variant="flat">
            {pedido.status}
          </Chip>
        );
      case "dataHora":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small">{formatarData(pedido.dataHora)}</p>
            <p className="text-bold text-tiny capitalize text-default-400">{pedido.tempoEstimado}</p>
          </div>
        );
      case "total":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small">{formatarValor(pedido.total)}</p>
          </div>
        );
      case "actions":
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Button
              isIconOnly
              size="sm"
              variant="light"
              onPress={() => onViewPedido(pedido)}
            >
              <Eye className="w-4 h-4" />
            </Button>
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <VerticalDotsIcon className="text-default-300" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem key="view" onPress={() => onViewPedido(pedido)}>Ver</DropdownItem>
                <DropdownItem key="edit">Editar</DropdownItem>
                <DropdownItem key="delete">Excluir</DropdownItem>
              </DropdownMenu>
            </Dropdown>
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
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Buscar por cliente ou número..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                  Status
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                  Colunas
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button color="primary" endContent={<PlusIcon />}>
              Novo Pedido
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">Total {pedidos.length} pedidos</span>
          <label className="flex items-center text-default-400 text-small">
            Linhas por página:
            <select
              className="bg-transparent outline-solid outline-transparent text-default-400 text-small"
              onChange={onRowsPerPageChange}
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
    onRowsPerPageChange,
    pedidos.length,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "Todos os itens selecionados"
            : `${selectedKeys.size} de ${filteredItems.length} selecionados`}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onPreviousPage}>
            Anterior
          </Button>
          <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage}>
            Próximo
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  if (pedidos.length === 0) {
    return (
      <div className="p-8 text-center">
        <div className="text-gray-400 mb-4">
          <Calendar className="w-12 h-12 mx-auto mb-4" />
        </div>
        <h3 className="text-sm font-medium text-gray-900 mb-2">Nenhum pedido encontrado</h3>
        <p className="text-gray-500 text-xs">
          Não há pedidos entregues ou cancelados no período selecionado.
        </p>
      </div>
    );
  }

  return (
    <Table
      isHeaderSticky
      aria-label="Tabela de histórico de pedidos com células customizadas, paginação e ordenação"
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={{
        wrapper: "max-h-[600px]",
      }}
      selectedKeys={selectedKeys}
      selectionMode="multiple"
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSelectionChange={setSelectedKeys}
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"Nenhum pedido encontrado"} items={sortedItems}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}); 