import { Alert, message, Spin, Tooltip } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { CloseOutlined, LoadingOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import MicroPhone from '../../assets/images/micro-phone.png'
import MicroPhone2 from '../../assets/images/microphone_2.png'
import MuteMicro from '../../assets/images/mute-micro.png'
import AudioWaves from '../../assets/images/audio-waves.png'
import axiosClient from '../../api/axiosClient'
import getInfoSearchFromChatbot from '../../utils/chatbot/getInfoSearchFromChatbot'
import { paths } from '../../utils/pathsRoutes'
import { LIMIT } from '../../constants'

const VoiceSearch = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [messageApi, contextHolder] = message.useMessage()
    const [isOpen, setIsOpen] = useState(false)
    const [transcript, setTranscript] = useState('')
    const [isListening, setIsListening] = useState(false)
    const [error, setError] = useState()
    const [responseBot, setResponseBot] = useState()
    const recognitionRef = useRef()
    const mediaRecorderRef = useRef(null)
    const userAudioChunks = useRef([])
    const [historyConversation, setHistoryConversation] = useState([])
    const [isNavigate, setIsNavigate] = useState(false)

    const handleOpenVoiceSearch = () => {
        setIsOpen(true)
    }

    const handleCloseVoiceSearch = () => {
        setIsOpen(false)
    }

    // nghe và phân tích giọng nói
    useEffect(() => {
        const SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition
        if (!SpeechRecognition) {
            setError('Trình duyệt không hỗ trợ Web Speech API')
        }

        recognitionRef.current = new SpeechRecognition()
        const recognition = recognitionRef.current
        recognition.interimResults = true
        recognition.lang = 'vi-VN'
        recognition.continuous = true

        if ('webkitSpeechGrammarList' in window) {
            const grammar =
                '#JSGF V1.0; grammar punctuation; public <punc> = . | , | ? | ! | ; | : ;'
            const speechRecognitionlist = new window.webkitSpeechGrammarList()
            speechRecognitionlist.addFromString(grammar, 1)
            recognition.grammars = speechRecognitionlist
        }

        recognition.onresult = (event) => {
            let text = ''
            for (let i = 0; i < event.results.length; i++) {
                text += event.results[i][0].transcript
            }
            setTranscript(text)
        }

        recognition.onerror = (event) => {
            console.error(event.error)
        }

        recognition.onend = () => {
            setIsListening(false)
            setTranscript()
        }

        navigator.mediaDevices
            .getUserMedia({ audio: true })
            .then((stream) => {
                mediaRecorderRef.current = new MediaRecorder(stream)
                mediaRecorderRef.current.ondataavailable = (event) => {
                    userAudioChunks.current.push(event.data)
                }
                mediaRecorderRef.current.onstop = () => {
                    const userAudioBlob = new Blob(userAudioChunks.current, {
                        type: 'audio/wav',
                    })
                    userAudioChunks.current = []
                    const audioURL = URL.createObjectURL(userAudioBlob)
                    setHistoryConversation((prev) => [
                        ...prev,
                        { sender: 'user', audioURL },
                    ])
                }
            })
            .catch((err) => setError('Lỗi truy cập microphone'))

        return () => {
            recognition.stop()
            if (mediaRecorderRef.current)
                mediaRecorderRef.current.stream
                    .getTracks()
                    .forEach((track) => track.stop())
        }
    }, [])

    const startListening = () => {
        if (recognitionRef.current && !isListening) {
            recognitionRef.current.start()
            if (
                mediaRecorderRef.current &&
                mediaRecorderRef.current.state !== 'recording'
            ) {
                mediaRecorderRef.current.start()
            }
            setIsListening(true)
        }
    }

    const stopListening = () => {
        if (recognitionRef.current && isListening) {
            recognitionRef.current.stop()
            if (
                mediaRecorderRef.current &&
                mediaRecorderRef.current.state === 'recording'
            ) {
                mediaRecorderRef.current.stop()
            }
            setIsListening(false)
        }
    }

    const stopVoiceInput = async () => {
        stopListening()

        const synthesizeVoice = async (text) => {
            try {
                const response = await axiosClient.post(
                    '/tenant/voice-search/synthesize',
                    { text },
                    { responseType: 'blob' },
                )
                return URL.createObjectURL(response.data)
            } catch (error) {
                messageApi.open({
                    type: 'error',
                    content: error.message,
                })
            }
        }

        if (!transcript?.trim()) {
            const audioURL = await synthesizeVoice(
                'Tôi chưa nghe rõ câu nói của bạn hoặc có thể có một chút trục trặc. Mời bạn thử nói lại',
            )
            setHistoryConversation((prev) => [
                ...prev,
                { sender: 'bot', audioURL },
            ])
        } else {
            try {
                const responseData = await axiosClient.post(
                    '/chatbot/webhook',
                    {
                        text: transcript,
                    },
                )
                setResponseBot(responseData.data[0].queryResult)

                const audioURL = await synthesizeVoice(
                    responseData.data[0].queryResult.fulfillmentText,
                )
                setHistoryConversation((prev) => [
                    ...prev,
                    { sender: 'bot', audioURL },
                ])
            } catch (error) {
                messageApi.open({
                    type: 'error',
                    content: error.message,
                })
            }
        }
    }

    // khi đến intent cuối cùng (kết thúc cuộc trò chuyện)
    useEffect(() => {
        const fetchData = async () => {
            const regexCheck = /session-vars$/

            if (regexCheck.test(responseBot?.outputContexts[0]?.name)) {
                setIsNavigate(true)
                try {
                    const {
                        address_name,
                        lon,
                        lat,
                        amentities,
                        numberPeopleInRoom,
                        radius,
                        roomPrice,
                    } = await getInfoSearchFromChatbot(dispatch, responseBot)

                    let pathToResult = `${paths.tenant.searchResult}?address_name=${address_name}
                            &lat=${lat}&lon=${lon}
                            &capacity=${numberPeopleInRoom}
                            &roomPrice=${roomPrice}
                            &page=1&limit=${LIMIT}`

                    if (amentities) {
                        pathToResult += `&amentities=${amentities}`
                    }
                    if (radius) {
                        pathToResult += `&radius=${radius}`
                    }

                    const timer = setTimeout(() => {
                        navigate(pathToResult)
                        setIsNavigate(false)
                    }, 2000)

                    return () => clearTimeout(timer)
                } catch (error) {
                    console.error('Error during search room handling:', error)
                }
            }
        }

        fetchData()
    }, [responseBot, dispatch, navigate])

    return (
        <>
            <Tooltip title='Tìm kiếm bằng giọng nói ở đây' defaultOpen>
                <div
                    className='flex items-center justify-center h-8 w-8 rounded-full bg-red-400 cursor-pointer'
                    onClick={handleOpenVoiceSearch}
                >
                    <img
                        src={MicroPhone}
                        alt='micro phone'
                        className='h-6 w-6'
                    />
                </div>
            </Tooltip>

            {isOpen && (
                <div className='fixed top-0 left-0 h-full w-full flex items-center justify-center bg-opacity-55 bg-black z-30'>
                    <CloseOutlined
                        className='absolute top-10 right-10 text-2xl font-bold text-white cursor-pointer'
                        onClick={handleCloseVoiceSearch}
                    />

                    <div className='flex items-center justify-start bg-white rounded-md h-[500px] w-[900px] p-5'>
                        {isNavigate ? (
                            <div className='flex flex-col items-center h-full w-full'>
                                <Spin
                                    indicator={<LoadingOutlined spin />}
                                    size='large'
                                />
                                <span>
                                    Đang chuyển hướng đến trang kết quả...
                                </span>
                            </div>
                        ) : (
                            <>
                                <div className='relative flex flex-1 flex-col items-center justify-start h-full w-full'>
                                    <h1 className='text-lg italic font-medium text-center'>
                                        Tìm kiếm bằng giọng nói
                                    </h1>

                                    <div className='absolute top-1/2 -translate-y-1/2 flex flex-col items-center'>
                                        {isListening ? (
                                            <>
                                                <div className='flex items-center justify-center gap-5 bg-yellow-400 p-3 rounded-full z-50 h-[100px] w-[100px] cursor-pointer'>
                                                    <img
                                                        src={MuteMicro}
                                                        alt='mute micro phone'
                                                        className='h-full w-full'
                                                        onClick={stopVoiceInput}
                                                    />
                                                </div>
                                                <img
                                                    src={AudioWaves}
                                                    alt='audio wave'
                                                    className='h-[100px] w-[100px]'
                                                />
                                            </>
                                        ) : (
                                            <div
                                                className='bg-yellow-400 p-3 rounded-full z-50 h-[100px] w-[100px] cursor-pointer'
                                                onClick={startListening}
                                            >
                                                <img
                                                    src={MicroPhone2}
                                                    alt='micro phone'
                                                    className='h-full w-full'
                                                />
                                            </div>
                                        )}
                                        {transcript && (
                                            <p className='w-[300px] text-wrap text-center mt-4'>
                                                {transcript}
                                            </p>
                                            // ) : (
                                            //     <p className='w-[300px] text-wrap text-center mt-4'>
                                            //         Nhấp vào biểu tượng micro và nói địa điểm
                                            //         bạn muốn tìm phòng trọ
                                            //     </p>
                                        )}
                                    </div>
                                </div>

                                {historyConversation.length > 0 && (
                                    <div className='flex flex-col items-start h-full flex-1'>
                                        <h1 className='text-lg italic font-medium text-center'>
                                            Lịch sử phiên tìm kiếm
                                        </h1>
                                        <div className='flex flex-col max-h-[350px] mt-5 overflow-y-scroll gap-3 w-full'>
                                            {historyConversation.map(
                                                (item, index) =>
                                                    item.sender === 'user' ? (
                                                        <div key={index}>
                                                            <span>user</span>
                                                            <audio
                                                                controls
                                                                src={
                                                                    item.audioURL
                                                                }
                                                            ></audio>
                                                        </div>
                                                    ) : (
                                                        <div key={index}>
                                                            <span>system</span>
                                                            <audio
                                                                controls
                                                                src={
                                                                    item.audioURL
                                                                }
                                                            ></audio>
                                                        </div>
                                                    ),
                                            )}
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            )}

            {error && (
                <Alert
                    message='Lỗi'
                    description={error}
                    type='error'
                    showIcon
                />
            )}

            {contextHolder}
        </>
    )
}

export default VoiceSearch
