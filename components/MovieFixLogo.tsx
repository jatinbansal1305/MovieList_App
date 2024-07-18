import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface MoviefixLogoProps {
    width?: number;
    height?: number;
}

const MoviefixLogo = ({ width = 124, height = 34 }: MoviefixLogoProps) => {
    return (
        <Svg width={width} height={height} viewBox="0 0 125 35" fill="none" >
            <Path d="M13.8226 27.2249L10.68 27.4111L8.30737 22.7077C8.24914 22.5766 8.13418 22.3395 7.96249 21.9965C7.80656 21.6357 7.62301 21.2345 7.41183 20.7929C7.21642 20.3335 7.01214 19.8663 6.79898 19.3911C6.58581 18.916 6.3919 18.4818 6.21722 18.0885C6.24304 18.5242 6.27283 19.0271 6.30659 19.5969C6.34035 20.1668 6.3746 20.745 6.40936 21.3316C6.44411 21.9183 6.4685 22.4718 6.48252 22.9924C6.5133 23.512 6.52925 23.9231 6.53036 24.2258L6.60722 27.6524L2.78582 27.8788L2.78311 10.7989L6.3531 10.5874L10.8559 20.16C10.9911 20.4547 11.1673 20.8732 11.3844 21.4153C11.6173 21.9397 11.8448 22.5149 12.0669 23.1409C12.2146 22.5099 12.3647 21.9207 12.5173 21.3734C12.6856 20.8084 12.8274 20.3627 12.9426 20.0363L16.2837 9.99907L19.7783 9.79204L21.7923 26.7528L17.8954 26.9836L17.542 23.5734C17.5064 23.256 17.4648 22.838 17.4173 22.3194C17.3865 21.7998 17.3542 21.2551 17.3205 20.6852C17.2857 20.0986 17.2515 19.5204 17.2177 18.9505C17.1997 18.3629 17.1783 17.8596 17.1535 17.4406C17.0402 17.8005 16.9132 18.2117 16.7724 18.6741C16.6474 19.1188 16.5135 19.5557 16.3707 19.9846C16.2279 20.4136 16.092 20.8169 15.963 21.1945C15.833 21.5554 15.7321 21.8389 15.6602 22.045L13.8226 27.2249Z" fill="#F0283C" />
            <Path d="M32.959 9.396C34.2846 9.34795 35.4328 9.50793 36.4038 9.87595C37.3748 10.244 38.1841 10.7859 38.8317 11.5016C39.4793 12.2174 39.9652 13.107 40.2893 14.1705C40.6297 15.2167 40.8239 16.4025 40.8719 17.728C40.9194 19.0368 40.7951 20.2425 40.4991 21.3453C40.2192 22.4307 39.7661 23.3712 39.1397 24.1668C38.5133 24.9623 37.713 25.5962 36.7389 26.0683C35.7641 26.5237 34.6056 26.7757 33.2633 26.8244C31.9377 26.8724 30.7817 26.7295 29.7951 26.3957C28.8248 26.0444 28.0161 25.5193 27.3691 24.8203C26.7215 24.1046 26.2278 23.232 25.8881 22.2027C25.5652 21.1727 25.3793 19.9866 25.3307 18.6443C25.2832 17.3355 25.3991 16.13 25.6784 15.0279C25.9738 13.9083 26.4344 12.9423 27.0602 12.13C27.6854 11.3009 28.4851 10.6503 29.4592 10.1781C30.4501 9.70538 31.6167 9.44467 32.959 9.396ZM32.7134 12.3535C31.6228 12.393 30.8444 12.9337 30.3781 13.9754C29.928 14.9998 29.7355 16.4097 29.8006 18.205C29.8316 19.0607 29.9103 19.8391 30.0365 20.5402C30.1795 21.2406 30.3862 21.8464 30.6568 22.3574C30.9435 22.851 31.3185 23.2323 31.7819 23.5011C32.2453 23.7699 32.8209 23.8918 33.5089 23.8669C34.5995 23.8273 35.3705 23.3122 35.8218 22.3214C36.2731 21.3305 36.4662 19.9375 36.4011 18.1421C36.3701 17.2864 36.2828 16.4999 36.1392 15.7827C36.0123 15.0648 35.8052 14.4507 35.5179 13.9403C35.2468 13.4125 34.8795 13.0142 34.4161 12.7454C33.9522 12.4598 33.3846 12.3291 32.7134 12.3535Z" fill="#F0283C" />
            <Path d="M53.1421 25.8434L49.6167 25.8984L42.9797 8.94966L47.3614 8.88131L49.7338 15.6451C50.0855 16.6639 50.3944 17.6246 50.6603 18.5272C50.926 19.413 51.1478 20.1736 51.3256 20.8089C51.4835 20.1684 51.6816 19.4097 51.9198 18.5328C52.158 17.6559 52.4535 16.6857 52.8064 15.6223L55.0167 8.76191L59.2472 8.69592L53.1421 25.8434Z" fill="#F0283C" />
            <Path d="M61.9595 8.95055L66.1151 8.95246L66.1072 26.0026L61.9517 26.0007L61.9595 8.95055Z" fill="#F0283C" />
            <Path d="M70.3119 8.97256L81.1654 9.13687L81.1192 12.1839L74.4208 12.0825L74.3655 15.7339L79.9308 15.8181L79.4069 18.8075L74.3202 18.7305L74.255 23.0367L81.3059 23.1434L81.2598 26.1904L70.0538 26.0208L70.3119 8.97256Z" fill="#F0283C" />
            <Path d="M85.1701 8.99587L96.0191 9.34436L95.9221 12.365L89.2264 12.1499L89.1011 16.0516L94.7144 16.2319L94.1147 19.2111L89.0048 19.047L88.776 26.1707L84.6227 26.0372L85.1701 8.99587Z" fill="#F0283C" />
            <Path d="M99.4853 10.0136L103.636 10.2061L102.847 27.2379L98.6956 27.0455L99.4853 10.0136Z" fill="#F0283C" />
            <Path d="M106.656 27.9521L112.488 19.3559L108.214 10.9658L112.739 11.2463L114.86 15.6928C114.92 15.8142 114.986 15.9781 115.057 16.1844C115.146 16.3749 115.243 16.5744 115.348 16.7828C115.477 16.6057 115.589 16.4276 115.684 16.2485C115.796 16.0704 115.898 15.9169 115.99 15.788L118.671 11.6142L123.196 11.8947L117.891 19.7161L122.618 28.9418L118.043 28.6581L115.54 23.4562C115.464 23.317 115.382 23.1521 115.293 22.9615C115.205 22.7542 115.108 22.5463 115.003 22.338L114.358 23.383L111.231 28.2357L106.656 27.9521Z" fill="#F0283C" />
        </Svg>
    );
};

export default MoviefixLogo;