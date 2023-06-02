type PaginationProps = {
  item:number;
  paginate: (pageNumber: number) => void;
}

const Pagination = ({item, paginate} : PaginationProps) => (
  <li className="pagination__item">
    <a className="pagination__link pagination__link--active"
      href={`${item}`}
      onClick={() => paginate(item)}
    >
      {item}
    </a>
  </li>
);

export default Pagination;

