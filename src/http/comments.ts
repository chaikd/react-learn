import alova from '@/http/alova'
import _ from 'lodash'
import { useEffect, useState } from 'react'

export function getComments() {
  return alova.Get('/dataBase/commentData.json').send()
}

export function useComments() {
  let [comments, setComments] = useState([])
  async function getCommentData() {
    let info: any = await getComments()
    info = _.orderBy(info, 'create_time', 'desc')
    setComments(info)
  }
  useEffect(() => {
    getCommentData()
  }, [])
  return {
    comments,
    setComments
  }
}