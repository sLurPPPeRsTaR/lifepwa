import Icon from 'react-icons-kit';
import { lifeIdRed } from '@cp-config/Images';
import { useState } from 'react';
import { Container, SyaratPrivasi } from '@cp-component';
import { useEffect } from 'react';

export default function Page() {
  const [showDetail, setShowDetail] = useState({ 1: false, 2: false });

  const expandCollapseCell = (id) => {
    setShowDetail({ ...showDetail, [id]: !showDetail[id] });
  };

  return (
    <Container isShowHeader={false} isShowFooter={false} noBackground={true}>
      <SyaratPrivasi />
    </Container>
  );
}
