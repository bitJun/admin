import request from '@/utils/request';

/**
 * 获取用户信息
 * @param params 
 * @returns 
 */
export async function queryUserInfo(params?: any) {
  return request('/api/userinfo', {
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
  return request('/api/login', {
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
  return request('/api/portal/new-user-stats', {
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
  return request('/api/portal/miniprogram-stats', {
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
  return request('/api/portal/basic-info', {
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
  return request('/api/api/notices', {
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
  return request('/api/api/notices', {
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
  return request(`/api/api/notices/${params.id}`, {
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
  return request(`/api/api/notices/${data.id}`, {
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
  return request('/api/admin/cards/page', {
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
  return request('/api/admin/cards/generate', {
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
  return request(`/api/admin/cards/numbers`, {
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
  return request(`/api/api/dict/${params.key}`, {
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
  return request('/api/api/articles', {
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
  return request('/api/api/articles/query', {
    method: 'POST',
    data,
  })
}

/**
 * 创建或更新会员卡价格
 * @param data 
 * @returns 
 */
export async function postMembershipCards(data: any) {
  return request('/api/api/membership-cards', {
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
  return request(`/api/api/membership-cards`, {
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
  return request('/api/api/events', {
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
  return request(`/api/api/events/${data.id}`, {
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
  return request(`/api/api/events/${params.id}`, {
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
  return request(`/api/api/events`, {
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
  return request(`/api/api/events/${data.id}`, {
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
  return request(`/api/api/events/page`, {
    method: 'GET',
    params,
  })
}

export async function queryFinanceList(data: any) {
  return request('/api/api/order/select', {
    method: 'POST',
    data,
  })
}

//查询当前所有商品
export async function queryProductList(params?: any) {
  return request(`/api/api/product/now_product`, {
    method: 'GET',
    params,
  })
}


//修改会员卡价格
export async function updatePorduct(data: any) {
  return request('/api/api/product/update_product', {
    method: 'POST',
    data,
  })
}

//修改会员卡价格
export async function updateInfoByVipLevel(data: any) {
  return request('/api/admin/vip/infoByVipLevel', {
    method: 'POST',
    data,
  })
}

//删除文章
export async function delArticles(params?: any) {
  return request(`/api/api/articles/delete`, {
    method: 'GET',
    params,
  })
}

//查询文章领域
export async function queryArticlesFields(params?: any) {
  return request(`/api/api/articles/fields`, {
    method: 'GET',
    params,
  })
}

//查看文章详情
export async function queryArticlesById(id?: any) {
  return request(`/api/api/articles/${id}`, {
    method: 'GET',
  })
}

//查询所有标签
export async function queryArticlesTags(params?: any) {
  return request(`/api/api/articles/tags`, {
    method: 'GET',
    params,
  })
}

//修改文章
export async function updateArticles(data: any) {
  return request('/api/api/articles/edit', {
    method: 'POST',
    data,
  })
}

//新增文章
export async function addArticles(data: any) {
  return request('/api/api/articles', {
    method: 'POST',
    data,
  })
}

//分页查询文章
export async function queryArticlesList(data: any) {
  return request('/api/api/articles/query', {
    method: 'POST',
    data,
  })
}

//分页查询文章
export async function queryUserList(data: any) {
  return request('/api/api/wechatUser/search', {
    method: 'POST',
    data,
  })
}

//查看文章详情
export async function queryOperations() {
  return request(`/api/api/operations/show`, {
    method: 'GET',
  })
}

//查看文章详情
export async function queryOperationsMonth() {
  return request(`/api/api/operations/month_visitors`, {
    method: 'GET',
  })
}

//查看文章详情
export async function queryOperationsYear() {
  return request(`/api/api/operations/year_visitors`, {
    method: 'GET',
  })
}

//查看文章详情
export async function queryOperationsMonthRegisters() {
  return request(`/api/api/operations/month_registers`, {
    method: 'GET',
  })
}

//查看文章详情
export async function queryOperationsYearRegisters() {
  return request(`/api/api/operations/year_registers`, {
    method: 'GET',
  })
}

//查看文章详情
export async function queryOperationsMonthVips() {
  return request(`/api/api/operations/month_vips`, {
    method: 'GET',
  })
}

//查看文章详情
export async function queryOperationsYearVips() {
  return request(`/api/api/operations/year_vips`, {
    method: 'GET',
  })
}

//查看文章详情
export async function queryOperationsMonthIncome() {
  return request(`/api/api/operations/month_income`, {
    method: 'GET',
  })
}

//查看文章详情
export async function queryOperationsYearIncome() {
  return request(`/api/api/operations/year_income`, {
    method: 'GET',
  })
}

//分页查询文章
export async function queryCardList(data: any) {
  return request('/api/admin/cards/cardList', {
    method: 'POST',
    data,
  })
}

//分页查询文章
export async function queryCardOrder(data: any) {
  return request('/api/admin/cards/order', {
    method: 'POST',
    data,
  })
}

//分页查询文章
export async function queryCardGenerate(data: any) {
  return request('/api/admin/cards/generate', {
    method: 'POST',
    data,
  })
}

//查看文章详情
export async function queryCardDownLoad() {
  return request(`/api/admin/cards/download`, {
    method: 'GET',
  })
}

//查看文章详情
export async function queryCardSituation() {
  return request(`/api/admin/cards/cardSituation`, {
    method: 'GET',
  })
}

//查看文章详情
export async function queryVipInfo() {
  return request(`/api/admin/vip/info`, {
    method: 'GET',
  })
}

