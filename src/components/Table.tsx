import React from 'react';
import clsx from 'clsx';
import { ChevronUp, ChevronDown, MoreHorizontal } from 'lucide-react';
import { TableColumn } from '../types';

interface TableProps<T = any> {
  data: T[];
  columns: TableColumn<T>[];
  className?: string;
  onRowClick?: (row: T) => void;
  loading?: boolean;
  emptyMessage?: string;
}

export function Table<T = any>({
  data,
  columns,
  className,
  onRowClick,
  loading = false,
  emptyMessage = "Nenhum item encontrado"
}: TableProps<T>) {
  const [sortColumn, setSortColumn] = React.useState<keyof T | null>(null);
  const [sortDirection, setSortDirection] = React.useState<'asc' | 'desc'>('asc');

  const handleSort = (column: TableColumn<T>) => {
    if (!column.sortable) return;

    if (sortColumn === column.key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column.key);
      setSortDirection('asc');
    }
  };

  const sortedData = React.useMemo(() => {
    if (!sortColumn) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [data, sortColumn, sortDirection]);

  return (
    <div className={clsx('bg-white rounded-lg border border-gray-200 overflow-hidden', className)}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  className={clsx(
                    'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider',
                    column.sortable && 'cursor-pointer hover:bg-gray-100 select-none'
                  )}
                  onClick={() => handleSort(column)}
                >
                  <div className="flex items-center gap-1">
                    <span>{column.label}</span>
                    {column.sortable && (
                      <div className="flex flex-col">
                        <ChevronUp 
                          className={clsx(
                            'w-3 h-3 -mb-1',
                            sortColumn === column.key && sortDirection === 'asc'
                              ? 'text-gray-900'
                              : 'text-gray-400'
                          )} 
                        />
                        <ChevronDown 
                          className={clsx(
                            'w-3 h-3',
                            sortColumn === column.key && sortDirection === 'desc'
                              ? 'text-gray-900'
                              : 'text-gray-400'
                          )} 
                        />
                      </div>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedData.length === 0 ? (
              <tr>
                <td 
                  colSpan={columns.length} 
                  className="px-6 py-12 text-center text-sm text-gray-500"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              sortedData.map((row, index) => (
                <tr
                  key={index}
                  className={clsx(
                    'hover:bg-gray-50 transition-colors',
                    onRowClick && 'cursor-pointer'
                  )}
                  onClick={() => onRowClick?.(row)}
                >
                  {columns.map((column) => (
                    <td key={String(column.key)} className="px-6 py-4 whitespace-nowrap">
                      {column.render 
                        ? column.render(row[column.key], row)
                        : String(row[column.key] || '-')
                      }
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Componente de ação para tabelas
export function TableActions({ 
  onEdit, 
  onDelete, 
  onView,
  customActions 
}: {
  onEdit?: () => void;
  onDelete?: () => void;
  onView?: () => void;
  customActions?: { label: string; onClick: () => void; }[];
}) {
  const [showMenu, setShowMenu] = React.useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="p-1 rounded-md hover:bg-gray-100 transition-colors"
      >
        <MoreHorizontal className="w-4 h-4 text-gray-500" />
      </button>

      {showMenu && (
        <div className="absolute right-0 mt-1 w-32 bg-white rounded-md shadow-lg border border-gray-200 z-10">
          <div className="py-1">
            {onView && (
              <button
                onClick={() => { onView(); setShowMenu(false); }}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Visualizar
              </button>
            )}
            {onEdit && (
              <button
                onClick={() => { onEdit(); setShowMenu(false); }}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Editar
              </button>
            )}
            {customActions?.map((action, index) => (
              <button
                key={index}
                onClick={() => { action.onClick(); setShowMenu(false); }}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                {action.label}
              </button>
            ))}
            {onDelete && (
              <>
                <hr className="my-1" />
                <button
                  onClick={() => { onDelete(); setShowMenu(false); }}
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  Excluir
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}