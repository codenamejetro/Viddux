import './VidInPlaylist.css'
import { formatDate } from '../../HelperFuncs/formatDate'


const VidInPlaylist = ({ vid }) => {
    console.log(vid)

    if (!vid.user) return null
    return (
        <>
            <div className='vidinplaylist-outercontainer'>
                <div className='vidinplaylist-innercontainer'>
                    <div className='vidinplaylist-previewimg'>
                    </div>
                    <div className='vidinplaylist-details'>
                        <div className='vidinplaylist-title'>{vid.name}</div>
                        <div className='vidinplaylist-bottom'>
                            <div className='vidinplaylist-creator'>{vid.user.username}</div>
                            <div className='vidinplaylist-date'>{formatDate(vid.created_at)}</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default VidInPlaylist
