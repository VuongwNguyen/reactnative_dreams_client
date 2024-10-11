const VX = 60 //1p
const P = 60 * VX //1h
const H = 24 * P //1d
const D = 7 * H //1w
// const W = 7 * D

const dv = [
  'p',
  'h',
  'ngày'
]
const dx = [P, H, D]
const convertTimePost = (time) => {
  time = new Date(time);
  const currentTime = new Date();
  const result = (currentTime - time)/1000
  if (result > D) {
    return time.getDate() + ' th ' + (time.getMonth() + 1)
  }
  if (result < VX) {
    return 'vừa xong'
  }
  for (let index = 0; index < dx.length; index++) {
    if (result < dx[index]) {      
      return Math.floor(result / dx[index - 1]) + ' ' + dv[index]
    }
  }
};

export default convertTimePost;