import { withRouter } from 'next/router';
import { shape, string } from 'prop-types';
import styled from 'styled-components';
import Comp from '../components/comp';

const Title = styled.h1`
  color: yellow;
  font-size: 12px;
`;
const A = ({ router, name }) => {
  return (
    <>
      <Title />
      <div>
        {router.query.id}
        {name}
      </div>
    </>
  );
};
A.defaultProps = {
  router: {},
  name: ''
};
A.propTypes = {
  router: shape({
    query: shape({
      id: string
    })
  }),
  name: string
};
// 等待後才渲染頁面,會有空白頁
A.getInitialProps = async () => {
  const promise = new Promise(resolve =>
    setTimeout(() => {
      resolve({
        name: 'jokcy'
      });
    }, 1000)
  );
  return await promise;
};

export default withRouter(A);
