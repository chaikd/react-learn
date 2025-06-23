import alova from '@/http/alova'

export function getUserInfo() {
  return alova.Get('/dataBase/userInfo.json').send()
}

export function login() {
  return Promise.resolve({
    token: 'we3r33qwqe8u243r5ghhtkkjefnqoifjvndsfvipw84q348thwefnjgsd'
  })
}