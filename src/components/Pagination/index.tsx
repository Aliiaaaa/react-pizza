import ReactPaginateImport from 'react-paginate';
import styles from './Pagination.module.scss';

const ReactPaginate: typeof ReactPaginateImport =
  (ReactPaginateImport as unknown as { default?: typeof ReactPaginateImport }).default ??
  ReactPaginateImport;

type PaginationProps = {
  currentPage: number;
  pageCount: number;
  onChangePage: (page: number) => void;
};

export const Pagination = ({ currentPage, pageCount, onChangePage }: PaginationProps) => {
  return (
    <ReactPaginate
      className={styles.root}
      activeClassName={styles.selected}
      breakLabel="..."
      previousLabel="<"
      nextLabel=">"
      onPageChange={(e) => onChangePage(e.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={pageCount}
      forcePage={currentPage - 1}
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
