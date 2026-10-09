import React, { useState } from 'react';

export interface Column<T> {
  header: string;
  accessor?: keyof T;
  render?: (row: T) => React.ReactNode;
  align?: 'left' | 'center' | 'right';
}

interface HospitalDataTableProps<T> {
  title: string;
  subtitle?: string;
  columns: Column<T>[];
  data: T[];
  searchPlaceholder?: string;
  searchFilter?: (row: T, term: string) => boolean;
  actionButton?: {
    label: string;
    icon?: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    icon?: string;
    onClick: () => void;
  };
}

export function HospitalDataTable<T extends { id?: string | number }>({
  title,
  subtitle,
  columns,
  data,
  searchPlaceholder = 'Search records...',
  searchFilter,
  actionButton,
  secondaryAction
}: HospitalDataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = searchTerm.trim() && searchFilter
    ? data.filter((row) => searchFilter(row, searchTerm.toLowerCase()))
    : data;

  return (
    <div className="data-table-container">
      <div className="data-table-header">
        <div>
          <h2 style={{ fontSize: '1.02rem', fontWeight: 700, margin: 0 }}>
            {title}{' '}
            <span className="pill-count solid" style={{ marginLeft: '6px' }}>
              {filteredData.length}
            </span>
          </h2>
          {subtitle && <p className="subtext">{subtitle}</p>}
        </div>

        <div className="table-filter-group">
          {searchFilter && (
            <div className="search-input-wrap">
              <i className="bi bi-search"></i>
              <input
                type="text"
                className="search-input"
                placeholder={searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          )}

          {secondaryAction && (
            <button className="btn-outline" onClick={secondaryAction.onClick}>
              {secondaryAction.icon && <i className={`bi ${secondaryAction.icon}`}></i>}
              {secondaryAction.label}
            </button>
          )}

          {actionButton && (
            <button className="btn-dark" onClick={actionButton.onClick}>
              {actionButton.icon && <i className={`bi ${actionButton.icon}`}></i>}
              {actionButton.label}
            </button>
          )}
        </div>
      </div>

      <div className="table-responsive">
        <table className="hospital-table">
          <thead>
            <tr>
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  style={{ textAlign: col.align || 'left' }}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, rowIdx) => (
              <tr key={row.id ? String(row.id) : rowIdx}>
                {columns.map((col, colIdx) => (
                  <td key={colIdx} style={{ textAlign: col.align || 'left' }}>
                    {col.render
                      ? col.render(row)
                      : col.accessor
                      ? String(row[col.accessor] ?? '')
                      : null}
                  </td>
                ))}
              </tr>
            ))}

            {filteredData.length === 0 && (
              <tr>
                <td colSpan={columns.length} style={{ textAlign: 'center', padding: '36px' }}>
                  <div style={{ color: 'var(--muted)' }}>
                    <i className="bi bi-search" style={{ fontSize: '1.5rem', display: 'block', marginBottom: '8px' }}></i>
                    No matching records found.
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
