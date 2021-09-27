function TrackPicker(props) {
  return (
    <div className='TrackPicker'>
      <ul>
        {
          props.selection.map((track) => {
            return (
              <li key={`${track.uri}`} onClick={() => { props.setTrackFunc(track) }}>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a href='#'> {track.name} </a>
              </li>)
          })
        }
      </ul>
    </div>
  )
}

export default TrackPicker