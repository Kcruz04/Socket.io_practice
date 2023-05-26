import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'
import {TextField, Button} from '@mui/material'

const PORT = process.env.PORT

const Chat = () => {
    const [approve, setApprove] = useState(false);
    const [username, setUsername] = useState("");
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);

    const [socket] = useState(() => io(`${PORT}`))

    useEffect(() => {
        console.log('useEffect is running')
        socket.on('Post chat', (msg) => {setMessages(prevMsg => [...prevMsg, msg])})
        return () => socket.removeAllListeners()
    }, [socket])

    const userNameHandler = (e) => {
        e.preventDefault()
        if (username) {
            setApprove(true)
        }
    }

    const submitHandler = (e) => {
        e.preventDefault()
        socket.emit('chat', {username: username, content: input})
        setInput("")
    }

    const renderChat = () => {
        return messages.map(( msg, i) => (<p key={i}>{msg.username} - {msg.content}</p>))
    }

    return (
        <div >
            <h1>Chat App</h1>
            {
                !approve ?
                    <div className='card'>
                        <div className='name-field'>
                            <form onSubmit={userNameHandler}>
                                <TextField type='text' className='form-control' value={username} onChange={e => setUsername (e.target.value)} label ='Enter Username' />
                                <br />
                                <button variant="outlined">Enter</button>
                            </form>
                        </div>
                    </div>
                    :
                    <div className='card'>
                        <form onSubmit={submitHandler}>
                            <TextField type='text' name='msg' onChange={(e) => setInput(e.target.value)} value={input} className='form-control'/>
                            <Button variant="outlined">Enter</Button>
                        </form>
                        <div className='render-chat' >
                            <h1>Messages</h1>
                            {renderChat()}
                        </div>
                    </div>
            }
        </div>
    )
}

export default Chat