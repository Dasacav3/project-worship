const Viewer = (url?: string, message?: string) => {
  return (
    <>
      <div className='viewer'>
        <video className='video' src={url} autoPlay loop muted />
        <div>
          <p className='viewerContent'>{message}</p>
        </div>
      </div>
    </>
  );
};

export default Viewer;
