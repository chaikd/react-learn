import * as React from 'react';
import {createContext, Ref, useCallback, useContext, useEffect, useRef, useState} from 'react'
import { getComments, useComments } from '@/http/comments';
import './index.scss'
import avatar from '@/assets/react.svg'
import * as _ from 'lodash'
import dayjs from 'dayjs'
import { useDispatch, useSelector } from 'react-redux';
import { selectUserInfo, asyncUserInfo } from '@/store/modules/authSlice';

const CommentsContext = createContext(null)

function Tab() {
  const {comments, setComments} = useContext(CommentsContext)
  const tabs = [
    {type: 'new', label: '最新'},
    {type: 'hot', label: '最热'}
  ]
  const [currentLabel, setCurrentLabel] = useState('new')
  function switchCurrentLabel(type) {
    setCurrentLabel(type)
    if(type === 'hot') {
      setComments(_.orderBy(comments, 'like_count', 'desc'))
    } else {
      setComments(_.orderBy(comments, 'create_time', 'desc'))
    }
  }
  return (
    <div className="flex mb-5">
      <div className="left mr-4">
        <span className="font-600">评论</span>
        <span>({comments.length})</span>
      </div>
      <div className="right">
        {
          tabs.map(v => <span className={`mr-2 ${currentLabel === v.type && 'text-blue-400'}`} key={v.type} onClick={() => switchCurrentLabel(v.type)}>{v.label}</span>)
        }
      </div>
    </div>
  )
}

function CommentInput() {
  let {comments, setComments} = useContext(CommentsContext)
  let [msg, setMsg] = useState('')
  let refInput = useRef(null)
  let isSending = false
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch<any>(asyncUserInfo())
  }, [])
  const userInfo = useSelector(selectUserInfo)
  function sendMsg() {
    if (isSending) return
    setComments([
      ...comments,
      {
        "post_id": new Date().getTime(),
        // "title": "分享最新科技产品体验",
        "content": msg,
        "author": userInfo.full_name,
        "create_time": dayjs().format('YYYY-MM-DD HH:mm:ss'),
        "like_count": 0,
        "comments": []
      }
    ])
    setMsg('')
    refInput.current.focus()
    isSending = false
  }
  return (
    <div className="flex">
      <img className="avatar rounded-full border border-gray-400 mr-2" src={avatar} alt="" />
      <input value={msg} onChange={(e) => setMsg(e.target.value)} className="flex-1 border rounded border-gray-500 mr-2" placeholder='请输入评论内容' name="" id="" ref={refInput}></input>
      <button onClick={sendMsg}>发送</button>
    </div>
  )
}

function CommentItem({comment}) {
  return (
    <>
      <div className="comment-item border-b border-gray-500 p-2">
        <div className="name">
          {comment.author || comment.username}
        </div>
        <div className="content font-semibold">
          {comment.content}
        </div>
        <div className="comment-info">
          <span className="mr-2">{comment.create_time}</span>
          <span className="mr-2">点赞{comment.like_count}</span>
        </div>
      </div>
    </>
  )
}

function CommentListTpl({comment}) {
  const [isShowComment, setIsShowComment] = useState(false)
  return (
    <>
      <CommentItem comment={comment}></CommentItem>
      {comment.comments?.length > 0 && 
        (<div className="comment-comment ml-5">
          <span className="mr-5">回复({comment.comments.length})</span>
          <span className="cursor-pointer" onClick={() => setIsShowComment(!isShowComment)}>{isShowComment ? '收起' : '展开'}</span>
          {
            isShowComment && comment.comments.map(item => (
              <React.Fragment key={item.comment_id}>
                <CommentItem comment={item}></CommentItem>
                {
                  item.replies?.length > 0 && (
                    <div className="ml-5">
                      {item.replies.map(v => (
                        <CommentItem comment={v} key={v.reply_id}></CommentItem>
                        // {
                        //   v.user_id === 
                        // }
                      ))}
                    </div>
                  )
                }
              </React.Fragment>
            ))
          }
        </div>)}
    </>
  )
}

function CommentList() {
  const {comments, setComments} = useComments()
  return (<CommentsContext.Provider value={{comments, setComments}}>
    <Tab></Tab>
    <CommentInput></CommentInput>
    <div className="comment-list">
      {comments.map(v => {
        return <CommentListTpl comment={v} key={v.post_id}></CommentListTpl>
      })}
    </div>
  </CommentsContext.Provider>
  )
}
export default CommentList