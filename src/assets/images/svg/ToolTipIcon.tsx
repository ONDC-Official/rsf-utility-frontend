import { SVGProps } from 'react'

const SvgComponent = (props: SVGProps<SVGSVGElement>): JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="none" {...props}>
    <path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8 14.667A6.667 6.667 0 1 0 8 1.333a6.667 6.667 0 0 0 0 13.334ZM8 10.667v-3"
    />
    <path stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M8 5.341v-.007" />
  </svg>
)
export default SvgComponent
