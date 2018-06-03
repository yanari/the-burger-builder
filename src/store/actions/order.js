import axios from '../../axios-orders';

import * as actionTypes from './actionTypes';

// SYNC
export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData
  };
};

export const purchaseBurgerFail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error
  };
};

export const purchaseBurgerStart = () => {
	return {
		type: actionTypes.PURCHASE_BURGER_START
	}
};

// ASYNC
export const purchaseBurger = (orderData) => {
  return dispatch => {
  	dispatch(purchaseBurgerStart());
    axios.post('/orders.json', orderData)
      .then(res => {
        console.log(res.data.name);
        console.log(orderData);
        dispatch(purchaseBurgerSuccess(res.data.name, orderData));
      })
      .catch(err => {
        dispatch(purchaseBurgerFail(err));
      })
  }
};

export const purchaseInit = () => {
	return {
		type: actionTypes.PURCHASE_INIT
	}
};

export const fetchOrdersSuccess = (orders) => {
	return {
		type: actionTypes.FETCH_ORDERS_SUCCESS,
		orders: orders
	}
};

export const fetchOrdersFail = (orders) => {
	return {
		type: actionTypes.FETCH_ORDERS_FAIL,
		orders: orders
	}
};

export const fetchOrdersStart = () => {
	return {
		type: actionTypes.FETCH_ORDERS_START
	}
};

export const fetchOrders = token => {
	return dispatch => {
		dispatch(fetchOrdersStart());
		axios.get('orders.json?auth=' + token).then(res => {
			const fetchedOrders = [];
			for (let key in res.data) {
				fetchedOrders.push({
					...res.data[key],
					id: key
				})
			}
			console.log(fetchedOrders);
			dispatch(fetchOrdersSuccess(fetchedOrders));
		}).catch(err => {
			dispatch(fetchOrdersFail(err));
		})
	}
};