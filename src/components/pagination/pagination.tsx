type PaginationProps = {
  item: number;
  currentPage: number;
  paginate: (pageNumber: number) => void;
}

const Pagination = ({ item, paginate, currentPage }: PaginationProps) => (
  <li className="pagination__item">
    <a
      className={`pagination__link ${item === currentPage ? 'pagination__link--active' : ''}`}
      href={`${item}`}
      onClick={(evt) => {
        evt.preventDefault();
        paginate(item);
      }}
    >
      {item}
    </a>
  </li >
);

export default Pagination;

