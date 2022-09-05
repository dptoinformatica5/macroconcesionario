import { useRouter } from 'next/router';

const Pagination = ({array, pageSize, url}) => {
  const router = useRouter();
  const renderPagination = () => {
    const pages = Math.ceil(array.length / pageSize);
    let res = [];
    for (let page = 1; page <= pages; page++) {
      res.push(
        <div
          key={page}
          onClick={() => router.push(`/${url}/${page}`)}
          className={(page == router.query.page || (page === 1 && !router.query.page)) ? 'page-active' : 'page-item'}
        >
          {page}
        </div>
      );
    }
    return res;
  };
  return <div className="pagination py-4">{renderPagination()}</div>;
};

export default Pagination;