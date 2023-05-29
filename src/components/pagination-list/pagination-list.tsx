import Pagination from '../pagination/pagination';

const PaginationList = () => (
  <div className="pagination">
    <ul className="pagination__list">
      <Pagination />
      <Pagination />
      <Pagination />
      <Pagination />
    </ul>
  </div>
);

export default PaginationList;
