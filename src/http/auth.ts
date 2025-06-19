import alova from '@/http/alova'

export function getUserInfo() {
  return alova.Get('/dataBase/userInfo.json').send()
}