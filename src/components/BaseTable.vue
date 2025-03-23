<template>
  <div class="table-responsive">
    <table class="table" :class="[tableClass, { 'table-loading': loading }]">
      <thead :class="['table-header', theadClasses]">
        <tr>
          <slot name="columns">
            <th 
              v-for="column in columns" 
              :key="column"
              :class="[
                'table-header-cell',
                { 'sortable': sortable },
                { 'sorted-asc': sortColumn === column && sortDirection === 'asc' },
                { 'sorted-desc': sortColumn === column && sortDirection === 'desc' }
              ]"
              @click="sortable && handleSort(column)"
            >
              <div class="header-content">
                {{ column }}
                <span v-if="sortable" class="sort-icon">
                  <svg v-if="sortColumn === column" class="sort-arrow" viewBox="0 0 24 24" width="16" height="16">
                    <path 
                      v-if="sortDirection === 'asc'" 
                      d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"
                      fill="currentColor"
                    />
                    <path 
                      v-else 
                      d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"
                      fill="currentColor"
                    />
                  </svg>
                </span>
              </div>
            </th>
          </slot>
        </tr>
      </thead>
      <tbody :class="['table-body', tbodyClasses]">
        <template v-if="!loading">
          <tr 
            v-for="(item, rowIndex) in paginatedData" 
            :key="rowIndex"
            :class="[
              'table-row',
              { 'table-row-selected': selectedRows.includes(rowIndex) },
              { 'table-row-clickable': rowClickable }
            ]"
            @click="rowClickable && handleRowClick(item, rowIndex)"
          >
            <slot :row="item" :index="rowIndex">
              <template v-for="(column, colIndex) in columns">
                <td 
                  :key="colIndex" 
                  v-if="hasValue(item, column)"
                  class="table-cell"
                >
                  {{ formatValue(itemValue(item, column)) }}
                </td>
              </template>
            </slot>
          </tr>
        </template>
        <tr v-else class="table-loading-row">
          <td :colspan="columns.length" class="table-loading-cell">
            <div class="loading-spinner"></div>
            <span>Loading data...</span>
          </td>
        </tr>
        <tr v-if="!loading && paginatedData.length === 0" class="table-empty-row">
          <td :colspan="columns.length" class="table-empty-cell">
            <slot name="empty">
              No data available
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="paginated" class="table-pagination">
      <div class="pagination-info">
        Showing {{ paginationStart + 1 }} to {{ paginationEnd }} of {{ data.length }} entries
      </div>
      <div class="pagination-controls">
        <button 
          class="pagination-button" 
          :disabled="currentPage === 1"
          @click="handlePageChange(currentPage - 1)"
        >
          Previous
        </button>
        <div class="pagination-pages">
          <button 
            v-for="page in totalPages" 
            :key="page"
            class="page-button"
            :class="{ active: currentPage === page }"
            @click="handlePageChange(page)"
          >
            {{ page }}
          </button>
        </div>
        <button 
          class="pagination-button" 
          :disabled="currentPage === totalPages"
          @click="handlePageChange(currentPage + 1)"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "base-table",
  props: {
    columns: {
      type: Array,
      default: () => [],
      description: "Table columns"
    },
    data: {
      type: Array,
      default: () => [],
      description: "Table data"
    },
    type: {
      type: String,
      default: "",
      description: "Table type (striped | hover)"
    },
    theadClasses: {
      type: String,
      default: "",
      description: "<thead> css classes"
    },
    tbodyClasses: {
      type: String,
      default: "",
      description: "<tbody> css classes"
    },
    loading: {
      type: Boolean,
      default: false,
      description: "Whether table is in loading state"
    },
    sortable: {
      type: Boolean,
      default: false,
      description: "Whether table columns are sortable"
    },
    paginated: {
      type: Boolean,
      default: false,
      description: "Whether table should be paginated"
    },
    perPage: {
      type: Number,
      default: 10,
      description: "Number of items per page"
    },
    rowClickable: {
      type: Boolean,
      default: false,
      description: "Whether table rows are clickable"
    }
  },
  data() {
    return {
      sortColumn: null,
      sortDirection: 'asc',
      currentPage: 1,
      selectedRows: []
    };
  },
  computed: {
    tableClass() {
      return [
        this.type && `table-${this.type}`,
        { 'table-hover': this.rowClickable }
      ];
    },
    totalPages() {
      return Math.ceil(this.data.length / this.perPage);
    },
    paginationStart() {
      return (this.currentPage - 1) * this.perPage;
    },
    paginationEnd() {
      return Math.min(this.paginationStart + this.perPage, this.data.length);
    },
    paginatedData() {
      let filteredData = [...this.data];
      
      if (this.sortColumn) {
        filteredData.sort((a, b) => {
          const aVal = this.itemValue(a, this.sortColumn);
          const bVal = this.itemValue(b, this.sortColumn);
          
          if (this.sortDirection === 'asc') {
            return aVal > bVal ? 1 : -1;
          }
          return aVal < bVal ? 1 : -1;
        });
      }
      
      if (this.paginated) {
        return filteredData.slice(this.paginationStart, this.paginationEnd);
      }
      
      return filteredData;
    }
  },
  methods: {
    hasValue(item, column) {
      return typeof item[column.toLowerCase()] !== "undefined";
    },
    itemValue(item, column) {
      return item[column.toLowerCase()];
    },
    formatValue(value) {
      if (value === null || value === undefined) return '-';
      if (typeof value === 'boolean') return value ? 'Yes' : 'No';
      if (value instanceof Date) return value.toLocaleDateString();
      return value;
    },
    handleSort(column) {
      if (this.sortColumn === column) {
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortColumn = column;
        this.sortDirection = 'asc';
      }
      this.$emit('sort', { column, direction: this.sortDirection });
    },
    handlePageChange(page) {
      this.currentPage = page;
      this.$emit('page-change', page);
    },
    handleRowClick(item, index) {
      this.$emit('row-click', { item, index });
    }
  }
};
</script>

<style lang="scss" scoped>
.table-responsive {
  width: 100%;
  overflow-x: auto;
  background: var(--card-bg);
  border-radius: 8px;
  box-shadow: var(--shadow);
  margin-bottom: 1.5rem;
}

.table {
  width: 100%;
  border-collapse: collapse;
  color: var(--text-color);
  transition: all 0.3s ease;

  &.table-loading {
    opacity: 0.7;
    pointer-events: none;
  }

  .table-header {
    background-color: var(--bg-color-secondary);
    border-bottom: 1px solid var(--border-color);

    .table-header-cell {
      padding: 1rem;
      font-weight: 600;
      text-align: left;
      color: var(--text-color);
      transition: background-color 0.2s ease;

      &.sortable {
        cursor: pointer;

        &:hover {
          background-color: var(--hover-bg);
        }
      }

      .header-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }

      .sort-icon {
        display: inline-flex;
        align-items: center;
        color: var(--text-color-secondary);
      }

      &.sorted-asc .sort-icon,
      &.sorted-desc .sort-icon {
        color: var(--primary-color);
      }
    }
  }

  .table-body {
    .table-row {
      border-bottom: 1px solid var(--border-color);
      transition: background-color 0.2s ease;

      &:last-child {
        border-bottom: none;
      }

      &:hover {
        background-color: var(--hover-bg);
      }

      &.table-row-selected {
        background-color: var(--hover-bg);
      }

      &.table-row-clickable {
        cursor: pointer;
      }

      .table-cell {
        padding: 1rem;
        color: var(--text-color);
      }
    }

    .table-loading-row,
    .table-empty-row {
      .table-loading-cell,
      .table-empty-cell {
        padding: 2rem;
        text-align: center;
        color: var(--text-color-secondary);
      }
    }
  }
}

.table-pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-top: 1px solid var(--border-color);
  background-color: var(--bg-color-secondary);

  .pagination-info {
    color: var(--text-color-secondary);
    font-size: 0.875rem;
  }

  .pagination-controls {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    .pagination-button,
    .page-button {
      padding: 0.5rem 1rem;
      border: 1px solid var(--border-color);
      background-color: var(--bg-color);
      color: var(--text-color);
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover:not(:disabled) {
        background-color: var(--hover-bg);
        border-color: var(--primary-color);
        color: var(--primary-color);
      }

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      &.active {
        background-color: var(--primary-color);
        border-color: var(--primary-color);
        color: white;
      }
    }
  }
}

/* Loading spinner */
.loading-spinner {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid var(--border-color);
  border-top-color: var(--primary-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-right: 0.5rem;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
