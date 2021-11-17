import React, { useContext, useEffect } from 'react';
import NavBar from '../components/Navbar';
import { getFromLocalStorage } from '../services/helpers/servicesLocalStorage';
import { getAllOrders } from '../services/apis/getCustomer';
import Context from '../context/Context';
import CardMeusPedidos from '../components/CardMeusPedidos';
import * as S from '../styles/MeusPedidos';

function MeusPedidos() {
  const { setOrdersCustomer, ordersCustomer } = useContext(Context);
  useEffect(() => {
    const getPedidos = async () => {
      const token = getFromLocalStorage('user');
      const allOrders = await getAllOrders(token);
      await setOrdersCustomer(allOrders);
    };
    getPedidos();
  }, [setOrdersCustomer]);

  return (
    <div>
      <NavBar />
      <S.contentMeusPedidos>
        {ordersCustomer.map((order) => (
          <CardMeusPedidos key={ order.id } orders={ order } />
        ))}
      </S.contentMeusPedidos>
    </div>
  );
}

export default MeusPedidos;
