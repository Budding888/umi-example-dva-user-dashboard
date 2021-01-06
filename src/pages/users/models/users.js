import * as usersService from '../services/users';



/*数据模型  所有的数据交互逻辑都写在这里*/
export default {
  namespace: 'users',
  state: {
    list: [],
    total: null,
    page: null,
  },

  /*更新数据，Action 处理器，处理同步动作，用来算出最新的 State*/
  reducers: {
    save(state, { payload: { data: list, total, page } }) {
      return { ...state, list, total, page };
    },
  },

  /*请求数据，Action 处理器，处理异步动作 */
  effects: {
    // 获取数据  使用call发起请求，调用service中的数据接口
    *fetch({ payload: { page = 1 } }, { call, put }) {
      const { data, headers } = yield call(usersService.fetch, { page });
      yield put({
        type: 'save',
        payload: {
          data,
          total: parseInt(headers['x-total-count'], 10),
          page: parseInt(page, 10),
        },
      });
    },

    // 删除数据
    *remove({ payload: id }, { call, put, select }) {
      yield call(usersService.remove, id);
      const page = yield select(state => state.users.page);
      yield put({ type: 'fetch', payload: { page } });
    },

    // 数据
    *patch({ payload: { id, values } }, { call, put, select }) {
      yield call(usersService.patch, id, values);
      const page = yield select(state => state.users.page);
      yield put({ type: 'fetch', payload: { page } });
    },

    // 创建数据
    *create({ payload: values }, { call, put, select }) {
      yield call(usersService.create, values);
      const page = yield select(state => state.users.page);
      yield put({ type: 'fetch', payload: { page } });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/users') {
          dispatch({ type: 'fetch', payload: query });
        }
      });
    },
  },
};
