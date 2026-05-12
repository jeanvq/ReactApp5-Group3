import type { Filters } from "../models/types.ts";

type FilterBarProps = {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
};

function FilterBar({ filters, onFilterChange }: FilterBarProps) {

  function handleChange(field: keyof Filters, value: string) {
    onFilterChange({ ...filters, [field]: value });
  }

  return (
    <div className="card mb-4 shadow-sm">
      <div className="card-body">
        <div className="row g-2 align-items-end">

          <div className="col-12 col-sm-4">
            <label htmlFor="filter-status" className="form-label small fw-semibold mb-1">
              Status
            </label>
            <select
              id="filter-status"
              className="form-select form-select-sm"
              value={filters.status}
              onChange={(e) => handleChange("status", e.target.value)}
            >
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>

          <div className="col-12 col-sm-4">
            <label htmlFor="filter-priority" className="form-label small fw-semibold mb-1">
              Priority
            </label>
            <select
              id="filter-priority"
              className="form-select form-select-sm"
              value={filters.priority}
              onChange={(e) => handleChange("priority", e.target.value)}
            >
              <option value="all">All</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          <div className="col-12 col-sm-4">
            <label htmlFor="filter-search" className="form-label small fw-semibold mb-1">
              Search
            </label>
            <input
              id="filter-search"
              type="text"
              className="form-control form-control-sm"
              placeholder="Search tasks..."
              value={filters.search}
              onChange={(e) => handleChange("search", e.target.value)}
            />
          </div>

        </div>
      </div>
    </div>
  );
}

export default FilterBar;