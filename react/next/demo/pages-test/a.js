import { withRouter } from 'next/router';
import { shape, string } from 'prop-types';
import dynamic from 'next/dynamic';
import getconfig from 'next/config';
import styled from 'styled-components';
// import moment from 'moment';
// import Comp from '../components/comp';
const Comp = dynamic(import('../components/comp'));

const { serverRuntimeConfig, publicRuntimeConfig } = getconfig();

const Title = styled.h1`
  color: red;
  font-size: 22px;
`;
const A = ({ router, name, time }) => {
  console.log(serverRuntimeConfig, publicRuntimeConfig);
  return (
    <>
      <Title>
        this is title;
        {time}
      </Title>
      <Comp />
      <div>
        {router.query.id}
        {name}
        {process.env.customKey}
        {process.env.customKey}
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
  const moment = await import('moment');
  const promise = new Promise(resolve =>
    setTimeout(() => {
      resolve({
        name: 'jokcy',
        time: moment.default(Date.now() - 60 * 1000).fromNow()
      });
    }, 1000)
  );
  return await promise;
};

export default withRouter(A);
