import { useDispatch, useSelector } from 'react-redux'
import './HomePage.css'
import { useEffect } from 'react'
import { getAllVideosThunk } from '../../store/videos'
import HomeSingleVid from '../UI/HomeSingleVid'




const HomePage = () => {
    const dispatch = useDispatch()
    const allVids = useSelector(state => state.videos.allVideos)
    const vids = Object.values(allVids)
    console.log("vidssss", vids)

    useEffect(() => {
        dispatch(getAllVideosThunk())
    }, [dispatch])
    return (
        <>
        <div className='home-wrapper'>
            <div className='home-wrapper-inner'>
                {vids.map((vid) => {
                    return <HomeSingleVid vid={vid} />
                })}
            </div>
        </div>
        </>

    )
}

export default HomePage
