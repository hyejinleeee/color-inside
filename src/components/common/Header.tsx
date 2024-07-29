"use client"
import Image from 'next/image';
import { createClient } from '@/utils/supabase/client';
import { loginZustandStore } from '@/zustand/zustandStore';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { GiSoundOn } from "react-icons/gi";
import { GiSoundOff } from "react-icons/gi";

const Header = () => {
  const [audio] = useState(new Audio('/background-bgm.mp3'));
  const [isPlaying, setIsPlaying] = useState(false);
  const [userStatus, setUserStatus] = useState(false);
  const isLogin = loginZustandStore(state => state.isLogin);
  const setIsLogin = loginZustandStore(state => state.setIsLogin);
  const supabase = createClient();

  useEffect(() => {
    const checkUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      console.log('헤더 로그=>', data.user);
      console.log(isLogin);
      if (data.user == null) {
        setUserStatus(false);
      } else {
        setUserStatus(true);
      }
    }
    checkUser();
  }, [])

  const toggleMusic = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };
  
  return (
    <header className="grid grid-cols-3 w-[calc(100vw-120px)] h-[72px] bg-[#FEFDFB] fixed top-0 left-0 px-[31px] ml-[120px] items-center">
      <div></div>
      <Link href="/" className="flex justify-center">
        <Image src={'/logo&name.png'} alt="" width={170} height={40} />
      </Link>
      <ul className="flex justify-end gap-3">
        <li>
        <button onClick={toggleMusic}>
          {isPlaying ? <GiSoundOn size={24} /> : <GiSoundOff size={24} />}
        </button>
            <path
              d="M14.395 3.60723C14.395 2.55963 13.147 2.01483 12.379 2.72763L7.73262 7.03923C7.62178 7.1424 7.47604 7.19983 7.32462 7.20003H4.19502C3.71763 7.20003 3.25979 7.38967 2.92223 7.72724C2.58466 8.06481 2.39502 8.52264 2.39502 9.00003V15C2.39502 15.4774 2.58466 15.9353 2.92223 16.2728C3.25979 16.6104 3.71763 16.8 4.19502 16.8H7.32462C7.47587 16.7999 7.6216 16.8569 7.73262 16.9596L12.379 21.2724C13.147 21.984 14.395 21.4404 14.395 20.3928V3.60723ZM8.54862 7.91883L13.195 3.60723V20.3928L8.54862 16.08C8.21574 15.7714 7.77855 15.6 7.32462 15.6H4.19502C4.03589 15.6 3.88328 15.5368 3.77076 15.4243C3.65823 15.3118 3.59502 15.1592 3.59502 15V9.00003C3.59502 8.8409 3.65823 8.68829 3.77076 8.57577C3.88328 8.46325 4.03589 8.40003 4.19502 8.40003H7.32462C7.77855 8.40009 8.21574 8.22744 8.54862 7.91883ZM18.307 5.55363C18.3658 5.50115 18.4343 5.46077 18.5087 5.43478C18.5831 5.40879 18.6619 5.39771 18.7406 5.40216C18.8192 5.40662 18.8963 5.42653 18.9672 5.46075C19.0382 5.49498 19.1017 5.54285 19.1542 5.60163C20.7283 7.36165 21.5984 9.64003 21.5984 12.0012C21.5984 14.3624 20.7283 16.6408 19.1542 18.4008C19.0476 18.5177 18.8992 18.5877 18.7412 18.5957C18.5833 18.6037 18.4286 18.549 18.3107 18.4435C18.1929 18.338 18.1215 18.1902 18.112 18.0324C18.1025 17.8745 18.1558 17.7192 18.2602 17.6004C19.6376 16.0604 20.399 14.0668 20.399 12.0006C20.399 9.93451 19.6376 7.94087 18.2602 6.40083C18.1541 6.28228 18.0994 6.12642 18.1082 5.96754C18.1169 5.80866 18.1885 5.65978 18.307 5.55363ZM16.8958 15.5208C16.758 15.4413 16.6575 15.3102 16.6163 15.1565C16.5751 15.0028 16.5967 14.839 16.6762 14.7012C17.1502 13.8803 17.3997 12.9491 17.3997 12.0012C17.3997 11.0533 17.1502 10.1221 16.6762 9.30123C16.6328 9.23294 16.6037 9.15658 16.5905 9.07673C16.5774 8.99688 16.5805 8.9152 16.5998 8.8366C16.619 8.758 16.654 8.68411 16.7025 8.61937C16.7511 8.55463 16.8122 8.50038 16.8823 8.45989C16.9524 8.41939 17.0299 8.39348 17.1102 8.38373C17.1905 8.37397 17.272 8.38056 17.3497 8.40311C17.4275 8.42565 17.4998 8.46369 17.5624 8.51492C17.6251 8.56615 17.6767 8.62953 17.7142 8.70123C18.2937 9.70445 18.5988 10.8425 18.5991 12.0011C18.5993 13.1596 18.2945 14.2978 17.7154 15.3012C17.6358 15.439 17.5048 15.5396 17.3511 15.5808C17.1974 15.622 17.0336 15.6004 16.8958 15.5208Z"
              fill="#080808"
            />
            <path
              d="M14.395 3.60723C14.395 2.55963 13.147 2.01483 12.379 2.72763L7.73262 7.03923C7.62178 7.1424 7.47604 7.19983 7.32462 7.20003H4.19502C3.71763 7.20003 3.25979 7.38967 2.92223 7.72724C2.58466 8.06481 2.39502 8.52264 2.39502 9.00003V15C2.39502 15.4774 2.58466 15.9353 2.92223 16.2728C3.25979 16.6104 3.71763 16.8 4.19502 16.8H7.32462C7.47587 16.7999 7.6216 16.8569 7.73262 16.9596L12.379 21.2724C13.147 21.984 14.395 21.4404 14.395 20.3928V3.60723ZM8.54862 7.91883L13.195 3.60723V20.3928L8.54862 16.08C8.21574 15.7714 7.77855 15.6 7.32462 15.6H4.19502C4.03589 15.6 3.88328 15.5368 3.77076 15.4243C3.65823 15.3118 3.59502 15.1592 3.59502 15V9.00003C3.59502 8.8409 3.65823 8.68829 3.77076 8.57577C3.88328 8.46325 4.03589 8.40003 4.19502 8.40003H7.32462C7.77855 8.40009 8.21574 8.22744 8.54862 7.91883ZM18.307 5.55363C18.3658 5.50115 18.4343 5.46077 18.5087 5.43478C18.5831 5.40879 18.6619 5.39771 18.7406 5.40216C18.8192 5.40662 18.8963 5.42653 18.9672 5.46075C19.0382 5.49498 19.1017 5.54285 19.1542 5.60163C20.7283 7.36165 21.5984 9.64003 21.5984 12.0012C21.5984 14.3624 20.7283 16.6408 19.1542 18.4008C19.0476 18.5177 18.8992 18.5877 18.7412 18.5957C18.5833 18.6037 18.4286 18.549 18.3107 18.4435C18.1929 18.338 18.1215 18.1902 18.112 18.0324C18.1025 17.8745 18.1558 17.7192 18.2602 17.6004C19.6376 16.0604 20.399 14.0668 20.399 12.0006C20.399 9.93451 19.6376 7.94087 18.2602 6.40083C18.1541 6.28228 18.0994 6.12642 18.1082 5.96754C18.1169 5.80866 18.1885 5.65978 18.307 5.55363ZM16.8958 15.5208C16.758 15.4413 16.6575 15.3102 16.6163 15.1565C16.5751 15.0028 16.5967 14.839 16.6762 14.7012C17.1502 13.8803 17.3997 12.9491 17.3997 12.0012C17.3997 11.0533 17.1502 10.1221 16.6762 9.30123C16.6328 9.23294 16.6037 9.15658 16.5905 9.07673C16.5774 8.99688 16.5805 8.9152 16.5998 8.8366C16.619 8.758 16.654 8.68411 16.7025 8.61937C16.7511 8.55463 16.8122 8.50038 16.8823 8.45989C16.9524 8.41939 17.0299 8.39348 17.1102 8.38373C17.1905 8.37397 17.272 8.38056 17.3497 8.40311C17.4275 8.42565 17.4998 8.46369 17.5624 8.51492C17.6251 8.56615 17.6767 8.62953 17.7142 8.70123C18.2937 9.70445 18.5988 10.8425 18.5991 12.0011C18.5993 13.1596 18.2945 14.2978 17.7154 15.3012C17.6358 15.439 17.5048 15.5396 17.3511 15.5808C17.1974 15.622 17.0336 15.6004 16.8958 15.5208Z"
              fill="black"
              fill-opacity="0.2"
            />
            <path
              d="M14.395 3.60723C14.395 2.55963 13.147 2.01483 12.379 2.72763L7.73262 7.03923C7.62178 7.1424 7.47604 7.19983 7.32462 7.20003H4.19502C3.71763 7.20003 3.25979 7.38967 2.92223 7.72724C2.58466 8.06481 2.39502 8.52264 2.39502 9.00003V15C2.39502 15.4774 2.58466 15.9353 2.92223 16.2728C3.25979 16.6104 3.71763 16.8 4.19502 16.8H7.32462C7.47587 16.7999 7.6216 16.8569 7.73262 16.9596L12.379 21.2724C13.147 21.984 14.395 21.4404 14.395 20.3928V3.60723ZM8.54862 7.91883L13.195 3.60723V20.3928L8.54862 16.08C8.21574 15.7714 7.77855 15.6 7.32462 15.6H4.19502C4.03589 15.6 3.88328 15.5368 3.77076 15.4243C3.65823 15.3118 3.59502 15.1592 3.59502 15V9.00003C3.59502 8.8409 3.65823 8.68829 3.77076 8.57577C3.88328 8.46325 4.03589 8.40003 4.19502 8.40003H7.32462C7.77855 8.40009 8.21574 8.22744 8.54862 7.91883ZM18.307 5.55363C18.3658 5.50115 18.4343 5.46077 18.5087 5.43478C18.5831 5.40879 18.6619 5.39771 18.7406 5.40216C18.8192 5.40662 18.8963 5.42653 18.9672 5.46075C19.0382 5.49498 19.1017 5.54285 19.1542 5.60163C20.7283 7.36165 21.5984 9.64003 21.5984 12.0012C21.5984 14.3624 20.7283 16.6408 19.1542 18.4008C19.0476 18.5177 18.8992 18.5877 18.7412 18.5957C18.5833 18.6037 18.4286 18.549 18.3107 18.4435C18.1929 18.338 18.1215 18.1902 18.112 18.0324C18.1025 17.8745 18.1558 17.7192 18.2602 17.6004C19.6376 16.0604 20.399 14.0668 20.399 12.0006C20.399 9.93451 19.6376 7.94087 18.2602 6.40083C18.1541 6.28228 18.0994 6.12642 18.1082 5.96754C18.1169 5.80866 18.1885 5.65978 18.307 5.55363ZM16.8958 15.5208C16.758 15.4413 16.6575 15.3102 16.6163 15.1565C16.5751 15.0028 16.5967 14.839 16.6762 14.7012C17.1502 13.8803 17.3997 12.9491 17.3997 12.0012C17.3997 11.0533 17.1502 10.1221 16.6762 9.30123C16.6328 9.23294 16.6037 9.15658 16.5905 9.07673C16.5774 8.99688 16.5805 8.9152 16.5998 8.8366C16.619 8.758 16.654 8.68411 16.7025 8.61937C16.7511 8.55463 16.8122 8.50038 16.8823 8.45989C16.9524 8.41939 17.0299 8.39348 17.1102 8.38373C17.1905 8.37397 17.272 8.38056 17.3497 8.40311C17.4275 8.42565 17.4998 8.46369 17.5624 8.51492C17.6251 8.56615 17.6767 8.62953 17.7142 8.70123C18.2937 9.70445 18.5988 10.8425 18.5991 12.0011C18.5993 13.1596 18.2945 14.2978 17.7154 15.3012C17.6358 15.439 17.5048 15.5396 17.3511 15.5808C17.1974 15.622 17.0336 15.6004 16.8958 15.5208Z"
              fill="black"
              fill-opacity="0.2"
            />
            <path
              d="M14.395 3.60723C14.395 2.55963 13.147 2.01483 12.379 2.72763L7.73262 7.03923C7.62178 7.1424 7.47604 7.19983 7.32462 7.20003H4.19502C3.71763 7.20003 3.25979 7.38967 2.92223 7.72724C2.58466 8.06481 2.39502 8.52264 2.39502 9.00003V15C2.39502 15.4774 2.58466 15.9353 2.92223 16.2728C3.25979 16.6104 3.71763 16.8 4.19502 16.8H7.32462C7.47587 16.7999 7.6216 16.8569 7.73262 16.9596L12.379 21.2724C13.147 21.984 14.395 21.4404 14.395 20.3928V3.60723ZM8.54862 7.91883L13.195 3.60723V20.3928L8.54862 16.08C8.21574 15.7714 7.77855 15.6 7.32462 15.6H4.19502C4.03589 15.6 3.88328 15.5368 3.77076 15.4243C3.65823 15.3118 3.59502 15.1592 3.59502 15V9.00003C3.59502 8.8409 3.65823 8.68829 3.77076 8.57577C3.88328 8.46325 4.03589 8.40003 4.19502 8.40003H7.32462C7.77855 8.40009 8.21574 8.22744 8.54862 7.91883ZM18.307 5.55363C18.3658 5.50115 18.4343 5.46077 18.5087 5.43478C18.5831 5.40879 18.6619 5.39771 18.7406 5.40216C18.8192 5.40662 18.8963 5.42653 18.9672 5.46075C19.0382 5.49498 19.1017 5.54285 19.1542 5.60163C20.7283 7.36165 21.5984 9.64003 21.5984 12.0012C21.5984 14.3624 20.7283 16.6408 19.1542 18.4008C19.0476 18.5177 18.8992 18.5877 18.7412 18.5957C18.5833 18.6037 18.4286 18.549 18.3107 18.4435C18.1929 18.338 18.1215 18.1902 18.112 18.0324C18.1025 17.8745 18.1558 17.7192 18.2602 17.6004C19.6376 16.0604 20.399 14.0668 20.399 12.0006C20.399 9.93451 19.6376 7.94087 18.2602 6.40083C18.1541 6.28228 18.0994 6.12642 18.1082 5.96754C18.1169 5.80866 18.1885 5.65978 18.307 5.55363ZM16.8958 15.5208C16.758 15.4413 16.6575 15.3102 16.6163 15.1565C16.5751 15.0028 16.5967 14.839 16.6762 14.7012C17.1502 13.8803 17.3997 12.9491 17.3997 12.0012C17.3997 11.0533 17.1502 10.1221 16.6762 9.30123C16.6328 9.23294 16.6037 9.15658 16.5905 9.07673C16.5774 8.99688 16.5805 8.9152 16.5998 8.8366C16.619 8.758 16.654 8.68411 16.7025 8.61937C16.7511 8.55463 16.8122 8.50038 16.8823 8.45989C16.9524 8.41939 17.0299 8.39348 17.1102 8.38373C17.1905 8.37397 17.272 8.38056 17.3497 8.40311C17.4275 8.42565 17.4998 8.46369 17.5624 8.51492C17.6251 8.56615 17.6767 8.62953 17.7142 8.70123C18.2937 9.70445 18.5988 10.8425 18.5991 12.0011C18.5993 13.1596 18.2945 14.2978 17.7154 15.3012C17.6358 15.439 17.5048 15.5396 17.3511 15.5808C17.1974 15.622 17.0336 15.6004 16.8958 15.5208Z"
              fill="black"
              fill-opacity="0.2"
            />
            <path
              d="M14.395 3.60723C14.395 2.55963 13.147 2.01483 12.379 2.72763L7.73262 7.03923C7.62178 7.1424 7.47604 7.19983 7.32462 7.20003H4.19502C3.71763 7.20003 3.25979 7.38967 2.92223 7.72724C2.58466 8.06481 2.39502 8.52264 2.39502 9.00003V15C2.39502 15.4774 2.58466 15.9353 2.92223 16.2728C3.25979 16.6104 3.71763 16.8 4.19502 16.8H7.32462C7.47587 16.7999 7.6216 16.8569 7.73262 16.9596L12.379 21.2724C13.147 21.984 14.395 21.4404 14.395 20.3928V3.60723ZM8.54862 7.91883L13.195 3.60723V20.3928L8.54862 16.08C8.21574 15.7714 7.77855 15.6 7.32462 15.6H4.19502C4.03589 15.6 3.88328 15.5368 3.77076 15.4243C3.65823 15.3118 3.59502 15.1592 3.59502 15V9.00003C3.59502 8.8409 3.65823 8.68829 3.77076 8.57577C3.88328 8.46325 4.03589 8.40003 4.19502 8.40003H7.32462C7.77855 8.40009 8.21574 8.22744 8.54862 7.91883ZM18.307 5.55363C18.3658 5.50115 18.4343 5.46077 18.5087 5.43478C18.5831 5.40879 18.6619 5.39771 18.7406 5.40216C18.8192 5.40662 18.8963 5.42653 18.9672 5.46075C19.0382 5.49498 19.1017 5.54285 19.1542 5.60163C20.7283 7.36165 21.5984 9.64003 21.5984 12.0012C21.5984 14.3624 20.7283 16.6408 19.1542 18.4008C19.0476 18.5177 18.8992 18.5877 18.7412 18.5957C18.5833 18.6037 18.4286 18.549 18.3107 18.4435C18.1929 18.338 18.1215 18.1902 18.112 18.0324C18.1025 17.8745 18.1558 17.7192 18.2602 17.6004C19.6376 16.0604 20.399 14.0668 20.399 12.0006C20.399 9.93451 19.6376 7.94087 18.2602 6.40083C18.1541 6.28228 18.0994 6.12642 18.1082 5.96754C18.1169 5.80866 18.1885 5.65978 18.307 5.55363ZM16.8958 15.5208C16.758 15.4413 16.6575 15.3102 16.6163 15.1565C16.5751 15.0028 16.5967 14.839 16.6762 14.7012C17.1502 13.8803 17.3997 12.9491 17.3997 12.0012C17.3997 11.0533 17.1502 10.1221 16.6762 9.30123C16.6328 9.23294 16.6037 9.15658 16.5905 9.07673C16.5774 8.99688 16.5805 8.9152 16.5998 8.8366C16.619 8.758 16.654 8.68411 16.7025 8.61937C16.7511 8.55463 16.8122 8.50038 16.8823 8.45989C16.9524 8.41939 17.0299 8.39348 17.1102 8.38373C17.1905 8.37397 17.272 8.38056 17.3497 8.40311C17.4275 8.42565 17.4998 8.46369 17.5624 8.51492C17.6251 8.56615 17.6767 8.62953 17.7142 8.70123C18.2937 9.70445 18.5988 10.8425 18.5991 12.0011C18.5993 13.1596 18.2945 14.2978 17.7154 15.3012C17.6358 15.439 17.5048 15.5396 17.3511 15.5808C17.1974 15.622 17.0336 15.6004 16.8958 15.5208Z"
              fill="black"
              fill-opacity="0.2"
            />
            <path
              d="M14.395 3.60723C14.395 2.55963 13.147 2.01483 12.379 2.72763L7.73262 7.03923C7.62178 7.1424 7.47604 7.19983 7.32462 7.20003H4.19502C3.71763 7.20003 3.25979 7.38967 2.92223 7.72724C2.58466 8.06481 2.39502 8.52264 2.39502 9.00003V15C2.39502 15.4774 2.58466 15.9353 2.92223 16.2728C3.25979 16.6104 3.71763 16.8 4.19502 16.8H7.32462C7.47587 16.7999 7.6216 16.8569 7.73262 16.9596L12.379 21.2724C13.147 21.984 14.395 21.4404 14.395 20.3928V3.60723ZM8.54862 7.91883L13.195 3.60723V20.3928L8.54862 16.08C8.21574 15.7714 7.77855 15.6 7.32462 15.6H4.19502C4.03589 15.6 3.88328 15.5368 3.77076 15.4243C3.65823 15.3118 3.59502 15.1592 3.59502 15V9.00003C3.59502 8.8409 3.65823 8.68829 3.77076 8.57577C3.88328 8.46325 4.03589 8.40003 4.19502 8.40003H7.32462C7.77855 8.40009 8.21574 8.22744 8.54862 7.91883ZM18.307 5.55363C18.3658 5.50115 18.4343 5.46077 18.5087 5.43478C18.5831 5.40879 18.6619 5.39771 18.7406 5.40216C18.8192 5.40662 18.8963 5.42653 18.9672 5.46075C19.0382 5.49498 19.1017 5.54285 19.1542 5.60163C20.7283 7.36165 21.5984 9.64003 21.5984 12.0012C21.5984 14.3624 20.7283 16.6408 19.1542 18.4008C19.0476 18.5177 18.8992 18.5877 18.7412 18.5957C18.5833 18.6037 18.4286 18.549 18.3107 18.4435C18.1929 18.338 18.1215 18.1902 18.112 18.0324C18.1025 17.8745 18.1558 17.7192 18.2602 17.6004C19.6376 16.0604 20.399 14.0668 20.399 12.0006C20.399 9.93451 19.6376 7.94087 18.2602 6.40083C18.1541 6.28228 18.0994 6.12642 18.1082 5.96754C18.1169 5.80866 18.1885 5.65978 18.307 5.55363ZM16.8958 15.5208C16.758 15.4413 16.6575 15.3102 16.6163 15.1565C16.5751 15.0028 16.5967 14.839 16.6762 14.7012C17.1502 13.8803 17.3997 12.9491 17.3997 12.0012C17.3997 11.0533 17.1502 10.1221 16.6762 9.30123C16.6328 9.23294 16.6037 9.15658 16.5905 9.07673C16.5774 8.99688 16.5805 8.9152 16.5998 8.8366C16.619 8.758 16.654 8.68411 16.7025 8.61937C16.7511 8.55463 16.8122 8.50038 16.8823 8.45989C16.9524 8.41939 17.0299 8.39348 17.1102 8.38373C17.1905 8.37397 17.272 8.38056 17.3497 8.40311C17.4275 8.42565 17.4998 8.46369 17.5624 8.51492C17.6251 8.56615 17.6767 8.62953 17.7142 8.70123C18.2937 9.70445 18.5988 10.8425 18.5991 12.0011C18.5993 13.1596 18.2945 14.2978 17.7154 15.3012C17.6358 15.439 17.5048 15.5396 17.3511 15.5808C17.1974 15.622 17.0336 15.6004 16.8958 15.5208Z"
              fill="black"
              fill-opacity="0.2"
            />
        </li>
        <li>
        {!isLogin && (
          <Link href={"/log-in"}>
            <button>로그인</button>
          </Link>
        )}
        </li>
      </ul>
    </header>
  );
};

export default Header;
