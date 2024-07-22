type TProps = {
  color?: string;
};

export const DownArrowIcon = ({ color = 'black' }: TProps) => (
  <svg width='14' height='8' viewBox='0 0 14 8' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M12.8822 0.644353C13.1822 0.959247 13.1701 1.45768 12.8552 1.75763L7.34262 7.00862C7.0385 7.29832 6.56053 7.29832 6.2564 7.00862L0.74384 1.75763C0.428946 1.45768 0.416834 0.959247 0.716786 0.644353C1.01674 0.329459 1.51517 0.317346 1.83006 0.617299L6.79951 5.35095L11.769 0.617299C12.0839 0.317347 12.5823 0.329459 12.8822 0.644353Z'
      fill={color}
      stroke={color}
      strokeWidth='0.1'
    />
  </svg>
);
