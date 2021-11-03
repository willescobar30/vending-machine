import React, { FC, useState } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Products from '../../vendingMachine/Products/components/Products';
import Waiting from '../../vendingMachine/Waiting/components/Waiting';
import Delivered from '../../vendingMachine/Delivered/components/Delivered';

interface IData2 {
  id: string,
  name: string,
  preparation_time: number,
  thumbnail: string,
  created_at: Date
}
interface IDelivered {
  id: string,
  name: string,
  preparation_time: number,
  thumbnail: string,
}

const MainRouter: FC = () => {
  const [waiting, setWaiting] = useState<IData2[]>([]);
  const [delivered, setDelivered] = useState<IDelivered[]>([]);
  return (
    <Router>
      <div>
        <nav>
          <Link to="/Products">Products    </Link>
          <Link to="/Waiting">Waiting   </Link>
          <Link to="/Delivered">Delivered   </Link>
        </nav>
        <Switch>
          <Route exact path="/Products">
            <Products setWaiting={setWaiting} waiting={waiting} />
          </Route>
          <Route exact path="/Waiting">
            <Waiting setWaiting={setWaiting} waiting={waiting} setDelivered={setDelivered} delivered={delivered} />
          </Route>
          <Route exact path="/Delivered">
            <Delivered setDelivered={setDelivered} delivered={delivered} />
          </Route>
        </Switch>
      </div>
    </Router>
  );

}

export default MainRouter;