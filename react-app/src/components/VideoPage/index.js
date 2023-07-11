import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import './VideoPage.css'
import { useDispatch } from 'react-redux'

const VideoPage = () => {
    const { videoId } = useParams()
    const dispatch = useDispatch()
    const useEffect =

    useEffect(() => {

    }, [dispatch])
    return (
        <>
            <div>
                <div>
                    <video></video>
                </div>
                <div>

                </div>

            </div>
        </>
    )
}

export default VideoPage
