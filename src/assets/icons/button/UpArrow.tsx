type TProps = {
  color?: string;
};

export const UpArrowIcon = ({ color = 'black' }: TProps) => (
  <svg width='14' height='8' viewBox='0 0 14 8' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M0.752026 6.92762C1.10716 7.30428 1.70509 7.32609 2.08754 6.97634L6.79951 2.60075L11.5115 6.97634C11.8939 7.32609 12.4919 7.30428 12.847 6.92762C13.2021 6.55097 13.18 5.96209 12.7975 5.61234L7.44254 0.648708C7.07996 0.31713 6.51906 0.31713 6.15649 0.648708L0.801489 5.61234C0.419038 5.96209 0.396892 6.55097 0.752026 6.92762Z'
      fill={color}
      stroke={color}
      strokeWidth='0.1'
    />
  </svg>
);
