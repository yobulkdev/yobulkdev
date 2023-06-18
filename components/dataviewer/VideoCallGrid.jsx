import { useEffect, useRef, useState } from 'react';
import { UserIcon, VideoCameraIcon, VideoCameraSlashIcon } from '@heroicons/react/24/solid';
import { io } from 'socket.io-client';

const VideoCallGrid = ({ roomId }) => {
  const [joinedCall, setJoinedCall] = useState(false);
  const [userName, setUserName] = useState();
  const socketRef = useRef(null)
  const [members, setMembers] = useState([])


  const handleUserConnect = ({ userId, signal }) => {
    const alreadyPresentUser = members.find((e) => e.userId == userId)
    if (alreadyPresentUser) {
      // handle this

    } else {
      socketRef.current.emit('offer-signal', { toUserId: userId, fromUserName: userName, signal })
      socketRef.on('answer-signal', ({ fromUserId, fromUserName, signal }) => {
        setMembers((prev) => {
          const alreadyPresentUser = members.find((e) => e.userId == userId)
          if (!alreadyPresentUser) prev.push({
            userId: fromUserId,
            userName: fromUserName
          })
          return prev
        })
      })
    }
  }

  const handleOfferSignal = ({fromUserId, fromUserName, signal }) => {
    const alreadyPresentUser = members.find((e) => e.userId == fromUserId)
    if (alreadyPresentUser) {
      // handle this

    } else {
      setMembers((prev) => {
        const alreadyPresentUser = members.find((e) => e.userId == fromUserId)
        if (!alreadyPresentUser) prev.push({
          userId: fromUserId,
          userName: fromUserName
        })
        return prev
      })
      socketRef.current.emit('answer-signal', { toUserId: fromUserId, fromUserName: userName, signal })
    }
  }

  const joinCall = () => {
    if (!socketRef.current?.connected) return
    navigator.mediaDevices.getUserMedia({ audio, video }).then(stream => {
      socketRef.current.emit('join-call', roomId)
      socketRef.current.on('user-connected', handleUserConnect)
      socketRef.current.on('offer-signal', handleOfferSignal)
    })
    setJoinedCall(true)
  }

  useEffect(() => {
    fetch('/api/socket').then(() => socketRef.current = io())
  }, [])


  return (
    <div className='border'>
      <div className='flex gap-8 m-2'>
        <div className='w-3/4'>
          <div className="flex justify-between items-center p-4">
            <span className='font-semibold text-lg text-gray-600'>Video Collaboration</span>
            <div className='flex justify-flex-end items-center'>
              <label for='user-name' className='text-sm text-gray-500 mr-2 font-bold'>Username:</label>
              <input type="text" id="user-name"
                className="h-8 w-60 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="John"
                required
                onChange={(e) => setUserName(e.target.value)} />
              {joinedCall ? (<button
                onClick={joinCall}
                className="flex items-center bg-transparent h-8 px-2 py-1 m-2 text-sm hover:bg-blue-500 text-blue-700 font-semibold hover:text-white border border-blue-500 hover:border-transparent rounded mr-3"
              >
                <VideoCameraSlashIcon className="w-5 mr-1" />
                Hang Up
              </button>) :
                (<button
                  onClick={() => setJoinedCall(true)}
                  disabled={!userName}
                  className={`flex items-center bg-transparent h-8 px-2 py-1 m-2 text-sm ${userName ? 'hover:bg-blue-500' : 'hover:bg-blue-100'} text-blue-700 font-semibold hover:text-white border border-blue-500 hover:border-transparent rounded mr-3`}
                >
                  <VideoCameraIcon className="w-5 mr-1" />
                  Join Video Call
                </button>)}
            </div>
          </div>
          <div className=" flex justify-center h-60 items-center p-4 gap-2 border rounded-lg bg-gray-50">
            {joinedCall ?
              <>
                <div className='flex flex-col items-center'>
                  <div className="relative w-100 h-70 overflow-hidden">
                    <video className="w-full h-full object-cover" src="video1.mp4" controls />
                  </div>
                  <span className='text-gray-600'>{userName}</span>
                </div>
                {members.map(e => (
                  <div className='flex flex-col items-center'>
                    <div className="relative w-100 h-70 overflow-hidden">
                      <video className="w-full h-full object-cover" src="video1.mp4" controls />
                    </div>
                    <span className='text-gray-600'>{e.name}</span>
                  </div>
                ))}</> : (
                <div className='h-70 flex justify-center items-center gap-4'>
                  <VideoCameraIcon className='h-8 text-gray-400' />
                  <span className='text-gray-400 text-lg'>Join call to start collabotating with others</span>
                </div>
              )
            }
          </div>
        </div>
        <div className='w-1/4 flex flex-col items-center border rounded-lg bg-gray-50'>
          <div className='m-4'>
            <span className='font-semibold text-lg text-gray-600'>Active Members</span>
          </div>
          <div className='flex flex-col items-center gap-2 mb-2'>
            {members.map(e => (
              <div className="flex items-center gap-4 p-2 w-80 border rounded-lg">
                <UserIcon className='h-4 text-gray-600' />
                <span className='text-gray-600'>{e.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCallGrid;
