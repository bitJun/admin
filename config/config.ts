import { defineConfig } from 'umi';
import proxyConfig from './proxy';

const ENV = process.env.REACT_APP_ENV || 'dev';

export default defineConfig({
  proxy: proxyConfig[ENV],
  // 其他配置
});