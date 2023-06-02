import Pagination from '../pagination/pagination';

type PaginationListProps = {
  productPerPage: number;
  totalProducts: number;
  paginate: (pageNumber: number) => void;
  nextPage: ()=> void;
  prevPage: ()=> void;
}

const PaginationList = ({productPerPage, totalProducts, paginate, nextPage, prevPage}: PaginationListProps) => {
  const pageNumber = [];

  for(let i = 1; i <= Math.ceil(totalProducts / productPerPage) ; i++) {
    pageNumber.push(i);
  }

  return (
    <div className="pagination">
      <ul className="pagination__list">
        {pageNumber.map((item: number) => <Pagination item={item} key={item} paginate={paginate} />)}
      </ul>
    </div>
  );};

export default PaginationList;

{/* <ul class="pagination__list">
</li>
<li class="pagination__item"><a class="pagination__link pagination__link--text" href="2" onClick = {prevPage}>Назад</a>
</li>
<li class="pagination__item"><a class="pagination__link pagination__link--active" href="1">1</a>
</li>
<li class="pagination__item"><a class="pagination__link" href="2">2</a>
</li>
<li class="pagination__item"><a class="pagination__link" href="3">3</a>
</li>
<li class="pagination__item"><a class="pagination__link pagination__link--text" href="2" onClick = {nextPage}>Далее</a>
</li>
</ul> */}
