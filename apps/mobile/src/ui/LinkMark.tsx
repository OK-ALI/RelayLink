import Svg, { Path } from 'react-native-svg';
export function LinkMark({ color }: { color: string }) {
  return (
    <Svg width={42} height={42} viewBox="0 0 48 48" fill="none" accessible={false}>
      <Path
        d="M27 11h7a9 9 0 0 1 0 18h-9M21 37h-7a9 9 0 0 1 0-18h9m-5 9 12-8"
        stroke={color}
        strokeWidth={5}
        strokeLinecap="round"
      />
    </Svg>
  );
}
