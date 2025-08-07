import { SVGProps } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M10.6666 1.3335V4.00016M5.33325 1.3335V4.00016"
      stroke="black"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.66667 2.6665H7.33333C4.81917 2.6665 3.5621 2.6665 2.78105 3.44755C2 4.2286 2 5.48568 2 7.99984V9.33317C2 11.8473 2 13.1044 2.78105 13.8854C3.5621 14.6665 4.81917 14.6665 7.33333 14.6665H8.66667C11.1808 14.6665 12.4379 14.6665 13.2189 13.8854C14 13.1044 14 11.8473 14 9.33317V7.99984C14 5.48568 14 4.2286 13.2189 3.44755C12.4379 2.6665 11.1808 2.6665 8.66667 2.6665Z"
      stroke="black"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M2 6.6665H14" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
export default SvgComponent
