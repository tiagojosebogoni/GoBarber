import React from 'react';

import {
  Container, Header, HeaderTitle, UserName,
} from './styles';

const Dashboard:React.FC = () => (
  <Container>
    <Header>
      <HeaderTitle>
        Bem Vindo,
        {' '}
        {'\n'}
        <UserName>Tiago Bogoni</UserName>
      </HeaderTitle>
    </Header>
  </Container>
);

export default Dashboard;
