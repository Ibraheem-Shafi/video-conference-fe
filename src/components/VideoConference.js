import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import SimplePeer from 'simple-peer';
import Header from './sub-components/Header'

import './users/styles/VideoConference.css'

const VideoConference = () => {
  const [localStream, setLocalStream] = useState(null);
  const [socket, setSocket] = useState(null);
  const [peers, setPeers] = useState([]);
  const localVideo = React.createRef();
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);

  const peersRef = useRef([]); // Use useRef to manage peer references
  const videoRefs = useRef([]);

  const navigate = useNavigate();

  const sendAudioVideoStatus = (isAudioMuted, isVideoOff) => {
    socket.emit('audioVideoStatus', { isAudioMuted, isVideoOff });
  };

  useEffect(() => {
    // Function to initialize the media stream
    const initializeMediaStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        console.log('Media stream initialized successfully:', stream);
        // Additional log to check video tracks
      const videoTracks = stream.getVideoTracks();
      console.log('Video tracks:', videoTracks);

      setLocalStream(stream);
      } catch (error) {
        console.log('Error accessing media devices:', error);
      }
    };

    // Initialize the media stream
    initializeMediaStream();

    // Initialize the socket connection
    const socket = io('https://video-conference-be.onrender.com');
    setSocket(socket);

    // Clean up the media stream and socket connection on component unmount
    return () => {
      if (localStream) {
        localStream.getTracks().forEach((track) => track.stop());
      }
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (!socket || !localStream) return;
  
    // Function to create a new peer
    const createPeer = (initiator, socketId) => {
      const peer = new SimplePeer({
        initiator, // true if the initiating peer, false otherwise
        trickle: false,
        stream: localStream,
      });
  
      peer.on('signal', (data) => {
        // Send signaling data to other device
        socket.emit('signal', { to: socketId, signalData: data });
      });
  
      peer.on('stream', (stream) => {
        // Add the stream to the video element
        const peerRef = { socketId, peer, ref: React.createRef() };
        peersRef.current.push(peerRef);
        setPeers((prevPeers) => [...prevPeers, peerRef]);
  
        const index = peersRef.current.length - 1;
        if (videoRefs.current[index]) {
          videoRefs.current[index].srcObject = stream;
        }
      });
  
      peer.on('close', () => {
        setPeers((prevPeers) => prevPeers.filter((peer) => peer.socketId !== socketId));
        const peerRef = peersRef.current.find((ref) => ref.socketId === socketId);
        if (peerRef) peersRef.current.splice(peersRef.current.indexOf(peerRef), 1);
      });
  
      return peer;
    };
  
    socket.on('user-connected', (socketId) => {
      const peer = createPeer(true, socketId);
      peersRef.current.push({ socketId, peer });
    });
  
    socket.on('signal', (data) => {
      const peerObj = peersRef.current.find((p) => p.socketId === data.from);
      if (peerObj) {
        peerObj.peer.signal(data.signalData);
      } else {
        const peer = createPeer(false, data.from);
        peersRef.current.push({ socketId: data.from, peer });
        peer.signal(data.signalData);
      }
    });
  
    socket.on('user-disconnected', (socketId) => {
      setPeers((prevPeers) => prevPeers.filter((peer) => peer.socketId !== socketId));
      const peerRef = peersRef.current.find((ref) => ref.socketId === socketId);
      if (peerRef) peersRef.current.splice(peersRef.current.indexOf(peerRef), 1);
    });  
  
    socket.on('audioVideoStatus', ({ socketId, isAudioMuted, isVideoOff }) => {
      const peerRef = peersRef.current.find((ref) => ref.socketId === socketId);
      if (peerRef) {
        const { peer } = peerRef;
        if (peer) {
          // Mute or unmute the audio of the peer's stream
          peer.setStream((stream) => {
            stream.getAudioTracks().forEach((track) => {
              track.enabled = !isAudioMuted;
            });
            return stream;
          });

          // Enable or disable the video of the peer's stream
          peer.setStream((stream) => {
            stream.getVideoTracks().forEach((track) => {
              track.enabled = !isVideoOff;
            });
            return stream;
          });
        }
      }
    });

  }, [socket, localStream]);

  useEffect(() => {
    // Let's update the srcObject only after the ref has been set
    // and then every time the stream prop updates
    if (localVideo.current) localVideo.current.srcObject = localStream;
  }, [localStream, localVideo]);

  const handleToggleAudio = () => {
    if (localStream) {
      const isAudioMuted = !localStream.getAudioTracks()[0].enabled;
      localStream.getAudioTracks().forEach((track) => {
        track.enabled = isAudioMuted;
      });
      setIsAudioMuted(isAudioMuted);

      // Inform other participants about the audio status change
      sendAudioVideoStatus(isAudioMuted, isVideoOff);
    }
  };

  const handleToggleVideo = () => {
    if (localStream) {
      const isVideoOff = !localStream.getVideoTracks()[0].enabled;
      localStream.getVideoTracks().forEach((track) => {
        track.enabled = isVideoOff;
      });
      setIsVideoOff(isVideoOff);

      // Inform other participants about the video status change
      sendAudioVideoStatus(isAudioMuted, isVideoOff);
    }
  };

const handleLeaveConference = () => {
      // Stop all media tracks in the local stream
      if (localStream) {
        localStream.getTracks().forEach((track) => track.stop());
      }
  
      // Disconnect from the socket server
      if (socket) {
        socket.disconnect();
      }
  
      // Navigate back to the home page (or any other desired route)
      navigate('/'); // Replace '/' with the desired route
    
  };


  return (
    <div className='VideoConference'>

        <Header />

        {/* Display local video stream */}
      {localStream ? (
        <div className='local-stream'>
          <video ref={localVideo} autoPlay playsInline />
          
        </div>
      ) : (
        <p>Loading local video...</p>
      )}

      {/* Display video streams of remote participants */}
      <div className='other-person'>
      {peers.map((peer, index) => (
            <video key={index} ref={(video) => (videoRefs.current[index] = video)} autoPlay playsInline />
          
      ))}
      </div>

          {/* <div className='other-person'><img src='/muhammad.jpg'/></div> */}

          <div className='local-bar'>
            <div onClick={handleToggleAudio} className='local-bar-icon icon1'>
              {isAudioMuted ? <i class="fa-solid fa-microphone-slash"></i> : <i class="fa-solid fa-microphone"></i>}
            </div>
            <div onClick={handleToggleVideo} className='local-bar-icon icon2'>
              {isVideoOff ? <i class="fa-solid fa-video-slash"></i> : <i class="fa-solid fa-video"></i>}
            </div>
            <div onClick={handleLeaveConference} className='local-bar-icon icon3'><i class="fa-solid fa-right-from-bracket"></i></div>
          </div>
      
    </div>
  );
};

export default VideoConference;