import styles from './Pagination.module.scss';
import ReactPaginateImport from 'react-paginate';

const ReactPaginate = (ReactPaginateImport as any).default ?? ReactPaginateImport;

const Pagination = ({ currentPage, onChangePage }) => (
  <ReactPaginate
    className={styles.root}
    breakLabel="..."
    nextLabel=">"
    previousLabel="<"
    onPageChange={(event) => onChangePage(event.selected + 1)}
    pageRangeDisplayed={4}
    pageCount={3}
    forcePage={currentPage - 1}
  />
);

export default Pagination;
