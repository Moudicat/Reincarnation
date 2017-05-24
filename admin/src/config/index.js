/**
 * Created by Moudi on 2017/5/21.
 */

let baseURL = (process.env.NODE_ENV === 'production') ? 'https://say.moe/api' : 'http://localhost:2777/api';

export default {
  baseURL: baseURL
};
