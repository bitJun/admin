import request from '@/utils/request';

/**
 * 获取用户信息
 * @param params 
 * @returns 
 */
export async function queryUserInfo(params?: any) {
  return request('/userinfo', {
    method: 'GET',
    params,
  })
}

/**
 * 登录
 * @param data 
 * @returns 
 */
export async function postLogin(data: any) {
  return request('/login', {
    method: 'POST',
    data,
  })
}

/**
 * 统计新用户注册数据
 * @param data 
 * @returns 
 */
export async function queryNewUserState(params?: any) {
  return request('/portal/new-user-stats', {
    method: 'GET',
    params,
  })
}

/**
 * 统计小程序访问数据
 * @param data 
 * @returns 
 */
export async function queryMiniprogramState(params?: any) {
  return request('/portal/miniprogram-stats', {
    method: 'GET',
    params,
  })
}

/**
 * 查询门户基本信息
 * @param data 
 * @returns 
 */
export async function queryBasicInfo(params?: any) {
  return request('/portal/basic-info', {
    method: 'GET',
    params,
  })
}

/**
 * 分页获取通知列表
 * @param data 
 * @returns 
 */
export async function queryNotices(params?: any) {
  return request('/api/notices', {
    method: 'GET',
    params,
  })
}

/**
 * 创建通知
 * @param data 
 * @returns 
 */
export async function postAddNotices(data: any) {
  return request('/api/notices', {
    method: 'POST',
    data,
  })
}

/**
 * 获取通知详情
 * @param data 
 * @returns 
 */
export async function queryNoticesById(params?: any) {
  return request(`/api/notices/${params.id}`, {
    method: 'GET',
    params,
  })
}

/**
 * 创建通知
 * @param data 
 * @returns 
 */
export async function postDeleteNotices(data: any) {
  return request(`/api/notices/${data.id}`, {
    method: 'DELETE',
    data,
  })
}

/**
 * 分页查询绑定的卡片
 * @param data 
 * @returns 
 */
export async function queryCadrList(data: any) {
  return request('/admin/cards/page', {
    method: 'POST',
    data,
  })
}

/**
 * 批量生成卡号，先生成订单
 * @param data 
 * @returns 
 */
export async function postGenerateCadrs(data: any) {
  return request('/admin/cards/generate', {
    method: 'POST',
    data,
  })
}

/**
 * 获取所有卡号
 * @param data 
 * @returns 
 */
export async function queryCardsNumbers(params?: any) {
  return request(`/admin/cards/numbers`, {
    method: 'GET',
    params,
  })
}

/**
 * 根据 key 获取字典值
 * @param data 
 * @returns 
 */
export async function queryDict(params?: any) {
  return request(`/api/dict/${params.key}`, {
    method: 'GET',
    params,
  })
}

/**
 * 创建文章
 * @param data 
 * @returns 
 */
export async function postAddArticles(data: any) {
  return request('/api/articles', {
    method: 'POST',
    data,
  })
}

/**
 * 分页查询文章
 * @param data 
 * @returns 
 */
export async function queryArticles(data: any) {
  return request('/api/articles/query', {
    method: 'POST',
    data,
  })
}

/**
 * 查看文章详情
 * @param data 
 * @returns 
 */
export async function queryArticlesById(params?: any) {
  return request(`/api/articles/${params.id}`, {
    method: 'GET',
    params,
  })
}

/**
 * 创建或更新会员卡价格
 * @param data 
 * @returns 
 */
export async function postMembershipCards(data: any) {
  return request('/api/membership-cards', {
    method: 'POST',
    data,
  })
}

/**
 * 查询所有会员卡
 * @param data 
 * @returns 
 */
export async function queryMembershipCards(params?: any) {
  return request(`/api/membership-cards`, {
    method: 'GET',
    params,
  })
}

/**
 * 创建活动
 * @param data 
 * @returns 
 */
export async function postAddEvents(data: any) {
  return request('/api/events', {
    method: 'POST',
    data,
  })
}

/**
 * 删除活动
 * @param data 
 * @returns 
 */
export async function postDelEventsById(data: any) {
  return request(`/api/events/${data.id}`, {
    method: 'DELETE',
    data,
  })
}

/**
 * 获取活动详情
 * @param data 
 * @returns 
 */
export async function queryEventsById(params?: any) {
  return request(`/api/events/${params.id}`, {
    method: 'GET',
    params,
  })
}

/**
 * 列出所有活动
 * @param data 
 * @returns 
 */
export async function queryEventsList(params?: any) {
  return request(`/api/events`, {
    method: 'GET',
    params,
  })
}

/**
 * 更新活动
 * @param data 
 * @returns 
 */
export async function putEventsById(data: any) {
  return request(`/api/events/${data.id}`, {
    method: 'PUT',
    data,
  })
}

/**
 * 分页查询活动
 * @param data 
 * @returns 
 */
export async function queryEventsPage(params?: any) {
  return request(`/api/events/page`, {
    method: 'GET',
    params,
  })
}